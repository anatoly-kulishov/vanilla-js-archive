import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { string, bool, shape, array } from 'prop-types'
import styled from 'styled-components'
import { Form, Spin } from 'antd'
import CompensationsPromo from './CompensationsPromo'
import CompensationsPackages from './CompensationsPackages'
import CompensationsEnrollments from './CompensationsEnrollments'
import CompensationsAdjustment from './CompensationsAdjustment'
import CompensationsHistoryModal from './CompensationsHistoryModal'
import { compensationsMethods, disabledCompensationsEnrollment, disabledCompensationsPackage } from 'constants/compensations'

const { useForm } = Form
const wrapperCol = { span: 24 }
const labelCol = { span: 24 }

export default function Compensations (props) {
  const {
    currentCompensationMethod,
    compensationMessages,
    compensationRights
  } = props

  const [form] = useForm()

  const [isSubmitDisabled, setSubmitDisabled] = useState(false)
  const [isCompensationDisabled, setCompensationDisabled] = useState(false)
  const [hasBlockingErrors, setHasBlockingErrors] = useState(false)

  useEffect(() => {
    if (compensationMessages.length) {
      const hasErrors = compensationMessages.map(({ error }) => error.shouldDisable).includes(true)
      setHasBlockingErrors(hasErrors)
    } else if (hasBlockingErrors) {
      setHasBlockingErrors(false)
    }

    const isDisabledCompensationsEnrollment = compensationMessages.some(({ name }) => disabledCompensationsEnrollment.includes(name))
    const isDisabledCompensationsPackage = compensationMessages.some(({ name }) => disabledCompensationsPackage.includes(name))
    setCompensationDisabled(isDisabledCompensationsEnrollment && isDisabledCompensationsPackage)
  }, [compensationMessages])

  const isDisabled = isSubmitDisabled || hasBlockingErrors || isCompensationDisabled
  const compensationsForm = useMemo(() => {
    // TODO
    // Refactor forms to take in isFieldDisabled of some sort
    // instead of directly taking ompensationMessages
    switch (currentCompensationMethod) {
      case compensationsMethods.promocode:
        return compensationRights.isPromocodeCompensationAvailable && <CompensationsPromo form={form} isDisabled={isDisabled} />
      case compensationsMethods.package:
        return compensationRights.isPackageCompensationAvailable && <CompensationsPackages form={form} isDisabled={isDisabled} />
      case compensationsMethods.enrollment:
        return compensationRights.isMonetaryCompensationAvailable && <CompensationsEnrollments form={form} isDisabled={isDisabled} compensationMessages={compensationMessages} />
      case compensationsMethods.adjustment:
        return compensationRights.isAdjustmentPaymentAvailable && <CompensationsAdjustment />
      case compensationsMethods.empty:
        return <Plug>Компенсации недоступны</Plug>
    }
  }, [currentCompensationMethod, compensationRights, isDisabled])

  const checkFieldEmptyness = () => {
    const fields = form.getFieldsValue()
    const hasEmptyFields = Object.entries(fields)?.map(([key, value]) => !!value).includes(false)
    return hasEmptyFields
  }

  useEffect(() => {
    const hasEmptyFields = checkFieldEmptyness()
    setSubmitDisabled(hasEmptyFields)
  }, [currentCompensationMethod])

  const handleFieldChange = useCallback((_, allFields) => {
    const hasFieldsErrors = allFields.map(({ errors }) => !!errors.length).includes(true)
    const hasEmptyFields = checkFieldEmptyness()
    setSubmitDisabled(hasFieldsErrors || hasEmptyFields)
  }, [])

  return (
    <Spin spinning={false} size='large'>
      <StyledForm
        onFieldsChange={handleFieldChange}
        validateTrigger='onChange'
        form={form}
        name='compensation-form'
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        labelAlign='left'
      >
        {compensationsForm}
      </StyledForm>
      <CompensationsHistoryModal currentCompensationMethod={currentCompensationMethod} />
    </Spin>
  )
}

Compensations.propTypes = {
  currentCompensationMethod: string,
  compensationMessages: array.isRequired,
  compensationRights: shape({
    isPackageCompensationAvailable: bool,
    isMonetaryCompensationAvailable: bool,
    isPromocodeCompensationAvailable: bool
  })
}

const StyledForm = styled(Form)`
  .ant-picker,
  .ant-input-number {
    width: 100%;
  }
  /* We display notifications inside
  the compensation messages block
  "chat like style".
  No need for the errors to be displayed.
  Serves like a margin between the form fields */
  .ant-form-item-explain {
    visibility: hidden;
    max-height: 24px;
  }
`

const Plug = styled.div`
  height: 400px;
`
