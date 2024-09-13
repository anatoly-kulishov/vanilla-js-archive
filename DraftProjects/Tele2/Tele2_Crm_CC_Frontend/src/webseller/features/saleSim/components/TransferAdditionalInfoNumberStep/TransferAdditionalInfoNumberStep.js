import React, { useState } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'
import { denormalizeNumber, normalizeNumber } from 'webseller/helpers'
import { Title, Input, Button, PhoneMask } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

export default function TransferAdditionalInfoNumberStep ({
  transferNumber,
  currentAdditionalInfoNumber,
  submitAdditonalInfoNumber,
  toPrevStep
}) {
  const [additionalNumber, setAdditionalNumber] = useState(() => denormalizeNumber(currentAdditionalInfoNumber))
  const [isValidAdditionalNumber, setIsValidAdditionalNumber] = useState(true)

  const onChangeAdditionalNumber = e => {
    const newValue = e.target.value
    const normalizedValue = normalizeNumber(newValue, { fallback: '' })
    const isValid = normalizedValue.length === 0 || normalizedValue.length === 11
    setIsValidAdditionalNumber(isValid)
    setAdditionalNumber(newValue)
  }

  const onSubmitAdditionalNumber = () => {
    const normalizedNumber = normalizeNumber(additionalNumber, { fallback: '' })
    const numberForSubmit = normalizedNumber.length === 11 ? normalizedNumber : null
    submitAdditonalInfoNumber(numberForSubmit)
  }

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        На какой номер отправить SMS о статусе переноса?
      </Title>
      <Main>
        <Info>
          <Title>
            SMS о ходе переноса поступит на номер {denormalizeNumber(transferNumber)}. Хочет ли клиент указать
            дополнительный номер для информирования?
          </Title>
        </Info>
        <Form initialValues={{ additionalNumber: currentAdditionalInfoNumber }}>
          <Form.Item name='additionalNumber' validateStatus={isValidAdditionalNumber ? 'success' : 'error'}>
            <PhoneMask placeholder='Номер' value={additionalNumber} onChange={onChangeAdditionalNumber}>
              {inputProps => <Input {...inputProps} />}
            </PhoneMask>
          </Form.Item>
        </Form>
      </Main>
      <Footer>
        <Button onClick={toPrevStep}>Назад</Button>
        <Button type='primary' disabled={!isValidAdditionalNumber} onClick={onSubmitAdditionalNumber}>
          Далее
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  width: 60%;
  max-width: 600px;
`

const Main = styled.div`
  margin: 24px 0;
`

const Info = styled.div`
  margin-bottom: 25px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
