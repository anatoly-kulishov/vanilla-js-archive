/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import get from 'lodash/get'

import GroupsTable from './GroupsTable'
import Filter from './Filter'
import SubscribersModal from './SubscribersModal'
import MessagesHistoryModal from './MessagesHistoryModal'
import GroupIcon from './GroupIcon'

class Groups extends PureComponent {
  propTypes = {
    isDeleteGroupUser: PropTypes.bool,
    handlingId: PropTypes.number,
    personalAccount: PropTypes.object,
    groupList: PropTypes.array,
    groupInfo: PropTypes.object,
    groupsSubscribers: PropTypes.object,
    fetchSubscribersList: PropTypes.func,
    clearSubscribersList: PropTypes.func,
    fetchGroupList: PropTypes.func,
    deleteGroup: PropTypes.func,
    validateAutopayService: PropTypes.func,
    getUnpaidChargeDataAndShowAlert: PropTypes.func,
    processingParameters: PropTypes.object,
    fetchGroupNotificationMessages: PropTypes.func
  }

  state = {
    isSubscribersModalToggled: false,
    isHistoryMessageToggled: false,
    record: null,
    title: '',
    isOwner: false,
    filterState: 1, // default по постановке 44924
    groupActiveFilter: null,
    subcribersActiveFilter: null
  }

  componentDidMount () {
    const {
      fetchGroupNotificationMessages,
      personalAccount: {
        SubscriberId: subscriberId,
        BillingBranchId: branchId
      }
    } = this.props

    fetchGroupNotificationMessages({
      subscriberId,
      branchId
    })
  }

  toggleSubscribersModal = ({ isToggled, record }) => {
    const { fetchSubscribersList, clearSubscribersList, personalAccount: { Msisdn } } = this.props
    const { filterState } = this.state

    if (isToggled) {
      this.setState({
        isSubscribersModalToggled: isToggled,
        record,
        title: record.ProductName
      })
      fetchSubscribersList({
        Msisdn,
        groupId: record.GroupId,
        SubscriberStatusId: filterState,
        preGroupId: record.PreGroupId
      })
    } else {
      this.setState({ isSubscribersModalToggled: isToggled, subscribersTitle: '' })
      clearSubscribersList()
    }
  }

  toggleMessageHistory = (isToggled) => {
    const {
      fetchGroupNotificationMessages,
      personalAccount: {
        SubscriberId: subscriberId,
        BillingBranchId: branchId
      }
    } = this.props

    this.setState({
      isHistoryMessageToggled: isToggled
    })
    if (isToggled) {
      fetchGroupNotificationMessages({
        subscriberId,
        branchId
      })
    }
  }

  handleFilterChange = params => {
    const { isGroupFilter, filterState } = params
    const {
      fetchGroupList,
      fetchSubscribersList,
      personalAccount: { Msisdn: msisdn }
    } = this.props
    const { record } = this.state
    if (isGroupFilter) {
      fetchGroupList({ msisdn, subscriberStatusId: filterState })
      this.setState({ groupActiveFilter: filterState })
    } else {
      fetchSubscribersList({
        msisdn,
        groupId: record.GroupId,
        preGroupId: record.PreGroupId,
        subscriberStatusId: filterState
      })
      this.setState({ subcribersActiveFilter: filterState })
    }
  }

  style = { margin: '0 16px' }

  render () {
    const {
      isDeleteGroupUser,
      groupList,
      groupInfo,
      groupsSubscribers,
      personalAccount: {
        SubscriberFullInfo,
        ClientId: clientId,
        BillingBranchId: subscriberBranchId
      },
      deleteGroup,
      validateAutopayService,
      getUnpaidChargeDataAndShowAlert,
      handlingId,
      processingParameters
    } = this.props
    const {
      title,
      groupActiveFilter,
      subcribersActiveFilter,
      isSubscribersModalToggled,
      isHistoryMessageToggled
    } = this.state

    const {
      Msisdn: msisdn,
      SubscriberTypeId: subscriberTypeId,
      SubscriberStatusId: subscriberStatusId,
      SubscriberId: subscriberId,
      RatePlanId: ratePlanId
    } = SubscriberFullInfo?.SubscriberInfo ?? {}

    const paramsForDeleting = {
      handlingId,
      msisdn,
      clientId,
      subscriberId,
      subscriberBranchId,
      subscriberTypeId,
      subscriberStatusId
    }
    const groupsMessagesCount = get(groupsSubscribers, 'subscriberMessages.CountAlls', '?')
    return (
      <Fragment>
        <SubscribersModal
          title={title}
          ratePlanId={ratePlanId}
          isDeleteGroupUser={isDeleteGroupUser}
          subcribersActiveFilter={subcribersActiveFilter}
          isToggled={isSubscribersModalToggled}
          groupsSubscribers={groupsSubscribers}
          deleteGroup={deleteGroup}
          validateAutopayService={validateAutopayService}
          getUnpaidChargeDataAndShowAlert={getUnpaidChargeDataAndShowAlert}
          toggleModal={this.toggleSubscribersModal}
          handleFilterChange={this.handleFilterChange}
          processingParameters={processingParameters}
          paramsForDeleting={paramsForDeleting}
        />
        <MessagesHistoryModal
          groupsSubscribers={groupsSubscribers}
          isHistoryMessageToggled={isHistoryMessageToggled}
          toggleMessageHistory={this.toggleMessageHistory}
        />
        <Header>
          <Filter
            isGroupFilter
            activeFilter={groupActiveFilter}
            countAll={get(groupInfo, 'CountAll', null)}
            countCurrent={get(groupInfo, 'CountCurrent', null)}
            countOld={get(groupInfo, 'CountOld', null)}
            countPreliminare={get(groupInfo, 'CountPreliminare', null)}
            handleFilterChange={this.handleFilterChange}
          />
          <GroupIcon icon='message' style={this.style} count={groupsMessagesCount} onClick={() => this.toggleMessageHistory(true)} />
        </Header>
        <GroupsTable
          msisdn={msisdn}
          ratePlanId={ratePlanId}
          isDeleteGroupUser={isDeleteGroupUser}
          groupList={groupList}
          countAll={get(groupInfo, 'CountAll', null)}
          deleteGroup={deleteGroup}
          validateAutopayService={validateAutopayService}
          getUnpaidChargeDataAndShowAlert={getUnpaidChargeDataAndShowAlert}
          paramsForDeleting={paramsForDeleting}
          toggleSubscribersModal={this.toggleSubscribersModal}
        />
      </Fragment>
    )
  }
}

export default Groups

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
