/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import Resources from './Resources'
import Payments from './Payments'
import Invoices from './Invoices'
import Costs from './Costs'
import moment from 'moment'

const DEFAULT_FILTER = 'ALL'
const DEFAULT_CONTRACT_FILTER = 0

class FundsFlow extends PureComponent {
  static propTypes = {
    clientType: PropTypes.number,
    match: PropTypes.object,
    isB2c: PropTypes.bool.isRequired,
    personalAccount: PropTypes.object,
    payments: PropTypes.object,
    user: PropTypes.object,
    fetchPaymentsHistory: PropTypes.func.isRequired,
    fetchPaymentsHistoryFilters: PropTypes.func.isRequired,
    fetchInvoicesHistory: PropTypes.func.isRequired,
    fetchCostsHistory: PropTypes.func.isRequired,
    fetchResourcesHistory: PropTypes.func.isRequired,
    digestId: PropTypes.string.isRequired,
    fetchDigestId: PropTypes.func.isRequired,
    resetDigestId: PropTypes.func.isRequired,
    generatePathForSecondCard: PropTypes.func.isRequired,
    servicesState: PropTypes.object.isRequired,
    getChargeServiceList: PropTypes.func.isRequired,
    cancelCompensation: PropTypes.func,
    modifyCompensation: PropTypes.func,
    fetchPaydComments: PropTypes.func,
    paydComments: PropTypes.arrayOf(),
    handlingId: PropTypes.number,
    cardMode: PropTypes.string
  }

  state = {
    commonFilters: {
      datePeriodStart: moment().subtract(1, 'month'),
      datePeriodFinish: moment(),
      resourcesDatePeriodStart: moment().set('date', 1),
      resourcesDatePeriodFinish: moment(),
      accrualType: DEFAULT_FILTER,
      accrualTypeKey: DEFAULT_FILTER,
      BillingServiceId: DEFAULT_FILTER,
      paymentType: DEFAULT_FILTER,
      paymentTypeKey: DEFAULT_FILTER,
      contractName: DEFAULT_CONTRACT_FILTER,
      contractNameKey: DEFAULT_FILTER,
      includeTechnological: false
    },
    tableExpandState: {
      expandedRowKeys: [],
      expandAllFlag: false
    }
  }

  componentDidMount = () => {
    const { fetchPaymentsHistoryFilters } = this.props
    fetchPaymentsHistoryFilters({ digestCode: 'CHARGE_TYPE' })
    fetchPaymentsHistoryFilters({ digestCode: 'PAY_TYPE' })
    fetchPaymentsHistoryFilters({ digestCode: 'PAYD_TYPE' })
  }

  componentDidUpdate = prevProps => {
    const { digestId } = this.props
    const { paymentTypeKey } = this.state
    if (prevProps.digestId !== digestId && digestId !== paymentTypeKey) {
      if (digestId) {
        this.setPaymentTypeKey(digestId)
      } else {
        this.handleCommonFilterChange({
          paymentType: DEFAULT_FILTER,
          paymentTypeKey: DEFAULT_FILTER
        })
      }
    }
  }

  onExpand = (expanded, record) => {
    const {
      payments: {
        resourcesHistory: { Summary }
      }
    } = this.props
    const { tableExpandState } = this.state
    const { expandedRowKeys } = tableExpandState

    let expandIndex = null
    Summary.find((value) => {
      if (value.RowName === record.RowName) {
        expandIndex = value.RowName
        return true
      }
      return false
    })
    let newExpendedRowKeys = []
    if (expanded) {
      newExpendedRowKeys = [...expandedRowKeys, expandIndex]
    } else {
      newExpendedRowKeys = expandedRowKeys.filter(val => val !== expandIndex)
    }
    this.setState({
      tableExpandState: {
        ...tableExpandState,
        expandedRowKeys: newExpendedRowKeys
      }
    })
  }

  expandAll = () => {
    const {
      payments: {
        resourcesHistory: { Summary }
      }
    } = this.props
    const { tableExpandState } = this.state
    const { expandAllFlag } = tableExpandState
    const keys = []
    if (!expandAllFlag) {
      Summary.map(val => {
        if (val.Details) {
          keys.push(val.RowName)
        }
      })
    }
    this.setState({
      tableExpandState: {
        expandedRowKeys: keys,
        expandAllFlag: !expandAllFlag
      }
    })
  }

