/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

import AbonentsGrid from './components/AbonentsGrid'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { B2B_ABONENT_MODAL } from 'constants/logModalNames'
import AbonentsTable from './components/AbonentsTable'

export default function B2BAbonentModal ({
  isVisible,
  subscriberListState,
  personalAccount,
  fetchUser,
  getBalance,
  getActiveSubscriptions,
  getConnectedServices,
  getAvailableServices,
  createHandling,
  checkRepeatedHandling,
  getPersonalAccount,
  changeAbonentsModalVisibility,
  getSubscriberList
}) {
  B2BAbonentModal.propTypes = {
    isVisible: PropTypes.bool,
    subscriberListState: PropTypes.object,
    personalAccount: PropTypes.object,
    fetchUser: PropTypes.func,
    getBalance: PropTypes.func,
    getActiveSubscriptions: PropTypes.func,
    getConnectedServices: PropTypes.func,
    getAvailableServices: PropTypes.func,
    createHandling: PropTypes.func,
    getPersonalAccount: PropTypes.func,
    changeAbonentsModalVisibility: PropTypes.func,
    checkRepeatedHandling: PropTypes.func,
    getSubscriberList: PropTypes.func
  }

  const [tab, setTab] = useState('List')
  const [pageNumber, setPageNumber] = useState(1)

  const handleClose = () => {
    changeAbonentsModalVisibility()
    logIfEnabled({ type: MODAL_CLOSE, log: B2B_ABONENT_MODAL })
    setTab('List')
  }

  useEffect(() => {
    if (isVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: B2B_ABONENT_MODAL })
    }
  }, [isVisible])

  return (
    <SubscribersModal
      title='Абоненты'
      visible={isVisible}
      width='90%'
      onCancel={handleClose}
      footer={null}
    >
      <TabSwitcher>
        <Tab isActive={tab === 'List'} onClick={() => setTab('List')}>Список абонентов</Tab>
        <Tab isActive={tab === 'Act'} onClick={() => setTab('Act')}>Закон Кудрявцева</Tab>
      </TabSwitcher>
      { tab === 'List' &&
        <AbonentsGrid
          personalAccount={personalAccount}
          getSubscriberList={getSubscriberList}
          changeAbonentsModalVisibility={changeAbonentsModalVisibility}
          getPersonalAccount={getPersonalAccount}
          fetchUser={fetchUser}
          getBalance={getBalance}
          getActiveSubscriptions={getActiveSubscriptions}
          getConnectedServices={getConnectedServices}
          getAvailableServices={getAvailableServices}
          createHandling={createHandling}
          checkRepeatedHandling={checkRepeatedHandling}
          subscriberListState={subscriberListState}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      }
      { tab === 'Act' &&
        <AbonentsTable
          subscriberListState={subscriberListState}
          getSubscriberList={getSubscriberList}
          personalAccount={personalAccount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      }
    </SubscribersModal>
  )
}

const SubscribersModal = styled(Modal)`
  top: 15%;
    
  .ant-modal-body {
    padding: 0px;
    padding-top: 20px;
  }

  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
`
const TabSwitcher = styled.div`
  display: flex;
  margin: 0 0 20px 20px;
`
const Tab = styled.div`
  background: ${({ isActive }) => isActive ? '#3fcbff' : ''};
  color: ${({ isActive }) => isActive ? 'white' : 'black'};
  padding: 16px 10px;
  :hover {
    color: #40bfee;
    cursor: pointer;
  }
`
