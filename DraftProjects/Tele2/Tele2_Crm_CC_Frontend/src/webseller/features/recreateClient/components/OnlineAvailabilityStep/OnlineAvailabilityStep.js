import React, { useLayoutEffect, useState } from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import { Button, Title, Input } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

export default function OnlineAvailabilityStep ({
  isLoadingOnlineAvailability,
  isLoadingRequestSmsCode,
  isLoadingVerifySmsCode,
  waitingTimeRefreshSmsCode,
  verifySmsCode,
  requestSmsCode,
  onCancel
}) {
  const [smsCode, setSmsCode] = useState()

  const isDisabledRefreshSmsCode = isLoadingRequestSmsCode || isLoadingVerifySmsCode || waitingTimeRefreshSmsCode !== 0

  useLayoutEffect(() => {
    requestSmsCode()
  }, [])

  const onChangeSmsCode = e => {
    setSmsCode(e.target.value)
  }

  const onClickSendCode = () => {
    verifySmsCode(smsCode)
  }

  if (isLoadingOnlineAvailability) {
    return (
      <Loader>
        <Spin tip='Проверка доступности онлайн переоформления' size='large' />
      </Loader>
    )
  }

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Проверь наличие активной SIM
      </Title>
      <Main>
        <Input placeholder='Код из СМС' value={smsCode} onChange={onChangeSmsCode} />
      </Main>
      <Footer>
        <Button type='primary' onClick={onCancel}>
          Невозможно принять SMS
        </Button>
        <Button type='primary' disabled={isDisabledRefreshSmsCode} onClick={requestSmsCode}>
          Отправить код повторно {waitingTimeRefreshSmsCode > 0 && `(${waitingTimeRefreshSmsCode})`}
        </Button>
        <Button
          type='primary'
          disabled={!smsCode || isLoadingRequestSmsCode}
          loading={isLoadingVerifySmsCode}
          onClick={onClickSendCode}
        >
          Отправить код
        </Button>
      </Footer>
    </Container>
  )
}

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  width: 60%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin: 24px 0;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`
