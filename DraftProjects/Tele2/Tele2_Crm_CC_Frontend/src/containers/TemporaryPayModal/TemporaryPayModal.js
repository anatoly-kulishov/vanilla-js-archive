/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { InputNumber, Modal, Col, Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { checkRight } from 'utils/helpers'
import styled from 'styled-components'

const TemporaryPay = (props) => {
  const {
    isTpNewVisible,
    setTpNewVisible,
    addPayment,
    personalAccount: {
      SubscriberFullInfo,
      ClientId,
      BillingBranchId,
      Msisdn,
      Email,
      SubscriberId
    },
    handlingId,
    user,
    temporaryPay: {
      temporaryPayNew,
      isTemporaryPayNewLoading,
      isTemporaryPayNewError
    },
    getTemporaryPayNew
  } = props
  const {
    SubscriberTypeId,
    SubscriberStatusId
  } = SubscriberFullInfo?.SubscriberInfo ?? {}

  const isTemporaryPayNewAvailible =
    handlingId && (checkRight(user, 'CC:TemporaryPaymentNew') || checkRight(user, 'CC:TemporaryPaymentWithRestriction'))

  const [tpNewAmount, setTpNewAmount] = useState(0)

  useEffect(() => {
    if (!isTemporaryPayNewLoading && !temporaryPayNew && !isTemporaryPayNewError) {
      getTemporaryPayNew()
    }
  })

  const handleAcceptNewTemporaryPay = () => {
    addPayment({
      SystemName: 'MSDCRM',
      PaySum: tpNewAmount,
      Msisdn,
      HandlingId: handlingId,
      ClientId,
      Email,
      SubscriberId,
      SubscriberBranchId: BillingBranchId,
      SubscriberTypeId,
      SubscriberStatusId
    })
  }

  if (isTemporaryPayNewAvailible) {
    const isDisabledOkButton = (!temporaryPayNew && isTemporaryPayNewError) ||
                                isTemporaryPayNewLoading ||
                                (tpNewAmount && (tpNewAmount > temporaryPayNew.PaySumMax))
    return (
      <TpModal
        title='Подтвердите начисление временного платежа'
        visible={isTpNewVisible}
        onOk={() => handleAcceptNewTemporaryPay()}
        onCancel={() => setTpNewVisible()}
        width={400}
        okText='Подтвердить'
        okButtonProps={isDisabledOkButton && { disabled: true }}
      >
        <Spin indicator={<AntIcon spin />} spinning={isTemporaryPayNewLoading}>
          {temporaryPayNew
            ? <Row>
              <StyledRow span={24}>
                <Col span={16}>Размер временного платежа:</Col>
                <BalanceAmount span={8}>
                  <InputNumber
                    size='small'
                    min={0}
                    max={temporaryPayNew.PaySumMax}
                    onChange={value => setTpNewAmount(value)}
                  />
                </BalanceAmount>
              </StyledRow>
              <StyledRow span={24}>
                <Col span={16}>Максимальный лимит:</Col>
                <BalanceAmount span={8}>{temporaryPayNew.PaySumMax}</BalanceAmount>
              </StyledRow>
              <StyledRow span={24}>
                <Col span={16}>Срок действия:</Col>
                <BalanceAmount span={8}>{temporaryPayNew.PayDay}</BalanceAmount>
              </StyledRow>
            </Row>
            : isTemporaryPayNewError
          }
        </Spin>
      </TpModal>
    )
  }
  return null
}

export default TemporaryPay

TemporaryPay.propTypes = {
  isTpNewVisible: PropTypes.bool,
  setTpNewVisible: PropTypes.func,
  temporaryPay: PropTypes.object,
  user: PropTypes.object,
  temporaryPayNew: PropTypes.object,
  personalAccount: PropTypes.object,
  handlingId: PropTypes.number,
  addPayment: PropTypes.func,
  getTemporaryPayNew: PropTypes.func
}

const BalanceAmount = styled(Col)`
  text-align: left;
  padding-right: 20px;
`
const StyledRow = styled(Row)`
  margin-bottom: 5px;
`

const TpModal = styled(Modal)`
  position: absolute;
  top: 40%;
  left: calc((75% - 300px) / 2);
`

const AntIcon = styled(LoadingOutlined)`
  font-size: 24;
  text-align: center;
`
