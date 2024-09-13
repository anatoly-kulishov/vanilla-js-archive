import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Select, Input, Form, DatePicker } from 'antd'

import { DefaultReasonIds, Operation } from 'constants/operations'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { timeSlots } from './constants/timeSlots'
import { getCallDateDayByCurrentHour, getInitialCallDateTime } from './helpers/getInitialCallDateTime'

const { Item } = Form

const COMMENT_REGEXP = /^[A-Za-zА-Яа-я\d]/
const COMMENT_MIN_LENGTH = 5

const reasonSRRules = [{ pattern: /SR\d{1,18}/, message: 'Введите текст в формате SR1234567890' }]
const reasonCommentRules = [
  {
    pattern: COMMENT_REGEXP,
    required: true,
    type: 'string',
    min: COMMENT_MIN_LENGTH,
    message: 'Введите комментарий (минимальная длина - 5 символов)'
  }
]

export const ReasonModal = props => {
  const { title, operation, isVisible, onOk, onCancel } = props

  const [form] = Form.useForm()
  const comment = Form.useWatch('ReasonComment', form)

  const { operationReasons, reasonsState, changeReasonsState } = useBroadbandContext()

  const handleOk = useCallback(async () => {
    try {
      await form.validateFields()
      onOk()
    } catch {}
  }, [onOk])

  const handleCancel = useCallback(() => {
    onCancel()
  }, [onCancel])

  const handleValuesChange = useCallback(changedFields => {
    if (changedFields?.ReasonCallTime) {
      const ReasonCallDate = form.getFieldValue('ReasonCallDate')
      changeReasonsState({ ...changedFields, ReasonCallDate })
    } else {
      changeReasonsState(changedFields)
    }
  }, [])

  const computeDisabledDate = useCallback(current => {
    const minReasonCallDate = getCallDateDayByCurrentHour()

    return current && current < minReasonCallDate
  }, [])

  useEffect(() => {
    if (operation === Operation.CancelTransfer && !form.getFieldValue('ReasonId')) {
      form.setFieldsValue({ ReasonId: DefaultReasonIds.CancelTransfer })
      changeReasonsState({ ReasonId: DefaultReasonIds.CancelTransfer })
    }
    if (operation === Operation.Wait) {
      const { reasonCallDate, reasonCallTime } = getInitialCallDateTime()

      form.setFieldsValue({ ReasonCallDate: reasonCallDate, ReasonCallTime: reasonCallTime })
      changeReasonsState({ ReasonCallDate: reasonCallDate, ReasonCallTime: reasonCallTime })
    }
  }, [operation])

  const checkComment = () => {
    return comment && comment.length >= COMMENT_MIN_LENGTH && COMMENT_REGEXP.test(comment)
  }

  const isDateSelected = reasonsState.CallDateStart

  const isWaitOperation = operation === Operation.Wait
  const isCancelOperation = operation === Operation.Cancel

  const commentRules = isCancelOperation ? reasonCommentRules : undefined
  const okButtonProps = isCancelOperation ? { disabled: !checkComment() } : undefined
  const isCommentNoStyle = !isCancelOperation

  return (
    <Modal
      title={title}
      visible={isVisible}
      okText={<span data-tid='span__broadband-form__reason-ok-button'>{'Ок'}</span>}
      cancelText={<span data-tid='span__broadband-form__reason-cancel-button'>{'Отмена'}</span>}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={okButtonProps}
      zIndex='1002'
    >
      <Form form={form} name='ReasonForm' onValuesChange={handleValuesChange}>
        <ItemsContainer>
          <Item name='ReasonId' noStyle>
            <StyledSelect
              data-tid='select__broadband-form__reason-type'
              defaultActiveFirstOption={false}
              showSearch
              optionFilterProp='children'
            >
              {operationReasons?.map(reason => (
                <Select.Option value={reason.Id} key={reason.Name}>
                  {reason.Name}
                </Select.Option>
              ))}
            </StyledSelect>
          </Item>
          <Item name='ReasonComment' noStyle={isCommentNoStyle} rules={commentRules}>
            <Input data-tid='input__broadband-form__reason-comment' placeholder='Комментарий' />
          </Item>
          {isWaitOperation && (
            <>
              <StyledItem name='ReasonCallDateTime'>
                <Item name='ReasonCallDate' noStyle>
                  <DatePicker
                    disabledDate={computeDisabledDate}
                    style={{ width: 'calc(40% - 8px)', marginRight: '8px' }}
                    placeholder='Выберите дату звонка'
                    format='DD.MM.YYYY'
                    showToday={false}
                    data-tid='input__broadband-form__reason-date-picker'
                  />
                </Item>
                <Item name='ReasonCallTime' noStyle>
                  <Select
                    style={{ width: '60%' }}
                    data-tid='select__broadband-form__reason-time'
                    placeholder='Звонить с - Звонить по'
                    disabled={!isDateSelected}
                    options={timeSlots}
                  />
                </Item>
              </StyledItem>
              <Item name='ReasonSR' rules={reasonSRRules}>
                <Input data-tid='input__broadband-form__reason-sr' placeholder='SR1234567890' maxLength={20} />
              </Item>
            </>
          )}
        </ItemsContainer>
      </Form>
    </Modal>
  )
}

const StyledSelect = styled(Select)`
  width: 100%;
`
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

const StyledItem = styled(Item)`
  margin-bottom: 0;
`
