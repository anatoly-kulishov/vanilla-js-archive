import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, notification } from 'antd'
import styled from 'styled-components'

import { Select, Input, Button, Title, Label } from 'webseller/components'
import { EMAIL_REGEXP } from 'webseller/constants/regexp'
import { ERROR_MESSAGE } from 'webseller/constants/form'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

import { selectInitialRoleNumberIdRoleManagment, selectNumberRoleNumberRoleManagment, selectNumberRolesNumberRoleManagment } from '../selectors'
import { isAdminRole as isAdminRoleHelper } from '../helpers'
import { submitNewRoleNumberRoleManagment } from '../reducer'

export default function AccessLevel () {
  const initialNumberRoleId = useSelector(selectInitialRoleNumberIdRoleManagment)
  const numberRole = useSelector(selectNumberRoleNumberRoleManagment)
  const numberRoles = useSelector(selectNumberRolesNumberRoleManagment)

  const dispatch = useDispatch()
  const submitNewRole = (role) => dispatch(submitNewRoleNumberRoleManagment(role))

  const [isAdminRole, setIsAdminRole] = useState(() => isAdminRoleHelper(numberRole.roleName))
  const [form] = Form.useForm()

  const numberRolesOptions = numberRoles.map(({ id, name }) => ({ value: id, label: name }))

  const onSelectRole = (_, role) => {
    const roleName = role.label
    const currentRole = form.getFieldsValue()

    form.setFieldsValue({
      ...currentRole,
      roleName
    })
    setIsAdminRole(isAdminRoleHelper(roleName))
  }

  const onClickGoForward = () => {
    const currentRoleId = form.getFieldValue('roleId')
    const isChangedRole = initialNumberRoleId !== currentRoleId
    if (isChangedRole) {
      form.submit()
    } else {
      notification.info({
        message: 'Роль не была изменена',
        description: 'Для продолжения выбери новую роль'
      })
    }
  }

  const onEmailChange = (event) => {
    form.setFieldsValue({ clientEmail: event.target.value })
  }

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
                Выбери уровень доступа к самообслуживанию
      </Title>
      <Form
        form={form}
        initialValues={numberRole}
        onFinish={submitNewRole}
      >
        <Form.Item name='roleId'>
          <Select
            placeholder='Выбери новую роль'
            options={numberRolesOptions}
            onSelect={onSelectRole}
          />
        </Form.Item>
        <Form.Item name='roleName' hidden >
          <Input />
        </Form.Item>
        <Form.Item
          name='clientEmail'
          hidden={!isAdminRole}
          rules={isAdminRole ? [
            { required: true, message: ERROR_MESSAGE.REQUIRED },
            { pattern: EMAIL_REGEXP, message: ERROR_MESSAGE.PATTERN }
          ] : undefined}
        >
          <Label bold>Email для входа в ЛК</Label>
          <Input placeholder='Введи E-mail клиента' onChange={onEmailChange} />
        </Form.Item>
      </Form>
      <Footer>
        <Button type='primary' onClick={onClickGoForward}>Далее</Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;
    max-width: 600px;
`

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: -20px;
`
