import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Form, Row, Col, Radio as AntdRadio, Divider } from 'antd'
import { isNull } from 'lodash'
import * as WebSellerKit from 'webseller/components'
import ReactInputMask from 'react-input-mask'
import debounce from 'lodash/debounce'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import LoadingSpinner from 'components/LoadingSpinner'
import SearchInput from 'webseller/components/Search'

import { getDocumentValidationRules, getRequiredFieldsMap } from 'webseller/helpers/form'
import { ERROR_MESSAGE, FORM_FIELDS, RUSSIAN_FEDERATION, RUSSIAN_PASSPORT_ID } from 'webseller/constants/form'
import { EMAIL_REGEXP } from 'webseller/constants/regexp'
import {
  hasAllRequiredAddressFields,
  useSearchInputValidation,
  validateAddressSearch,
  validateCitizenshipSearch
} from 'webseller/features/saleSim/utils/validations'
import { getFoundAddress, getFoundAddressesFromDaData, getFullAddress, getManualQueryAddress, getMockDaDataResponse } from 'webseller/helpers/daData'
import { RegistrationAddressModal, RegistrationAddressForm } from './components'

const { Group: RadioGroup } = AntdRadio
const { Title, Input, Textarea, DatePicker, Radio, Button, Select, PhoneMask } = WebSellerKit

const dateFormat = 'YYYY-MM-DD'

