/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Popconfirm, Switch } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import get from 'lodash/get'
import { checkRight } from 'utils/helpers'
import ContentBalanceHistoryModal from './ContentBalanceHistoryModal'

export default function Content (props) {
  const {
    user,
    balance,
    personalAccount: {
      Msisdn: msisdn,
      Email: email,
      ClientCategory: clientCategory,
      BillingBranchId: branchId,
      ClientId: clientId,
      PersonalAccountId: account,
      OwnerClientId: parentClientId,
      SubscriberId: subscriberId,
      SubscriberFullInfo
    },
    handlingId,
    balance: {
      contentBalanceHistory,
      isContentBalanceHistoryLoading,
      isAddingContentBalanceLoading,
      isClosingContentBalanceLoading
    },
    mnpMarkers,
    isClient,
    addContentBalance,
    closeContentBalance,
    getContentBalanceHistory
  } = props
  const payPackPersonalAccountId = mnpMarkers?.PayPackPersonalAccount
  const {
    SubscriberTypeId: subscriberTypeId,
    SubscriberStatusId: subscriberStatusId
  } = SubscriberFullInfo?.SubscriberInfo ?? {}

  const isAdminContentBalance = checkRight(user, 'CC:AdminContentBalance')
  const balanceObjectPath = isClient ? 'balance.client.clientBalances' : 'balance.subscriber.subscriberBalances'

  const balances = get(balance, balanceObjectPath, null)
  const isContentBalanceActive = get(balances, 'isContentBalanceActive', false)
  const content = isContentBalanceActive ? get(balances, 'content', '-') : '-'
  const [isContentBalanceHistoryModalVisible, onContentBalanceHistoryModalOpen] = useState(false)
  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    if (isContentBalanceActive) {
      setChecked(true)
    }
  }, [isContentBalanceActive])

  const handleAccept = () => {
    const manageParameters = {
      isClient,
      branchId,
      clientId,
      account,
      subscriberId,
      msisdn,
      handlingId,
      email,
      subscriberTypeId,
      subscriberStatusId,
      balanceParams: {
        msisdn,
        personalAccountId: account,
        branchId,
        clientCategory,
        clientId,
        parentClientId,
        payPackPersonalAccountId
      }
    }
    if (isChecked) {
      closeContentBalance(manageParameters)
    } else {
      addContentBalance(manageParameters)
    }
  }

  const handleOpenContentBalanceHistoryModal = () => {
    onContentBalanceHistoryModalOpen(true)
    getContentBalanceHistory({
      isClient,
      branchId,
      clientId,
      account,
      subscriberId,
      msisdn
    })
  }

  const handleCloseContentBalanceHistoryModal = () => {
    onContentBalanceHistoryModalOpen(!isContentBalanceHistoryModalVisible)
  }

  return (
    <Fragment>
      <ContentBalanceHistoryModal
        isContentBalanceHistoryModalVisible={isContentBalanceHistoryModalVisible}
        onCancel={handleCloseContentBalanceHistoryModal}
        history={contentBalanceHistory}
        isLoading={isContentBalanceHistoryLoading}
      />
      <Wrapper>
        <div>{content}</div>
        <Popconfirm
          disabled={!handlingId && isAdminContentBalance}
          placement='bottom'
          title={`Подтвердите ${isChecked ? 'отключение' : 'подключение'} контентного баланса`}
          onConfirm={handleAccept}
          okText='Подтвердить'
          cancelText='Отмена'
          trigger='click'
        >
          <Switch
            disabled={!handlingId && isAdminContentBalance}
            size='small'
            checked={isChecked}
            loading={isAddingContentBalanceLoading || isClosingContentBalanceLoading}
          />
        </Popconfirm>
        <StyledClockCircleOutlined onClick={handleOpenContentBalanceHistoryModal} />
      </Wrapper>
    </Fragment>
  )
}

Content.propTypes = {
  isClient: PropTypes.bool,
  handlingId: PropTypes.number,
  user: PropTypes.object,
  personalAccount: PropTypes.object,
  mnpMarkers: PropTypes.object,
  balance: PropTypes.object,
  addContentBalance: PropTypes.func,
  closeContentBalance: PropTypes.func,
  getContentBalanceHistory: PropTypes.func
}

const Wrapper = styled.div`
  height: 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledClockCircleOutlined = styled(ClockCircleOutlined)`
  cursor: pointer;
  margin-right: 3px;

  & svg {
    width: 20px;
    height: 20px;
  }

  color: rgba(0, 0, 0, 0.65);
`
