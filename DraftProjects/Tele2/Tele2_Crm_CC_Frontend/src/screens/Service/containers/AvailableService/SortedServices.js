/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Table, Spin } from 'antd'
import PropTypes from 'prop-types'
import { HddOutlined } from '@ant-design/icons'

import LoadingSpinner from 'components/LoadingSpinner'
import SwitchServiceConnection from './SwitchServiceConnection'

import { stringSorter, numSorter } from 'utils/helpers'

import KmsSearchTooltip from 'containers/KmsSearchTooltip'

const Column = Table.Column

const serviceNameSorter = (cur, next) => stringSorter(cur.ServiceName, next.ServiceName)
const costOnWithTaxSorter = (cur, next) => numSorter(cur.CostOnWithTax, next.CostOnWithTax)
const subscriptionFeeSorter = (cur, next) => numSorter(cur.CostMonthWithTax, next.CostMonthWithTax)
const renderKmsSearchTooltip = (_value, record) => <KmsSearchTooltip record={record} />

const SortedServices = props => {
  SortedServices.propTypes = {
    services: PropTypes.object,
    changeServiceStatus: PropTypes.func,
    disableServiceLoading: PropTypes.func,
    handleShowHistoryModal: PropTypes.func,
    msisdn: PropTypes.object,
    handlingId: PropTypes.number,
    isAvailableServicesLoading: PropTypes.bool,
    isChangeServiceStatusLoading: PropTypes.bool,
    isLoadingInteractions: PropTypes.bool,
    openMultisubscriptionModal: PropTypes.bool
  }
  const {
    services,
    changeServiceStatus,
    disableServiceLoading,
    handleShowHistoryModal,
    msisdn,
    handlingId,
    isAvailableServicesLoading,
    isLoadingInteractions,
    isChangeServiceStatusLoading,
    openMultisubscriptionModal
  } = props

  const serviceHistoryModal = (_value, record) => {
    handleShowHistoryModal({
      billingServiceId: record.BillingServiceId,
      modalTitle: `История изменений услуги '${record.ServiceName}'`
    })
  }

  return (
    <StyledSpin spinning={isAvailableServicesLoading} indicator={<LoadingSpinner spin />}>
      <StyledTable rowKey='Key' dataSource={services} pagination={false} showSorterTooltip={false}>
        <Column
          title='Название услуги'
          dataIndex='ServiceName'
          width='55%'
          render={(value, record) => {
            const isServiceConnectionSwitchDisabled =
              record.TypeRoleAccess === 4 ||
              (!!record.TypeRoleAccess &&
                !(
                  record.AvailableServiceStatus === 'активна' &&
                  (record.TypeRoleAccess === 1 || record.TypeRoleAccess === 3)
                )) ||
              (record.AvailableServiceStatus === 'активна' && record.TypeRoleAccess === 2) ||
              record.IsParentService
            return (
              <ServiceWrapper>
                <SwitchServiceConnection
                  service={record}
                  handlingId={handlingId}
                  msisdn={msisdn}
                  disableServiceLoading={disableServiceLoading}
                  changeServiceStatus={changeServiceStatus}
                  disabled={isLoadingInteractions || isChangeServiceStatusLoading || isServiceConnectionSwitchDisabled}
                />
                <ServiceName onClick={() => serviceHistoryModal(value, record)}>{value}</ServiceName>
                {record.IsParentService && (
                  <HddOutlined
                    style={{
                      fontSize: '16px',
                      color: 'grey',
                      marginLeft: '12px',
                      marginTop: '3px'
                    }}
                    onClick={() => openMultisubscriptionModal()}
                  />
                )}
              </ServiceWrapper>
            )
          }}
          sorter={serviceNameSorter}
        />
        <Column
          title={'Стоимость подключения, ' + String.fromCharCode(8381)}
          dataIndex='CostOnWithTax'
          width='20%'
          sorter={costOnWithTaxSorter}
        />
        <Column
          title={'Абонентская плата, ' + String.fromCharCode(8381)}
          dataIndex='SubscriptionFee'
          width='20%'
          sorter={subscriptionFeeSorter}
        />
        <Column width='5%' render={renderKmsSearchTooltip} />
      </StyledTable>
    </StyledSpin>
  )
}

export default SortedServices

const StyledTable = styled(Table)`
  .ant-table-tbody > tr > td {
    padding: 12px;
  }
`
const ServiceWrapper = styled.div`
  display: flex;
`
const ServiceName = styled.div`
  word-wrap: break-word;
  cursor: pointer;
`
const StyledSpin = styled(Spin)`
  font-size: 24px;
  margin-top: 20px;
`
