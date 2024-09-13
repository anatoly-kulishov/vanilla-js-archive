/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Modal, Table, Row, Col } from 'antd'

import { numSorter, stringSorter } from 'utils/helpers'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { RATE_PLAN_MODAL } from 'constants/logModalNames'

const formatNumber = number => (number || number === 0) && number.toLocaleString(undefined, { minimumFractionDigits: 2 })

class RatePlanModal extends PureComponent {
  static propTypes = {
    isRatePlanToggled: PropTypes.bool,
    unpaidChargeData: PropTypes.object,
    handleToggleRatePlanModal: PropTypes.func
  }

  componentDidMount = () => {
    logIfEnabled({ type: MODAL_OPEN, log: RATE_PLAN_MODAL })
  }

  handleCloseModal = () => {
    this.props.handleToggleRatePlanModal()
    logIfEnabled({ type: MODAL_CLOSE, log: RATE_PLAN_MODAL })
  }

  render () {
    const {
      isRatePlanToggled,
      unpaidChargeData
    } = this.props
    const { ServiceDetails, StartChargeDate, EndChargeDate } = unpaidChargeData

    const columns = [
      {
        width: '55%',
        title: 'Услуга',
        dataIndex: 'ServiceName',
        sorter: (cur, next) => stringSorter(cur.ServiceName, next.ServiceName)
      },
      {
        width: '22%',
        title: 'Количество периодов к списанию',
        dataIndex: 'TotalCount',
        sorter: (cur, next) => numSorter(cur.TotalCount, next.TotalCount)
      },
      {
        width: '22%',
        title: 'Сумма АП к списанию, ' + String.fromCharCode(8381),
        dataIndex: 'TotalCharge',
        render: value => formatNumber(value),
        sorter: (cur, next) => numSorter(cur.TotalCharge, next.TotalCharge)
      }
    ]

    return (
      <Modal
        width={900}
        title={<Title>Параметры списания при неоплате АП</Title>}
        visible={isRatePlanToggled}
        onCancel={this.handleCloseModal}
        footer={null}
      >
        <DateWrapper>
          <Row>
            <Col span={10}>Дата начала расчетного периода:</Col>
            <Col span={14}>{StartChargeDate && moment(StartChargeDate).format('DD.MM.YYYY HH:mm')}</Col>
          </Row>
          <Row>
            <Col span={10}>Дата окончания расчетного периода:</Col>
            <Col span={14}>{EndChargeDate && moment(EndChargeDate).format('DD.MM.YYYY HH:mm')}</Col>
          </Row>
        </DateWrapper>
        <Table
          dataSource={ServiceDetails}
          pagination={false}
          showSorterTooltip={false}
          columns={columns}
          size='small'
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell>Итого:</Table.Summary.Cell>
              <Table.Summary.Cell />
              <Table.Summary.Cell>{formatNumber(unpaidChargeData?.TotalChargeSum)}</Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Modal>
    )
  }
}

export default RatePlanModal

const DateWrapper = styled.div`
  margin-bottom: 24px;
`

const Title = styled.div`
  font-family: T2HalvarBreit_ExtraBold;
  color: black;
`
