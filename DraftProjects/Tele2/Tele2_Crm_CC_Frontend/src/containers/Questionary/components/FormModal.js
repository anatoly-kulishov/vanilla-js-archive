/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Skeleton, Form } from 'antd'
import styled from 'styled-components'

import questionaryConstants, { CheckboxType, MsisdnType } from '../questionaryConstants'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { QUESTIONARY_FORM_MODAL } from 'constants/logModalNames'

const { Item } = Form

function CustomModal ({
  title,
  isVisible,
  dataSource,
  hasInitialValues,
  footer,
  okText,
  isLoading,
  onCancel,
  isEditable,
  onOk,
  answeredQuestions,
  msisdnToSet
}) {
  CustomModal.propTypes = {
    title: PropTypes.string,
    isVisible: PropTypes.bool,
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        Caption: PropTypes.string.isRequired,
        ControlTypeName: PropTypes.string.isRequired,
        Data: PropTypes.string,
        IsMultiChoiceAllowed: PropTypes.bool,
        IsRequired: PropTypes.bool,
        Params: PropTypes.object,
        QuestionId: PropTypes.number,
        QuestionName: PropTypes.string.isRequired,
        Tooltip: PropTypes.string
      })
    ),
    hasInitialValues: PropTypes.bool,
    footer: PropTypes.element,
    okText: PropTypes.string,
    isLoading: PropTypes.bool,
    isEditable: PropTypes.bool,

    onOk: PropTypes.func,
    onCancel: PropTypes.func.isRequired,

    answeredQuestions: PropTypes.arrayOf(
      PropTypes.shape({
        QuestionId: PropTypes.number,
        Data: PropTypes.string
      })
    ),
    msisdnToSet: PropTypes.string
  }

  CustomModal.defaultProps = {
    title: '',
    okText: 'Создать',
    hasInitialValues: false,
    isEditable: true,
    footer: undefined,
    isLoading: false
  }

  const [form] = Form.useForm()

  const dataSourceList = dataSource?.map(
    ({ ControlTypeName, Caption, QuestionName, QuestionId, IsRequired, Tooltip, Params, Data, ...rest }) => {
      const { setFieldsValue } = form

      const Control = questionaryConstants.controls[ControlTypeName]
      const options =
        Params &&
        Params.map(({ Position, Value }) => ({
          value: Position,
          label: Value
        }))
      const createMessage = fieldName => 'Поле ' + fieldName + ' не должно быть пустым!'

      const getInitialValue = () => {
        const answeredQuestionData = answeredQuestions?.find(item => item.QuestionId === QuestionId)?.Data
        let data = Data === '' ? answeredQuestionData : Data
        // For #125464. I'm very sorry about this.
        if (ControlTypeName?.toUpperCase() === MsisdnType && (data === '' || data === undefined || data === null)) {
          data = msisdnToSet
        }
        // For #229746. I'm very sorry about this too.
        if (ControlTypeName === CheckboxType) {
          return data === '1' || data === 'true' || data === true
        }
        if (data) {
          if (isNaN(+data)) {
            return data
          } else return +data
        } else return null
      }

      const valuePropName = ControlTypeName === CheckboxType ? 'checked' : 'value'

      return (
        <Item
          name={QuestionName}
          label={Caption}
          initialValue={hasInitialValues && getInitialValue()}
          extra={Tooltip}
          isEditable={isEditable}
          valuePropName={valuePropName}
          rules={[
            {
              required: IsRequired,
              message: createMessage(Caption)
            }
          ]}
        >
          <Control
            noAutoFocus
            {...rest}
            options={options}
            readOnly={!isEditable}
            // TODO: Remove onClickRemove prop when <MsisdnMask /> component is refactored
            onClickRemove={() => setFieldsValue({ [QuestionName]: '' })}
            isOneClickCopyAllowed
          />
        </Item>
      )
    }
  )

  const handleOk = () => {
    form.validateFields().then(values => onOk(values))
  }

  const handleCloseModal = () => {
    const { getFieldsValue } = form

    onCancel(getFieldsValue())
    logIfEnabled({ type: MODAL_CLOSE, log: QUESTIONARY_FORM_MODAL })
  }

  useEffect(() => {
    if (isVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: QUESTIONARY_FORM_MODAL })
    }
  }, [isVisible])

  return (
    <StyledModal
      width={650}
      visible={isVisible}
      title={
        <Skeleton paragraph={{ rows: 0 }} loading={isLoading} active>
          {title}
        </Skeleton>
      }
      okText={okText}
      onCancel={handleCloseModal}
      onOk={handleOk}
      footer={
        isLoading ? (
          <Skeleton paragraph={{ rows: 0 }} loading={isLoading} active>
            {footer}
          </Skeleton>
        ) : (
          footer
        )
      }
      destroyOnClose
    >
      <Skeleton loading={isLoading} active>
        <Form
          form={form}
          hideRequiredMark={!isEditable}
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
          labelAlign='left'
          preserve={false}
        >
          {dataSourceList}
        </Form>
      </Skeleton>
    </StyledModal>
  )
}

export default CustomModal

const StyledModal = styled(Modal)`
  top: 130px;
`
