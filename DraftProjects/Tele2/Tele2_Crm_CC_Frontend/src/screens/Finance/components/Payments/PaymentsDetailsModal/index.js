/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { isNull } from 'lodash'
import { Modal, Row, Col } from 'antd'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import PaymentsDetailsTitle from './PaymentsDetailsTitle'
import historyTypeEnum from 'screens/Finance/constants/historyTypeEnum'
import { formatNumber } from 'screens/Finance/helpers/format'
import { formattedSum } from 'containers/Balances/FinanceOperations/Compensations/helpers'
import { separator } from 'constants/compensations'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { PAYMENTS_DETAILS_MODAL } from 'constants/logModalNames'
import { checkRight } from 'utils/helpers'

const formatIsoDate = value =>
  value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : ''

const { CORRECTION, PAYMENT, PROMISE_PAY } = historyTypeEnum

const PaymentsDetailsModal = props => {
  const {
    isToggled,
    record,
    mode,
    handlePaymentDetailsClosing,
    user,
    cancelCompensation,
    modifyCompensation,
    fetchPaydComments,
    paydComments,
    form,
    handlingId,
    personalAccount: {
      Msisdn: msisdn,
      BillingBranchId: branchId,
      SubscriberId: subscriberId,
      ClientId: clientId,
      SubscriberStatus: subscriberStatusId,
      SubscriberFullInfo: { SubscriberInfo }
    }
  } = props

  let title = ''
  let footerData = []
  let bodyData = []

  const [isEditControlsVisibled, setEditControlsVisible] = useState({
    isEditPopconfirmVisible: false,
    isEditPopoverVisible: false
  })

  const { SubscriberTypeId: subscriberTypeId } = SubscriberInfo

  const commonCompensationsParams = {
    branchId,
    clientId,
    msisdn,
    subscriberId,
    subscriberTypeId,
    subscriberStatusId,
    handlingId
  }

  const handleCancelCompensation = () => {
    const { DocumentId: documentId } = record
    const isPaydCompCancelAll = checkRight(user, 'CC:PaydCompCancelAll')

    cancelCompensation({
      ...commonCompensationsParams,
      documentId,
      commentText: `Отмена компенсационного зачисления №${documentId}`,
      checkHandlingStatusIsOpened: isPaydCompCancelAll ? 0 : 1
    })
  }

  const handleModifyComment = choosedComment => {
    const { DocumentId: documentId, Type: documentType, Sum: sum } = record
    const isPaydCompCancelAll = checkRight(user, 'CC:PaydCompCancelAll')

    modifyCompensation({
      ...commonCompensationsParams,
      documentId,
      comment: formattedSum(sum) + separator + documentType + separator + choosedComment,
      commentText: `Изменение комментария компенсационного зачисления №${documentId}`,
      checkHandlingStatusIsOpened: isPaydCompCancelAll ? 0 : 1
    })
    setEditControlsVisible({ isEditPopconfirmVisible: false, isEditPopoverVisible: false })
  }

  if (record) {
    switch (mode) {
      case PAYMENT:
        title =
          <PaymentsDetailsTitle
            form={form}
            record={record}
            paydComments={paydComments}
            user={user}
            handleCancelCompensation={handleCancelCompensation}
            handleModifyComment={handleModifyComment}
            isEditControlsVisibled={isEditControlsVisibled}
            setEditControlsVisible={setEditControlsVisible}
            fetchPaydComments={fetchPaydComments}
          />
        bodyData = [
          record.ExecutionDate && {
            name: 'Дата платежа',
            value: formatIsoDate(record.ExecutionDate)
          },
          record.DeadDate && { name: 'Истекает', value: formatIsoDate(record.DeadDate) },
          !isNull(record.Sum) && { name: 'Сумма', value: formatNumber(record.Sum) },
          record.Type && { name: 'Тип платежа', value: record.Type },
          record.DocumentType && { name: 'Тип платежного документа', value: record.DocumentType },
          record.DocumentDate && {
            name: 'Дата платежного документа',
            value: formatIsoDate(record.DocumentDate)
          },
          record.Office && { name: 'Касса или Банк', value: record.Office },
          record.Mode && { name: 'Способ оплаты', value: record.Mode },
          record.BalanceName && { name: 'Баланс', value: record.BalanceName },
          record.BalanceType && { name: 'Тип баланса', value: record.BalanceType },
          record.Comment && { name: 'Комментарий', value: record.Comment }
        ]
        break
      case CORRECTION:
        title = 'Детализация корректировки'
        bodyData = [
          record.ExecutionDate && {
            name: 'Дата корректировки',
            value: formatIsoDate(record.ExecutionDate)
          },
          !isNull(record.Sum) && { name: 'Сумма', value: formatNumber(record.Sum) },
          record.Type && { name: 'Тип корректировки', value: record.Type },
          record.SubType && { name: ' Подтип корректировки', value: record.SubType },
          record.BalanceType && { name: 'Баланс', value: record.BalanceType },
          record.Comment && { name: 'Комментарий', value: record.Comment }
        ]
        break
      case PROMISE_PAY:
        title = 'Детализация обещанного платежа'
        bodyData = [
          record.ExecutionDate && {
            name: 'Дата платежа',
            value: formatIsoDate(record.ExecutionDate)
          },
          record.DeadDate && { name: 'Истекает', value: formatIsoDate(record.DeadDate) },
          !isNull(record.Sum) && { name: 'Сумма', value: formatNumber(record.Sum) },
          !isNull(record.AfterSum) && { name: 'Сумма погашения', value: formatNumber(record.AfterSum) },
          record.Type && { name: 'Тип платежа', value: record.Type },
          record.DocumentType && { name: 'Тип зачисления', value: record.DocumentType },
          record.Office && { name: 'Касса или Банк', value: record.Office },
          record.Mode && { name: 'Способ оплаты', value: record.Mode },
          record.Status && { name: 'Статус платежа', value: record.Status }
        ]
        break
    }
    footerData = [
      record.CreateDate && {
        name: 'Дата создания',
        value: formatIsoDate(record.CreateDate)
      },
      record.CreateName && { name: 'Запись создал', value: record.CreateName },
      record.DeleteDate && {
        name: 'Дата удаления',
        value: formatIsoDate(record.DeleteDate)
      },
      record.DeleteName && { name: 'Запись удалил', value: record.DeleteName }
    ]
  }

  const onCancelPaymentsDetailsModal = () => {
    setEditControlsVisible({ isEditPopconfirmVisible: false, isEditPopoverVisible: false })
    handlePaymentDetailsClosing()
    logIfEnabled({ type: MODAL_CLOSE, log: PAYMENTS_DETAILS_MODAL })
  }

  useEffect(() => {
    if (isToggled) {
      logIfEnabled({ type: MODAL_OPEN, log: PAYMENTS_DETAILS_MODAL })
    }
  }, [isToggled])

  const renderRowData = item => {
    if (item) {
      return (
        <StyledRow>
          <NameCol span={8}>{item.name}</NameCol>
          <ValueCol span={16}>{item.value}</ValueCol>
        </StyledRow>
      )
    }
    return null
  }

  return (
    <StyledModal
      title={title}
      width={650}
      visible={isToggled}
      onCancel={onCancelPaymentsDetailsModal}
      footer={
        <StyledFooter>
          {footerData.map(renderRowData)}
        </StyledFooter>
      }
    >
      <Fragment>
        {bodyData &&
          bodyData.map(renderRowData)}
      </Fragment>
    </StyledModal>
  )
}

export default Form.create()(PaymentsDetailsModal)

PaymentsDetailsModal.propTypes = {
  isToggled: PropTypes.bool,
  record: PropTypes.object,
  user: PropTypes.object,
  mode: PropTypes.number,
  handlePaymentDetailsClosing: PropTypes.func,
  cancelCompensation: PropTypes.func,
  modifyCompensation: PropTypes.func,
  fetchPaydComments: PropTypes.func,
  paydComments: PropTypes.arrayOf(),
  form: PropTypes.object,
  personalAccount: PropTypes.object,
  handlingId: PropTypes.number
}

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 14px 20px 10px 20px;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-footer {
    padding: 0;
  }
  .ant-modal-close-x {
    font-size: 20px;
  }
`
const StyledFooter = styled.div`
  background: rgba(229, 229, 229, 0.69);
  text-align: left;
`
const StyledRow = styled(Row)`
  padding: 0px 20px;
  border-bottom: 1px solid #e8e8e8;
`
const NameCol = styled(Col)`
  padding: 4px 0px;
`
const ValueCol = styled(Col)`
  padding: 4px 11px;
`
