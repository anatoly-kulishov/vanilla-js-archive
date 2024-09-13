import React from 'react'
import styled from 'styled-components'
import { Alert } from 'antd'

import { IconSuccess, IconSmthWentWrong } from 'webseller/icons'
import { Title, Button } from 'webseller/components'

export default function ResultStep ({
  isTransferToTele2,
  isSuccessSale,
  isAvailableBroadbandConnect,
  messageBroadbandConnect,
  connectBroadband,
  onSubmit
}) {
  return (
    <Container>
      {isAvailableBroadbandConnect && (
        <Alert
          type='success'
          message='Домашний интернет'
          description={messageBroadbandConnect}
          action={
            <Button type='primary' onClick={connectBroadband}>Подключить</Button>
          }
        />
      )}
      <Main>
        <IconWrapper>{isSuccessSale ? <IconSuccess /> : <IconSmthWentWrong />}</IconWrapper>
        <InfoContainer>
          <InfoHeader bold fontSize={18}>
            {isSuccessSale
              ? 'Продажа успешно завершена, данные абонента внесены и отправлены на проверку'
              : 'Не удалось оформить договор'}
          </InfoHeader>
          <Title fontSize={16}>
            {!isSuccessSale
              ? 'Свяжись со службой поддержки и повтори оформление договора.'
              : isTransferToTele2
                ? 'Рекомендуй следить за статусом проверки в личном кабинете на сайте в разделе «Профиль» или в приложении «Мой Tele2». При неуспешной проверке абонент увидит информацию о том, что данные нужно подтвердить самостоятельно - через Госуслуги или в чате. Информацию о ходе переноса номера абонент будет получать в SMS.'
                : 'Рекомендуй следить за статусом проверки в личном кабинете на сайте в разделе «Профиль» или в приложении «Мой Tele2». При неуспешной проверке абонент увидит информацию о том, что данные нужно подтвердить самостоятельно - через Госуслуги или в чате.'}
          </Title>
        </InfoContainer>
      </Main>
      <Footer>
        <Button type='primary' onClick={onSubmit}>
          Готово
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const IconWrapper = styled.span`
  font-size: 120px;
`

const InfoHeader = styled(Title)`
  margin-bottom: 16px;
`

const InfoContainer = styled.div`
  text-align: center;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`
