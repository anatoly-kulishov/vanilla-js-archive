import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import styled from 'styled-components'
import { func, bool, object, string } from 'prop-types'
import HtmlRender from 'components/HtmlRender'

const { useForm, Item } = Form
const { TextArea } = Input

const getValue = value => value || '-'

const CURRENCY_TEXT = ' руб.'
const TEXTAREA_AUTOSIZE = { minRows: 4 }

const requiredRule = { required: true, message: 'Обязательное для заполнения' }
const commentRules = [requiredRule]
const purifyOptions = { ADD_ATTR: ['target'] }

const propTypes = {
  record: object,
  onAccrue: func,
  isEditingAllowed: bool,
  accruedRecord: object,
  onAccrueSuccess: func,
  rowKey: string
}

const OldSubscriptionExpandedRow = props => {
  const { record, rowKey, onAccrue, isEditingAllowed, accruedRecord, onAccrueSuccess } = props
  const { resultMessage, documentTypeName, limitCompensationAmount, recommendCompensationAmount } = record ?? {}
  const { isSuccess, isLoading } = accruedRecord ?? {}

  const [form] = useForm()

  const [isAccrueDisabled, setIsAccrueDisabled] = useState(true)

  useEffect(() => {
    if (isSuccess) {
      onAccrueSuccess(rowKey)
    }
  }, [isSuccess])

  useEffect(() => {
    handleValidate()
  }, [])

  const handleAccrue = record => {
    const values = form.getFieldsValue()
    onAccrue(record, values)
  }

  const handleValidate = async () => {
    await form
      .validateFields()
      .then(() => setIsAccrueDisabled(false))
      .catch(() => setIsAccrueDisabled(true))
  }

  const handleValuesChange = () => {
    handleValidate()
  }

  const amountRules = useMemo(() => {
    const rules = [requiredRule]

    if (limitCompensationAmount) {
      const limitRule = {
        max: limitCompensationAmount,
        type: 'number',
        transform: value => Number(value),
        message: `Сумма должна быть меньше или равна ${limitCompensationAmount} ${CURRENCY_TEXT}`
      }

      rules.push(limitRule)
    }

    return rules
  }, [limitCompensationAmount])

  return (
    <Form
      form={form}
      initialValues={{ amount: recommendCompensationAmount }}
      onValuesChange={handleValuesChange}
      validateTrigger={false}
    >
      <Row justify='space-between'>
        <Col span={6}>
          <ResultMessageWrapper>
            <ResultMessage>
              <HtmlRender value={resultMessage} options={purifyOptions} />
            </ResultMessage>
          </ResultMessageWrapper>
        </Col>
        <Col span={6}>
          <Label>Тип зачисления:</Label>
          {getValue(documentTypeName)}
          <Label>Лимит:</Label>
          {getValue(limitCompensationAmount) + CURRENCY_TEXT}
          <Label>Рекомендуемая сумма:</Label>
          {getValue(recommendCompensationAmount) + CURRENCY_TEXT}
        </Col>
        {isEditingAllowed && (
          <Col span={5}>
            <Label>Комментарий:</Label>
            <StyledItem name='commentText' rules={commentRules}>
              <StyledTextArea autoSize={TEXTAREA_AUTOSIZE} />
            </StyledItem>
          </Col>
        )}
        <Col span={4}>
          <ActionsWrapper>
            <Label>Сумма к начислению:</Label>
            <StyledItem name='amount' rules={amountRules}>
              <Input
                type='number'
                placeholder={recommendCompensationAmount}
                disabled={!isEditingAllowed}
                suffix={CURRENCY_TEXT}
              />
            </StyledItem>
            <AccrueButton
              type='primary'
              onClick={() => handleAccrue(record)}
              loading={isLoading}
              disabled={isAccrueDisabled}
            >
              Начислить
            </AccrueButton>
          </ActionsWrapper>
        </Col>
      </Row>
    </Form>
  )
}

OldSubscriptionExpandedRow.propTypes = propTypes

export default OldSubscriptionExpandedRow

const Label = styled.div`
  font-weight: 400;
`

const ResultMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ResultMessage = styled.div`
  margin: auto 0;
`

const ActionsWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`

const StyledTextArea = styled(TextArea)`
  margin-bottom: 0px !important;
  height: 110px !important;
`

const StyledItem = styled(Item)`
  margin-bottom: 0px;
`

const AccrueButton = styled(Button)`
  margin-top: auto;
`
