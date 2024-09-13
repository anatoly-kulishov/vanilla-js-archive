import React, { useLayoutEffect, useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Form, Tooltip } from 'antd'

import { denormalizeNumber, normalizeNumber } from 'webseller/helpers'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { transferNumberTooltip } from 'webseller/constants/tooltip'
import * as WebSellerKit from 'webseller/components'

import { checkSimMnp } from '../../actions'
import {
  selectCheckSimMnpErrorErrorInfo,
  selectCheckSimMnpLoadingStatus,
  selectMpnOrderTransferNumberOld,
  selectPersonalAccount
} from '../../selectors'

const { Title, Input, Button, PhoneMask } = WebSellerKit

export default function TransferNumber () {
  const dispatch = useDispatch()

  const errorInfo = useSelector(selectCheckSimMnpErrorErrorInfo)
  const currentNumber = useSelector(selectMpnOrderTransferNumberOld)
  const isLoading = useSelector(selectCheckSimMnpLoadingStatus)
  const personalAccount = useSelector(selectPersonalAccount)

  const [number, setNumber] = useState(() => denormalizeNumber(currentNumber))
  const [isShowErrorInfo, setIsShowErrorInfo] = useState(() => Boolean(errorInfo))

  useLayoutEffect(() => {
    setIsShowErrorInfo(Boolean(errorInfo))
  }, [errorInfo])

  const normalizedNumber = normalizeNumber(number, { fallback: '' })
  const isValidNumber = normalizedNumber.length === 11

  const onChangeNumber = (event) => {
    const newNumber = event.target.value
    setNumber(newNumber)
    setIsShowErrorInfo(false)
  }

  const onClickSubmitButton = () => {
    dispatch(checkSimMnp({
      NewNumber: personalAccount?.Msisdn,
      OldNumber: normalizedNumber.slice(1)
    }))
  }

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Какой номер перевести в Tele2?
      </Title>
      <Main>
        <Info>
          <Tooltip title={transferNumberTooltip}>
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
  justify-content: flex-end;
  align-items: center;
`
