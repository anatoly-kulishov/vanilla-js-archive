import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Select, DatePicker as ADatePicker, Checkbox, Tooltip, Button } from 'antd'
import { ExpandAltOutlined } from '@ant-design/icons'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { sexes } from '../constants/sexex'
import { OrderStatuses } from 'constants/orderStatuses'

import CommentHistoryModal from 'components/Broadband/modals/CommentHistoryModal/CommentHistoryModal'
import MsisdnInput from 'crmHostApp/components/MsisdnInput'

const { Item } = Form

const formItemRequired = [{ required: true }]

const relocationDisabledStatuses = [
  OrderStatuses.TransferredToRtc,
  OrderStatuses.ErrorWithRTC,
  OrderStatuses.InWork,
  OrderStatuses.InstallerAppointed,
  OrderStatuses.InstallationDone,
  OrderStatuses.CancelledByRtc,
  OrderStatuses.Cancelled
]
const normalizeComment = value => {
  const moreThanTwoSpacesRegExp = /\s{2,}/
  const moreThanTwoSpaces = moreThanTwoSpacesRegExp.test(value)
  if (moreThanTwoSpaces) {
    return value.replace(moreThanTwoSpacesRegExp, ' ')
  }

  return value
}

export const MainInformationForm = props => {
  const { form, divider, areControlsDisabled, isReducedForm, isCreating } = props

  const {
    order,
    orderState,
    regions,
    formInitData,
    changeMainFormState,
    checkMsisdn,
    reserveMsisdn,
    orderStatusState
  } = useBroadbandContext()

  const [isCommentHistoryModalOpen, setIsCommentHistoryModalOpen] = useState(false)

  const { userRights } = formInitData ?? {}
  const { isRelocationCheckbox } = userRights

  useEffect(() => {
    const credentials = form.getFieldsValue(['NickName', 'LastName', 'FirstName', 'MiddleName'])
    const { NickName, LastName, FirstName, MiddleName } = credentials
    const instance = form.getFieldInstance('NickName')
    const joinName = [LastName, FirstName, MiddleName].join(' ')
    const str = NickName?.toLowerCase().trim()
    const isNickNameFieldFocused = document.activeElement === instance?.input
    if (
      ((!NickName && (LastName || FirstName || MiddleName)) || (str && joinName.toLowerCase().includes(str))) &&
      !isNickNameFieldFocused
    ) {
      form.setFieldsValue({ NickName: joinName })
      changeMainFormState({ NickName: joinName })
    }
  }, [
    form.getFieldValue('LastName'),
    form.getFieldValue('FirstName'),
    form.getFieldValue('MiddleName'),
    form.getFieldValue('NickName')
  ])

  const regionOptions = useMemo(() => {
    return regions?.map(region => ({
      key: region.RegionIsoCode,
      value: region.RegionIsoCode,
      label: region.RegionName
    }))
  }, [regions])

  const handleNicknameTransfer = useCallback(() => {
    const nickname = form.getFieldValue('NickName')
    if (nickname) {
      const [lastName, firstName, ...rest] = nickname.split(' ')
      const formParams = {
        FirstName: firstName,
        MiddleName: rest.join(' '),
        LastName: lastName
      }
      form.setFieldsValue(formParams)
      changeMainFormState(formParams)
    }
  })

  const orderData = order.data
  const isTransferError = useMemo(() => {
    return orderData?.IsTransferOrderToRtcError
  }, [orderData])

  const isButtonsRightsPresent =
    formInitData?.userRights.isReserveMsisdn && formInitData?.userRights.isReadReserveMsisdn

  const getNumberButtonVisible = useMemo(() => {
    return orderState.IsNewSubscriber && !orderState.ReservedMsisdn && isButtonsRightsPresent
  }, [orderState, isButtonsRightsPresent])

  const isReservedNumberVisible = useMemo(() => {
    return orderState.IsNewSubscriber && !!orderState.ReservedMsisdn
  }, [orderState])

  const checkMnpNumberButtonVisible = useMemo(() => {
    return orderState.IsMnp && !orderData?.MnpMsisdn && isButtonsRightsPresent
  }, [orderState, orderData, isButtonsRightsPresent])

  const isMnpNumberVisible = useMemo(() => {
    return !!orderData?.MnpMsisdn
  }, [orderData])

  const handleGetNumber = useCallback(() => {
    const params = {
      regionCode: orderState.OrderRegionCode,
      orderId: orderState.OrderId,
      systemId: 1
    }
    reserveMsisdn(params)
  }, [orderState])

  const handleCheckNumber = useCallback(() => {
    const { billingBranchId, billingBranchIdReserve } = formInitData
    const params = {
      Msisdn: orderState.MnpMsisdn,
      RegionIsoCode: orderState.OrderRegionCode,
      BranchId: billingBranchId ?? billingBranchIdReserve
    }
    checkMsisdn(params)
  }, [orderState, formInitData])

  const handleCommentHistoryClick = () => {
    setIsCommentHistoryModalOpen(true)
  }

  const handleCloseCommentHistoryModal = () => {
    setIsCommentHistoryModalOpen(false)
  }

  const disableButtonsMargin = getNumberButtonVisible && !isMnpNumberVisible && !checkMnpNumberButtonVisible

  const isRelocationDisabled = useMemo(() => {
    return relocationDisabledStatuses.includes(orderStatusState.statusId)
  }, [orderStatusState])

  return (
    <>
      {divider && <Divider />}
      {isRelocationCheckbox && (
        <CheckboxContainer>
          <Item name='Relocation' valuePropName='checked'>
            <Checkbox disabled={isRelocationDisabled}>ПЕРЕЕЗД</Checkbox>
          </Item>
        </CheckboxContainer>
      )}
      <FormGrid isReducedForm={isReducedForm}>
        <Item name='OrderRegionCode' label='Регион заявки'>
          <Select
            data-tid='select__broadband-form__main-region'
            allowClear
            showSearch
            options={regionOptions}
            disabled={areControlsDisabled}
            optionFilterProp='label'
          />
        </Item>
        <Item data-tid='input__broadband-form__main-msisdn' name='Msisdn' label='MSISDN для подключения ШПД'>
          <MsisdnInput noAutoFocus disabled={areControlsDisabled} />
        </Item>
        {!isReducedForm && (
          <>
            <Item name='NickName' label='Как обращаться' rules={formItemRequired}>
              <Input
                data-tid='input__broadband-form__main-nickname'
                addonAfter={
                  <Tooltip title='Попытаться преобразовать в ФИО' disabled={areControlsDisabled}>
                    <ExpandAltOutlined onClick={handleNicknameTransfer} />
                  </Tooltip>
                }
                allowClear
                disabled={areControlsDisabled}
              />
            </Item>
            <Item name='LastName' label='Фамилия'>
              <Input data-tid='input__broadband-form__main-firstname' allowClear disabled={areControlsDisabled} />
            </Item>
            <Item name='FirstName' label='Имя'>
              <Input data-tid='input__broadband-form__main-middlename' allowClear disabled={areControlsDisabled} />
            </Item>
            <Item name='MiddleName' label='Отчество'>
              <Input data-tid='input__broadband-form__main-lastname' allowClear disabled={areControlsDisabled} />
            </Item>
          </>
        )}
        <Item name='Sex' label='Пол'>
          <Select data-tid='select__broadband-form__main-sex' options={sexes} disabled={areControlsDisabled} />
        </Item>
        {!isReducedForm && (
          <Item name='Birthday' label='Дата Рождения'>
            <DatePicker
              data-tid='datepicker__broadband-form__main-birthday'
              format='DD.MM.YYYY'
              disabled={areControlsDisabled}
            />
          </Item>
        )}
        <Item name='BirthPlace' label='Место рождения'>
          <Input data-tid='input__broadband-form__main-birthplace' allowClear disabled={areControlsDisabled} />
        </Item>
        <CheckboxWrapper isReducedForm={isReducedForm}>
          <ColumnWrapper>
            <Item name='IsNewSubscriber' valuePropName='checked'>
              <Checkbox data-tid='checkbox__broadband-form__main-sim' disabled={areControlsDisabled}>
                Требуется SIM
              </Checkbox>
            </Item>
            {getNumberButtonVisible ? (
              <NumberButton
                disableMargin={disableButtonsMargin}
                onClick={handleGetNumber}
                type='primary'
                disabled={areControlsDisabled}
              >
                Временный номер
              </NumberButton>
            ) : (
              isReservedNumberVisible && (
                <Item name='ReservedMsisdn' label='Новый номер'>
                  <StyledInput disabled data-tid='input__broadband-form__new-number' />
                </Item>
              )
            )}
          </ColumnWrapper>
          <ColumnWrapper>
            <Item name='IsMnp' valuePropName='checked'>
              <Checkbox data-tid='checkbox__broadband-form__main-mnp' disabled={areControlsDisabled}>
                Переход абонента по MNP
              </Checkbox>
            </Item>
            {checkMnpNumberButtonVisible ? (
              <CheckNumberContainer>
                <Item name='MnpMsisdn' label='Номер для переноса'>
                  <MsisdnInput disabled={areControlsDisabled} />
                </Item>
                <NumberButton disableMargin={disableButtonsMargin} onClick={handleCheckNumber} type='primary'>
                  Проверить номер
                </NumberButton>
              </CheckNumberContainer>
            ) : (
              isMnpNumberVisible && (
                <Item name='MnpMsisdn' label='Номер для переноса'>
                  <StyledInput disabled data-tid='input__broadband-form__mnp-number' />
                </Item>
              )
            )}
          </ColumnWrapper>
          <ColumnWrapper>
            <Item name='IsCitizen' valuePropName='checked'>
              <Checkbox data-tid='checkbox__broadband-form__main-citizen' disabled={areControlsDisabled}>
                Гражданин РФ
              </Checkbox>
            </Item>
          </ColumnWrapper>
          <ColumnWrapper>
            <Item>
              <StyledCheckbox
                checked={isTransferError}
                className={isTransferError ? 'transfer-error-checkbox-on' : 'transfer-error-checkbox-off'}
                disabled
              >
                Ошибка при передаче заявки в РТК
              </StyledCheckbox>
            </Item>
          </ColumnWrapper>
        </CheckboxWrapper>
        <CommentWrapper isReducedForm={isReducedForm}>
          <FullWidthItem name='Comment' label='Комментарий' normalize={normalizeComment}>
            <Input data-tid='input__broadband-form__main-comment' allowClear disabled={areControlsDisabled} />
          </FullWidthItem>
          {!isCreating && (
            <CommentHistoryButton onClick={handleCommentHistoryClick}>История комментариев</CommentHistoryButton>
          )}
        </CommentWrapper>
      </FormGrid>
      <CommentHistoryModal open={isCommentHistoryModalOpen} onCancel={handleCloseCommentHistoryModal} />
    </>
  )
}