export default function DocumentDataForm ({
  isPrefill,
  form,
  isHidden,
  parentFormName,
  info,
  onNextFormStep,
  toPrevStep,
  /** docIdentityCountries */
  getDocIdentityCountries,
  docIdentityCountries,
  isDocIdentityCountriesLoading,
  /** docIdentityFields */
  getDocsIdentityFieldsClear,
  getDocIdentityFields,
  docIdentityFields,
  /** docIdentityTypes */
  docIdentityTypes,
  /** searchAddresses */
  searchAddresses,
  foundAddresses,
  isSearchAddressLoading,
  isSearchAddressError,
  isManualAddressSearch,
  setRegistrationAddressManually,
  setRegistrationAddressData,
  registrationAddressData,
  isValidPeriod,
  getValidityPeriod,
  isValidPeriodLoading,
  /** approvedStayingDocs */
  isApprovedStayingDocsLoading,
  /** docIdentityTypes */
  isDocTypesLoading,
  /** codeUFMS */
  searchCodeUFMS,
  clearCodeUFMS,
  codeUFMS,
  fromModal,
  onSaveClick,
  saveClickButtonText
}) {
  const getFormFieldName = fieldName => (parentFormName ? [parentFormName, fieldName] : fieldName)
  const setFormFieldValue = fields => {
    if (parentFormName) {
      const allValues = form.getFieldsValue()
      const currentFormValues = allValues[parentFormName]
      fields.forEach(([fieldName, value]) => {
        currentFormValues[fieldName] = value
      })
      form.setFieldsValue(allValues)
    } else {
      const currentValues = form.getFieldsValue()
      fields.forEach(([fieldName, value]) => {
        currentValues[fieldName] = value
      })
      form.setFieldsValue(currentValues)
    }
  }

  const clearDocumentData = () => {
    setFormFieldValue([
      [FORM_FIELDS.DOCUMENT_SERIES, ''],
      [FORM_FIELDS.DOCUMENT_NUMBER, ''],
      [FORM_FIELDS.DOCUMENT_DATE, ''],
      [FORM_FIELDS.DOCUMENT_CODE, ''],
      [FORM_FIELDS.DOCUMENT_ADDRESS, '']
    ])
  }

  const documentTypeFieldName = getFormFieldName(FORM_FIELDS.DOCUMENT_TYPE)
  const firstNameFieldName = getFormFieldName(FORM_FIELDS.FIRST_NAME)
  const lastNameFieldName = getFormFieldName(FORM_FIELDS.LAST_NAME)
  const middleNameFieldName = getFormFieldName(FORM_FIELDS.MIDDLE_NAME)
  const birthDateFieldName = getFormFieldName(FORM_FIELDS.BIRTH_DATE)
  const sexFieldName = getFormFieldName(FORM_FIELDS.SEX)
  const birthPlaceFieldName = getFormFieldName(FORM_FIELDS.BIRTH_PLACE)
  const citizenshipFieldName = getFormFieldName(FORM_FIELDS.CITIZENSHIP)
  const citizenshipIdFieldName = getFormFieldName(FORM_FIELDS.CITIZENSHIP_ID)
  const documentSeriesFieldName = getFormFieldName(FORM_FIELDS.DOCUMENT_SERIES)
  const documentNumberFieldName = getFormFieldName(FORM_FIELDS.DOCUMENT_NUMBER)
  const documentDateFieldName = getFormFieldName(FORM_FIELDS.DOCUMENT_DATE)
  const documentCodeFieldName = getFormFieldName(FORM_FIELDS.DOCUMENT_CODE)
  const documentAddressFieldName = getFormFieldName(FORM_FIELDS.DOCUMENT_ADDRESS)
  const registrationAddressFieldName = getFormFieldName(FORM_FIELDS.REGISTRATION_ADDRESS)
  const contactNumberFieldName = getFormFieldName(FORM_FIELDS.CONTACT_NUMBER)
  const emailFieldName = getFormFieldName(FORM_FIELDS.EMAIL)

  const [documentType, setDocumentType] = useState(
    () => form.getFieldValue(documentTypeFieldName) || RUSSIAN_PASSPORT_ID
  ) // Паспорт РФ по умолчанию
  const [isShowUFMSDivisions, setIsShowUFMSDivisions] = useState(true)

  const [birthDate, setBirthDate] = useState(undefined)
  const [docDate, setDocDate] = useState(undefined)
  const [isManualAddressFillingAvailable, setIsManualAddressFillingAvailable] = useState(false)
  const [isRegistrationAddressModalOpen, setIsRegistrationAddressModalOpen] = useState(false)

  const { query: queryCitizenship, onChangeQuery: onChangeSearchCitizenship } = useSearchInputValidation({
    form,
    fieldName: citizenshipFieldName,
    results: docIdentityCountries?.countries,
    isLoading: isDocIdentityCountriesLoading
  })
  const { query: queryAddress, onChangeQuery: onChangeSearchRegistrationAddress } = useSearchInputValidation({
    form,
    fieldName: registrationAddressFieldName,
    results: getFoundAddressesFromDaData(foundAddresses),
    isLoading: isSearchAddressLoading
  })

  const registrationAddressValidation = isManualAddressSearch
    ? validateAddressSearch({
      queryAddress: getManualQueryAddress(foundAddresses),
      foundAddresses: getFoundAddressesFromDaData(foundAddresses)
    })
    : validateAddressSearch({
      queryAddress,
      foundAddresses: getFoundAddressesFromDaData(foundAddresses),
      isGeneratedFoundAddresses: foundAddresses?.isGenerated
    })

  const isRussianPassport = documentType === RUSSIAN_PASSPORT_ID

  const identityDocsTypes = docIdentityTypes?.identityDocumentTypes

  const requiredFieldsMap = getRequiredFieldsMap(docIdentityFields)

  const registrationAddressOptions = useMemo(() => {
    return getFoundAddressesFromDaData(foundAddresses)?.map(foundAddress => {
      const fullAddress = foundAddress.SearchAccuracy.FullAddress

      return {
        label: fullAddress,
        value: fullAddress
      }
    })
  }, [foundAddresses])

  const countriesOptions = useMemo(() => {
    return docIdentityCountries?.countries.map(country => {
      return {
        key: country?.id,
        value: country?.nameRu
      }
    })
  }, [docIdentityCountries])

  const codeUFMSBody = codeUFMS?.data

  useEffect(() => {
    const fieldsForUpdate = [[FORM_FIELDS.DOCUMENT_TYPE, documentType]]
    if (isRussianPassport) {
      fieldsForUpdate.push([FORM_FIELDS.CITIZENSHIP, RUSSIAN_FEDERATION])
    }

    setFormFieldValue(fieldsForUpdate)
    getDocsIdentityFieldsClear()
  }, [documentType])

  const disabledDocumentDate = useCallback(date => {
    const today = moment()
    const birthDate = form.getFieldValue(birthDateFieldName)

    if (birthDate) {
      return date.isAfter(today) || date.isBefore(birthDate)
    }
    return date.isAfter(today)
  }, [])

  const disabledBirthDate = useCallback(date => {
    const minDate = moment('01.01.1900')
    const maxDate = moment().add(-14, 'y')

    return date.isBefore(minDate) || date.isAfter(maxDate)
  }, [])

  const onChooseDocAddress = useCallback(division => {
    setFormFieldValue([[FORM_FIELDS.DOCUMENT_ADDRESS, division]])
    setIsShowUFMSDivisions(false)
  }, [])

  const onSearchUFMSCode = event => {
    const value = event.target.value
    const docCodeError = form.getFieldError(documentCodeFieldName)

    if (value && !docCodeError.length) {
      searchCodeUFMS(value)
      setIsShowUFMSDivisions(true)
    }
  }

  const onChangeDocumentType = documentTypeId => {
    setDocumentType(documentTypeId)
    const citizenship = documentTypeId === RUSSIAN_PASSPORT_ID ? RUSSIAN_FEDERATION : undefined
    setFormFieldValue([
      [FORM_FIELDS.DOCUMENT_TYPE, documentTypeId],
      [FORM_FIELDS.CITIZENSHIP, citizenship]
    ])
    clearDocumentData()
    clearCodeUFMS()
    getDocIdentityFields({ id: documentTypeId })
  }

  const onChangeCitizenship = (val, option) => {
    setFormFieldValue([[FORM_FIELDS.CITIZENSHIP_ID, option['key']]])
    onChangeSearchCitizenship(val)
  }

  const onSearchRegistrationAddress = useCallback(
    debounce(value => {
      if (value.length >= 3) {
        searchAddresses(value)
      }
    }, 250),
    []
  )

  const onSearchCitizenship = useCallback(
    debounce(value => {
      if (value.length >= 3) {
        getDocIdentityCountries({ identityDocumentType: documentType, countryName: value })
      }
    }, 250),
    [documentType]
  )

  const onManualAddressFillingClick = () => {
    setIsRegistrationAddressModalOpen(true)
  }

  const onRegistrationAddressModalClose = () => {
    setIsRegistrationAddressModalOpen(false)
  }

  const onRegistrationAddressFormSubmit = async (form) => {
    await form.validateFields()

    const addressFormValues = form.getFieldsValue()
    const stringAddress = getFullAddress(addressFormValues)
    const mockDaDataResponse = getMockDaDataResponse(addressFormValues)

    setFormFieldValue([[FORM_FIELDS.REGISTRATION_ADDRESS, stringAddress]])
    setRegistrationAddressManually(mockDaDataResponse)
    setRegistrationAddressData(addressFormValues)
    onRegistrationAddressModalClose()
  }

  const isControlsVisible = onNextFormStep || toPrevStep

  const isShowFormItem = fieldName => {
    return docIdentityFields?.some(field => field.nameEn === fieldName) || false
  }

  useEffect(() => {
    if (birthDate && docDate) {
      getValidityPeriod({
        id: documentType,
        BirthDate: moment(birthDate).format(dateFormat),
        IssueDate: moment(docDate).format(dateFormat),
        CurrentDate: moment().format(dateFormat)
      })
    }
  }, [birthDate, docDate])

  const isValidDocumentRule = () => ({
    message: ERROR_MESSAGE.INVALID_IDENTITY_DOCUMENT,
    validator () {
      if (!isNull(isValidPeriod) && !isValidPeriodLoading && !isValidPeriod) {
        return Promise.reject(new Error())
      }
      return Promise.resolve()
    }
  })

  const isDisabled = fieldName => {
    if (isPrefill) {
      const errors = form.getFieldError(fieldName)

      return !(errors.length > 0)
    }

    return false
  }

  const isDisabledDocumentCode = isDisabled(documentCodeFieldName)
  const isPrefillCitizenshipField = isPrefill && docIdentityCountries?.countries?.length

  useEffect(() => {
    if (birthDate && docDate) {
      form.validateFields([documentDateFieldName])
    }
  }, [isValidPeriodLoading, isValidPeriod])

  useEffect(() => {
    if (queryCitizenship) {
      getDocIdentityCountries({ identityDocumentType: documentType, countryName: queryCitizenship })
    }
  }, [])

  useEffect(() => {
    if (!isManualAddressFillingAvailable && isSearchAddressError) {
      setIsManualAddressFillingAvailable(true)
      return
    }

    if (!isManualAddressFillingAvailable && foundAddresses) {
      const addresses = getFoundAddressesFromDaData(foundAddresses)

      if (addresses.length === 0) {
        setIsManualAddressFillingAvailable(true)
        return
      }

      if (!queryAddress) return

      const foundAddress = getFoundAddress(queryAddress, addresses)

      const hasAllRequiredFields = hasAllRequiredAddressFields(foundAddress, foundAddresses?.isGenerated)
      if (!hasAllRequiredFields) {
        setIsManualAddressFillingAvailable(true)
      }
    }
  }, [foundAddresses, isSearchAddressError])

  return (
    <Wrapper isHidden={isHidden}>
      <Row gutter={16}>
        <Col span={8}>{info}</Col>
        <Col span={8}>
          <Select
            placeholder='Выберите тип документа'
            loading={isDocTypesLoading}
            size='large'
            value={documentType}
            disabled={isPrefill}
            options={identityDocsTypes?.map(({ name, id }) => ({
              value: id,
              label: name
            }))}
            onSelect={onChangeDocumentType}
          />
          <FormItem style={{ display: 'none' }} name={documentTypeFieldName}>
            <Input />
          </FormItem>
        </Col>
        <Col span={8} />
      </Row>
      <Divider />
      <FormStyled>
        <Row gutter={16}>
          <Col span={8}>
            {isShowFormItem(FORM_FIELDS.LAST_NAME) && (
              <FormItem
                name={lastNameFieldName}
                rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.LAST_NAME)}
                isRequired={requiredFieldsMap[FORM_FIELDS.LAST_NAME]}
              >
                <Input placeholder='Фамилия' disabled={isDisabled(lastNameFieldName)} />
              </FormItem>
            )}
            {isShowFormItem(FORM_FIELDS.FIRST_NAME) && (
              <FormItem
                name={firstNameFieldName}
                rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.FIRST_NAME)}
                isRequired={requiredFieldsMap[FORM_FIELDS.FIRST_NAME]}
              >
                <Input placeholder='Имя' disabled={isDisabled(firstNameFieldName)} />
              </FormItem>
            )}
            {isShowFormItem(FORM_FIELDS.MIDDLE_NAME) && (
              <FormItem
                name={middleNameFieldName}
                rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.MIDDLE_NAME)}
                isRequired={requiredFieldsMap[FORM_FIELDS.MIDDLE_NAME]}
              >
                <Input placeholder='Отчество' disabled={isDisabled(middleNameFieldName)} />
              </FormItem>
            )}
            <Row justify='space-between' align='middle'>
              {isShowFormItem(FORM_FIELDS.BIRTH_DATE) && (
                <Col span={10}>
                  <FormItem
                    name={birthDateFieldName}
                    hidden={!docIdentityFields?.find(field => field.nameEn === FORM_FIELDS.BIRTH_DATE)}
                    rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.BIRTH_DATE)}
                    isRequired={requiredFieldsMap[FORM_FIELDS.BIRTH_DATE]}
                  >
                    <DatePickerStyled
                      id='birthDate'
                      placeholder='Дата рождения'
                      disabledDate={disabledBirthDate}
                      disabled={isDisabled(birthDateFieldName)}
                      onChange={value => setBirthDate(value)}
                    />
                  </FormItem>
                </Col>
              )}
              {isShowFormItem(FORM_FIELDS.SEX) && (
                <Col span={13}>
                  <Row justify='start' align='bottom'>
                    {Boolean(requiredFieldsMap[FORM_FIELDS.SEX]) && <RequiredLabel>*</RequiredLabel>}
                    <Title>Пол</Title>
                  </Row>
                  <Row justify='start'>
                    <FormItem
                      isHiddenRequiredLabel
                      name={sexFieldName}
                      rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.SEX)}
                    >
                      <RadioGroup style={{ textAlign: 'left' }} disabled={isDisabled(sexFieldName)}>
                        <Radio value={'0'}>Мужской</Radio>
                        <Radio value={'1'}>Женский</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Row>
                </Col>
              )}
            </Row>
            {isShowFormItem(FORM_FIELDS.BIRTH_PLACE) && (
              <FormItem
                name={birthPlaceFieldName}
                rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.BIRTH_PLACE)}
                isRequired={requiredFieldsMap[FORM_FIELDS.BIRTH_PLACE]}
              >
                <Input placeholder='Место рождения' disabled={isDisabled(birthPlaceFieldName)} />
              </FormItem>
            )}
          </Col>
          <Col span={8}>
            {isShowFormItem(FORM_FIELDS.CITIZENSHIP) && (
              <FormItem
                name={citizenshipFieldName}
                rules={getDocumentValidationRules(
                  docIdentityFields,
                  FORM_FIELDS.CITIZENSHIP,
                  validateCitizenshipSearch({
                    queryCitizenship,
                    foundCitizenships: docIdentityCountries?.countries
                  })
                )}
                isRequired={requiredFieldsMap[FORM_FIELDS.CITIZENSHIP]}
              >
                <SearchInput
                  placeholder='Гражданство'
                  disabled={isRussianPassport || isDisabled(citizenshipFieldName) || isPrefillCitizenshipField}
                  onSearch={onSearchCitizenship}
                  options={countriesOptions}
                  onChange={onChangeCitizenship}
                  notFoundContent={isDocIdentityCountriesLoading ? <LoadingSpinner size={20} /> : null}
                />
              </FormItem>
            )}
            <FormItem name={citizenshipIdFieldName} hidden>
              <Input />
            </FormItem>
            <Row justify='space-between' gutter={8}>
              {isShowFormItem(FORM_FIELDS.DOCUMENT_SERIES) && (
                <Col flex='1'>
                  <FormItem
                    name={documentSeriesFieldName}
                    rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.DOCUMENT_SERIES)}
                    isRequired={requiredFieldsMap[FORM_FIELDS.DOCUMENT_SERIES]}
                  >
                    <Input placeholder='Серия документа' disabled={isDisabled(documentSeriesFieldName)} />
                  </FormItem>
                </Col>
              )}
              {isShowFormItem(FORM_FIELDS.DOCUMENT_NUMBER) && (
                <Col flex='1'>
                  <FormItem
                    name={documentNumberFieldName}
                    rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.DOCUMENT_NUMBER)}
                    isRequired={requiredFieldsMap[FORM_FIELDS.DOCUMENT_NUMBER]}
                  >
                    <Input placeholder='Номер документа' disabled={isDisabled(documentNumberFieldName)} />
                  </FormItem>
                </Col>
              )}
            </Row>
            <Row justify='space-between' gutter={8}>
              {isShowFormItem(FORM_FIELDS.DOCUMENT_DATE) && (
                <Col flex='1'>
                  <FormItem
                    name={documentDateFieldName}
                    dependencies={[birthDateFieldName]}
                    rules={[
                      ...getDocumentValidationRules(docIdentityFields, FORM_FIELDS.DOCUMENT_DATE),
                      isValidDocumentRule
                    ]}
                    isRequired={requiredFieldsMap[FORM_FIELDS.DOCUMENT_DATE]}
                  >
                    <DatePickerStyled
                      id='docDate'
                      placeholder='Дата выдачи'
                      disabled={isDisabled(documentDateFieldName)}
                      disabledDate={disabledDocumentDate}
                      onChange={value => setDocDate(value)}
                    />
                  </FormItem>
                </Col>
              )}
              {isShowFormItem(FORM_FIELDS.DOCUMENT_CODE) && (
                <Col flex='1'>
                  <FormItem
                    name={documentCodeFieldName}
                    rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.DOCUMENT_CODE)}
                    isRequired={requiredFieldsMap[FORM_FIELDS.DOCUMENT_CODE]}
                  >
                    <ReactInputMask mask='999-999' onBlur={onSearchUFMSCode} disabled={isDisabledDocumentCode}>
                      {inputProps => (
                        <Input {...inputProps} placeholder='Код подразделения' disabled={isDisabledDocumentCode} />
                      )}
                    </ReactInputMask>
                  </FormItem>
                </Col>
              )}
            </Row>
            {codeUFMS && isShowUFMSDivisions && (
              <Block className='mb-4'>
                <Caption span={24}>Выбери подразделение, выдавшее документ:</Caption>
                {codeUFMSBody?.map((division, index) => (
                  <Col span={24} key={index}>
                    <Card onClick={() => onChooseDocAddress(division.name)}>{division.name}</Card>
                  </Col>
                ))}
              </Block>
            )}
            {isShowFormItem(FORM_FIELDS.DOCUMENT_ADDRESS) && (
              <FormItem
                name={documentAddressFieldName}
                rules={getDocumentValidationRules(docIdentityFields, FORM_FIELDS.DOCUMENT_ADDRESS)}
                isRequired={requiredFieldsMap[FORM_FIELDS.DOCUMENT_ADDRESS]}
              >
                <Textarea rows={4} placeholder='Кем выдан' disabled={isDisabled(documentAddressFieldName)} />
              </FormItem>
            )}
            {isShowFormItem(FORM_FIELDS.REGISTRATION_ADDRESS) && (
              <>
                <FormItem
                  name={registrationAddressFieldName}
                  rules={getDocumentValidationRules(
                    docIdentityFields,
                    FORM_FIELDS.REGISTRATION_ADDRESS,
                    registrationAddressValidation
                  )}
                  isRequired={requiredFieldsMap[FORM_FIELDS.REGISTRATION_ADDRESS]}
                >
                  <SearchInput
                    isCustomInput
                    options={registrationAddressOptions}
                    onSearch={onSearchRegistrationAddress}
                    disabled={isDisabled(registrationAddressFieldName)}
                    onChange={onChangeSearchRegistrationAddress}
                    notFoundContent={isSearchAddressLoading ? <LoadingSpinner size={20} /> : null}
                  >
                    <Textarea rows={3} placeholder='Адрес регистрации' />
                  </SearchInput>
                </FormItem>

                { isManualAddressFillingAvailable && (
                  <ManualSearchButton type='link' htmlType='button' onClick={onManualAddressFillingClick}>Ввести адрес без проверки в справочнике</ManualSearchButton>) }

                {isRegistrationAddressModalOpen && (
                  <RegistrationAddressModal onClose={onRegistrationAddressModalClose} >
                    <RegistrationAddressForm onSubmit={onRegistrationAddressFormSubmit} initialValues={registrationAddressData} />
                  </RegistrationAddressModal>
                )}
              </>
            )}
          </Col>
          <Col span={8}>
            <FormItem name={contactNumberFieldName}>
              <PhoneMask disabled={isDisabled(contactNumberFieldName)}>
                {inputProps => (
                  <Input {...inputProps} placeholder='Контактный номер' disabled={isDisabled(contactNumberFieldName)} />
                )}
              </PhoneMask>
            </FormItem>
            <FormItem name={emailFieldName} rules={[{ pattern: EMAIL_REGEXP, message: ERROR_MESSAGE.PATTERN }]}>
              <Input type='email' placeholder='Email' disabled={isDisabled(emailFieldName)} />
            </FormItem>
            {/* <FormItem name={FORM_FIELDS.SELLER_COMMENT}> */}
            {/*  <Textarea rows={4} placeholder='Комментарий продавца' maxLength={255} /> */}
            {/* </FormItem> */}
          </Col>
        </Row>
        {isControlsVisible && (
          <Controls>
            <Button
              style={{ visibility: toPrevStep ? 'inherit' : 'hidden' }}
              onClick={toPrevStep}
              disabled={isApprovedStayingDocsLoading}
            >
              Назад
            </Button>
            <Button type='primary' htmlType='button' onClick={onNextFormStep} loading={isApprovedStayingDocsLoading}>
              Далее
            </Button>
          </Controls>
        )}
        {fromModal && (
          <SaveButtonContainer>
            <Button type='primary' htmlType='button' onClick={onSaveClick}>
              {saveClickButtonText || 'Сохранить'}
            </Button>
          </SaveButtonContainer>
        )}
      </FormStyled>
    </Wrapper>
  )
}

