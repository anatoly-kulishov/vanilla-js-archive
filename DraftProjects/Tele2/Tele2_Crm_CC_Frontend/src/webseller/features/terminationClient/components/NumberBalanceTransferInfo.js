import React, { Fragment } from 'react'
import { Form } from 'antd'

import { Input, PhoneMask } from 'webseller/components'
import { normalizeNumber } from 'webseller/helpers'
import { OperationParamsFormFields, NumberBalanceTransferInfoFormFields } from '../helpers'

export default function NumberBalanceTransferInfo () {
  return (
    <Fragment>
      <Form.Item
        name={[OperationParamsFormFields.NUMBER_BALANCE_TRANSFER_INFO, NumberBalanceTransferInfoFormFields.NUMBER]}
        rules={[{ required: true, message: 'Обязательный параметр' }]}
        normalize={normalizeNumber}
      >
        <PhoneMask>{inputProps => <Input {...inputProps} placeholder='Номер телефона для зачисления' />}</PhoneMask>
      </Form.Item>

      <Form.Item
        name={[OperationParamsFormFields.NUMBER_BALANCE_TRANSFER_INFO, NumberBalanceTransferInfoFormFields.NAME]}
        rules={[{ pattern: /^[а-я -]+$/i, message: 'Недопустимое значение' }]}
      >
        <Input placeholder='ФИО абонента, на которого зарегистрирован номер' />
      </Form.Item>
    </Fragment>
  )
}
