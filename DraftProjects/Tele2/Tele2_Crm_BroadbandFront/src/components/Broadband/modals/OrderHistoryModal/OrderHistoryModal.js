import React, { useCallback, useEffect } from 'react'
import { Modal, Tabs } from 'antd'
import { bool } from 'prop-types'
import styled from 'styled-components'

import OrderRequestHistoryTable from 'components/Broadband/modals/OrderHistoryModal/OrderRequestHistoryTable'
import OrderHistoryTable from 'components/Broadband/modals/OrderHistoryModal/OrderHistoryTable'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'

const { TabPane } = Tabs

export const HISTORY_MODAL_TABS_IDS = {
  ORDER_HISTORY_TABLE: '1',
  ORDER_REQUEST_HISTORY_TABLE: '2'
}

export const DEFAULT_PAGINATION_PARAMS = {
  SKIP_RECORD_COUNT: 0,
  TAKE_RECORD_COUNT: 10
}

const OrderHistoryModal = ({ isVisible, handleClose }) => {
  const { getOrderChangeHistory, getOrderEditSessionHistory, orderState, orderChangeHistory, orderEditSessionHistory } =
    useBroadbandContext()

  useEffect(() => {
    if (isVisible && orderState.OrderId) {
      getOrderChangeHistory({
        OrderId: orderState.OrderId,
        SkipRecordCount: DEFAULT_PAGINATION_PARAMS.SKIP_RECORD_COUNT,
        TakeRecordCount: DEFAULT_PAGINATION_PARAMS.TAKE_RECORD_COUNT
      })
    }
  }, [isVisible])

  const onChangeTab = useCallback(
    tabId => {
      if (tabId === HISTORY_MODAL_TABS_IDS.ORDER_HISTORY_TABLE) {
        getOrderChangeHistory({
          OrderId: orderState.OrderId,
          SkipRecordCount: DEFAULT_PAGINATION_PARAMS.SKIP_RECORD_COUNT,
          TakeRecordCount: DEFAULT_PAGINATION_PARAMS.TAKE_RECORD_COUNT
        })
      }
      if (tabId === HISTORY_MODAL_TABS_IDS.ORDER_REQUEST_HISTORY_TABLE) {
        getOrderEditSessionHistory({
          OrderId: orderState.OrderId,
          SkipRecordCount: DEFAULT_PAGINATION_PARAMS.SKIP_RECORD_COUNT,
          TakeRecordCount: DEFAULT_PAGINATION_PARAMS.TAKE_RECORD_COUNT
        })
      }
    },
    [orderState.OrderId]
  )

  return (
    <StyledModal zIndex='1002' width='85%' centered visible={isVisible} onCancel={handleClose} footer={null}>
      <Tabs defaultActiveKey={HISTORY_MODAL_TABS_IDS.ORDER_HISTORY_TABLE} onChange={onChangeTab}>
        <TabPane tab='Изменения заказа' key={HISTORY_MODAL_TABS_IDS.ORDER_HISTORY_TABLE}>
          <OrderHistoryTable data={orderChangeHistory.data?.Data?.OrderChanges} isLoading={orderChangeHistory.isLoading} />
        </TabPane>
        <TabPane tab='История запросов изменений заказа' key={HISTORY_MODAL_TABS_IDS.ORDER_REQUEST_HISTORY_TABLE}>
          <OrderRequestHistoryTable
            data={orderEditSessionHistory.data?.sessions}
            isLoading={orderEditSessionHistory.isLoading}
          />
        </TabPane>
      </Tabs>
    </StyledModal>
  )
}

const propTypes = { isVisible: bool, handleClose: Function }

OrderHistoryModal.propTypes = propTypes

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 8px 16px;
  }
`

export default OrderHistoryModal
