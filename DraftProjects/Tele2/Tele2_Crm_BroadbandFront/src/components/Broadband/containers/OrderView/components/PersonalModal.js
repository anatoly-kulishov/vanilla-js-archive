import React, { useCallback, useMemo } from 'react'
import { debounce } from 'lodash-es'
import styled from 'styled-components'
import { Modal, Select, Form, Input, DatePicker as ADatePicker, Button } from 'antd'

import { AddressTypes } from 'constants/address'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { getStreetLabel, clearAddressFieldsOnChange, getSearchFunction } from 'components/Broadband/helpers/address'
import { usePersonalForm } from '../hooks/usePersonalForm'

export const PersonalModal = props => {
  const {
    isModalVisible,
    isModifyAvailable,
    changeVisibility
  } = props

  const { addressSuggestion, documentData, documentTypes, getAddressSuggestion, changePersonalForm, recheckAddress } = useBroadbandContext()

  const form = usePersonalForm()

  const handleClose = useCallback(() => {
    changeVisibility(false)
  }, [changeVisibility])

  const searchFunction = useCallback(getSearchFunction(form, getAddressSuggestion, AddressTypes.Registration), [form, getAddressSuggestion])
  const handleSearch = useCallback(
    debounce((searchText, searchType) => {
      searchFunction(addressSuggestion, searchText, searchType)
    }, 500), [addressSuggestion, searchFunction])

  const handleChange = useCallback((changedFields) => {
    clearAddressFieldsOnChange(form, changedFields, AddressTypes.Registration)
    changePersonalForm(changedFields)
  }, [addressSuggestion])

  const originalAddressData = documentData?.RegistrationAddress?.FullAddress || documentData?.RegistrationAddress?.NoStructedFullAddress
  const handleAddressRecheck = useCallback(() => {
    const params = { query: originalAddressData, count: 1 }
    recheckAddress({ params, addressType: AddressTypes.Registration })
  }, [originalAddressData, recheckAddress])

  const modalFooter = useMemo(() => <Button type='primary' onClick={handleClose}>Ок</Button>, [handleClose])
  const isFormDisabled = !isModifyAvailable
  const fullDocument = useMemo(() => documentData?.FullDocument ?? null, [documentData])
  const invoiceAddress = useMemo(
    () =>
      (documentData?.RegistrationAddress?.FullAddress || documentData?.RegistrationAddress?.NoStructedFullAddress) ??
      null,
    [documentData]
  )

  return (
    <Modal
      visible={isModalVisible}
      zIndex='1002'
      width='70%'
      onCancel={handleClose}
      style={{ marginLeft: '50px' }}
      footer={modalFooter}
    >
      <StyledForm form={form} name='PersonalDataForm' layout='vertical' onValuesChange={handleChange}>
        <FormGrid>
          <AdditionalInfo className='grid-column-span-3'>
            <SubHeader>Документ</SubHeader>
            {fullDocument && <span>{fullDocument}</span>}
          </AdditionalInfo>
          <Form.Item className='grid-column-1' name='DocumentTypeId' label='Тип документа'>
            <Select
              data-tid='select__broadband-form__personal-type'
              options={documentTypes}
              disabled={isFormDisabled}
              allowClear
            />
          </Form.Item>
          <Form.Item className='grid-column-1' name='Series' label='Серия документа'>
            <Input data-tid='input__broadband-form__personal-series' allowClear disabled={isFormDisabled} />
          </Form.Item>
          <Form.Item name='Number' label='Номер документа'>
            <Input data-tid='input__broadband-form__personal-number' allowClear disabled={isFormDisabled} />
          </Form.Item>
          <Form.Item name='IssueDate' label='Дата выдачи'>
            <DatePicker
              data-tid='datepicker__broadband-form__personal-issue-date'
              format='DD.MM.YYYY'
              disabled={isFormDisabled}
            />
          </Form.Item>
          <Form.Item name='IssueBy' label='Кем выдан'>
            <Input data-tid='input__broadband-form__personal-issue-by' allowClear disabled={isFormDisabled} />
          </Form.Item>
          <Form.Item name='UnitCode' label='Код подразделения'>
            <Input data-tid='input__broadband-form__personal-unit-code' allowClear disabled={isFormDisabled} />
          </Form.Item>
          <Form.Item name='EndDate' label='Дата окончания'>
            <DatePicker
              data-tid='datepicker__broadband-form__personal-end-date'
              format='DD.MM.YYYY'
              disabled={isFormDisabled}
            />
          </Form.Item>
          <AdditionalInfo>
            <SubHeader>Адрес регистрации</SubHeader>
            {invoiceAddress && <span>{invoiceAddress}</span>}
          </AdditionalInfo>
          <RecheckButton
            className='grid-column-3'
            size='small'
            disabled={!originalAddressData}
            onClick={handleAddressRecheck}
          >
            Перепроверить адрес
          </RecheckButton>
          <Form.Item name='PostIndex' label='Индекс'>
            <Input data-tid='input__broadband-form__personal-post-index' allowClear disabled={isFormDisabled} />
          </Form.Item>
          <Form.Item name={[AddressTypes.Registration, 'Region']} label='Регион'>
            <Select
              data-tid='select__broadband-form__personal-region'
              allowClear
              showSearch
              disabled={isFormDisabled}
              onSearch={searchText => handleSearch(searchText, 'Region')}
              notFoundContent={null}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              labelInValue
            >
              {addressSuggestion?.registrationAddress?.Region?.map(item => (
                <Select.Option key={item.Key} value={item.Value}>
                  {item.Value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={[AddressTypes.Registration, 'City']} label='Город / Населенный пункт'>
            <Select
              data-tid='select__broadband-form__personal-city'
              allowClear
              showSearch
              disabled={isFormDisabled}
              onSearch={searchText => handleSearch(searchText, 'City')}
              notFoundContent={null}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              labelInValue
            >
              {addressSuggestion?.registrationAddress?.City?.map(item => (
                <Select.Option key={item.Key} value={item.Value}>
                  {item.Value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={[AddressTypes.Registration, 'Street']} label='Улица'>
            <Select
              data-tid='select__broadband-form__personal-street'
              allowClear
              showSearch
              disabled={isFormDisabled}
              onSearch={searchText => handleSearch(searchText, 'Street')}
              notFoundContent={null}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              labelInValue
            >
              {addressSuggestion?.registrationAddress?.Street?.map(item => (
                <Select.Option key={item.Key} value={item.Key}>
                  {getStreetLabel(
                    item.Value,
                    item?.SearchAccuracy?.LocalityWithType,
                    item?.SearchAccuracy?.DistrictWithType
                  )}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={[AddressTypes.Registration, 'House']} label='Дом'>
            <Select
              data-tid='select__broadband-form__personal-house'
              allowClear
              showSearch
              disabled={isFormDisabled}
              onSearch={searchText => handleSearch(searchText, 'House')}
              notFoundContent={null}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              labelInValue
            >
              {addressSuggestion?.registrationAddress?.House?.map(item => (
                <Select.Option key={item.Key} value={item.Value}>
                  {item.Value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={[AddressTypes.Registration, 'FlatName']} label='Квартира'>
            <Input data-tid='input__broadband-form__personal-flat' allowClear disabled={isFormDisabled} />
          </Form.Item>
        </FormGrid>
      </StyledForm>
    </Modal>
  )
}

const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding: 0;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
`

const FormGrid = styled.div`
  display: grid;
  padding: 0 24px;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;

  & .grid-column-span-3 {
    grid-column: 1 / span 3;
  }

  & .grid-column-3 {
    grid-column: 3;
  }

  & .grid-column-1 {
    grid-column: 1;
  }
`

const DatePicker = styled(ADatePicker)`
  width: 100%;
`

const AdditionalInfo = styled.div`
  display: flex;
  align-items: baseline;
`

const RecheckButton = styled(Button)`
  align-self: center;
`

const SubHeader = styled.h4`
  padding: 12px 24px 12px 0;
  font-size: 15px;
  font-weight: bold;
`
