import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'antd'
import styled from 'styled-components'
import { Button, Input } from 'webseller/components'
import { addPersonalAccountNumber, resetPersonalAccountNumber } from 'reducers/saleSim/saleSimReducer'

export default function AddPersonalAccountNumber ({
  personalAccountLoading,
  personalAccountError
}) {
  const dispatch = useDispatch()
  const onAddPersonalAccountNumber = payload => dispatch(addPersonalAccountNumber(payload))
  const onResetPersonalAccountNumber = () => dispatch(resetPersonalAccountNumber())

  const [personalAccountNumber, setPersonalAccountNumber] = useState()

  const onSubmitForm = ({ personalAccountNumber }) => {
    onAddPersonalAccountNumber(personalAccountNumber)
  }

  return (
    <>
      {personalAccountError && <ModalErrorWrapper>{personalAccountError}</ModalErrorWrapper>}
      <Form onFinish={onSubmitForm}>
        <Form.Item name='personalAccountNumber'>
          <Input
            value={personalAccountNumber}
            onChange={setPersonalAccountNumber}
            placeholder='Номер ГК ЛС'
          />
        </Form.Item>
        <Footer>
          <Button
            disabled={personalAccountLoading}
            onClick={onResetPersonalAccountNumber}
          >
            Назад
          </Button>
          <Button
            style={{ width: 110 }}
            type='primary'
            htmlType='submit'
            disabled={!personalAccountNumber}
            loading={personalAccountLoading}
          >
            Далее
          </Button>
        </Footer>
      </Form>
    </>
  )
}

const ModalErrorWrapper = styled.span`
  color: red;
`

const Footer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
`
