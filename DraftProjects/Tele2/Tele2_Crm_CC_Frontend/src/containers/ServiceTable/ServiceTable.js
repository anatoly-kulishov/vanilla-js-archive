/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Table, Tag, Spin } from 'antd'
import { HddOutlined } from '@ant-design/icons'

import LoadingSpinner from 'components/LoadingSpinner'
import { tagColor, formatIsoDate } from './ServiceTableHelper'
import ServiceSwitch from './ServiceSwitch'

import { stringSorter, isoDateSorter, numSorter } from 'utils/helpers'
import KmsSearchTooltip from 'containers/KmsSearchTooltip'

const Column = Table.Column

class ServiceTable extends PureComponent {
  static propTypes = {
    connectedServices: PropTypes.array,
    changeServiceStatus: PropTypes.func,
    disableServiceLoading: PropTypes.bool,
    showServiceHistory: PropTypes.func,
    personalAccount: PropTypes.object,
    handlingId: PropTypes.number,
    changeVisibility: PropTypes.func,
    getServiceHistory: PropTypes.func,
    isConnectedServicesLoading: PropTypes.bool,
    getConnectedServices: PropTypes.func,
    isScrollEnable: PropTypes.bool,
    isLoadingInteractions: PropTypes.bool,
    isChangeServiceStatusLoading: PropTypes.bool,
    openMultisubscriptionModal: PropTypes.func
  }
  componentDidMount () {
    const {
      getConnectedServices,
      connectedServices,
      personalAccount: { Msisdn: msisdn }
    } = this.props

    !connectedServices && getConnectedServices({ msisdn })
  }

  handleShowHistoryModal = ({ billingServiceId, modalTitle }) => {
    const {
      personalAccount: { Msisdn: msisdn, BillingBranchId: branchId },
      changeVisibility,
      showServiceHistory,
      getServiceHistory
    } = this.props

    changeVisibility()
    showServiceHistory({ title: modalTitle, service: true })

    return getServiceHistory({
      msisdn,
      branchId,
      serviceId: billingServiceId,
      message: 'История услуг'
    })
  }

  render () {
    const {
      connectedServices,
      changeServiceStatus,
      disableServiceLoading,
      handlingId,
      personalAccount: { Msisdn: msisdn },
      isConnectedServicesLoading,
      isScrollEnable,
      isLoadingInteractions,
      isChangeServiceStatusLoading,
      openMultisubscriptionModal
    } = this.props

    const scrollValue = isScrollEnable ? 350 : null

    return (
      <StyledSpin spinning={isConnectedServicesLoading} indicator={<LoadingSpinner spin />}>
        <ServiceGrid
          locale={{ emptyText: 'У абонента нет услуг' }}
          dataSource={connectedServices}
          pagination={false}
          // eslint-disable-next-line id-length
          scroll={{ y: scrollValue }}
          className={'serviceGrid'}
          showSorterTooltip={false}
        >
          <Column
            dataIndex='ServiceName'
            title='Название услуги'
            width='30%'
            render={(value, record) => {
              const isServiceSwitchDisabled =
                record.TypeRoleAccess === 4 ||
                (!!record.TypeRoleAccess &&
                  !(
                    record.AvailableServiceStatus === 'неактивна' &&
                    (record.TypeRoleAccess === 2 || record.TypeRoleAccess === 3)
                  )) ||
                (record.AvailableServiceStatus === 'неактивна' && record.TypeRoleAccess === 1) ||
                record.IsChildService ||
                record.IsParentService
              return (
                <ServiceWrapper>
                  <ServiceSwitch
                    value={value}
                    record={record}
                    changeServiceStatus={changeServiceStatus}
                    disableServiceLoading={disableServiceLoading}
                    msisdn={msisdn}
                    handlingId={handlingId}
                    disabled={isChangeServiceStatusLoading || isLoadingInteractions || isServiceSwitchDisabled}
                  />
                  <ServiceName
                    onClick={() =>
                      this.handleShowHistoryModal({
                        billingServiceId: record.BillingServiceId,
                        modalTitle: `История изменений услуги '${record.ServiceName}'`
                      })
                    }
                  >
                    {value}
                  </ServiceName>
                  {record.IsParentService && (
                    <HddOutlined
                      style={{
                        fontSize: '16px',
                        color: 'grey',
                        marginLeft: '12px',
                        marginTop: '3px'
                      }}
                      onClick={() => openMultisubscriptionModal(true)}
                    />
                  )}
                </ServiceWrapper>
              )
            }}
            sorter={(cur, next) => stringSorter(cur.ServiceName, next.ServiceName)}
          />
          <Column
            dataIndex='Status'
            title='Статус'
            width='10%'
            render={(_value, record) => <Tag color={tagColor(record.StatusActive)}>{record.ServiceStatus}</Tag>}
            sorter={(cur, next) => stringSorter(cur.ServiceStatus, next.ServiceStatus)}
          />
          <Column
            dataIndex='Time'
            title='Последнее изменение'
            render={formatIsoDate}
            width='20%'
            sorter={(cur, next) => isoDateSorter(cur.Time, next.Time)}
          />
          <Column
            dataIndex='ChPeriodEndDate'
            title={'Следующее списание АП'}
            width='15%'
            sorter={(cur, next) => isoDateSorter(cur.ChPeriodEndDate, next.ChPeriodEndDate)}
            render={formatIsoDate}
          />
          <Column
            dataIndex='SubscriptionFee'
            title={'Абонентская плата, ' + String.fromCharCode(8381)}
            width='20%'
            sorter={(cur, next) => numSorter(cur.CostMonthWithTax, next.CostMonthWithTax)}
          />
          <Column width='5%' render={(_value, record) => <KmsSearchTooltip record={record} />} />
        </ServiceGrid>
      </StyledSpin>
    )
  }
}

export default ServiceTable

const ServiceGrid = styled(Table)`
  font-size: 14px;
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
