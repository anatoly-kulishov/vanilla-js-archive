/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, Fragment, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Row, Col, Input, Radio, Button, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { isNull } from 'lodash'
import RatingMenu from 'containers/RatingMenu'
import { defaultTemplateIdSendSms, defaultScriptInformingSendSms } from 'constants/changeSim'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { REPLACEMENT_SIM_CARD_MODAL } from 'constants/logModalNames'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
const { replacementSimFeatureId } = ratingFeatureIds

const style = { position: 'absolute', right: '60px', top: '7px' }

const ReplacementSimCardModal = props => {
  const [pointReference, setPointReference] = useState('')
  const [securityCode, setSecurityCode] = useState('')
  const [reasonIndex, setReasonIndex] = useState(null)
  const [ICC, setICC] = useState('')
  const [isSearchDisableBySmsChecking, setDisableSearchBySmsChecking] = useState(false)

  const {
    replacementSimCard,
    handleVisibleReplacementSimCardModal,
    validateSimProfile,
    personalAccount,
    sendSmsReplacementSim,
    handlingId,
    clearReplacementSimCardModal,
    getReasonsChangeSim
  } = props

  const {
    isVisibleReplacementSimCardModal,
    isSendSms,
    validateSimProfileLoading,
    reasonsChangeSim,
    reasonsChangeSimLoading,
    reasonsChangeSimError
  } = replacementSimCard

  const { Msisdn, BillingBranchId, SubscriberId } = personalAccount
  const radioStyle = {
    lineHeight: '25px',
    whiteSpace: 'normal'
  }

  const onChangeHandle = (value, nameParam) => {
    const newVal = value.replace(/\D/, '')
    switch (nameParam) {
      case 'pointReference':
        if (newVal.length <= pointReferenceLength) {
          setPointReference(newVal)
        }
        break
      case 'securityCode':
        if (newVal.length <= securityCodeLength) {
          setSecurityCode(newVal)
        }
        break
      case 'ICC':
        if (newVal.length < iccLength) {
          setICC(newVal)
        }
        break
    }
  }

  const sendSmsHandle = () => {
    sendSmsReplacementSim({
      Msisdn,
      BillingBranch: BillingBranchId,
      TemplateId: defaultTemplateIdSendSms,
      IgnoreAdvertisingAgreement: true,
      IgnorePeriodOfSilence: true,
      Text: `Код проверки: ${securityCode}`,
      ScriptInforming: defaultScriptInformingSendSms,
      CreateInteractionParams: {
        SubscriberId,
        HandlingId: handlingId
      }
    })
  }

  const searchHandle = () => {
    validateSimProfile({
      dataForm: {
        SalesPointId: pointReference,
        ReasonName: reasonsChangeSim[reasonIndex].ReasonName,
        OperationId: reasonsChangeSim[reasonIndex].OperationId
      },
      dataRequest: {
        msisdn: Msisdn,
        branchId: BillingBranchId,
        iccPart: ICC
      }
    })
  }

  const onCloseModal = () => {
    clearHandle()
    handleVisibleReplacementSimCardModal()
    logIfEnabled({ type: MODAL_CLOSE, log: REPLACEMENT_SIM_CARD_MODAL })
  }

  const clearHandle = () => {
    setPointReference('')
    setSecurityCode('')
    setReasonIndex(null)
    setICC('')
    clearReplacementSimCardModal()
    setDisableSearchBySmsChecking(false)
  }

  const handleRadioButton = (event) => {
    setReasonIndex(event.target.value)
    setDisableSearchBySmsChecking(!reasonsChangeSim[event.target.value].IsSmsCheck)
  }

  useEffect(() => {
    if (isVisibleReplacementSimCardModal) {
      getReasonsChangeSim({ isActive: true })
      logIfEnabled({ type: MODAL_OPEN, log: REPLACEMENT_SIM_CARD_MODAL })
    }
  }, [isVisibleReplacementSimCardModal])

  const pointReferenceLength = 7
  const iccLength = 6
  const securityCodeLength = 4

  const isEmptyPointReference = pointReference === ''

  const isSecurityCodeNecessaryLength = securityCode.length === securityCodeLength
  const isIccNecessaryLength = ICC.length === 5

  const isDisabledSendSms = isEmptyPointReference || isNull(reasonIndex) || !isSecurityCodeNecessaryLength || isSearchDisableBySmsChecking
  const isDisabledIcc = (!isSendSms && !isSearchDisableBySmsChecking) || isEmptyPointReference
  const isDisabledSearch = !isIccNecessaryLength || isEmptyPointReference || isDisabledIcc
  const isDisabledSecurityCode = isEmptyPointReference || isNull(reasonIndex) || isSearchDisableBySmsChecking
  const isError = reasonsChangeSimError || !reasonsChangeSim

  return (
    <StyledModal
      title={
        <Fragment>
          Замена SIM-карты абонента
          <div style={style}>
            <RatingMenu currentFeatureId={replacementSimFeatureId} />
          </div>
        </Fragment>
      }
      visible={isVisibleReplacementSimCardModal}
      onCancel={onCloseModal}
      width={700}
      footer={
        <FooterRow>
          <TitleIccCol span={6}>ICC: 897ХХХХХХХХХХХХ</TitleIccCol>
          <IccCol span={6}>
            <StyledInput
              disabled={isDisabledIcc}
              placeholder='XXXXX'
              value={ICC}
              onChange={event => onChangeHandle(event.target.value, 'ICC')}
            />
          </IccCol>
          <Col span={12}>
            <SearchButton type='primary' disabled={isDisabledSearch} onClick={searchHandle} loading={validateSimProfileLoading}>
              Найти
            </SearchButton>
            <ClearButton type='primary' onClick={clearHandle}>
              Очистить
            </ClearButton>
          </Col>
        </FooterRow>
      }
    >
      <Spin
        spinning={reasonsChangeSimLoading}
        indicator={<LoadingIcon spin />}
      >
        {(() => {
          if (isError) {
            return (<Fragment>Ошибка загрузки причин</Fragment>)
          } else {
            return (
              <Fragment>
                <Row>
                  <TitleCol span={6}>Точка обращения:</TitleCol>
                  <Col span={10}>
                    <StyledInput
                      placeholder='XXXXXXX'
                      value={pointReference}
                      onChange={event => onChangeHandle(event.target.value, 'pointReference')}
                    />
                  </Col>
                </Row>
                <StyledRow>
                  <TitleCol span={6}>Причина замены:</TitleCol>
                  <Col span={18}>
                    <Radio.Group value={reasonIndex} onChange={value => handleRadioButton(value)}>
                      {reasonsChangeSim.map((reason, index) => {
                        return (
                          <Row>
                            <Radio style={radioStyle} value={index}>
                              {reason.ReasonName}
                            </Radio>
                          </Row>
                        )
                      })}
                    </Radio.Group>
                  </Col>
                </StyledRow>
                <StyledRow>
                  <TitleCol span={6}>Код проверки:</TitleCol>
                  <Col span={10}>
                    <StyledInput
                      placeholder='XXXX'
                      value={securityCode}
                      onChange={event => onChangeHandle(event.target.value, 'securityCode')}
                      disabled={isDisabledSecurityCode}
                    />
                  </Col>
                  <Col span={4} >
                    <SendSmsButton type='primary' disabled={isDisabledSendSms} onClick={sendSmsHandle}>
                      Отправить SMS
                    </SendSmsButton>
                  </Col>
                </StyledRow>
              </Fragment>
            )
          }
        })()}
      </Spin>
    </StyledModal>
  )
}

