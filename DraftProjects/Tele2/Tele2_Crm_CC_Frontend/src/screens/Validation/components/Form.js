/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-array-as-prop */
import { DeleteOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, Popconfirm, Select } from 'antd'
import MsisdnInput from 'components/MsisdnMask/MsisdnInput'
import recognitionValuesPropType from 'constants/propTypes/recognitionValuesPropType'
import { bool, func, object } from 'prop-types'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as uuid from 'uuid'
import FormSkeleton from './FormSkeleton'

const formItemLayout = {
  labelCol: {
    span: 12
  },
  wrapperCol: {
    span: 12
  },
  labelAlign: 'left'
}
const formItemLayoutWithOutLabel = {
  wrapperCol: { span: 12, offset: 12 },
  labelCol: { span: 12 }
}

const dateFormat = 'DD.MM.YYYY'

const requiredRule = {
  required: true,
  message: 'Поле не может быть пустым'
}

const defaultFormItemRules = [requiredRule]
const inputFormItemRules = [requiredRule, { min: 2, message: 'Минимальное количество символов - 2' }]
const msisdnFormItemRules = [requiredRule, { min: 11, message: 'Введите корректный номер' }]
const datePickerFormItemRules = [{ type: 'object', required: true, message: 'Пожалуйста, выберите дату' }]

const RecognitionValuesForm = props => {
  const { data, form, onClickInfo, loading } = props
  const { fieldTypeGroups } = data || {}

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  const renderControlFormItem = (fieldTypeId, fieldName) => {
    let control
    let rules = defaultFormItemRules

    switch (fieldTypeId) {
      case 1:
        control = <MsisdnInput />
        rules = msisdnFormItemRules
        break
      case 10:
        control = (
          <Select>
            <Select.Option value='True'>Да</Select.Option>
            <Select.Option value='False'>Нет</Select.Option>
          </Select>
        )
        break
      case 8:
      case 11:
        control = <StyledDatePicker format={dateFormat} />
        rules = datePickerFormItemRules
        break
      default:
        control = <Input />
        rules = inputFormItemRules
    }

    return (
      <Form.Item name={fieldName} noStyle rules={rules}>
        {control}
      </Form.Item>
    )
  }

  const renderFormFields = () => (
    <>
      <FormItemWrapper>
        <Form.Item {...formItemLayout} label='Это скан заявления?'>
          <ControlWrapper>
            <Form.Item name='applicationForm' noStyle>
              <Select>
                <Select.Option value>Да</Select.Option>
                <Select.Option value={false}>Нет</Select.Option>
              </Select>
            </Form.Item>
          </ControlWrapper>
        </Form.Item>
      </FormItemWrapper>

      {fieldTypeGroups?.map((fieldType, fieldTypeIndex) => {
        const { fieldTypeId, name: label } = fieldType

        const isSelectChildren = fieldTypeId === 10
        const showDeleteIcon = !isSelectChildren

        return (
          <FormItemWrapper key={fieldTypeId}>
            <Form.Item name={['fieldTypeGroups', fieldTypeIndex, 'fieldTypeId']} hidden />
            <Form.Item name={['fieldTypeGroups', fieldTypeIndex, 'attributeName']} hidden />
            <Form.List name={['fieldTypeGroups', fieldTypeIndex, 'recognizedItems']}>
              {(recognizedItems, { add, remove }) =>
                recognizedItems.length > 0 ? (
                  recognizedItems?.map((field, fieldIndex) => {
                    const images = form.getFieldValue([
                      'fieldTypeGroups',
                      fieldTypeIndex,
                      'recognizedItems',
                      fieldIndex,
                      'images'
                    ])

                    const showAddIcon = fieldIndex === recognizedItems.length - 1 && !isSelectChildren
                    const showInfoIcon = images && images.length !== 0

                    return (
                      <Form.Item {...field} noStyle>
                        <Form.Item name={[field.name, 'id']} hidden />
                        <Form.Item name={[field.name, 'recognizedItemId']} hidden />
                        <Form.Item name={[field.name, 'images']} hidden />

                        <Form.Item
                          label={fieldIndex === 0 ? label : null}
                          {...(fieldIndex === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        >
                          <ControlWrapper>
                            {renderControlFormItem(fieldTypeId, [field.name, 'value'])}
                            {showDeleteIcon && (
                              <Popconfirm
                                title='Вы действительно хотите удалить это значение?'
                                okText='Да'
                                cancelText='Отмена'
                                placement='rightTop'
                                onConfirm={() => {
                                  remove(field.name)
                                }}
                              >
                                <IconWrapper>
                                  <DeleteOutlined />
                                </IconWrapper>
                              </Popconfirm>
                            )}
                            {showInfoIcon && (
                              <IconWrapper>
                                <InfoCircleOutlined onClick={() => onClickInfo(images)} />
                              </IconWrapper>
                            )}
                          </ControlWrapper>
                        </Form.Item>
                        {showAddIcon ? (
                          <Form.Item {...formItemLayoutWithOutLabel}>
                            <IconWrapper>
                              <PlusOutlined
                                onClick={() => {
                                  const id = uuid()
                                  add({ id, value: undefined })
                                }}
                              />
                            </IconWrapper>
                          </Form.Item>
                        ) : null}
                      </Form.Item>
                    )
                  })
                ) : (
                  <Form.Item label={label} {...formItemLayout}>
                    <IconWrapper>
                      <PlusOutlined
                        onClick={() => {
                          const id = uuid()
                          add({ id, value: undefined })
                        }}
                      />
                    </IconWrapper>
                  </Form.Item>
                )
              }
            </Form.List>
          </FormItemWrapper>
        )
      })}
    </>
  )

  return (
    <Wrapper>
      <StyledForm form={form} colon={false}>
        {loading ? <FormSkeleton /> : renderFormFields()}
      </StyledForm>
    </Wrapper>
  )
}

export default RecognitionValuesForm

RecognitionValuesForm.propTypes = {
  data: recognitionValuesPropType,
  form: object.isRequired,
  onClickInfo: func,
  loading: bool
}

const Wrapper = styled(Form)`
  max-height: 655px;
  overflow: auto;
`

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;

    .ant-form-item-control .ant-form-item:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`

const FormItemWrapper = styled(Form.Item)`
  border-bottom: 2px solid #f0f0f0;
  padding: 7px 15px 5px;
  margin-bottom: 0px;
`

const ControlWrapper = styled.div`
  display: grid;
  grid-template-columns: 8fr 1fr 1fr;
  align-items: center;
  column-gap: 5px;
`

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`

const IconWrapper = styled.div`
  font-size: 22px;
  color: #555555;
  cursor: pointer;
`
