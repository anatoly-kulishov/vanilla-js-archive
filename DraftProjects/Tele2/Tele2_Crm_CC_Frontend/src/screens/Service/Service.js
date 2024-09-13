import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { Route } from 'react-router'
import PropTypes from 'prop-types'
import { SyncOutlined, ClockCircleOutlined } from '@ant-design/icons'

import CardNew from 'components/Card'
import ServiceHistoryModal from 'containers/ServiceHistory/ServiceHistoryModal'
import ConfirmButton from 'components/ConfirmButton'
import ServiceSearchBar from './components/ServiceSearchBar'
import RatingMenu from 'containers/RatingMenu'
import ServiceTable from 'containers/ServiceTable'
import AvailableServiceTable from 'screens/Service/containers/AvailableService'
import Forwarding from 'screens/Service/containers/Forwarding'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import moment from 'moment'
import { routeMatch } from 'utils/helpers'

const { serviceFeatureId, availableServiceFeatureId, forwardingFeatureId } = ratingFeatureIds

class Service extends PureComponent {
  static propTypes = {
    handlingId: PropTypes.number,
    handleToggleServicesPendingOrders: PropTypes.func,
    fetchHlr: PropTypes.func,
    resetHlr: PropTypes.func,
    getConnectedServices: PropTypes.func,
    getAvailableServices: PropTypes.func,
    getServiceHistory: PropTypes.func,
    connectedServices: PropTypes.object,
    availableServices: PropTypes.object,
    personalAccount: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    isHlrLoading: PropTypes.bool,
    isConnectedServicesLoading: PropTypes.bool,
    isAvailableServicesLoading: PropTypes.bool,
    user: PropTypes.object
  }
  state = {
    connectedServices: null,
    availableServices: null,
    сonnectedServicesValueSearch: '',
    availableServicesValueSearch: ''
  }
  static getDerivedStateFromProps (props, state) {
    const { connectedServices: connectedServicesProp, availableServices: availableServicesProp } = props
    const { connectedServices, availableServices, сonnectedServicesValueSearch, availableServicesValueSearch } = state

    if (connectedServicesProp && connectedServices !== connectedServicesProp && сonnectedServicesValueSearch === '') {
      return { connectedServices: connectedServicesProp }
    }
    if (availableServicesProp && availableServices !== availableServicesProp && availableServicesValueSearch === '') {
      return { availableServices: availableServicesProp }
    }
    return null
  }

  handleResetHlr = () => {
    const {
      personalAccount: { Msisdn: msisdn },
      resetHlr,
      handlingId
    } = this.props

    resetHlr({ msisdn, handlingId })
  }

  handleRefreshHlr = () => {
    const {
      personalAccount: { Msisdn: msisdn },
      fetchHlr
    } = this.props

    fetchHlr({ msisdn })
  }

  handleChangeSearch = (event, isAvailable) => {
    const { connectedServices, availableServices } = this.props
    if (isAvailable) {
      if (availableServices) {
        this.setState({
          availableServicesValueSearch: event,
          availableServices: availableServices.filter(el => {
            return el.ServiceName.toLowerCase().includes(event.toLowerCase())
          })
        })
      }
    } else {
      if (connectedServices) {
        this.setState({
          сonnectedServicesValueSearch: event,
          connectedServices: connectedServices.filter(el => {
            return el.ServiceName.toLowerCase().includes(event.toLowerCase())
          })
        })
      }
    }
  }

  handleConnectedServiceRequest = () => {
    const {
      personalAccount: { Msisdn: msisdn },
      getConnectedServices
    } = this.props

    this.setState({
      connectedServices: null,
      сonnectedServicesValueSearch: ''
    })
    getConnectedServices({ msisdn })
  }

  handleAvailableServiceRequest = () => {
    const {
      personalAccount: { Msisdn: msisdn },
      getAvailableServices
    } = this.props

    this.setState({
      availableServices: null,
      availableServicesValueSearch: ''
    })
    getAvailableServices({ msisdn })
  }

