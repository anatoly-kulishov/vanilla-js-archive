/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useCallback } from 'react'
import { object, bool } from 'prop-types'
import styled from 'styled-components'
import { Form, Button, Input, Select } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'

import MsisdnInput from 'crmHostApp/components/MsisdnInput'
import { ContactFieldName, ContactTypeId, PhoneContactsTypes } from '../constants/contacts'

const formItemRequired = { required: true }

export default function ContactsForm (props) {
  const { form, areControlsDisabled, isReducedForm } = props

  const { handbooks, orderState } = useBroadbandContext()
  const contactTypes = handbooks?.ContactTypes

  const orderId = orderState.OrderId
  const isOrderNotCreated = isNaN(orderId)

  const shouldContactUpdate = useCallback(
    (prevValues, curValues) => {
      return prevValues.Contacts !== curValues.Contacts
    },
    [form]
  )

  const getContactDataField = selectedContactTypeId => {
    const isPhoneTypeContact = PhoneContactsTypes.includes(selectedContactTypeId)

    if (isPhoneTypeContact) {
      return (
        <MsisdnInput noAutoFocus dataTid='broadband__contacts-form__contact-msisdn' disabled={areControlsDisabled} />
      )
    } else {
      return <Input data-tid='broadband__contacts-form__contact-input' disabled={areControlsDisabled} />
    }
  }

  const getContactDataFieldRuleMessage = selectedContactTypeId => {
    let ruleMessage

    switch (selectedContactTypeId) {
      case ContactTypeId.Phone:
      case ContactTypeId.MobilePhone:
      case ContactTypeId.WorkPhone:
      case ContactTypeId.HomePhone:
      case ContactTypeId.WhatsApp:
        ruleMessage = 'Пожалуйста, введите контактный номер'
        break

      case ContactTypeId.Email:
        ruleMessage = 'Пожалуйста, введите электронный адрес'
        break

      case ContactTypeId.Instagram:
        ruleMessage = 'Пожалуйста, введите имя аккаунта'
        break
    }

    return ruleMessage
  }

  const getContactDataFieldRules = selectedContactTypeId => {
    const ruleMessage = getContactValidationRuleMessage(ContactFieldName.ContactData, selectedContactTypeId)

    if (selectedContactTypeId === ContactTypeId.Email) {
      return [{ type: 'email' }, { ...formItemRequired, message: ruleMessage }]
    } else {
      return [{ ...formItemRequired, message: ruleMessage }]
    }
  }

  const getContactValidationRuleMessage = (fieldType, selectedContactTypeId) => {
    let ruleMessage

    switch (fieldType) {
      case ContactFieldName.ContactOwner:
        ruleMessage = 'Пожалуйста, введите Владельца контакта'
        break
      case ContactFieldName.ContactTypeId:
        ruleMessage = 'Пожалуйста, выберите Тип контакта'
        break
      case ContactFieldName.ContactData:
        ruleMessage = getContactDataFieldRuleMessage(selectedContactTypeId)
        break
    }

    return ruleMessage
  }

  const getContactsFieldRules = (fieldType, selectedContactTypeId) => {
    if (fieldType === ContactFieldName.ContactData) {
      return getContactDataFieldRules(selectedContactTypeId)
    } else {
      return [{ required: true, message: getContactValidationRuleMessage(fieldType, selectedContactTypeId) }]
    }
  }

  const handleSelect = fieldName => {
    const contactDataFieldPath = ['Contacts', fieldName, ContactFieldName.ContactData]
    form.resetFields([contactDataFieldPath])
    form.validateFields([contactDataFieldPath])
  }

  return (
    <>
      <Divider />
      <SubHeader>Дополнительная контактная информация</SubHeader>
      <ComplexFormWrapper>
        <Form.List name='Contacts'>
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map((field, index) => {
                const contactOwnerFieldName = [field.name, ContactFieldName.ContactOwner]
                const contactOwnerFieldKey = [field.fieldKey, ContactFieldName.ContactOwner]

                const contactTypeIdName = [field.name, ContactFieldName.ContactTypeId]
                const contactTypeIdFieldKey = [field.fieldKey, ContactFieldName.ContactTypeId]

                const contactDataName = [field.name, ContactFieldName.ContactData]
                const contactDataFieldKey = [field.fieldKey, ContactFieldName.ContactData]

                const selectedContactTypeId = form.getFieldValue(['Contacts', ...contactTypeIdName])

                return (
                  <ContactFormFieldWrapper data-tid='form-field__broadband-contacts__contact-form-field'>
                    <Actions>
                      <Header>{`Контакт ${index + 1}`}</Header>
                      <Button
                        type='text'
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                        data-tid='button__broadband-contacts__remove-contact'
                        disabled={areControlsDisabled || isOrderNotCreated}
                      >
                        Удалить
                      </Button>
                    </Actions>
                    <FormGrid isReducedForm={isReducedForm}>
                      {!isReducedForm && (
                        <Form.Item noStyle shouldUpdate>
                          {() => (
                            <Form.Item
                              label='Владелец контакта'
                              name={contactOwnerFieldName}
                              fieldKey={contactOwnerFieldKey}
                              rules={getContactsFieldRules(ContactFieldName.ContactOwner, selectedContactTypeId)}
                            >
                              <Input data-tid='broadband__contacts-form__owner' disabled={areControlsDisabled} />
                            </Form.Item>
                          )}
                        </Form.Item>
                      )}
                      <Form.Item noStyle shouldUpdate>
                        {() => {
                          return (
                            <Form.Item
                              label='Тип контакта'
                              name={contactTypeIdName}
                              fieldKey={contactTypeIdFieldKey}
                              rules={getContactsFieldRules(ContactFieldName.ContactTypeId, selectedContactTypeId)}
                            >
                              <Select
                                itemId={index}
                                data-tid='broadband__contacts-form__type'
                                disabled={areControlsDisabled}
                                onSelect={() => handleSelect(field.name)}
                              >
                                {contactTypes?.map(item => (
                                  <Select.Option key={item.Id} value={item.Id}>
                                    {item.Name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )
                        }}
                      </Form.Item>
                      <Form.Item noStyle shouldUpdate={shouldContactUpdate}>
                        {() => {
                          const fieldLabel =
                            contactTypes?.find(contactType => contactType?.Id === selectedContactTypeId)?.Name ||
                            'Значение контакта'
                          return (
                            <Form.Item
                              label={fieldLabel}
                              name={contactDataName}
                              fieldKey={contactDataFieldKey}
                              rules={getContactsFieldRules(ContactFieldName.ContactData, selectedContactTypeId)}
                            >
                              {getContactDataField(selectedContactTypeId)}
                            </Form.Item>
                          )
                        }}
                      </Form.Item>
                    </FormGrid>
                  </ContactFormFieldWrapper>
                )
              })}
              <Form.Item>
                <Button
                  disabled={fields.length >= 3 || areControlsDisabled || isOrderNotCreated}
                  type='text'
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  data-tid='button__broadband-contacts__add-contact'
                >
                  Добавить контакт
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Form.List>
      </ComplexFormWrapper>
    </>
  )
}

ContactsForm.propTypes = {
  form: object,
  areControlsDisabled: bool
}
const ContactFormFieldWrapper = styled.div``

const Header = styled.h4`
  padding: 6px 0 6px 0;
  font-size: 14px;
  font-weight: lighter;
`
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => (props.isReducedForm ? 2 : 3)}, 4fr);
  grid-column-gap: 10px;
`
const Actions = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`
const Divider = styled.div`
  margin: 12px 0;
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
  border-top: 10px solid rgba(0, 0, 0, 0.06);
`
const SubHeader = styled.h4`
  padding: 12px 24px;
  font-size: 15px;
  font-weight: bold;
`
const ComplexFormWrapper = styled.div`
  padding: 0 24px;
`
