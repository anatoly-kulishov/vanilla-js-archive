/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input, Select, Row, Col, Popover, Tooltip } from 'antd'
import { CompassOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'

import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import TicketsReasonsTree from 'components/TicketsReasonsTree/TicketsReasonsTree'
import CoordinatesMask from 'components/CoordinatesMask/CoordinatesMask'
import Dropzone from 'components/Dropzone'
import CoordinatesTable from './CoordinatesTable'
import { get, isNil } from 'lodash'
import {
  CreateTicketModalCategoriesProps,
  CreateTicketModalReasonsProps,
  CreateTicketModalSelectedReasonProps,
  CreateTicketModalSelectedCategoryProps,
  CreateTicketModalTicketsStateProps,
  CoordinatesProps
} from 'constants/tickets'

import { formatCoordinates } from 'utils/helpers'

const FormItem = Form.Item
const TextArea = Input.TextArea
const style = { minHeight: '21px' }

const findReasonById = (reasons, reasonId) => reasons?.find(reason => reason.ReasonId === reasonId)

const propTypes = {
  handleSubmit: PropTypes.func,
  Person: PropTypes.string,
  isFieldChangeHandle: PropTypes.func.isRequired,
  MSISDN: PropTypes.string.isRequired,
  abonent: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  reasonsChange: PropTypes.func.isRequired,
  selectReason: PropTypes.func,
  selectCategory: PropTypes.func,
  selectedReason: CreateTicketModalSelectedReasonProps,
  selectedCategory: CreateTicketModalSelectedCategoryProps,
  personalAccount: PropTypes.object,
  ticketsState: CreateTicketModalTicketsStateProps.isRequired,
  fetchReasonsCategories: PropTypes.func.isRequired,
  reasons: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalReasonsProps)).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalCategoriesProps)).isRequired,
  isReasonsCategoriesLoading: PropTypes.bool.isRequired,
  isReasonsCategoriesError: PropTypes.bool.isRequired,
  filterReasons: PropTypes.func.isRequired,
  ticketAddParams: PropTypes.func,
  reasonSearchName: PropTypes.string,
  form: PropTypes.object,
  sendFile: PropTypes.func,
  fileData: PropTypes.array,
  clearAddParams: PropTypes.func,
  coordinates: PropTypes.arrayOf(CoordinatesProps),
  setDefaultValidateConstant: PropTypes.func,
  validateBySmartGis: PropTypes.func,
  setGeopositionEnteredManually: PropTypes.func,
  isGeopositionEnteredManually: PropTypes.bool,
  setValidCoordinate: PropTypes.func,
  isReadyForUseCoordinates: PropTypes.bool,
  clearCheckCoverages: PropTypes.func.isRequired,
  checkCoverages: PropTypes.func.isRequired,
  isWebSeller: PropTypes.bool
}

