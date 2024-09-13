import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import InvoicesFilters from './InvoicesFilters'
import InvoicesTable from './InvoicesTable'
import InvoicesDetailsModal from './InvoicesDetailsModal'
import { getParsedTimeNow } from 'utils/helpers'
import { formatDateWithSeconds } from 'screens/Finance/helpers/format'

const DEFAULT_FILTER = 'ALL'

class Invoices extends PureComponent {
  static propTypes = {
    payments: PropTypes.object.isRequired,
    personalAccount: PropTypes.object.isRequired,
    fetchPaymentsHistoryFilters: PropTypes.func.isRequired,
    fetchInvoicesHistory: PropTypes.func.isRequired
  }

  state = {
    invoiceStatus: DEFAULT_FILTER,
    invoiceStatusKey: DEFAULT_FILTER,
    datePeriodStart: moment().subtract(1, 'year'),
    datePeriodFinish: moment(),
    historyModalRecord: null,
    isModalVisible: false
  }

  componentDidMount () {
    const {
      fetchPaymentsHistoryFilters,
      fetchInvoicesHistory,
      payments: { invoicesHistory },
      personalAccount: {
        BillingBranchId: branchId,
        OwnerClientId: ownerClientId,
        ClientId: clientId
      }
    } = this.props
    const { datePeriodStart, datePeriodFinish } = this.state

    fetchPaymentsHistoryFilters({ digestCode: 'INVOICE_TYPE' })
    fetchPaymentsHistoryFilters({ digestCode: 'INVOICE_STATUS' })
    !invoicesHistory && fetchInvoicesHistory({
      dateFrom: formatDateWithSeconds(getParsedTimeNow(datePeriodStart)),
      dateTo: formatDateWithSeconds(getParsedTimeNow(datePeriodFinish)),
      branchId,
      ownerClientId: ownerClientId || clientId
    })
  }

  handleFilterChange = params => {
    this.setState({
      ...this.state,
      ...params
    })
  }

  handleClear = () => {
    this.setState({
      contractName: 1,
      clientType: 0,
      invoiceStatus: DEFAULT_FILTER,
      invoiceStatusKey: DEFAULT_FILTER,
      datePeriodStart: moment().subtract(1, 'month'),
      datePeriodFinish: moment()
    })
  }

  handleSubmit = () => {
    const {
      fetchInvoicesHistory,
      personalAccount: {
        BillingBranchId: branchId,
        OwnerClientId: ownerClientId,
        ClientId: clientId
      }
    } = this.props
    const {
      datePeriodStart,
      datePeriodFinish,
      invoiceStatusKey: statusId
    } = this.state

    fetchInvoicesHistory({
      dateFrom: formatDateWithSeconds(
        datePeriodFinish.diff(datePeriodStart, 'days') === 0
          ? datePeriodStart.startOf('day') : getParsedTimeNow(datePeriodStart)),
      dateTo: formatDateWithSeconds(getParsedTimeNow(datePeriodFinish)),
      branchId,
      ownerClientId: ownerClientId || clientId,
      typeId: 'ALL',
      statusId
    })
  }

  handleInvoicesDetailsClosing = () => {
    this.setState({ isModalVisible: false })
  }

  handleInvoicesDetailsOpening = record => {
    const { isModalVisible } = this.state

    this.setState({
      isModalVisible: !isModalVisible,
      historyModalRecord: record
    })
  }

  render = () => {
    const {
      clientType,
      paymentType,
      enrollmentType,
      contractName,
      historyModalRecord,
      isModalVisible
    } = this.state
    const {
      payments: {
        invoicesHistory,
        isPaymentsHistoryFiltersError,
        isPaymentsHistoryFiltersLoading,
        paymentsHistoryFilters
      }
    } = this.props

    const isAllowToRenderFilters =
      !isPaymentsHistoryFiltersError && !isPaymentsHistoryFiltersLoading && paymentsHistoryFilters
    const isContractNameDisabled =
      paymentType !== DEFAULT_FILTER || enrollmentType !== DEFAULT_FILTER
    const areTypesDisabled = (contractName !== 0 && contractName !== 1) || clientType !== 0

    return (
      <Fragment>
        <InvoicesDetailsModal
          isToggled={isModalVisible}
          record={historyModalRecord}
          handleInvoicesDetailsClosing={this.handleInvoicesDetailsClosing}
        />
        {isAllowToRenderFilters &&
          <InvoicesFilters
            {...this.state}
            isContractNameDisabled={isContractNameDisabled}
            areTypesDisabled={areTypesDisabled}
            paymentsHistoryFilters={paymentsHistoryFilters}
            handleFilterChange={this.handleFilterChange}
            handleSubmit={this.handleSubmit}
            handleClear={this.handleClear}
            handleRefreshClick={this.handleRefreshClick}
          />
        }
        {invoicesHistory &&
          <InvoicesTable
            invoicesHistory={invoicesHistory}
            handleInvoicesDetailsOpening={this.handleInvoicesDetailsOpening}
          />}
      </Fragment>
    )
  }
}

export default Invoices
