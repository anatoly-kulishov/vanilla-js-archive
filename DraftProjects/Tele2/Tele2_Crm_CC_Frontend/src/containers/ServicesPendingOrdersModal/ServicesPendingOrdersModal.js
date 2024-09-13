/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Table, Button, Tooltip, Spin } from 'antd'
import { InfoCircleOutlined, StopOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import moment from 'moment'

import LoadingSpinner from 'components/LoadingSpinner'

import { stringSorter, isoDateSorter } from 'utils/helpers'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { SERVICE_PENDING_ORDERS_MODAL } from 'constants/logModalNames'

class ServicesPendingOrdersModal extends PureComponent {
  static propTypes = {
    handleToggleServicesPendingOrders: PropTypes.func,
    isVisibleServicesPendingOrders: PropTypes.bool,
    fetchServicesPendingOrders: PropTypes.func,
    personalAccountState: PropTypes.object,
    serviceState: PropTypes.object,
    deleteServicesPendingOrders: PropTypes.func,
    handlingId: PropTypes.number,
    resendServiceOrder: PropTypes.func
  }

  componentDidMount () {
    const {
      personalAccountState: {
        personalAccount: {
          Msisdn,
          BillingBranchId
        }
      },
      fetchServicesPendingOrders
    } = this.props

    fetchServicesPendingOrders({ msisdn: Msisdn, branchId: BillingBranchId })
    logIfEnabled({ type: MODAL_OPEN, log: SERVICE_PENDING_ORDERS_MODAL })
  }

  handleCloseModal = () => {
    this.props.handleToggleServicesPendingOrders()
    logIfEnabled({ type: MODAL_CLOSE, log: SERVICE_PENDING_ORDERS_MODAL })
  }

  getRowClassName = record => {
    const errorMessage = 'ошибка'
    const { ServiceOrderStatusName } = record
    const isError = ServiceOrderStatusName.toLowerCase().includes(errorMessage)

    if (isError) {
      return 'red-row'
    }
    return null
  }

  correctServiceOrder = record => {
    const {
      resendServiceOrder,
      personalAccountState: {
        personalAccount: {
          BillingBranchId,
          Msisdn: msisdn,
          ClientId: clientId,
          Email: email,
          SubscriberId: subscriberId,
          SubscriberFullInfo: {
            SubscriberInfo: {
              SubscriberTypeId: subscriberTypeId,
              SubscriberStatusId: subscriberStatusId
            }
          }
        }
      },
      handlingId
    } = this.props

    const params = {
      handlingId,
      clientId,
      clientBranchId: BillingBranchId,
      msisdn,
      email,
      subscriberId,
      subscriberTypeId,
      subscriberStatusId,
      branchId: BillingBranchId,
      subscriberBranchId: BillingBranchId,
      serviceOrderId: record.ServiceOrderId,
      serviceId: record.BillingServiceId,
      operationId: record.ServiceOperationId
    }
    resendServiceOrder(params)
  }

  render () {
    const {
      personalAccountState: {
        personalAccount: {
          Msisdn: msisdn,
          BillingBranchId: branchId,
          ClientId: clientId,
          Email: email,
          SubscriberId: subscriberId,
          SubscriberStatus: subscriberStatusId,
          SubscriberFullInfo: {
            SubscriberClientInfo: {
              BillingBranchId: clientBranchId
            },
            SubscriberInfo: {
              SubscriberTypeId: subscriberTypeId
            }
          }
        }
      },
      isVisibleServicesPendingOrders,
      serviceState: {
        servicesPendingOrdersLoading,
        servicesPendingOrders
      },
      deleteServicesPendingOrders,
      handlingId
    } = this.props

    const confirm = Modal.confirm

    const showConfirm = (serviceOrderId, delayedServiceOrderId, serviceId, operationId) => {
      let serviceOrderIdFieldValue
      let serviceOrderIdFieldName
      if (serviceOrderId === 0) {
        serviceOrderIdFieldName = 'delayedServiceOrderId'
        serviceOrderIdFieldValue = delayedServiceOrderId
      } else {
        serviceOrderIdFieldName = 'serviceOrderId'
        serviceOrderIdFieldValue = serviceOrderId
      }

      confirm({
        title: 'Удаление',
        content: `Вы уверены, что хотите отменить данный заказ? Данное действие невозможно отменить`,
        onOk () {
          deleteServicesPendingOrders({
            [serviceOrderIdFieldName]: serviceOrderIdFieldValue,
            contractName: 'base',
            withDependentOrders: 1,
            branchId,
            clientId,
            msisdn,
            email,
            subscriberId,
            handlingId,
            clientBranchId,
            subscriberBranchId: branchId,
            subscriberTypeId,
            subscriberStatusId,
            serviceOrderId: serviceOrderId === 0 ? null : serviceOrderId,
            delayedServiceOrderId,
            serviceId,
            operationId
          })
        }
      })
    }

    const columns = [
      {
        title: 'Название услуги',
        dataIndex: 'CommercialServiceName',
        width: '15%',
        sorter: (cur, next) => stringSorter(cur.CommercialServiceName, next.CommercialServiceName)
      },
      {
        title: 'Текущий статус',
        dataIndex: 'ServiceStatusName',
        width: '10%',
        align: 'center',
        sorter: (cur, next) => stringSorter(cur.ServiceStatusName, next.ServiceStatusName)
      },
      {
        title: 'Операция',
        dataIndex: 'ServiceActionName',
        width: '10%',
        align: 'center',
        sorter: (cur, next) => stringSorter(cur.ServiceActionName, next.ServiceActionName)
      },
      {
        title: 'Дата создания',
        dataIndex: 'ServiceOrderCreationDate',
        width: '15%',
        align: 'center',
        render: text => <span>{text && moment(text).format('DD.MM.YYYY, HH.mm')}</span>,
        sorter: (cur, next) => isoDateSorter(cur.ServiceOrderCreationDate, next.ServiceOrderCreationDate)
      },
      {
        title: 'Со списанием',
        dataIndex: 'ChargeOrder',
        width: '10%',
        align: 'center',
        sorter: (cur, next) => stringSorter(cur.ChargeOrder, next.ChargeOrder),
        render: text => <div>{ text === 1 ? 'да' : 'нет' }</div>
      },
      {
        title: 'Дата выполнения',
        dataIndex: 'ServiceOrderProcessingDate',
        width: '15%',
        align: 'center',
        render: text => <span>{text && moment(text).format('DD.MM.YYYY, HH.mm')}</span>,
        sorter: (cur, next) => isoDateSorter(cur.ServiceOrderProcessingDate, next.ServiceOrderProcessingDate)
      },
      {
        title: 'Статус',
        dataIndex: 'ServiceOrderStatusName',
        width: '10%',
        align: 'center',
        sorter: (cur, next) => stringSorter(cur.ServiceOrderStatusName, next.ServiceOrderStatusName)
      },
      {
        width: '5%',
        align: 'center',
        render: record =>
          record.CanSendAgain &&
          <Tooltip placement='bottom' title='Отправить заявку повторно'>
            <Button onClick={() => this.correctServiceOrder(record)}>Исправить</Button>
          </Tooltip>
      },
      {
        dataIndex: 'ParentServiceOrderId',
        width: '5%',
        align: 'center',
        render: (text, record) =>
          <Tooltip placement='bottom' title={record.ParentInfo}>
            {text !== 0 && <InfoCircleIcon />}
          </Tooltip>
      },
      {
        width: '5%',
        align: 'center',
        render: record => record.CanDeleteOrder &&
         handlingId && <StopIcon onClick={() => showConfirm(record.ServiceOrderId, record.DelayedServiceOrderId, record.BillingServiceId, record.ServiceOperationId)} />
      }
    ]

    return (
      <StyleModal
        width='1200px'
        title='Отложенные заказы'
        visible={isVisibleServicesPendingOrders}
        onCancel={this.handleCloseModal}
        footer={null}
      >
        <StyledSpin spinning={servicesPendingOrdersLoading} indicator={<LoadingSpinner spin />}>
          <StyledTable
            columns={columns}
            pagination={false}
            showSorterTooltip={false}
            scroll={{ y: 400 }} //eslint-disable-line
            dataSource={servicesPendingOrders}
            rowClassName={record => this.getRowClassName(record)}
          />
        </StyledSpin>
      </StyleModal>
    )
  }
}

export default ServicesPendingOrdersModal

const StopIcon = styled(StopOutlined)`
  cursor: pointer;
  font-size: 20px;
`
const InfoCircleIcon = styled(InfoCircleOutlined)`
  cursor: pointer;
  font-size: 20px;
`
const StyledSpin = styled(Spin)`
  padding: 40px 0;
  font-size: 24px;
`

const StyleModal = styled(Modal)`
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-body {
    padding: 0;
  }
`
const StyledTable = styled(Table)`
  .ant-table-tbody {
    td {
      padding: 12px 12px;
    }
  }
  .ant-table-row.ant-table-row-level-0.red-row {
    background: rgba(245, 34, 45, 0.15);
  }
`
