import React from 'react'
import styled from 'styled-components'
import { Button, Title } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD, T2_ROOFTOP_REGULAR } from 'webseller/helpers/styles'
import SimInOrder from './components/SimInOrder'

export default function ScanSimsInOrder ({
  simsInOrder,
  addSimInOrder,
  totalPrice,
  isLoadingSaleSim,
  saleSim,
  toPrevStep
}) {
  const allSimsAreScanned = simsInOrder?.every(({ icc }) => Boolean(icc))
  const isLoadingAddSim = simsInOrder?.some(({ isLoadingAddSim }) => isLoadingAddSim === true)

  return (
    <Container>
      <Main>
        <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
          Проверь тариф и номер
        </Title>
        <SimsList>
          {simsInOrder?.map(sim => (
            <SimInOrder key={sim.id} {...sim} addSimInOrder={addSimInOrder} />
          ))}
        </SimsList>
        <TotalPrice>
          <Title bold fontSize={16} fontFamily={T2_ROOFTOP_REGULAR}>
            Стоимость
          </Title>
          <Title bold fontSize={16} fontFamily={T2_ROOFTOP_REGULAR}>
            {totalPrice} ₽
          </Title>
        </TotalPrice>
      </Main>
      <Footer>
        <Button onClick={toPrevStep}>Назад</Button>
        <Button
          type='primary'
          disabled={!allSimsAreScanned || isLoadingAddSim}
          loading={isLoadingSaleSim}
          onClick={saleSim}
        >
          Далее
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
  max-width: 900px;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 0px;
`

const SimsList = styled.div`
  flex: 1;
  margin: 21px 0 19px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }

  & > div:not(:last-of-type) {
    margin-bottom: 16px;
  }
`

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`