const LeftBlockContent = props => {
  const {
    handleSubmit,
    Person,
    personalAccount,
    isFieldChangeHandle,
    MSISDN,
    abonent,
    contactNumber,
    ticketsState,
    reasonsChange,
    selectReason,
    selectCategory,
    fetchReasonsCategories,
    reasons,
    categories,
    isReasonsCategoriesLoading,
    isReasonsCategoriesError,
    selectedCategory,
    selectedReason,
    filterReasons,
    reasonSearchName,
    form,
    sendFile,
    fileData,
    clearAddParams,
    coordinates,
    validateBySmartGis,
    isGeopositionEnteredManually,
    setValidCoordinate,
    isReadyForUseCoordinates,
    clearCheckCoverages,
    checkCoverages,
    checkMTPByServiceId,
    clearCheckMTPByServiceId,
    isWebSeller
  } = props

  const { getFieldDecorator, setFieldsValue, getFieldValue, validateFields } = form

  const { validateAddress, isValidateLoading, contactLines } = ticketsState

  const isRequiredLocation = isWebSeller ? false : get(ticketsState, 'addParamsList.isRequiredLocation', false)
  const isRequiredCoverageRestrictions = isWebSeller ? false : get(ticketsState, 'addParamsList.isRequiredCoverageRestrictions', false)
  const responseWithInValue = get(ticketsState, 'addParamsList.responseWithInValue', null)
  const responseWithInName = get(ticketsState, 'addParamsList.responseWithInName', null)
  const isTechnologyTicket = get(ticketsState, 'addParamsList.technologyTicket', null)

  const [valueCoordinate, setValueCoordinate] = useState('')

  useEffect(() => {
    if (!selectedCategory) return

    let bpmServiceId = selectedCategory?.BpmServiceId

    if (!bpmServiceId && !('BpmServiceId' in selectedCategory)) {
      let ticketsReason

      if (selectedReason?.ParentId) {
        const parentReason = findReasonById(reasons, selectedReason?.ParentId)
        ticketsReason = findReasonById(parentReason?.Children, selectedReason?.ReasonId)
      } else {
        ticketsReason = findReasonById(reasons, selectedReason?.ReasonId)
      }

      if (ticketsReason) {
        const ticketsCategory = ticketsReason?.Categories?.find(
          category => category.CategoryId === selectedCategory?.CategoryId
        )

        if (ticketsCategory?.BpmServiceId) {
          bpmServiceId = ticketsCategory.BpmServiceId
        }
      }
    }

    if (bpmServiceId) {
      checkMTPByServiceId({ bpmServiceId })
    }
  }, [selectedCategory, selectedReason])

  useEffect(() => {
    if (coordinates && coordinates.length === 1 && !isGeopositionEnteredManually) {
      setGeoposition(0)
    }
  }, [coordinates])

  useEffect(() => {
    if (!ticketsState.isValidateLoading) {
      validateFields(['coordinates', 'Address'], { force: true })
    }
  }, [ticketsState.isValidateLoading, isReadyForUseCoordinates])

  useEffect(() => {
    if (isRequiredCoverageRestrictions) {
      const lat = coordinates?.[0]?.Latitude
      const lng = coordinates?.[0]?.Longitude
      checkCoverages({ Lat: lat, Lng: lng })
    }
  }, [isRequiredCoverageRestrictions, selectedCategory, coordinates])

  let contactLinesArray = contactLines
  if (contactLinesArray !== null && contactLinesArray.length) {
    contactLinesArray = contactLinesArray.map(clines => (
      <Select.Option key={clines.t2_bpmonlineid} label={clines.t2_name}>
        {clines.t2_name}
      </Select.Option>
    ))
  }

  let emailString = get(personalAccount, 'Email', null)
  // Если email абонента не найден в биллинге, то с бэков должен приходить null, а не ' '
  if (emailString === ' ') {
    emailString = null
  }

  const onSelectCategory = (reason, category) => {
    // TODO: оставил как есть, обратить внимание во время рефактора дерева
    const { selectReason, selectCategory, ticketAddParams, personalAccount } = props
    selectReason({ reason })
    selectCategory({ category })
    clearCheckCoverages()
    clearCheckMTPByServiceId()
    const clientCategory = get(personalAccount, 'ClientCategory', null)
    ticketAddParams({ reasonId: reason.ReasonId, categoryId: category.CategoryId, clientCategory: clientCategory })
  }

  const onReasonClear = props => {
    // TODO: оставил как есть, обратить внимание во время рефактора дерева
    fetchReasonsCategories()
    clearAddParams()

    const filterArray = arr =>
      arr &&
      arr.map(reason => {
        return {
          ...reason,
          Categories: reason.Categories.map(category => ({
            ...category,
            tooltipSelectValue: null,
            tooltipCommentValue: null,
            active: null
          }))
        }
      })

    const clearReasons = filterArray(reasons)

    reasonsChange({ reasons: clearReasons })
    selectReason({ reason: null })
    selectCategory({ category: null })
    clearCheckCoverages()
    clearCheckMTPByServiceId()
  }

  const validateFeedbackChannel = (_rule, _value, callback) => {
    const verifyChannel = getFieldValue('feedbackChannel')
    const verifyEmail = getFieldValue('email')
    if (verifyChannel === '01623af8-c166-43d3-88fe-5620c084bb75' && !verifyEmail) {
      callback('Контактный email является обязательным параметром для способа ОС - E-mail.')
    } else {
      callback()
    }
  }

  const validateEmail = (_rule, _value, callback) => {
    validateFields(['email'], { force: true })
    callback()
  }

  const validateCoord = (_rule, value, callback) => {
    const { isCanUseCoordinate } = ticketsState
    const isAddressEntered = !!getFieldValue('Address')
    const defaultMask = '_ ___.______________, _ ___.______________'
    const isCoordinateEntered = !isNil(value) && value !== defaultMask && value !== ''
    if (!isCanUseCoordinate && isCoordinateEntered) {
      callback('Введите корректные координаты')
    } else if (!isReadyForUseCoordinates && (isAddressEntered || isCoordinateEntered)) {
      if (isCoordinateEntered) {
        callback('Проверьте введенные координаты')
      } else if (!isRequiredLocation) {
        callback('Введите координаты, либо очистите адрес')
      }
    }
    callback()
  }

  const validatorAddress = (_rule, value, callback) => {
    const coord = getFieldValue('coordinates')
    const defaultMask = '_ ___.______________, _ ___.______________'
    const isCoordinateEntered = !isNil(coord) && coord !== defaultMask && coord !== ''
    if (!isReadyForUseCoordinates && value && isCoordinateEntered) {
      callback('Проверьте введенный адрес')
    }
    callback()
  }

  const handleDelete = () => {
    isFieldChangeHandle([], 'fileData')
  }

  const DefaultOverlay = () => <OverlayWrapper>Нажмите сюда для добавления файла или перетащите его</OverlayWrapper>

  const ActiveOverlay = () => <OverlayWrapper>Оставьте свой файл здесь</OverlayWrapper>

  const setGeoposition = index => {
    const {
      coordinates,
      form: { setFieldsValue }
    } = props
    const choosedAddress = coordinates[index].Address
    const choosedCoordinates = formatCoordinates(
      coordinates[index].Latitude.toString() + ' ' + coordinates[index].Longitude.toString()
    )

    setFieldsValue({
      Address: choosedAddress,
      coordinates: choosedCoordinates
    })
    setValueCoordinate(choosedCoordinates)
    setValidCoordinate()
  }

  const onFieldChange = (cleanCondition, field, value) => {
    const { setDefaultValidateConstant, setGeopositionEnteredManually } = props

    // одновременное очищение полей координат и адреса
    if (cleanCondition) {
      setFieldsValue({ Address: '', coordinates: '' })
      setGeopositionEnteredManually(false)
    } else {
      setFieldsValue({ [field]: value })
      setGeopositionEnteredManually(true)
    }
    setDefaultValidateConstant()
  }

  const onChangeAddress = event => {
    const value = event.target.value

    const addressCleanCondition = value.length === 0

    onFieldChange(addressCleanCondition, 'Address', value)
    form.validateFields(['coordinates'])
  }

  const onChangeCoordinates = value => {
    // нужно из-за одновременного очищения полей адреса и координат
    const isNotEmptyPrevValue = /[0-9-]/.test(valueCoordinate)
    const isNotEmptyCurrentValue = /[0-9-]/.test(value)

    if (isNotEmptyCurrentValue || isNotEmptyPrevValue) {
      setValueCoordinate(value)

      onFieldChange(!isNotEmptyCurrentValue, 'coordinates', value)
    }
  }

  const onPasteCoordinates = result => {
    const { validateBySmartGis } = props
    onChangeCoordinates(result)
    validateBySmartGis()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <MainTable>
        <Row>
          <ReasonCategoryStyleCol>
            <ContainerHolder>
              <TicketsReasonsTree
                areEditRights
                reasonSearchName={reasonSearchName}
                selectedReason={selectedReason}
                selectedCategory={selectedCategory}
                selectReasonCategory={onSelectCategory}
                toggleTree={false}
                isArrowDisabled
                isFieldChangeHandle={isFieldChangeHandle}
                filterReasons={filterReasons}
                reasons={reasons}
                categories={categories}
                isReasonsCategoriesLoading={isReasonsCategoriesLoading}
                isReasonsCategoriesError={isReasonsCategoriesError}
                isTree
                scrollHeight
                onReasonClear={onReasonClear}
                searchFieldValue
              />
            </ContainerHolder>
          </ReasonCategoryStyleCol>
        </Row>

        <Fragment>
          {responseWithInValue && responseWithInName && (
            <Wrapper>
              Срок решения: {responseWithInValue} {responseWithInName}
            </Wrapper>
          )}
        </Fragment>

        <Row>
          <Col span={12}>
            <ContainerHolder>
              <FieldName>Абонент</FieldName>
              <PhoneControlHolder>
                <FormItem>
                  {getFieldDecorator('abonent', {
                    initialValue: abonent
                  })(<MsisdnMaskedInput disabled />)}
                </FormItem>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
          <Col span={12}>
            <ContainerHolder>
              <FieldName>MSISDN Абонента</FieldName>
              <PhoneControlHolder>
                <FormItem>
                  {getFieldDecorator('MSISDN', {
                    rules: [{ min: 11, message: 'Введите корректный номер' }],
                    initialValue: MSISDN
                  })(<MsisdnMaskedInput onClickRemove={() => setFieldsValue({ MSISDN: '' })} />)}
                </FormItem>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <ContainerHolder>
              <FieldName>Контактный номер</FieldName>
              <PhoneControlHolder>
                <FormItem>
                  {getFieldDecorator('contactNumber', {
                    rules: [{ min: 11, message: 'Введите корректный номер' }],
                    initialValue: contactNumber
                  })(<MsisdnMaskedInput onClickRemove={() => setFieldsValue({ contactNumber: '' })} />)}
                </FormItem>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
          <Col span={12}>
            <ContainerHolder>
              <FieldName>Контактное лицо</FieldName>
              <PhoneControlHolder>
                <FormItem>
                  {getFieldDecorator('Person', {
                    initialValue: Person
                  })(<Input allowClear />)}
                </FormItem>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <ContainerHolder>
              <FieldName>Контактный E-mail</FieldName>
              <PhoneControlHolder>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'Введите корректный e-mail'
                      },
                      { validator: validateFeedbackChannel }
                    ],
                    initialValue: emailString
                  })(<Input allowClear />)}
                </FormItem>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
          <Col span={12}>
            <ContainerHolder>
              <FieldName>Канал обратной связи</FieldName>
              <PhoneControlHolder>
                <FormItem>
                  {getFieldDecorator('feedbackChannel', {
                    rules: [
                      { validator: validateEmail },
                      {
                        required: !isTechnologyTicket,
                        message: 'Укажите канал обратной связи'
                      }
                    ]
                  })(<Select disabled={isTechnologyTicket}>{contactLinesArray}</Select>)}
                </FormItem>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
        </Row>

        <Row hidden={isWebSeller}>
          <Col span={12}>
            <ContainerHolder>
              <FieldName>Местоположение: населенный пункт/улица/№дома</FieldName>
            </ContainerHolder>
          </Col>
          <Col span={12}>
            <ContainerHolder>
              <FieldName>Местоположение (координаты)</FieldName>
            </ContainerHolder>
          </Col>
        </Row>

        <Row hidden={isWebSeller} justify='space-between'>
          <Col span={12}>
            <ContainerHolder>
              <PhoneControlHolder>
                <Popover
                  overlayClassName='address-popover'
                  placement='bottom'
                  trigger='click'
                  content={<CoordinatesTable coordinates={coordinates} setGeoposition={setGeoposition} />}
                >
                  <FormItem>
                    {getFieldDecorator('Address', {
                      rules: [
                        {
                          required: isRequiredLocation,
                          message: 'Это поле обязательно для заполнения'
                        },
                        { validator: validatorAddress }
                      ],
                      onChange: onChangeAddress
                    })(<Input id='Address' allowClear />)}
                  </FormItem>
                </Popover>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
          <Col span={11}>
            <ContainerHolder>
              <PhoneControlHolder>
                <Popover
                  placement='bottom'
                  trigger='click'
                  overlayClassName='coordinates-popover'
                  content={<CoordinatesTable coordinates={coordinates} setGeoposition={setGeoposition} />}
                >
                  <FormItem>
                    {getFieldDecorator('coordinates', {
                      rules: [
                        {
                          required: isRequiredLocation,
                          message: 'Это поле обязательно для заполнения'
                        },
                        { validator: validateCoord }
                      ],
                      onChange: value => onChangeCoordinates(value)
                    })(<CoordinatesMask onPaste={onPasteCoordinates} />)}
                  </FormItem>
                </Popover>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
          <Col span={1}>
            <Tooltip title='Проверить координаты' placement='top'>
              {isValidateLoading ? (
                <LoadingIcon onClick={validateBySmartGis} />
              ) : (
                <CompassIcon onClick={validateBySmartGis} />
              )}
            </Tooltip>
          </Col>
        </Row>
        <Row hidden={isWebSeller}>
          <Col>
            <ContainerHolder style={style}>Адрес: {validateAddress}</ContainerHolder>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ContainerHolder>
              <FieldName>Описание проблемы</FieldName>
              <PhoneControlHolder>
                <FormItem>
                  {getFieldDecorator('problemDescription', {
                    rules: [
                      {
                        required: true,
                        message: 'Заполните описание проблемы'
                      }
                    ]
                  })(<TextArea rows={3} maxLength={700} />)}
                </FormItem>
              </PhoneControlHolder>
            </ContainerHolder>
          </Col>
        </Row>

        <ContainerHolder>
          <Dropzone
            allowMultipleFiles={isWebSeller}
            handleDrop={sendFile}
            onDelete={handleDelete}
            label='Файл'
            defaultOverlay={DefaultOverlay}
            activeOverlay={ActiveOverlay}
            filesList={fileData}
          />
        </ContainerHolder>
      </MainTable>
    </Form>
  )
}

LeftBlockContent.propTypes = propTypes

export default LeftBlockContent

const FieldName = styled.div`
  color: black;
`
const ContainerHolder = styled.div`
  margin: 0 5px;
`
const PhoneControlHolder = styled.div`
  width: 100%;
`
const ReasonCategoryStyleCol = styled(Col)`
  margin-bottom: 20px;
  width: 100%;
`
const MainTable = styled.div`
  margin-bottom: 5px;
  padding: 15px 20px 20px 24px;
  position: relative;
  height: calc(93vh - 165px);
  overflow-y: scroll;
`
const Wrapper = styled.span`
  margin-left: 5px;
  font-weight: bold;
`
const OverlayWrapper = styled.div`
  font-size: 14px;
`

const LoadingIcon = styled(LoadingOutlined)`
  cursor: disabled;
  pointer-events: none;
  font-size: 24px;
  margin-top: 8px;
`

const CompassIcon = styled(CompassOutlined)`
  cursor: pointer;
  pointer-events: unset;
  font-size: 24px;
  margin-top: 8px;
`