  resetExpandedRows = () => {
    this.setState({
      tableExpandState: {
        expandedRowKeys: [],
        expandAllFlag: false
      }
    })
  }

  toggleExpandAllFlag = value => {
    const { tableExpandState } = this.state
    this.setState({
      tableExpandState: {
        ...tableExpandState,
        expandAllFlag: value
      }
    })
  }

  setPaymentTypeKey = key => {
    this.setState({ commonFilters: { ...this.state.commonFilters, paymentTypeKey: key } })
  }

  handleCommonFilterChange = params => {
    this.setState({
      commonFilters: {
        ...this.state.commonFilters,
        ...params
      }
    })
  }

  render () {
    const {
      match,
      isB2c,
      personalAccount,
      payments,
      clientType,
      servicesState,
      generatePathForSecondCard,
      handleClientFilterChange,
      fetchPaymentsHistory,
      fetchPaymentsHistoryFilters,
      fetchInvoicesHistory,
      fetchCostsHistory,
      fetchResourcesHistory,
      fetchDigestId,
      resetDigestId,
      getChargeServiceList,
      user,
      cancelCompensation,
      modifyCompensation,
      fetchPaydComments,
      paydComments,
      handlingId,
      cardMode
    } = this.props
    const { commonFilters, tableExpandState } = this.state

    const { onExpand, expandAll, toggleExpandAllFlag, resetExpandedRows } = this
    const tableExpandFunctions = { onExpand, expandAll, toggleExpandAllFlag, resetExpandedRows }

    return (
      <Fragment>
        <Route
          path={`${match.url}/*/payments`}
          render={() => (
            <Payments
              isB2c={isB2c}
              user={user}
              clientType={clientType}
              cancelCompensation={cancelCompensation}
              modifyCompensation={modifyCompensation}
              fetchPaydComments={fetchPaydComments}
              paydComments={paydComments}
              personalAccount={personalAccount}
              payments={payments}
              fetchPaymentsHistory={fetchPaymentsHistory}
              fetchPaymentsHistoryFilters={fetchPaymentsHistoryFilters}
              handleClientFilterChange={handleClientFilterChange}
              handleCommonFilterChange={this.handleCommonFilterChange}
              commonFilters={commonFilters}
              handlingId={handlingId}
              cardMode={cardMode}
            />
          )}
        />
        <Route
          path={`${match.url}/*/costs`}
          render={() => (
            <Costs
              isB2c={isB2c}
              clientType={clientType}
              personalAccount={personalAccount}
              payments={payments}
              servicesState={servicesState}
              fetchCostsHistory={fetchCostsHistory}
              getChargeServiceList={getChargeServiceList}
              fetchPaymentsHistoryFilters={fetchPaymentsHistoryFilters}
              handleClientFilterChange={handleClientFilterChange}
              handleCommonFilterChange={this.handleCommonFilterChange}
              commonFilters={commonFilters}
            />
          )}
        />
        <Route
          path={`${match.url}/*/invoices`}
          render={() => (
            <Invoices
              personalAccount={personalAccount}
              payments={payments}
              fetchPaymentsHistoryFilters={fetchPaymentsHistoryFilters}
              fetchInvoicesHistory={fetchInvoicesHistory}
            />
          )}
        />
        <Route
          path={`${match.url}/*/resources`}
          render={() => (
            <Resources
              personalAccount={personalAccount}
              payments={payments}
              fetchResourcesHistory={fetchResourcesHistory}
              fetchDigestId={fetchDigestId}
              resetDigestId={resetDigestId}
              generatePathForSecondCard={generatePathForSecondCard}
              tableExpandState={tableExpandState}
              tableExpandFunctions={tableExpandFunctions}
              commonFilters={commonFilters}
              handleCommonFilterChange={this.handleCommonFilterChange}
            />
          )}
        />
      </Fragment>
    )
  }
}

export default FundsFlow

FundsFlow.propTypes = {
  match: PropTypes.object,
  isB2c: PropTypes.bool,
  personalAccount: PropTypes.object,
  payments: PropTypes.object,
  fetchPaymentsHistory: PropTypes.func,
  fetchPaymentsHistoryFilters: PropTypes.func,
  fetchInvoicesHistory: PropTypes.func,
  fetchCostsHistory: PropTypes.func,
  handleClientFilterChange: PropTypes.func
}
