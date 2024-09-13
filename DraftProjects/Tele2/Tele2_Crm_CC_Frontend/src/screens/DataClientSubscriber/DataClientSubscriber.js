/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router'
import { Collapse, Spin } from 'antd'
import styled from 'styled-components'
import CardNew from 'components/Card'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import { checkRight } from 'utils/helpers'

import LoadingSpinner from 'components/LoadingSpinner'
import MainDataSubscriber from './componentsSubscriber/MainDataSubscriber'
import ContactInformationSubscriber from './componentsSubscriber/ContactInformationSubscriber'

import MainDataClient from './componentsClient/MainDataClient'
import ContractInformationClient from './componentsClient/ContractInformationClient'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import RatingMenu from 'containers/RatingMenu'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import { cardModes } from 'constants/cardModes'
import NotificationsSubscriber from './componentsSubscriber/NotificationsSubscriber'
const { dataFeatureId } = ratingFeatureIds

const Panel = Collapse.Panel

function checkNotificationsVisibility (user) {
  const isReadSubscriberNotification = checkRight(user, 'CC:ReadSubscriberNotification')
  const { isASSeller } = user

  return !isASSeller && isReadSubscriberNotification
}

export default class DataClientSubscriber extends Component {
  static propTypes = {
    match: PropTypes.object,
    cardMode: PropTypes.number,
    handlingId: PropTypes.number,
    location: PropTypes.object,
    dataClientSubscriber: PropTypes.object,
    personalAccountState: PropTypes.object,
    user: PropTypes.object,
    fetchDataSubscriber: PropTypes.func,
    fetchDataClient: PropTypes.func,
    mnpAbonentData: PropTypes.object,
    updateSubscriberData: PropTypes.func,
    updateClientData: PropTypes.func,
    revoke: PropTypes.func,
    deleteFromSpace: PropTypes.func,
    postSendAgree: PropTypes.func,
    subscriberNotifications: PropTypes.object,
    deleteSubscriberNotification: PropTypes.func,
    modifySubscriberNotification: PropTypes.func,
    fetchSubscriberNotifications: PropTypes.func,
    isWebSeller: PropTypes.bool
  }

  state = {
    msisdn: '',
    prevPropsCardMode: cardModes.client,
    menu: [{ path: `${this.props.match.url}/client`, text: 'Клиента' }]
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { personalAccountState, fetchDataSubscriber, fetchDataClient, cardMode, fetchSubscriberNotifications, user } =
      nextProps
    const { Msisdn, ClientId, BillingBranchId, OwnerClientId, SubClientId, SubscriberId } =
      personalAccountState.personalAccount

    const isNotificationsVisible = checkNotificationsVisibility(user)

    if (ClientId && prevState.msisdn !== Msisdn) {
      if (cardMode !== cardModes.client) {
        fetchDataSubscriber({
          Msisdn: Msisdn,
          BranchId: BillingBranchId,
          ClientId: ClientId || SubClientId,
          isB2b: true
        })
        fetchDataClient({
          Msisdn: Msisdn,
          BranchId: BillingBranchId,
          ClientId: OwnerClientId || ClientId
        })
        if (isNotificationsVisible) {
          fetchSubscriberNotifications({ branchId: BillingBranchId, msisdn: Msisdn, subscriberId: SubscriberId })
        }
      } else {
        fetchDataClient({
          BranchId: BillingBranchId,
          ClientId: OwnerClientId || ClientId
        })
      }
      return { msisdn: Msisdn }
    }

    if (nextProps.cardMode !== prevState.prevPropsCardMode) {
      let menu
      if (nextProps.cardMode !== cardModes.client) {
        menu = [
          { path: `${nextProps.match.url}/client`, text: 'Клиента' },
          { path: `${nextProps.match.url}/subscriber`, text: 'Абонента' }
        ]
      } else {
        menu = [{ path: `${nextProps.match.url}/client`, text: 'Клиента' }]
      }
      return {
        menu,
        prevPropsCardMode: nextProps.cardMode
      }
    }

    return null
  }

  style = { padding: '10px' }
  defaultActiveKey = ['client_data']

  renderRoutes = () => {
    const { match, cardMode } = this.props

    return (
      <div>
        <Route path={`${match.url}/client`} render={() => this.renderClient()} />
        {cardMode !== cardModes.client && (
          <Route path={`${match.url}/subscriber`} render={() => this.renderSubscriber()} />
        )}
      </div>
    )
  }

  renderClient = () => {
    const { dataClientSubscriber } = this.props

    return (
      <Fragment>
        <Spin
          spinning={dataClientSubscriber.isLoadingDataClient || dataClientSubscriber.dataSubscriber === {}}
          indicator={<LoadingSpinner spin />}
        >
          {!dataClientSubscriber.errorDataClient && (
            <CollapseWrapper bordered={false} expandIconPosition='right'>
              <PanelWrapper header={<PanelHeaderText>Основные данные по клиенту</PanelHeaderText>}>
                <MainDataClient dataClientSubscriber={dataClientSubscriber} />
              </PanelWrapper>
              <PanelWrapper header={<PanelHeaderText>Информация по договору</PanelHeaderText>}>
                <ContractInformationClient dataClientSubscriber={dataClientSubscriber} />
              </PanelWrapper>
            </CollapseWrapper>
          )}
          {dataClientSubscriber.errorDataClient && <div style={this.style}>Ошибка загрузки данных!</div>}
        </Spin>
      </Fragment>
    )
  }

