import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import CostsFilters from './CostsFilters'
import CostsTable from './CostsTable'
import CostsDetailsModal from './CostsDetailsModal'
import TableRowsLimiter from '../TableRowsLimiter'
import clientTypeEnum from 'screens/Finance/constants/clientTypeEnum'
import { MIN_TABLE_ROWS_LIMIT } from 'screens/Finance/constants/limiter'
import { getParsedTimeNow } from 'utils/helpers'
import { formatDateWithSeconds } from 'screens/Finance/helpers/format'

const DEFAULT_FILTER = 'ALL'

class Costs extends PureComponent {
  static propTypes = {
    isB2c: PropTypes.bool.isRequired,
    clientType: PropTypes.number.isRequired,
    personalAccount: PropTypes.object,
    payments: PropTypes.object,
    fetchPaymentsHistory: PropTypes.func.isRequired,
    fetchPaymentsHistoryFilters: PropTypes.func.isRequired,
    fetchCostsHistory: PropTypes.func.isRequired,
    servicesState: PropTypes.object.isRequired,
    getChargeServiceList: PropTypes.func.isRequired,
    handleCommonFilterChange: PropTypes.func.isRequired,
    handleClientFilterChange: PropTypes.func.isRequired,
    commonFilters: PropTypes.object.isRequired
  }

  state = {
    hidden: false,
    historyModalRecord: null,
    isOnlyPayable: false,
    isModalVisible: false,
    rowsLimit: MIN_TABLE_ROWS_LIMIT
  }

  componentDidMount = () => {
    this.handleSubmit()
  }

  handleClear = () => {
    const { handleCommonFilterChange, handleClientFilterChange } = this.props
    this.setState({
      hidden: false,
      historyModalMode: 0,
      historyModalRecord: null
    })
    handleClientFilterChange(0)
    handleCommonFilterChange({
      datePeriodStart: moment().subtract(1, 'month'),
      datePeriodFinish: moment(),
      accrualType: DEFAULT_FILTER,
      accrualTypeKey: DEFAULT_FILTER,
      BillingServiceId: DEFAULT_FILTER
    })
  }

  getFullTimeStart = date =>
    date
      .clone()
      .hour(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)

  getFullTimeEnd = date =>
    date
      .clone()
      .hour(23)
      .minutes(59)
      .seconds(59)
      .milliseconds(999)

  handleSubmit = () => {
    const { SUBSCRIBER, CLIENT, MAIN_CLIENT } = clientTypeEnum
    const {
      fetchCostsHistory,
      personalAccount: {
        BillingBranchId: branchId,
        SubscriberId: subscriberId,
        ClientId: clientId,
        OwnerClientId: ownerClientId
      },
      clientType,
      commonFilters: { datePeriodStart, datePeriodFinish, accrualTypeKey, BillingServiceId, includeTechnological }
    } = this.props
    const { rowsLimit } = this.state

    const isLessThanMonth = datePeriodFinish.diff(this.getFullTimeStart(datePeriodStart), 'months') === 0
    const parameters = {
      branchId: branchId,
      chargeTypeId: accrualTypeKey,
      billingServiceId: BillingServiceId,
      dateFrom:
        formatDateWithSeconds(isLessThanMonth ? this.getFullTimeStart(datePeriodStart) : getParsedTimeNow(datePeriodStart)),
      dateTo:
        formatDateWithSeconds(isLessThanMonth ? this.getFullTimeEnd(datePeriodFinish) : getParsedTimeNow(datePeriodFinish)),
      RowsCount: rowsLimit,
      includeTechnological
    }
    switch (clientType) {
      case SUBSCRIBER:
        parameters.subscriberId = subscriberId
        break
      case CLIENT:
        parameters.clientId = clientId
        break
      case MAIN_CLIENT:
        parameters.ownerClientId = ownerClientId
        parameters.clientId = clientId
        break
      default:
        break
    }
    fetchCostsHistory(parameters)
    this.handleFetchChargeServiceList()
  }

