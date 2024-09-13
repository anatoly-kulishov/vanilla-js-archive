import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from 'antd'

import { Input, Button } from 'webseller/components'
import { MANUAL_REGISTRATION_ADDRESS_FIELDS_RULES } from 'webseller/constants/form'
import { getDocumentValidationRules, getRequiredFieldsMap } from 'webseller/helpers/form'

export const RegistrationAddressForm = ({ onSubmit, initialValues }) => {
  const [ form ] = Form.useForm()
  const requiredFieldsMap = getRequiredFieldsMap(MANUAL_REGISTRATION_ADDRESS_FIELDS_RULES)

  const formItems = MANUAL_REGISTRATION_ADDRESS_FIELDS_RULES.map(({ id, nameRu, nameEn }) => (
    <FormItem
      key={id}
      name={nameEn}
      rules={getDocumentValidationRules(
        MANUAL_REGISTRATION_ADDRESS_FIELDS_RULES,
        nameEn
      )}
      isRequired={requiredFieldsMap[nameEn]}
    >
      <Input placeholder={nameRu} />
    </FormItem>
  ))

  const handleSubmit = () => {
    onSubmit(form)
  }

  return (
    <FormStyled form={form} onFinish={handleSubmit} initialValues={initialValues || undefined}>
      {formItems}
      <Button type='primary' htmlType='submit' >
         Сохранить
      </Button>
    </FormStyled>
  )
}

RegistrationAddressForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func
}

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;

  & button {
    align-self: center;
    margin-top: 10px;
  }
`

const FormItem = styled(Form.Item)`
  margin-bottom: 5px;
  position: relative;

  ${({ isRequired }) => {
    return isRequired
      ? `&::before {
        content: '*';
        position: absolute;
        top: 0px;
        left: 6px;
        z-index: 1002;                                                                                                                                                                                                                                                                                      
        font-size: 18px;
        color: red;
      }` : ''
  }} 
`
