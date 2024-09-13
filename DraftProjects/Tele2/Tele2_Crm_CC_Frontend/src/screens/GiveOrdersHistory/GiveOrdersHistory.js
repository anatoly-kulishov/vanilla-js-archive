import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Row, Col, Skeleton } from 'antd'
import Order from './components/Order'

const skeletonParagraphStyle = { rows: 1, width: '40%' }

export default function GiveOrdersHistory ({
  user,
  statisticInfo,
  isStatisticInfoShow,
  isStatisticInfoLoading,
  historyInfo,
  isHistoryInfoShow,
  isHistoryInfoLoading,
  getOrdersStatistic,
  getOrdersHistory
}) {
  useEffect(() => {
    getOrdersStatistic(user.userId)
    getOrdersHistory(user.userId)
  }, [])

  return (
    <>
      <Row gutter={[56, 19]}>
        <Col span={4} />
        <Col span={16} style={{ padding: 44 }}>
          <Title>История выдачи заказов</Title>
          {isStatisticInfoLoading || isHistoryInfoLoading ? (
            <SkeletonWrapper>
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
            </SkeletonWrapper>
          ) : (
            <>
              {isStatisticInfoShow && isHistoryInfoShow && (
                <>
                  <Results>
                    <RowSpaceBetween>
                      <div>Выданные</div>
                      <Bold>{statisticInfo?.completed}</Bold>
                    </RowSpaceBetween>
                    <RowSpaceBetween>
                      <div>Отмененнее</div>
                      <Bold>{statisticInfo?.canceled}</Bold>
                    </RowSpaceBetween>
                  </Results>
                  <OrderList>
                    {historyInfo?.orders.map((order) => <Order order={order} key={order?.eshopOrderId} />)}
                  </OrderList>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

const Title = styled.div`
  font-family: T2_DisplaySerif_Regular;
  font-size: 18px;
  font-weight: 400;
`

const OrderList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 24px;
`

const Results = styled.div`
  width: 40%;
  padding: 16px;
  border-radius: 16px;
  background-color: #f7f8fb;
  margin-top: 24px;
`

const RowSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Bold = styled.div`
  font-weight: 400;
`

const SkeletonWrapper = styled.div`
  margin-top: 40px;
`