ReplacementSimCardModal.propTypes = {
  replacementSimCard: PropTypes.object,
  handleVisibleReplacementSimCardModal: PropTypes.func,
  validateSimProfile: PropTypes.func,
  personalAccount: PropTypes.object,
  handlingId: PropTypes.number,
  sendSmsReplacementSim: PropTypes.func,
  clearReplacementSimCardModal: PropTypes.func,
  getReasonsChangeSim: PropTypes.func
}

export default ReplacementSimCardModal

const StyledModal = styled(Modal)`
  .ant-input:placeholder-shown {
    text-align: center;
  }
`
const StyledRow = styled(Row)`
  margin-top: 20px;
`
const StyledInput = styled(Input)`
  width: 150px;
  margin-right: 20px;
  text-align: center;
`
const TitleCol = styled(Col)`
  height: 32px;
  line-height: 32px;
`
const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24px;
`
const SendSmsButton = styled(Button)`
  width: 185px;
  margin-left: 25px;
`
const TitleIccCol = styled(Col)`
  padding-right: 10px;
  height: 32px;
  line-height: 32px;
`

const IccCol = styled(Col)`
  padding-left: 4px;
`
const SearchButton = styled(Button)`
  margin-right: 2px;
  width: 88px;
`
const ClearButton = styled(Button)`
  margin-right: 15px;
`
const FooterRow = styled(Row)`
  margin: 20px 0px;
`