  handleHistoryClick = () => {
    const {
      location,
      history,
      personalAccount: { Msisdn: msisdn, BillingBranchId: branchId },
      getServiceHistory
    } = this.props

    history.push(`${routeMatch(location.pathname, 'history/services')}${location.search}`)

    getServiceHistory({
      msisdn,
      branchId,
      endDate: moment().format('YYYY-MM-DD'),
      startDate: moment().subtract('month', 1).format('YYYY-MM-DD'),
      message: 'История услуг'
    })
  }

  get isASSeller () {
    const { user } = this.props
    return user.isASSeller
  }

  chooseAddition = () => {
    const { handleToggleServicesPendingOrders, handlingId } = this.props
    const { сonnectedServicesValueSearch, availableServicesValueSearch } = this.state
    const serviceAddition = [
      shouldRate(serviceFeatureId) && { content: <RatingMenu currentFeatureId={serviceFeatureId} /> },
      {
        content: (
          <ServiceSearchBar
            isAvailableServices={false}
            searchValue={сonnectedServicesValueSearch}
            onChangeSearch={this.handleChangeSearch}
          />
        ),
        onClick: null,
        isSearchBar: true
      },
      { content: <SyncIcon />, onClick: this.handleConnectedServiceRequest },
      { content: <ClockCircleIcon />, onClick: handleToggleServicesPendingOrders },
      { content: 'История изменений', onClick: this.handleHistoryClick }
    ]

    const availibleServiceAddition = [
      shouldRate(availableServiceFeatureId) && {
        content: <RatingMenu currentFeatureId={availableServiceFeatureId} />
      },
      {
        content: (
          <ServiceSearchBar
            isAvailableServices
            searchValue={availableServicesValueSearch}
            onChangeSearch={this.handleChangeSearch}
          />
        ),
        onClick: null,
        isSearchBar: true
      },
      { content: <SyncIcon />, onClick: this.handleAvailableServiceRequest }
    ]

    const forwardingAddition = [
      shouldRate(forwardingFeatureId) && { content: <RatingMenu currentFeatureId={forwardingFeatureId} /> },
      { content: !this.isASSeller && <SyncIcon />, onClick: this.handleRefreshHlr },
      {
        content: handlingId && !this.isASSeller && (
          <ConfirmButton
            text='Сбросить все'
            confirmText='Вы уверены, что хотите сбросить все настройки переадресации?'
            onConfirm={this.handleResetHlr}
          />
        )
      }
    ]

    if (location.pathname.includes('/connected')) {
      return serviceAddition
    } else if (location.pathname.includes('/forwarding')) {
      return forwardingAddition
    } else {
      return availibleServiceAddition
    }
  }

  get serviceMenu () {
    const menuArray = [
      { path: `${this.props.match.url}/connected`, text: 'Подключенные' },
      { path: `${this.props.match.url}/available`, text: 'Доступные' }
    ]

    if (!this.isASSeller) {
      menuArray.push({ path: `${this.props.match.url}/forwarding`, text: 'Переадресация' })
    }

    return menuArray
  }

  renderServiceTable = () => <ServiceTable connectedServices={this.state.connectedServices} />
  renderAvailableServiceTable = () => <AvailableServiceTable availableServices={this.state.availableServices} />
  renderForwarding = () => <Forwarding />

  render () {
    const { isConnectedServicesLoading, isAvailableServicesLoading, isHlrLoading, match } = this.props

    return (
      <Fragment>
        <ServiceHistoryModal />
        <CardNew
          header='Услуги'
          menu={this.serviceMenu}
          additional={this.chooseAddition()}
          isContentLoading={isConnectedServicesLoading && isAvailableServicesLoading && isHlrLoading}
          content={
            <Fragment>
              <Route path={`${match.url}/connected`} render={this.renderServiceTable} />
              <Route path={`${match.url}/available`} render={this.renderAvailableServiceTable} />
              <Route path={`${match.url}/forwarding`} render={this.renderForwarding} />
            </Fragment>
          }
        />
      </Fragment>
    )
  }
}

export default Service

const ClockCircleIcon = styled(ClockCircleOutlined)`
  font-size: 21px;
`
const SyncIcon = styled(SyncOutlined)`
  font-size: 21px;
`