DocumentDataForm.propTypes = {
  isPrefill: PropTypes.bool,
  form: PropTypes.object,
  isHidden: PropTypes.bool,
  onNextFormStep: PropTypes.func,
  searchAddresses: PropTypes.func,
  setRegistrationAddressManually: PropTypes.func,
  setRegistrationAddressData: PropTypes.func,
  foundAddresses: PropTypes.array,
  searchCodeUFMS: PropTypes.func,
  registrationAddressData: PropTypes.object,
  clearCodeUFMS: PropTypes.func,
  codeUFMS: PropTypes.object,
  getDocIdentityTypes: PropTypes.func,
  docIdentityTypes: PropTypes.object,
  getDocIdentityFields: PropTypes.func,
  docIdentityFields: PropTypes.array,
  getDocIdentityCountries: PropTypes.func,
  getDocsIdentityFieldsClear: PropTypes.func,
  docIdentityCountries: PropTypes.object,
  isDocTypesLoading: PropTypes.bool,
  toPrevStep: PropTypes.func,
  isApprovedStayingDocsLoading: PropTypes.bool,
  isDocIdentityCountriesLoading: PropTypes.bool,
  isSearchAddressLoading: PropTypes.bool,
  isManualAddressSearch: PropTypes.bool,
  fromModal: PropTypes.bool,
  onSaveClick: PropTypes.func,
  isValidPeriod: PropTypes.bool | PropTypes.null,
  getValidityPeriod: PropTypes.func,
  isValidPeriodLoading: PropTypes.bool,
  saveClickButtonText: PropTypes.string
}

