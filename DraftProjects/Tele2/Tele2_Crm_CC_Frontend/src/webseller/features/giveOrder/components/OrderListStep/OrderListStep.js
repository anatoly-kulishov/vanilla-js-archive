import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Spin, Row, Col } from 'antd'
import styled from 'styled-components'
import { Input, Title } from 'webseller/components'
import { SCROLL_CSS, T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import LoadingSpinner from 'components/LoadingSpinner'
import Order from './Order'

export default function OrderListStep ({
  salesOfficeId,
  orderList,
  isOrderListShow,
  isOrderListLoading,
  getOrderList,
  resetGiveOrderProcess
}) {
  const history = useHistory()

  const [form] = Form.useForm()

  const [eshopOrderIdValue, setEshopOrderIdValue] = useState('')

  useEffect(() => {
    let params = {}
    if (eshopOrderIdValue) {
      params = {
        ...params,
        EshopOrderId: eshopOrderIdValue
      }
    }
    if (salesOfficeId) {
      getOrderList({
        SaleOfficesId: [Number(salesOfficeId)],
        Status: ['DELIVERY', 'PICKUP'],
        Type: ['b2c'],
        ...params
      })
    }
  }, [salesOfficeId, eshopOrderIdValue])

  const onFinishForm = values => setEshopOrderIdValue(values.eshopOrderId)

  const navigateToGiveOrderHistory = () => {
    resetGiveOrderProcess()
    history.push('give-orders-history')
  }

  if (isOrderListLoading || !isOrderListShow) {
    return <Spin spinning={isOrderListLoading} indicator={<LoadingSpinner />} />
  }

  return (
    <Container>
      <RowSpaceBetween>
        <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
          Интернет-заказы
        </Title>
        {orderList?.totalCount ? <span> Всего: {orderList.totalCount}</span> : null}
      </RowSpaceBetween>
      <Main>
        <Form form={form} onFinish={onFinishForm}>
          <Row gutter={10} align='middle'>
            <Col span={8}>
              <FormItem name='eshopOrderId'>
                <Input placeholder='Номер заказа' />
              </FormItem>
            </Col>
            <Col span={2}>
              <Button type='primary' htmlType='submit'>
                Найти
              </Button>
            </Col>
            <Col span={14}>
              <Row justify='end'>
                <Button type='text' onClick={navigateToGiveOrderHistory}>
                  Твои результаты
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
        <ScrollWrapper>
          <OrderList>
            {orderList?.orders?.map(order => (
              <Order order={order} key={order?.eshopOrderId} />
            ))}
          </OrderList>
        </ScrollWrapper>
        {!orderList?.orders?.length && <EmptyMessage>Ничего не найдено</EmptyMessage>}
      </Main>
    </Container>
  )
}

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  flex: 1;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  height: 0px;
`

const RowSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ScrollWrapper = styled.div`
  flex: 1;
  margin: 9px -15px -15px;
  padding: 15px 15px 15px;
  overflow: auto;

  ${SCROLL_CSS}
`

const OrderList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`

const EmptyMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 24px;
`

const FormItem = styled(Form.Item)`
  margin: 0;
`
