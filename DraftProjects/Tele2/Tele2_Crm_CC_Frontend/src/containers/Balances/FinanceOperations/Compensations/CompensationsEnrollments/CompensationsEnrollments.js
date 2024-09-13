import React, { Fragment, useLayoutEffect, useEffect, useCallback, useMemo, useState } from 'react'
import { func, shape, array, bool, object } from 'prop-types'
import { Select, InputNumber, Form, Empty, Skeleton, AutoComplete } from 'antd'
import { minSum, maxCommentLength } from 'constants/compensations'

import { numberWithSpaces } from '../helpers'
import styled from 'styled-components'
import autoInteractionPropType from 'constants/propTypes/autoInteractionPropType'
import CompensationsFooter from '../CompensationsFooter'

const { Item: FormItem } = Form
const formItemRequired = [{ required: true }]
const skeletonParagraphStyle = { rows: 3, width: '100%' }

const formItemShouldUpdate = (prevValues, curValues) => prevValues.enrollmentType !== curValues.enrollmentType

const CompensationsEnrollments = (props) => {
  const {
    form,
    balance,
    fetchAvailableBalance,
    paydPostLimit,
    validatePaydHistory,
    onStartValidatePaydHistory,
    compensationMessages,
    compensation,
    setPaydPostLimit,
    getPaydCommentRelate,
    paydCommentRelate,
    compensationFormMonetary,
    compensationForm,
    autoInteractionData,
    isDisabled,
    addCompensation
  } = props

  const [sum, setSum] = useState(null)

  useLayoutEffect(() => {
    onStartValidatePaydHistory()
    fetchAvailableBalance()
  }, [])

  useEffect(() => {
    const { isLoading, error } = compensation
    if (!isLoading && error.type === 'success') {
      form.resetFields()
      form.validateFields()
    }
  }, [compensation.isLoading])

  useEffect(() => {
    const { isLoading, data, error } = balance
    if (!isLoading && !error?.data) {
      form.setFieldsValue({
        balance: data[0]?.clientBalanceId
      })
    }
  }, [balance.isLoading])

  const validateSumInput = (rule, value) => {
    const isValueWithinRange = value > minSum && value <= (paydPostLimit.data.postLimit)
    if (isValueWithinRange) {
      return Promise.resolve()
    } else {
      // Antd validation API doesn't involve throwing an Error object on reject
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Сумма не должна превышать ${paydPostLimit.data.postLimit}`)
    }
  }

  const onChangeEnrollmentType = useCallback((value, option) => {
    value && validatePaydHistory({ documentTypeId: value })
    setPaydPostLimit({ documentTypeId: value })
    form.resetFields(['enrollmentsComment', 'sum'])
    option?.key && getPaydCommentRelate({ paydTypeId: option.key })
  }, [form.getFieldValue('enrollmentType')])

  const onBalanceFocus = useCallback(() => fetchAvailableBalance(), balance.data)

  const onChangeEnrollmentComment = value => {
    form.setFieldsValue({
      enrollmentsComment: value?.replace('/', '')
    })
  }

  const enrollmentsCommentRule = [
    { max: maxCommentLength, message: `Комментарий не должен превышать ${maxCommentLength} символов` },
    { required: true }
  ]

  const formItemSumRule = [
    {
      validator: (rule, value) => validateSumInput(rule, value),
      message: `Сумма должна быть больше ${minSum} и не превышать ${paydPostLimit.data.postLimit}`
    },
    { required: true }
  ]
  const optionEnrollmentType = compensationFormMonetary.data.map(({ CompensationTypeId, CompensationTypeName, PaydTypeId }) => ({
    label: CompensationTypeName,
    value: CompensationTypeId,
    key: PaydTypeId
  }))

  const enrollmentType = form.getFieldValue('enrollmentType')
  const sumInputPlaceholder = `${enrollmentType ? ` (доступный лимит: ${paydPostLimit.data.postLimit})` : ''}`

  const isSumDisabled = !enrollmentType ||
    compensationMessages.some(({ name, error }) => name === 'paydPostLimit' && error?.type !== 'success')

  const onSumChange = useCallback(value => {
    if (value > paydPostLimit.data.postLimit) {
      form.setFieldsValue({ sum: 0 })
      setSum(0)
    } else {
      form.setFieldsValue({ sum: value })
      setSum(value)
    }
  }, [paydPostLimit])

  const handleSubmit = useCallback((targetOrderDate) => {
    const {
      enrollmentPackageType: paydTypeId,
      sum,
      enrollmentType: enrollmentTypeId,
      balance,
      enrollmentsComment
    } = form.getFieldsValue(['enrollmentPackageType', 'package', 'sum', 'enrollmentType', 'balance', 'enrollmentsComment'])

    addCompensation({
      documentTypeId: enrollmentTypeId,
      transactionDate: targetOrderDate,
      paySum: sum,
      clientBalanceId: balance,
      commentText: enrollmentsComment,
      paydTypeId,
      handlingId: autoInteractionData?.handlingId
    })
  }, [])

  const confirmTitle = useMemo(() => {
    return `Начислить компенсацию на сумму ${sum} руб.?`
  }, [sum])

  const isSubmitDisabled = compensation.isLoading || isDisabled

  return (
    <Fragment>
      <FormItem
        label='Тип зачисления'
        name='enrollmentType'
        rules={formItemRequired}
      >
        <Select
          disabled={compensationMessages.some(({ name }) => name === 'paydServiceEnabled')}
          loading={compensationForm.isLoading}
          options={optionEnrollmentType}
          notFoundContent={
            compensationForm.isLoading ? (
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          }
          onChange={onChangeEnrollmentType}
          placeholder='Выберите тип зачисления'
          optionFilterProp='label'
          showSearch
          allowClear
        />
      </FormItem>

      <FormItem
        label='Баланс'
        name='balance'
        rules={formItemRequired}
        initialValue={balance?.data[0]?.clientBalanceId}
      >
        <Select
          onFocus={onBalanceFocus}
          loading={balance.isLoading}
          options={balance.data.map(({ clientBalanceId, balanceName }) => ({
            label: balanceName,
            value: clientBalanceId
          }))}
          notFoundContent={
            balance.isLoading ? (
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          }
          placeholder='Выберите баланс'
          optionFilterProp='label'
          showSearch
          allowClear
        />
      </FormItem>

      <FormItem noStyle shouldUpdate={formItemShouldUpdate}>
        {() => {
          return (
            <FormItem
              label='Сумма'
              name='sum'
              rules={formItemSumRule}
            >
              <InputNumber
                min={minSum}
                precision={2}
                step={0.1}
                decimalSeparator=','
                placeholder={'Введите сумму' + sumInputPlaceholder}
                formatter={numberWithSpaces}
                disabled={isSumDisabled}
                onChange={onSumChange}
              />
            </FormItem>
          )
        }}
      </FormItem>

      <FormItem noStyle shouldUpdate={formItemShouldUpdate}>
        {() => {
          return (
            <FormItem
              label='Комментарий'
              name='enrollmentsComment'
              rules={enrollmentsCommentRule}
            >
              <StyledAutoComplete
                onChange={onChangeEnrollmentComment}
                options={paydCommentRelate.data.map((comment) => ({ value: comment }))}
                dataSource={paydCommentRelate.data}
                placeholder='Выберите комментарий'
                filterOption
                allowClear
                disabled={!form.getFieldsValue(['enrollmentType'])?.enrollmentType}
                loading={paydCommentRelate.isLoading}
              />
            </FormItem>
          )
        }}
      </FormItem>
      <CompensationsFooter
        onConfirm={handleSubmit}
        confirmTitle={confirmTitle}
        isSubmitDisabled={isSubmitDisabled}
        isLoading={paydPostLimit.isLoading}
      />
    </Fragment>
  )
}

CompensationsEnrollments.propTypes = {
  form: shape({
    setFieldsValue: func,
    getFieldsValue: func,
    getFieldError: func.isRequired
  }).isRequired,

  balance: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,
  fetchAvailableBalance: func.isRequired,

  paydPostLimit: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,

  compensation: shape({
    data: object,
    isLoading: bool,
    error: object
  }).isRequired,

  paydCommentRelate: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,

  compensationFormMonetary: shape({
    data: array,
    error: object
  }).isRequired,

  compensationForm: shape({
    isLoading: bool
  }).isRequired,

  validatePaydHistory: func.isRequired,
  onStartValidatePaydHistory: func.isRequired,
  compensationMessages: array,
  setPaydPostLimit: func.isRequired,
  getPaydCommentRelate: func.isRequired,
  autoInteractionData: autoInteractionPropType,
  isDisabled: bool,
  addCompensation: func.isRequired
}

export default CompensationsEnrollments

const StyledAutoComplete = styled(AutoComplete)`
  .ant-select-selection-placeholder {
    opacity: 1;
    color: rgba(0, 0, 0, 0.25)
  }
`