MainInformationForm.propTypes = {
  form: object
}

const Divider = styled.div`
  margin: 12px 0;
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
  border-top: 10px solid rgba(0, 0, 0, 0.06);
`

const FormGrid = styled.div`
  display: grid;
  padding: 0 24px;
  grid-template-columns: repeat(${props => (props.isReducedForm ? 2 : 3)}, 1fr);
  grid-column-gap: 10px;
`

const CheckboxWrapper = styled.div`
  grid-row: 4 / 5;
  grid-column: ${props => (props.isReducedForm ? '1 / 3' : '1 / 4')};
  display: flex;
  column-gap: 10px;
  margin-bottom: 8px;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 300px;
  flex-grow: 1;

  .ant-row.ant-form-item {
    margin: 0;
  }
`

const DatePicker = styled(ADatePicker)`
  width: 100%;
`

const StyledCheckbox = styled(Checkbox)`
  &.transfer-error-checkbox-on span {
    color: #000;
  }
`

const StyledInput = styled(Input)`
  &[disabled] {
    color: rgba(0, 0, 0, 0.85);
    background-color: #fff;
  }
`

const NumberButton = styled(Button)`
  margin-top: ${props => (props.disableMargin ? '8px' : '32px')};
  max-width: 150px;
`

const CheckNumberContainer = styled.div`
  display: flex;
  column-gap: 10px;
`

const CheckboxContainer = styled.div`
  padding: 10px 24px;
`

const CommentHistoryButton = styled(Button)`
  margin-bottom: 8px;
  margin-left: 10px;
`

const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  grid-row: 5 / 6;
  grid-column: ${props => (props.isReducedForm ? '1 / 3' : '1 / 4')};
`

const FullWidthItem = styled(Item)`
  width: 100%;
`
