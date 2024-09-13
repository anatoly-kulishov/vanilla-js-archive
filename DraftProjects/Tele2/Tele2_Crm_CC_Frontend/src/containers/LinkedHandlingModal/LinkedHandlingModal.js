/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Row, Button } from 'antd'
import { Form } from '@ant-design/compatible'

import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'

const { confirm } = Modal

class LinkedHandlingModal extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    personalAccount: PropTypes.object,
    isLinkedHandlingToggled: PropTypes.bool,
    handleToggleLinkedHandlingModal: PropTypes.func,
    fetchInteractionParamsForLinkedHandling: PropTypes.func
  }

  compareWithCurrentMsisdn = (rule, value, callback) => {
    const { personalAccount } = this.props
    if (value === personalAccount.Msisdn) {
      callback('Номер не может совпадать с текущим')
    }
    callback()
  }

  handleOk = () => {
    const {
      form: { validateFields },
      fetchInteractionParamsForLinkedHandling,
      handleToggleLinkedHandlingModal
    } = this.props
    validateFields((error, values) => {
      if (!error) {
        fetchInteractionParamsForLinkedHandling({ msisdn: values.msisdn })
        handleToggleLinkedHandlingModal()
      }
    })
  }

  handleClose = () => {
    const { handleToggleLinkedHandlingModal } = this.props
    confirm({
      title: 'Вы уверены, что хотите закрыть окно?',
      content: 'Повторное открытие окна будет невозможно',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => {
        handleToggleLinkedHandlingModal()
      }
    })
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleOk()
    }
  }

  render () {
    const {
      form,
      isLinkedHandlingToggled
    } = this.props
    return (
      <StyledModal
        width='600px'
        title='Введите номер для открытия карточки номера другого абонента'
        visible={isLinkedHandlingToggled}
        onCancel={this.handleClose}
        footer={null}
        maskClosable={false}
      >
        <FormItem
          colon={false}
          key='msisdn'
          label='MSISDN'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          labelAlign='left'
          helpVisibility={form.getFieldValue('msisdn') !== '7'}
        >
          {form.getFieldDecorator('msisdn', {
            validateTrigger: 'onChange',
            rules: [
              { required: true, message: 'Поле обязательно для заполнения!' },
              { min: 11, message: 'Введите корректный номер' },
              { validator: this.compareWithCurrentMsisdn }
            ]
          })(
            <MsisdnMaskedInput
              onClickRemove={() => form.setFieldsValue({ msisdn: '' })}
              onKeyPress={this.onKeyPress}
            />
          )}
        </FormItem>
        <Row align='middle' type='flex' justify='space-between'>
          <Button
            type='primary'
            onClick={this.handleOk}
          >
            Перейти к карточке
          </Button>
          <Button onClick={this.handleClose}>Отмена</Button>
        </Row>
      </StyledModal>
    )
  }
}

export default Form.create()(LinkedHandlingModal)

const StyledModal = styled(Modal)`
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 14px;
    color: black;
  }
`

const FormItem = styled(Form.Item)`
  .ant-form-explain {
    visibility: ${props => props.helpVisibility ? 'initial' : 'hidden'};
  }
`
