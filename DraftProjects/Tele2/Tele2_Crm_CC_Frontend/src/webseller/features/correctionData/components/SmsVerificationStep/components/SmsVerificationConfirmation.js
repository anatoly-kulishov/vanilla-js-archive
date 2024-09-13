import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button, Title } from 'webseller/components'

const SmsVerificationConfirmation = ({ onReject, onConfirm }) => {
  return (
    <Container>
      <Title bold fontSize={18}>
        Проверка наличия SIM
      </Title>
      <Title>Может ли клиент принять SMS на свой номер?</Title>
      <Footer>
        <Button type='primary' htmlType='button' onClick={onReject}>
          Нет
        </Button>
        <Button type='primary' htmlType='button' onClick={onConfirm}>
          Да, отправить SMS
        </Button>
      </Footer>
    </Container>
  )
}

SmsVerificationConfirmation.propTypes = {
  onReject: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

const Container = styled.div`
  width: 60%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`

export default SmsVerificationConfirmation
