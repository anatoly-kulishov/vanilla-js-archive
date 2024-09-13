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
import { COST_DETAILS_MODAL } from 'constants/logModalNames'

const formatIsoDate = value =>
  value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : ''

const CostsDetailsModal = props => {
  const { isToggled, record, handleCostsDetailsClosing } = props
  let title = ''
  let footerData = []
  let bodyData = []

  if (record) {
    title = 'Детализация расхода'
    bodyData = [
      record.ChargeDate && {
        name: 'Дата списания',
        value: formatIsoDate(record.ChargeDate)
      },
      !isNull(record.NoDiscountSum) && { name: 'Сумма без скидки', value: formatNumber(record.NoDiscountSum) },
      !isNull(record.SumVat) && { name: 'Сумма НДС', value: formatNumber(record.SumVat) },
      !isNull(record.SumNoVat) && { name: 'Сумма без НДС', value: formatNumber(record.SumNoVat) },
      !isNull(record.Sum) && { name: 'Сумма', value: formatNumber(record.Sum) },
      record.ChargeTypeName && { name: 'Тип списания', value: record.ChargeTypeName },
      record.ServiceName && { name: 'Услуга', value: record.ServiceName },
      record.BalanceName && { name: 'Баланс', value: record.BalanceName },
      record.BalanceType && { name: 'Тип баланса', value: record.BalanceType },
      record.Comment && { name: 'Комментарий', value: record.Comment }
    ]
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

  const handleCloseModal = () => {
    handleCostsDetailsClosing()
    logIfEnabled({ type: MODAL_CLOSE, log: COST_DETAILS_MODAL })
  }

  useEffect(() => {
    if (isToggled) {
      logIfEnabled({ type: MODAL_OPEN, log: COST_DETAILS_MODAL })
    }
  }, [isToggled])

  const renderRowData = (item) => {
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
          {footerData.map(item => renderRowData(item))}
        </StyledFooter>
      }
    >
      <Fragment>
        {bodyData &&
          bodyData.map(item => renderRowData(item))}
      </Fragment>
    </StyledModal>
  )
}

export default CostsDetailsModal

CostsDetailsModal.propTypes = {
  isToggled: PropTypes.bool,
  record: PropTypes.object,
  handleCostsDetailsClosing: PropTypes.func
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
  padding: 0px 20px;
  border-bottom: 1px solid #e8e8e8;
`
const NameCol = styled(Col)`
  padding: 4px 0px;
`
const ValueCol = styled(Col)`
  padding: 4px 11px;
`
