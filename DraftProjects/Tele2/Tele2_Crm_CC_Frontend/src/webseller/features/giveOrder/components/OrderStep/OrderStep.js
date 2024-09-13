import React, { useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'
import { Spin } from 'antd'
import moment from 'moment'
import { denormalizeNumber } from 'webseller/helpers/index'
import { Button } from 'webseller/components'
import LoadingSpinner from 'components/LoadingSpinner'

const dayFormat = 'D MMMM'

export default function OrderStep ({
  orderInfo,
  selectedOrder,
  isOrderInfoShow,
  isOrderInfoLoading,
  getOrderInfo,
  giveOrder,
  toPrevStep
}) {
  useEffect(() => {
    getOrderInfo(selectedOrder)
  }, [])

  const onClickGiveOrder = () => {
    giveOrder(orderInfo)
  }

  if (isOrderInfoLoading || !isOrderInfoShow) {
    return <Spin spinning indicator={<LoadingSpinner />} />
  }

  return (
    <Container>
      <Main>
        <Row>
          <Title>{orderInfo?.id}</Title>
          <Labels>
            <Label>{orderInfo?.status?.description}</Label>
            {orderInfo?.isMnp && <Label>Перевод в Tele2</Label>}
          </Labels>
        </Row>
        <Text marginBottom>Создан {moment(orderInfo?.createdOn).format(dayFormat)}</Text>
        <Text marginBottom>Выдача до {moment(orderInfo?.cancelAfter).format(dayFormat)} включительно</Text>
        <Divider />
        {orderInfo?.simCards?.map((simCard) => (
          <Row key={uuid()}>
            {simCard && (
              <>
                <Text>
                  <span>{simCard?.tariff?.name}</span>,
                  <span>{denormalizeNumber(simCard?.msisdn?.value)}</span>,
                  <span>{simCard?.simTypeId === 1 ? 'SIM' : 'ESIM'}</span>
                </Text>
                <Text>{simCard?.tariff?.price} ₽</Text>
              </>
            )}
          </Row>
        ))}
        {orderInfo?.mnpMsisdn && (
          <Row>
            <Text>
              Переносимый номер:
            </Text>
            <Text>
              {denormalizeNumber(orderInfo.mnpMsisdn)}
            </Text>
          </Row>
        )}
        <Row>
          <Text bold>Итого к оплате</Text>
          <Text bold>{orderInfo?.price} ₽</Text>
        </Row>
        <Card>
          <CardTitle>Контакты клиента</CardTitle>
          <Text>{orderInfo?.client?.name}</Text>
          <Text>{denormalizeNumber(orderInfo?.client?.phone)}</Text>
        </Card>
      </Main>
      <Footer>
        <Button onClick={toPrevStep}>Назад</Button>
        <Button type='primary' onClick={onClickGiveOrder}>
          Выдать заказ
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Main = styled.div`
  flex: 1;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
`

const Label = styled.div`
  border-radius: 14px;
  background: #d9d9d9;
  padding: 2px 9px 3px 9px;
  font-size: 12px;
  line-height: 14px;
`

const Labels = styled.div`
  display: flex;
  gap: 10px;
`

const Text = styled.div`
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '4px' : 0)};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  text-decoration: ${({ lineThrough }) => (lineThrough ? 'line-through' : 'none')};
`

const Divider = styled.div`
  margin-top: 18px;
  margin-bottom: 12px;
  width: 100%;
  border-bottom: 1px solid #ebebeb;
`

const Card = styled.div`
  padding: 14px;
  border-radius: 14px;
  box-shadow: 0px 4px 14px 1px #00000014;
  margin-top: 28px;
`

const CardTitle = styled.div`
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 3px;
`
