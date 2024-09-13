import React, { Fragment } from 'react'
import { Form } from 'antd'

import { Input } from 'webseller/components'
import { BankBalanceTransferInfoFormFields, OperationParamsFormFields } from '../helpers'

export default function BankBalanceTransferInfo () {
  return (
    <Fragment>
      <Form.Item
        name={[OperationParamsFormFields.BANK_BALANCE_TRANSFER_INFO, BankBalanceTransferInfoFormFields.BANK_NAME]}
        rules={[
          { required: true, message: 'Обязательный параметр' },
          { pattern: /^[а-яa-z ,.'"-]+$/i, message: 'Недопустимое значение' }
        ]}
      >
        <Input placeholder='Наименование банка' />
      </Form.Item>

      <Form.Item
        name={[OperationParamsFormFields.BANK_BALANCE_TRANSFER_INFO, BankBalanceTransferInfoFormFields.KPP]}
        rules={[
          { required: true, message: 'Обязательный параметр' },
          { pattern: /^\d+$/, message: 'Недопустимое значение' }
        ]}
      >
        <Input placeholder='КПП банка' />
      </Form.Item>

      <Form.Item
        name={[OperationParamsFormFields.BANK_BALANCE_TRANSFER_INFO, BankBalanceTransferInfoFormFields.INN]}
        rules={[
          { required: true, message: 'Обязательный параметр' },
          { pattern: /^\d+$/, message: 'Недопустимое значение' }
        ]}
      >
        <Input placeholder='ИНН банка' />
      </Form.Item>

      <Form.Item
        name={[OperationParamsFormFields.BANK_BALANCE_TRANSFER_INFO, BankBalanceTransferInfoFormFields.RS]}
        rules={[
          { required: true, message: 'Обязательный параметр' },
          { pattern: /^\d+$/, message: 'Недопустимое значение' }
        ]}
      >
        <Input placeholder='Расчетный счет банка' />
      </Form.Item>

      <Form.Item
        name={[OperationParamsFormFields.BANK_BALANCE_TRANSFER_INFO, BankBalanceTransferInfoFormFields.BIK]}
        rules={[
          { required: true, message: 'Обязательный параметр' },
          { pattern: /^\d+$/, message: 'Недопустимое значение' },
          { len: 9, message: 'Необходимо ввести 9 символов' }
        ]}
      >
        <Input placeholder='БИК' />
      </Form.Item>

      <Form.Item
        name={[OperationParamsFormFields.BANK_BALANCE_TRANSFER_INFO, BankBalanceTransferInfoFormFields.ACCOUNT]}
        rules={[
          { required: true, message: 'Обязательный параметр' },
          { pattern: /^\d+$/, message: 'Недопустимое значение' }
        ]}
      >
        <Input placeholder='Номер лицевого счета' />
      </Form.Item>

      <Form.Item
        name={[OperationParamsFormFields.BANK_BALANCE_TRANSFER_INFO, BankBalanceTransferInfoFormFields.CLIENT_NAME]}
        rules={[
          { required: true, message: 'Обязательный параметр' },
          { pattern: /^[а-яa-z ,.'"-]+$/i, message: 'Недопустимое значение' }
        ]}
      >
        <Input placeholder='Наименование получателя платежа' />
      </Form.Item>
    </Fragment>
  )
}
