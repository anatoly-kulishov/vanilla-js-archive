import React from 'react'
import { Form, Alert } from 'antd'
import styled from 'styled-components'

import { Modal, Input, Button } from 'webseller/components'
import { denormalizeNumber } from 'webseller/helpers'
import { VALID_ATTEMPTS_COUNT_CHECK_ICC } from '../helpers'

export default function CheckIcc ({ msisdn, attemptsCount, isLoading, checkIcc, handleClose }) {
  const [form] = Form.useForm()

  const initialValues = {
    msisdn: denormalizeNumber(msisdn)
  }

  const onSubmit = ({ icc }) => {
    checkIcc(icc)
  }

  return (
    <Modal
      title='Оформление дубликата РФА'
      closable
      zIndex={1001}
      footer={
        <Button
          type='primary'
          loading={isLoading}
          disabled={attemptsCount >= VALID_ATTEMPTS_COUNT_CHECK_ICC}
          onClick={form.submit}
        >
          Сверить и перейти к заполнению РФА
        </Button>
      }
      onCancel={handleClose}
    >
      <AlertStyled message='В Tele2 не поступили регистрационные данные. Оформи дубликат договора' type='info' />
      <Form form={form} initialValues={initialValues} onFinish={onSubmit}>
        <FormLabel>Номер абонента</FormLabel>
        <Form.Item name='msisdn'>
          <Input disabled />
        </Form.Item>
        <FormLabel>ICC</FormLabel>
        <Form.Item
          name='icc'
          rules={[
            { required: true, message: 'Введите 5 последних цифр ICC' },
            { pattern: /^[0-9]{5}$/, message: 'Введите 5 последних цифр ICC' }
          ]}
        >
          <Input placeholder='5 последних цифр ICC' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const AlertStyled = styled(Alert)`
  margin-bottom: 20px;
`

const FormLabel = styled.label`
  padding: 0 10px;
`