  handleFetchChargeServiceList = () => {
    const {
      getChargeServiceList,
      personalAccount: {
        SubscriberId,
        ClientId,
        OwnerClientId,
        BillingBranchId: BranchId
      },
      clientType,
      commonFilters: {
        datePeriodStart,
        datePeriodFinish
      }
    } = this.props
    const { SUBSCRIBER, CLIENT, MAIN_CLIENT } = clientTypeEnum
    const isLessThanMonth = datePeriodFinish.diff(this.getFullTimeStart(datePeriodStart), 'months') === 0

    const parameters = {
      BranchId,
      dateFrom:
        formatDateWithSeconds(isLessThanMonth ? this.getFullTimeStart(datePeriodStart) : getParsedTimeNow(datePeriodStart)),
      dateTo:
        formatDateWithSeconds(isLessThanMonth ? this.getFullTimeEnd(datePeriodFinish) : getParsedTimeNow(datePeriodFinish))
    }
    switch (clientType) {
      case SUBSCRIBER:
        parameters.subscriberId = SubscriberId
        break
      case CLIENT:
        parameters.clientId = ClientId
        break
      case MAIN_CLIENT:
        parameters.ownerClientId = OwnerClientId
        parameters.clientId = ClientId
        break
      default:
        break
    }
    getChargeServiceList(parameters)
  }

  handleToggleOnlyPayable = () => {
    this.setState({ isOnlyPayable: !this.state.isOnlyPayable })
  }

  handleCostsDetailsClosing = () => {
    this.setState({ isModalVisible: false })
  }

  handleCostsDetailsOpening = record => {
    const { isModalVisible } = this.state

    this.setState({
      isModalVisible: !isModalVisible,
      historyModalRecord: record
    })
  }

  handleChangeRowsLimit = count => {
    this.setState({ rowsLimit: count }, this.handleSubmit)
  }

  render () {
    const { historyModalRecord, isModalVisible, rowsLimit, isOnlyPayable } = this.state
    const {
      isB2c,
      payments: {
        costsHistory,
        isPaymentsHistoryFiltersError,
        isPaymentsHistoryFiltersLoading,
        paymentsHistoryFilters
      },
      servicesState: {
        chargeServiceList
      },
      clientType,
      commonFilters: { datePeriodStart, BillingServiceId, datePeriodFinish, accrualType, includeTechnological },
      handleCommonFilterChange
    } = this.props

    const currentBillingService = chargeServiceList && chargeServiceList.find(item => item.BillingServiceId === +BillingServiceId)
    const billingServiceName = (currentBillingService && currentBillingService.ServiceName) || DEFAULT_FILTER

    const isAllowToRenderFilters =
      !isPaymentsHistoryFiltersError && !isPaymentsHistoryFiltersLoading && paymentsHistoryFilters
    const isTableRowsLimiterAvailable = costsHistory && costsHistory.ChargeTotalCount > MIN_TABLE_ROWS_LIMIT

    return (
      <Fragment>
        <CostsDetailsModal
          isToggled={isModalVisible}
          record={historyModalRecord}
          handleCostsDetailsClosing={this.handleCostsDetailsClosing}
        />
        {isAllowToRenderFilters && (
          <CostsFilters
            {...this.state}
            isB2c={isB2c}
            chargeServiceList={chargeServiceList}
            paymentsHistoryFilters={paymentsHistoryFilters}
            handleCommonFilterChange={handleCommonFilterChange}
            handleSubmit={this.handleSubmit}
            handleClear={this.handleClear}
            clientType={clientType}
            isOnlyPayable={isOnlyPayable}
            handleToggleOnlyPayable={this.handleToggleOnlyPayable}
            accrualType={accrualType}
            BillingServiceId={BillingServiceId}
            billingServiceName={billingServiceName}
            datePeriodStart={datePeriodStart}
            datePeriodFinish={datePeriodFinish}
            includeTechnological={includeTechnological}
          />
        )}
        {costsHistory && (
          <CostsTable
            costsHistory={costsHistory}
            isOnlyPayable={isOnlyPayable}
            handleCostsDetailsOpening={this.handleCostsDetailsOpening}
          />
        )}
        {isTableRowsLimiterAvailable && (
          <TableRowsLimiter
            label='Показывать начислений: '
            rowsLimit={rowsLimit}
            maxLabelsCount={5}
            totalRowsCount={costsHistory.ChargeTotalCount}
            handleChangeRowsLimit={this.handleChangeRowsLimit}
          />
        )}
      </Fragment>
    )
  }
}

export default Costs
