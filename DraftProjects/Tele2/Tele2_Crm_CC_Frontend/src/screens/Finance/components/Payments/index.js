import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import PaymentsFilters from './PaymentsFilters'
import { PaymentsTable } from './PaymentsTable'
import PaymentsDetailsModal from './PaymentsDetailsModal'
import TableRowsLimiter from '../TableRowsLimiter'
import clientTypeEnum from 'screens/Finance/constants/clientTypeEnum'
import { dateWithUtc } from 'screens/Finance/helpers/format'
import { MIN_TABLE_ROWS_LIMIT } from 'screens/Finance/constants/limiter'
import { getParsedTimeNow } from 'utils/helpers'

const DEFAULT_FILTER = 'ALL'
const DEFAULT_CONTRACT_FILTER = 0

class Payments extends PureComponent {
  static propTypes = {
    isB2c: PropTypes.bool.isRequired,
    personalAccount: PropTypes.object,
    payments: PropTypes.object,
    user: PropTypes.object,
    clientType: PropTypes.number.isRequired,
    fetchPaymentsHistory: PropTypes.func.isRequired,
    fetchPaymentsHistoryFilters: PropTypes.func.isRequired,
    handleCommonFilterChange: PropTypes.func.isRequired,
    handleClientFilterChange: PropTypes.func.isRequired,
    commonFilters: PropTypes.object.isRequired,
    cancelCompensation: PropTypes.func,
    modifyCompensation: PropTypes.func,
    fetchPaydComments: PropTypes.func,
    paydComments: PropTypes.arrayOf(),
    handlingId: PropTypes.number,
    cardMode: PropTypes.string
  }

  state = {
    hidden: false,
    enrollmentType: DEFAULT_FILTER,
    enrollmentTypeKey: DEFAULT_FILTER,
    historyModalMode: 0,
    historyModalRecord: null,
    rowsLimit: MIN_TABLE_ROWS_LIMIT
  }

  componentDidMount = () => {
    this.handleSubmit()
  }
  componentDidUpdate = prevProps => {
    const {
      commonFilters: { paymentTypeKey: prevPaymentKey }
    } = prevProps
    const {
      commonFilters: { paymentTypeKey }
    } = this.props
    if (prevPaymentKey !== paymentTypeKey) {
      this.handleSubmit()
    }
  }

  handleFilterChange = params => {
    this.setState({
      ...this.state,
      ...params
    })
  }

  handleClientFilterChange = params => {
    const { clientType } = params
    const { handleCommonFilterChange, handleClientFilterChange: changeClientFilter } = this.props
    const { SUBSCRIBER } = clientTypeEnum
    if (clientType !== SUBSCRIBER) {
      this.setState({
        enrollmentType: DEFAULT_FILTER,
        enrollmentTypeKey: DEFAULT_FILTER
      })
      changeClientFilter(clientType)
      handleCommonFilterChange({
        contractName: DEFAULT_CONTRACT_FILTER,
        contractNameKey: DEFAULT_CONTRACT_FILTER,
        paymentType: DEFAULT_FILTER,
        paymentTypeKey: DEFAULT_FILTER
      })
    } else {
      changeClientFilter(clientType)
    }
  }

