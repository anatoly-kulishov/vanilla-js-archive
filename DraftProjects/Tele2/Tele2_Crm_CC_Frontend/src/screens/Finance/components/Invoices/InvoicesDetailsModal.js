/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { isNull } from 'lodash'
import { Modal, Row, Col } from 'antd'
import { formatNumber } from 'screens/Finance/helpers/format'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { INVOICES_DETAILS_MODAL } from 'constants/logModalNames'

const formatIsoDate = value =>
  value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : ''

const InvoicesDetailsModal = props => {
  const { isToggled, record, handleInvoicesDetailsClosing } = props
  let title = ''
  let footerData = []
  let bodyData = []

  if (record) {
    title = `Счет ${record.InvoiceNum}`
    bodyData = [
      record.InvoiceDate && {
        name: 'Дата счета',
        value: formatIsoDate(record.InvoiceDate)
      },
      record.PayDate && { name: 'Срок оплаты', value: formatIsoDate(record.PayDate) },
      !isNull(record.InvoiceSum) && { name: 'Сумма счета с налогом', value: formatNumber(record.InvoiceSum) },
      !isNull(record.SumNoVat) && { name: 'Сумма счета без налога', value: formatNumber(record.SumNoVat) },
      !isNull(record.PaySum) && { name: 'Оплаченная сумма по счету', value: formatNumber(record.PaySum) },
      !isNull(record.NotPaydSum) && { name: 'Неоплаченная сумма по счету', value: formatNumber(record.NotPaydSum) },
      record.TypeName && { name: 'Тип счета', value: record.TypeName },
      record.SubTypeName && { name: 'Состояние счета', value: record.SubTypeName }
    ]
    footerData = [
      record.CreateDate && {
        name: 'Дата создания записи',
        value: formatIsoDate(record.CreateDate)
      },
      record.CreateName && { name: 'Запись создал', value: record.CreateName },
      record.DeleteDate && {
        name: 'Дата удаления записи',
        value: formatIsoDate(record.DeleteDate)
      },
      record.DeleteName && { name: 'Запись удалил', value: record.DeleteName }
    ]
  }

  const handleCloseModal = () => {
    handleInvoicesDetailsClosing()
    logIfEnabled({ type: MODAL_CLOSE, log: INVOICES_DETAILS_MODAL })
  }

  useEffect(() => {
    if (isToggled) {
      logIfEnabled({ type: MODAL_OPEN, log: INVOICES_DETAILS_MODAL })
    }
  }, [isToggled])

  const renderRowData = item => {
    if (item) {
      return (
        <StyledRow>
          <NameCol span={10}>{item.name}</NameCol>
          <ValueCol span={14}>{item.value}</ValueCol>
        </StyledRow>
      )
    }
    return null
  }

  return (
    <StyledModal
      width={650}
      title={title}
      visible={isToggled}
      onCancel={handleCloseModal}
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

export default InvoicesDetailsModal

InvoicesDetailsModal.propTypes = {
  isToggled: PropTypes.bool,
  record: PropTypes.object,
  handleInvoicesDetailsClosing: PropTypes.func
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
`
const StyledFooter = styled.div`
  background: rgba(229, 229, 229, 0.69);
  text-align: left;
`
const StyledRow = styled(Row)`
  padding: 5px 20px;
  border-bottom: 1px solid #e8e8e8;
`
const NameCol = styled(Col)`
  padding: 4px 0px;
`
const ValueCol = styled(Col)`
  padding: 4px 11px;
`
