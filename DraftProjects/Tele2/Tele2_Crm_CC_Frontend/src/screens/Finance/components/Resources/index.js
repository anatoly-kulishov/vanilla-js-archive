import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import ResourcesFilter from './ResourcesFilter'
import ResourcesTable from './Table'
import { formatDateWithSeconds } from 'screens/Finance/helpers/format'

const DEFAULT_FILTER = 'ALL'

class Resources extends PureComponent {
  static propTypes = {
    payments: PropTypes.object.isRequired,
    personalAccount: PropTypes.object.isRequired,
    tableExpandState: PropTypes.object.isRequired,
    tableExpandFunctions: PropTypes.object.isRequired,
    fetchResourcesHistory: PropTypes.func.isRequired,
    fetchDigestId: PropTypes.func.isRequired,
    resetDigestId: PropTypes.func.isRequired,
    generatePathForSecondCard: PropTypes.func.isRequired,
    handleCommonFilterChange: PropTypes.func.isRequired,
    commonFilters: PropTypes.object.isRequired
  }

  state = {
    historyModalRecord: null,
    isModalVisible: false
  }

  componentDidMount = () => {
    this.handleSubmit()
  }

  handleSubmit = () => {
    const {
      fetchResourcesHistory,
      personalAccount: { BillingBranchId: branchId, Msisdn },
      commonFilters: { resourcesDatePeriodStart, resourcesDatePeriodFinish },
      tableExpandFunctions: { resetExpandedRows }
    } = this.props

    resetExpandedRows()
    fetchResourcesHistory({
      DateFrom: formatDateWithSeconds(resourcesDatePeriodStart.startOf('day')),
      DateTo: formatDateWithSeconds(resourcesDatePeriodFinish
        .startOf('day')
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999)),
      BranchId: branchId,
      Msisdn
    })
  }

  render = () => {
    const { clientType, paymentType, enrollmentType, contractName } = this.state
    const {
      payments: {
        resourcesHistory,
        isPaymentsHistoryFiltersError,
        isPaymentsHistoryFiltersLoading,
        paymentsHistoryFilters
      },
      generatePathForSecondCard,
      commonFilters,
      handleCommonFilterChange,
      fetchDigestId,
      resetDigestId,
      tableExpandState,
      tableExpandFunctions
    } = this.props

    const isAllowToRenderFilters =
      true ||
      (!isPaymentsHistoryFiltersError && !isPaymentsHistoryFiltersLoading && paymentsHistoryFilters)
    const isContractNameDisabled =
      paymentType !== DEFAULT_FILTER || enrollmentType !== DEFAULT_FILTER
    const areTypesDisabled = (contractName !== 0 && contractName !== 1) || clientType !== 0

    return (
      <Fragment>
        {isAllowToRenderFilters && (
          <ResourcesFilter
            {...this.state}
            isContractNameDisabled={isContractNameDisabled}
            areTypesDisabled={areTypesDisabled}
            paymentsHistoryFilters={paymentsHistoryFilters}
            handleCommonFilterChange={handleCommonFilterChange}
            handleSubmit={this.handleSubmit}
            handleRefreshClick={this.handleRefreshClick}
            commonFilters={commonFilters}
            summary={resourcesHistory?.Summary}
            tableExpandState={tableExpandState}
            tableExpandFunctions={tableExpandFunctions}
          />
        )}
        {resourcesHistory && (
          <ResourcesTable
            fetchDigestId={fetchDigestId}
            dataSource={resourcesHistory}
            paymentsHistoryFilters={paymentsHistoryFilters}
            generatePathForSecondCard={generatePathForSecondCard}
            commonFilters={commonFilters}
            handleCommonFilterChange={handleCommonFilterChange}
            tableExpandState={tableExpandState}
            tableExpandFunctions={tableExpandFunctions}
            resetDigestId={resetDigestId}
          />
        )}
      </Fragment>
    )
  }
}

export default Resources
