import React from 'react'
import { Checkbox } from 'antd'
import styled from 'styled-components'
import { Button, Title } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { useToggleState } from 'webseller/helpers/hooks'

export default function SubmitStep ({ toNextStep, toPrevStep }) {
  const { value: isCustomerInformed, toggleValue: toggleIsCustomerInformed } = useToggleState(false)

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Подтверждение создания заявки на переоформление
      </Title>
      <Main>
        <Checkbox checked={isCustomerInformed} onClick={toggleIsCustomerInformed}>
          Абонент предупреждён, что баланс должен быть положительным. Неиспользованные остатки пакетов, бонусы и скидки
          не переносятся новому владельцу
        </Checkbox>
      </Main>
      <Footer>
        <Button onClick={toPrevStep}>Назад</Button>
        <Button type='primary' disabled={!isCustomerInformed} onClick={toNextStep}>
          Далее
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  width: 60%;
  height: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  & > label {
    margin-left: 0px !important;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