  handleClear = () => {
    const { handleCommonFilterChange } = this.props
    this.setState({
      enrollmentType: DEFAULT_FILTER,
      enrollmentTypeKey: DEFAULT_FILTER
    })
    handleCommonFilterChange({
      datePeriodStart: moment().subtract(1, 'month'),
      datePeriodFinish: moment(),
      contractName: DEFAULT_CONTRACT_FILTER,
      contractNameKey: DEFAULT_CONTRACT_FILTER,
      paymentType: DEFAULT_FILTER,
      paymentTypeKey: DEFAULT_FILTER
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
      fetchPaymentsHistory,
      personalAccount: {
        BillingBranchId: branchId,
        SubscriberId: subscriberId,
        ClientId: clientId,
        OwnerClientId: ownerClientId
      },
      clientType,
      commonFilters
    } = this.props
    const {
      datePeriodStart,
      datePeriodFinish,
      paymentTypeKey,
      contractName
    } = commonFilters
    const { enrollmentTypeKey, rowsLimit } = this.state

    const isContractNameNull =
      paymentTypeKey !== DEFAULT_FILTER || enrollmentTypeKey !== DEFAULT_FILTER

    const isLessThanMonth =
      datePeriodFinish.diff(
        this.getFullTimeStart(datePeriodStart),
        'months'
      ) === 0

    let dateFrom
    let dateTo
    if (isLessThanMonth) {
      dateFrom = dateWithUtc(this.getFullTimeStart(datePeriodStart))
      dateTo = dateWithUtc(this.getFullTimeEnd(datePeriodFinish))
    } else {
      dateFrom = dateWithUtc(getParsedTimeNow(datePeriodStart))
      dateTo = dateWithUtc(getParsedTimeNow(datePeriodFinish))
    }

    const parameters = {
      branchId: branchId,
      dateFrom,
      dateTo,
      contractName: isContractNameNull ? 1 : contractName,
      RowCount: rowsLimit
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
    if (paymentTypeKey !== DEFAULT_FILTER) {
      parameters.payTypeId = paymentTypeKey
    }
    if (enrollmentTypeKey !== DEFAULT_FILTER) {
      parameters.paydTypeId = enrollmentTypeKey
    }

    fetchPaymentsHistory(parameters)
  }

  handlePaymentDetailsClosing = () => {
    this.setState({
      isModalVisible: false
    })
  }

  handlePaymentDetailsOpening = record => {
    const { isModalVisible } = this.state

    this.setState({
      isModalVisible: !isModalVisible,
      historyModalMode: record.HistoryType,
      historyModalRecord: record
    })
  }

  handleChangeRowsLimit = count => {
    this.setState({ rowsLimit: count }, this.handleSubmit)
  }

  render = () => {
    const {
      enrollmentType,
      historyModalRecord,
      historyModalMode,
      isModalVisible,
      rowsLimit
    } = this.state

    const {
      isB2c,
      payments: {
        paymentsHistory,
        isPaymentsHistoryFiltersError,
        isPaymentsHistoryFiltersLoading,
        paymentsHistoryFilters
      },
      clientType,
      handleCommonFilterChange,
      commonFilters,
      commonFilters: { paymentType, contractName },
      user,
      cancelCompensation,
      modifyCompensation,
      fetchPaydComments,
      paydComments,
      handlingId,
      personalAccount,
      cardMode
    } = this.props

    const contractNames = {
      all: 0,
      payments: 1,
      corrections: 2,
      promisedPayments: 3
    }

    const isAllowToRenderFilters =
      !isPaymentsHistoryFiltersError &&
      !isPaymentsHistoryFiltersLoading &&
      paymentsHistoryFilters
    const isContractNameDisabled =
      paymentType !== DEFAULT_FILTER || enrollmentType !== DEFAULT_FILTER
    const areTypesDisabled =
      (contractName !== contractNames.all &&
        contractName !== contractNames.payments) ||
      clientType !== 0
    const isTableRowsLimiterAvailable =
      paymentsHistory &&
      (contractName === contractNames.all ||
        contractName === contractNames.payments) &&
      paymentsHistory.PayCount > MIN_TABLE_ROWS_LIMIT

    return (
      <Fragment>
        <PaymentsDetailsModal
          isToggled={isModalVisible}
          user={user}
          record={historyModalRecord}
          mode={historyModalMode}
          handlePaymentDetailsClosing={this.handlePaymentDetailsClosing}
          cancelCompensation={cancelCompensation}
          modifyCompensation={modifyCompensation}
          fetchPaydComments={fetchPaydComments}
          paydComments={paydComments}
          handlingId={handlingId}
          personalAccount={personalAccount}
        />
        {isAllowToRenderFilters && (
          <PaymentsFilters
            {...this.state}
            isB2c={isB2c}
            isContractNameDisabled={isContractNameDisabled}
            areTypesDisabled={areTypesDisabled}
            clientType={clientType}
            paymentsHistoryFilters={paymentsHistoryFilters}
            handleClientFilterChange={this.handleClientFilterChange}
            handleCommonFilterChange={handleCommonFilterChange}
            handleFilterChange={this.handleFilterChange}
            handleSubmit={this.handleSubmit}
            handleClear={this.handleClear}
            commonFilters={commonFilters}
          />
        )}
        {paymentsHistory && (
          <PaymentsTable
            paymentsHistory={paymentsHistory}
            handlePaymentDetailsOpening={this.handlePaymentDetailsOpening}
            cardMode={cardMode}
          />
        )}
        {isTableRowsLimiterAvailable && (
          <TableRowsLimiter
            label='Показывать платежей: '
            rowsLimit={rowsLimit}
            maxLabelsCount={5}
            totalRowsCount={paymentsHistory.PayCount}
            handleChangeRowsLimit={this.handleChangeRowsLimit}
          />
        )}
      </Fragment>
    )
  }
}

export default Payments