const Wrapper = styled.div`
  display: ${props => (props?.isHidden ? 'none' : 'block')};
`

const FormStyled = styled.div`
  & .ant-form-item-explain {
    padding: 4px 4px 0;
    font-size: 12px;
    font-family: T2_Rooftop_Regular, sans-serif;
  }
`

const Card = styled.div`
  margin: 0 0 12px;
  padding: 6px 8px;
  font-family: T2_Rooftop_Regular, sans-serif;
  font-size: 12px;
  color: #47484d;
  cursor: pointer;
  background-color: #e9e8ee;
  border-radius: 12px;

  &:hover {
    background-color: #d9f5ff;
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Caption = styled(Col)`
  margin: 0 0 10px;
  color: #aeafb1;
`

const Block = styled(Row)`
  margin: 0 0 10px;
`

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`

const FormItem = styled(Form.Item)`
  margin-bottom: 10px;
  text-align: left;
  position: relative;

  ${({ isRequired }) => {
    return isRequired
      ? `&::before {
        content: '*';
        position: absolute;
        top: 0px;
        left: 6px;
        z-index: 1002;                                                                                                                                                                                                                                                                                      
        font-size: 18px;
        color: red;
      }` : ''
  }} 
`

const RequiredLabel = styled.span`
  margin-right: 4px;  
  color: red;
`
const ManualSearchButton = styled(Button)`
  width: 100%;
  font-size: 16px;
  line-height: 22px;
  color: #24272D;

  & span {
    text-decoration: underline;
  }
`
