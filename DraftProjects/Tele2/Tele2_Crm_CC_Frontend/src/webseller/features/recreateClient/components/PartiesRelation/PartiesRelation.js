import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Title, Radio } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { PartiesRelationType } from '../../helpers'

export default function PartiesRelation ({ toNextStep }) {
  const [partiesRelationType, setPartiesRelationType] = useState(null)

  const onChangePartiesRelationType = e => {
    setPartiesRelationType(e.target.value)
  }

  const onClickSubmit = () => {
    toNextStep(partiesRelationType)
  }

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Выберите подписывающие стороны
      </Title>
      <Main>
        <Radio.Group onChange={onChangePartiesRelationType}>
          <Radio value={PartiesRelationType.DEFAULT}>от текущего абонента - новому</Radio>
          <Radio value={PartiesRelationType.NEW_CLIENT_REPRESENTATIVE}>
            от текущего абонента - новому, при участии представителя по нотариальной доверенности со стороны нового
            абонента
          </Radio>
          <Radio value={PartiesRelationType.CURRENT_CLIENT_REPRESENTATIVE}>
            от текущего абонента - новому, при участии представителя по нотариальной доверенности со стороны текущего
            абонента
          </Radio>
        </Radio.Group>
      </Main>
      <Footer>
        <Button type='primary' disabled={partiesRelationType === null} onClick={onClickSubmit}>
          Продолжить переоформление
        </Button>
      </Footer>
    </Container>
  )
}

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