  renderSubscriber = () => {
    const {
      dataClientSubscriber,
      personalAccountState,
      mnpAbonentData,
      updateSubscriberData,
      updateClientData,
      revoke,
      user,
      personalAccountState: { personalAccount },
      handlingId,
      deleteFromSpace,
      postSendAgree,
      subscriberNotifications,
      modifySubscriberNotification,
      deleteSubscriberNotification,
      fetchSubscriberNotifications,
      isWebSeller
    } = this.props
    const ClientCategory = get(personalAccountState, 'personalAccount.ClientCategory', null)
    const isAdminClientInformation = checkRight(user, 'CC:AdminClientInformation')
    const isAdminPep = checkRight(user, 'CC:AdminPep')
    const isAdminSubscriberNotification = checkRight(user, 'CC:AdminSubscriberNotification')

    const isNotificationsVisible = checkNotificationsVisibility(user)

    return (
      <Fragment>
        <Spin
          spinning={dataClientSubscriber.isLoadingDataSubscriber || dataClientSubscriber.dataClient === {}}
          indicator={<LoadingSpinner spin />}
        >
          <CollapseWrapper defaultActiveKey={this.defaultActiveKey} bordered={false} expandIconPosition='right'>
            {!dataClientSubscriber.errorSubscriber && dataClientSubscriber.dataSubscriber && (
              <>
                <PanelWrapper
                  key={'client_data'}
                  header={<PanelHeaderText>Основные данные по абоненту</PanelHeaderText>}
                >
                  <MainDataSubscriber
                    handlingId={handlingId}
                    personalAccount={personalAccount}
                    mnpAbonentData={mnpAbonentData}
                    dataClientSubscriber={dataClientSubscriber}
                    ClientCategory={ClientCategory}
                    updateSubscriberData={updateSubscriberData}
                    updateClientData={updateClientData}
                    isAdminClientInformation={isAdminClientInformation}
                    isAdminPep={isAdminPep}
                    revoke={revoke}
                    deleteFromSpace={deleteFromSpace}
                    postSendAgree={postSendAgree}
                    user={user}
                    isWebSeller={isWebSeller}
                  />
                </PanelWrapper>
                <PanelWrapper key={'contract_info'} header={<PanelHeaderText>Информация по договору</PanelHeaderText>}>
                  <ContactInformationSubscriber dataClientSubscriber={dataClientSubscriber} />
                </PanelWrapper>
              </>
            )}
            {dataClientSubscriber.errorSubscriber && <div style={this.style}>Ошибка загрузки данных!</div>}

            {isNotificationsVisible && !subscriberNotifications.isSubscriberNotificationsError && (
              <PanelWrapper key={'notifications'} header={<PanelHeaderText>Нотификации</PanelHeaderText>}>
                <NotificationsSubscriber
                  handlingId={handlingId}
                  personalAccount={personalAccount}
                  notifications={subscriberNotifications}
                  onActivate={modifySubscriberNotification}
                  onDeactivate={deleteSubscriberNotification}
                  onSearch={fetchSubscriberNotifications}
                  editable={isAdminSubscriberNotification}
                />
              </PanelWrapper>
            )}
            {isNotificationsVisible && subscriberNotifications.isSubscriberNotificationsError && (
              <div style={this.style}>Ошибка загрузки нотификаций!</div>
            )}
          </CollapseWrapper>
        </Spin>
      </Fragment>
    )
  }

  dataAdditional = [shouldRate(dataFeatureId) && { content: <RatingMenu currentFeatureId={dataFeatureId} /> }]

  render () {
    const { location } = this.props

    return (
      <CardNew
        header={'Данные'}
        menu={this.state.menu}
        additional={this.dataAdditional}
        content={this.renderRoutes()}
        location={location}
      />
    )
  }
}

const CollapseWrapper = styled(Collapse)`
  padding: 0 0px;

  & .ant-collapse {
    background: white;
  }
  & > .ant-collapse-item {
    & > .ant-collapse-header {
      background: white;
      padding-left: 20px;
      & .arrow {
        display: none;
      }
    }

    & .ant-collapse-content {
      background: white;
      padding-bottom: 5px;
    }
  }
`

const PanelWrapper = styled(Panel)`
  & .ant-collapse-content {
    padding: 0;
    & > .ant-collapse-content-box {
      padding-bottom: 0px;
    }
  }
  & .ant-table-pagination.ant-pagination {
    margin: 7px 5px;
  }
`

const PanelHeaderText = styled.div`
  font-size: 16px;
  cursor: pointer;
  font-family: T2HalvarBreit_ExtraBold;
`
