/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, Fragment } from 'react'
import { Modal, Button, Checkbox, Select, Form } from 'antd'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import TextAreaWithCounter from 'components/TextAreaWithCounter'
import PropTypes from 'prop-types'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { COMMENTS_MODAL } from 'constants/logModalNames'

const Option = Select.Option
const { useForm, Item } = Form

const labelCol = {
  span: 6
}

const wrapperCol = {
  span: 12,
  offset: 6
}

const labelColumn = { span: 24 }

const formInitialValues = {
  target: 0,
  typeId: 1,
  isPopup: false,
  subject: '',
  text: ''
}

const subjectCommentRules = [
  {
    max: 50,
    message: `Комментарий не должен превышать 50 символов`
  },
  {
    required: true,
    message: 'Пожалуйста, заполните тему комментария'
  }
]

const textCommentRules = [
  {
    max: 1024,
    message: `Комментарий не должен превышать 1024 символов`
  },
  {
    required: true,
    message: 'Пожалуйста, заполните текст комментария'
  }
]

const CommentsModal = (props) => {
  CommentsModal.propTypes = {
    handleComment: PropTypes.func,
    personalAccountState: PropTypes.object,
    isVisible: PropTypes.bool,
    msisdn: PropTypes.object,
    changeCommentModalVisibility: PropTypes.func,
    handlingId: PropTypes.number
  }

  const {
    handleComment,
    personalAccountState,
    isVisible,
    msisdn,
    changeCommentModalVisibility,
    handlingId
  } = props

  const [form] = useForm()

  useEffect(() => {
    if (isVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: COMMENTS_MODAL })
    } else if (isVisible === false) {
      logIfEnabled({ type: MODAL_CLOSE, log: COMMENTS_MODAL })
    }
  })

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => handleOk(values))
  }

  const handleOk = (values) => {
    const { personalAccount, isPersonalAccountLoading } = personalAccountState
    const { target, subject, text, typeId, isPopup } = values

    if (!isPersonalAccountLoading) {
      let id
      let isClientComment
      switch (target) {
        case 0:
          id = personalAccount.SubscriberId
          isClientComment = false
          break
        case 1:
          id = personalAccount.ClientId
          isClientComment = true
          break
        default:
          break
      }
      handleComment({
        id,
        subject,
        text,
        typeId,
        isClientComment,
        handlingId,
        branchId: personalAccount.BillingBranchId,
        popup: isPopup,
        clientId: personalAccount.ClientId,
        msisdn: personalAccount.Msisdn,
        subClientId: personalAccount.SubClientId
      })
      changeCommentModalVisibility()
      form.resetFields()
    }
  }

  const handleClose = () => {
    changeCommentModalVisibility()
    form.resetFields()
  }

  const handleClear = () => form.resetFields()

  return (
    <div>
      <Modal
        title='Добавление комментария'
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleClose}
        footer={
          <Fragment>
            <Button onClick={handleClear}>Очистить</Button>
            <Button onClick={onSubmit} type='primary'>OK</Button>
          </Fragment>
        }
      >
        <Form
          labelAlign='left'
          form={form}
          initialValues={formInitialValues}
        >
          <Item name='target' colon={false} label='Назначение' labelCol={labelCol} wrapperCol={wrapperCol}>
            <Select>
              <Option value={0}>Абонент</Option>
              <Option value={1}>Клиент</Option>
            </Select>
          </Item>
          <Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.target !== curValues.target}>
            {
              ({ getFieldValue }) => {
                return getFieldValue('target') === 0 ? (
                  <Item label='Абонент' colon={false} labelCol={labelCol} wrapperCol={wrapperCol}>
                    <MsisdnMaskedInput
                      disabled
                      value={msisdn}
                    />
                  </Item>
                ) : null
              }
            }
          </Item>
          <Item name='typeId' colon={false} label='Тип комментария' labelCol={labelCol} wrapperCol={wrapperCol}>
            <Select>
              <Option value={1}>Комментарий</Option>
              <Option value={2}>Жалоба</Option>
              <Option value={9}>Миграция</Option>
            </Select>
          </Item>
          <Item
            name='subject'
            label='Тема комментария'
            labelCol={labelColumn}
            rules={subjectCommentRules}
          >
            <TextAreaWithCounter maxLength={50} rows={4} />
          </Item>
          <Item
            name='text'
            label='Текст комментария'
            labelCol={labelColumn}
            rules={textCommentRules}
          >
            <TextAreaWithCounter maxLength={1024} rows={8} />
          </Item>
          <Item name='isPopup' valuePropName='checked'>
            <Checkbox>
              Важный комментарий
            </Checkbox>
          </Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CommentsModal
