import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Title, Button } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { submitClientInformedTerminationClient } from '../reducer'

export default function InformClient () {
  const dispatch = useDispatch()

  const handleSubmit = () => dispatch(submitClientInformedTerminationClient())

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Проинформируй абонента
      </Title>
      <ul>
        <li>
          <Title>после составления заявки номер автоматически заблокируется</Title>
        </li>
        <li>
          <Title>о необходимости самотоятельно отключить мобильные банковские услуги</Title>
        </li>
        <li>
          <Title>об отключении услуги домашний интернет "Домашний интернет ХХ Мбит/с" (при наличии услуги)</Title>
        </li>
      </ul>
      <Footer>
        <Button type='primary' onClick={handleSubmit}>
          Абонент проинформирован
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  width: 60%;
  height: 100%;
  max-width: 600px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
