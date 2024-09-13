import React, { useState, useLayoutEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Tooltip, Form } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import * as WebSellerKit from 'webseller/components'
import { denormalizeNumber, normalizeNumber } from 'webseller/helpers'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

const { Title, Input, Button, PhoneMask } = WebSellerKit

const tooltipTitle = (
  <Fragment>
    <Title>Нужно уточнить у клиента, что номер:</Title>
    <ul>
      <li>не заблокирован;</li>
      <li>с положительным балансом (нет задолженности);</li>
      <li>оформлен на клиента;</li>
      <li>переносится в пределах домашнего региона;</li>
      <li>не переносили за последние 60 дней.</li>
    </ul>
  </Fragment>
)

export default function TransferNumberStep ({ currentNumber, isLoading, errorInfo, checkSimMnp, toPrevStep }) {
  const [number, setNumber] = useState(() => denormalizeNumber(currentNumber))
  const [isShowErrorInfo, setIsShowErrorInfo] = useState(() => Boolean(errorInfo))

  useLayoutEffect(() => {
    setIsShowErrorInfo(Boolean(errorInfo))
  }, [errorInfo])

  const normalizedNumber = normalizeNumber(number, { fallback: '' })
  const isValidNumber = normalizedNumber.length === 11

  const onChangeNumber = e => {
    const newNumber = e.target.value
    setNumber(newNumber)
    setIsShowErrorInfo(false)
  }

  const onClickSubmitButton = () => {
    checkSimMnp(normalizedNumber)
  }

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Какой номер перевести в Tele2?
      </Title>
      <Main>
        <Info>
          <Tooltip title={tooltipTitle}>
            <IconWrapper>
              <InfoCircleOutlined />
            </IconWrapper>
          </Tooltip>
          <Title>Требования к номеру</Title>
        </Info>
        <Form initialValues={{ oldNumber: currentNumber }}>
          <Form.Item
            name='oldNumber'
            validateStatus={isShowErrorInfo ? 'error' : 'success'}
            help={isShowErrorInfo ? errorInfo : undefined}
          >
            <PhoneMask placeholder='Номер' value={number} onChange={onChangeNumber}>
              {inputProps => <Input {...inputProps} />}
            </PhoneMask>
          </Form.Item>
        </Form>
      </Main>
      <Footer>
        <Button onClick={toPrevStep}>Назад</Button>
        <Button type='primary' loading={isLoading} disabled={!isValidNumber} onClick={onClickSubmitButton}>
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
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 25px;
`

const IconWrapper = styled.span`
  font-size: 14px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
