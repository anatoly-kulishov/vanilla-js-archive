import React, { Fragment, useCallback, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, Checkbox, Popconfirm } from 'antd'
import { formatNumber } from 'screens/Finance/helpers/format'

const Correction = props => {
  Correction.propTypes = {
    adjustmentPayment: PropTypes.object,
    handleAdjustPayment: PropTypes.func
  }
  const { adjustmentPayment, handleAdjustPayment } = props
  const [isCompensationModeOff, setIsCompensationModeOff] = useState(true)

  return (
    <Wrapper>
      <Title>Выполнение корректировки платежа</Title>
      <Content>
        <Row>
          <FieldWrapper>
            <FieldLabel>Платеж</FieldLabel>
            <FieldValue>{formatNumber(adjustmentPayment?.IncSum)}</FieldValue>
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>Компенсация</FieldLabel>
            <FieldValue>{formatNumber(adjustmentPayment?.OffsetSum)}</FieldValue>
          </FieldWrapper>
        </Row>
        <Footer>
          <Popconfirm
            placement='bottom'
            title={
              <Fragment>
                <ConfirmTitle>Выполнить перевод?</ConfirmTitle>
                <Checkbox
                  checked={isCompensationModeOff}
                  onChange={useCallback(() => setIsCompensationModeOff(!isCompensationModeOff))}
                >
                  Не проводить компенсацию
                </Checkbox>
              </Fragment>
            }
            onConfirm={useCallback(() => handleAdjustPayment(isCompensationModeOff))}
            okText='ОК'
            cancelText='Отмена'
            trigger='click'
          >
            <ButtonItem type='primary'>Корректировка</ButtonItem>
          </Popconfirm>
        </Footer>
      </Content>
    </Wrapper>
  )
}

export default Correction

const Wrapper = styled.div`
  background: #fff;
  border-top: 1px solid rgb(240, 240, 240);
  margin-bottom: 15px;
`

const Content = styled.div`
  align-items: center;
`

const Title = styled.div`
  display: block;
  color: black;
  padding: 15px 30px;
  border-bottom: 1px solid rgb(240, 240, 240);
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
`

const ConfirmTitle = styled.div`
  color: #000;
  font-family: T2HalvarBreit_ExtraBold;
  margin-bottom: 10px;
`

const Row = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 15px 30px;
  :not(:last-of-type) {
    border-bottom: 1px solid rgb(240, 240, 240);
  }
`

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
`

const FieldLabel = styled.div`
  width: 130px;
  color: #000;
  font-weight: bold;
`

const FieldValue = styled.div`
  width: 120px;
  text-align: right;
  color: #000;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 10px;
`

const ButtonItem = styled(Button)`
  align-self: flex-end;
`
