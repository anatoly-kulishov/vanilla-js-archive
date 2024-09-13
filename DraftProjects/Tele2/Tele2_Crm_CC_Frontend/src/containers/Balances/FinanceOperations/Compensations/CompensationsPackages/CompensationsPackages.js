import React, { Fragment, useLayoutEffect, useEffect, useCallback, useMemo, useState } from 'react'
import { shape, object, array, bool, func } from 'prop-types'
import { Select, AutoComplete, Form, Skeleton, Empty } from 'antd'
import { maxCommentLength } from 'constants/compensations'

import autoInteractionPropType from 'constants/propTypes/autoInteractionPropType'
import CompensationsFooter from '../CompensationsFooter'

const { Item: FormItem } = Form
const skeletonParagraphStyle = { rows: 3, width: '100%' }
const formItemRequired = [{ required: true }]
const formItemRules = [
  { max: maxCommentLength, message: `Длина комментария не должна превышать ${maxCommentLength} символов` },
  { required: true }
]

const CompensationsPackages = (props) => {
  const {
    form,
    packages,
    validatePaydServiceAvailable,
    onStartValidatePaydServiceAvailable,
    comments,
    fetchPaydComments,
    validatePaydServiceHistory,
    validatePaydServiceEnabled,
    onStartValidatePaydServiceEnabled,
    paydPostLimit,
    serviceCompensation,
    getMarginServiceTypeRelate,
    getMarginServiceSizeRelate,
    marginServiceTypeRelate,
    marginServiceSizeRelate,
    compensationFormPackage,
    compensationForm,
    addServiceCompensation,
    autoInteractionData,
    isDisabled
  } = props

  useLayoutEffect(() => {
    validatePaydServiceHistory()
    onStartValidatePaydServiceEnabled()
    onStartValidatePaydServiceAvailable()
    getMarginServiceSizeRelate()
    getMarginServiceTypeRelate()
  }, [])

  const [selectedPackage, setSelectedPackage] = useState(null)

  useEffect(() => {
    const { isLoading, error } = serviceCompensation
    if (!isLoading && error.type === 'success') {
      form.resetFields()
      form.validateFields()
    }
  }, [serviceCompensation.isLoading])

  const { packageSize } = form.getFieldsValue(['packageSize'])
  const { packageType } = form.getFieldsValue(['packageType'])

  const isPrivilegue = paydPostLimit.data.hasOwnProperty('IsPrivilegue') && !paydPostLimit.data.IsPrivilegue
    ? false
    : undefined

  const onChangePackageType = useCallback(value => {
    form.setFieldsValue({ package: undefined })
    validatePaydServiceEnabled({ serviceTypeId: value })
    validatePaydServiceAvailable({
      serviceTypeId: value,
      serviceSizeId: packageSize,
      isPrivilegue
    })
  }, [packageType, packageSize])

  const onChangePackageSize = useCallback(value => {
    form.setFieldsValue({ package: undefined })
    validatePaydServiceAvailable({
      serviceSizeId: value,
      serviceTypeId: packageType,
      isPrivilegue
    })
  }, [packageType, packageSize])

  const onPackageTypeFocus = useCallback(() => getMarginServiceTypeRelate(), marginServiceTypeRelate.data)
  const onPackageSizeFocus = useCallback(() => getMarginServiceSizeRelate(), marginServiceSizeRelate.data)
  const onCommentFieldFocus = useCallback(() => fetchPaydComments(), comments.data)

  const onChangeComment = useCallback(value => {
    form.setFieldsValue({
      comment: value?.replace('/', '')
    })
  }, [form.getFieldValue('comment')])

  const optionEnrollmentPackageType = compensationFormPackage.data.map(({ PaydTypeId, CompensationTypeId, CompensationTypeName }) => ({
    label: CompensationTypeName,
    value: PaydTypeId,
    key: CompensationTypeId
  }))

  const isPackageDisabled = !!form.getFieldsValue(['packageType']).packageType &&
    !!form.getFieldsValue(['packageSize']).packageSize

  const isPackageTypeDisabled = !!marginServiceTypeRelate.error.type && marginServiceTypeRelate.error.type !== 'success'
  const isPackageSizeDisabled = !!marginServiceSizeRelate.error.data && marginServiceSizeRelate.error.type !== 'success'

  const handleSubmit = useCallback((targetOrderDate) => {
    const {
      enrollmentPackageType: paydTypeId,
      package: serviceId,
      comment,
      packageType: serviceTypeId,
      package: packageId,
      packageSize: serviceSizeId
    } = form.getFieldsValue(['enrollmentPackageType', 'package', 'comment', 'packageType', 'package', 'packageSize'])

    const packageName = packages.data?.find(item => item?.ServiceId === packageId)?.ServiceName
    const packageTypeName = marginServiceTypeRelate.data?.find(item => item?.ServiceTypeId === serviceTypeId)?.ServiceType
    const paydServiceId = packages.data?.find(item => item?.ServiceId === serviceId)?.PaydServiceId
    const documentTypeId = compensationFormPackage.data?.find(item => item?.PaydTypeId === paydTypeId)?.CompensationTypeId

    const commentText = `${packageName} / ${packageTypeName} / ${comment}`

    addServiceCompensation({
      transactionDate: targetOrderDate,
      serviceId,
      commentText,
      paydTypeId,
      paydServiceId,
      documentTypeId,
      serviceTypeId,
      serviceSizeId,
      handlingId: autoInteractionData?.handlingId
    })
  }, [packages, marginServiceTypeRelate, compensationFormPackage])

  const handleChangePackage = useCallback((value) => {
    setSelectedPackage(value)
  }, [setSelectedPackage])

  const confirmTitle = useMemo(() => {
    const { package: packageId } = form.getFieldsValue(['package'])
    const packageName = packages.data?.find(item => item.ServiceId === packageId)?.ServiceName
    return `Подключить пакет ${packageName}?`
  }, [packages, selectedPackage])

  const isSubmitDisabled = serviceCompensation.isLoading || isDisabled

  return (
    <Fragment>
      <FormItem label='Тип зачисления' name='enrollmentPackageType' rules={formItemRequired}>
        <Select
          loading={compensationForm.isLoading}
          options={optionEnrollmentPackageType}
          notFoundContent={
            compensationForm.isLoading ? (
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          }
          placeholder='Выберите тип зачисления'
          optionFilterProp='label'
          showSearch
          allowClear
        />
      </FormItem>
      <FormItem label='Тип пакета' name='packageType' rules={formItemRequired}>
        <Select
          onFocus={onPackageTypeFocus}
          onChange={onChangePackageType}
          loading={marginServiceTypeRelate.isLoading}
          options={marginServiceTypeRelate.data.map(({ ServiceTypeId, ServiceType }) => ({
            label: ServiceType,
            value: ServiceTypeId
          }))}
          notFoundContent={
            marginServiceTypeRelate.isLoading ? (
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          }
          placeholder='Выберите тип пакета'
          allowClear
          disabled={isPackageTypeDisabled}
        />
      </FormItem>
      <FormItem label='Размер пакета' name='packageSize' rules={formItemRequired}>
        <Select
          onFocus={onPackageSizeFocus}
          onChange={onChangePackageSize}
          loading={marginServiceSizeRelate.isLoading}
          options={marginServiceSizeRelate.data.map(({ ServiceSizeId, ServiceSize }) => ({
            label: ServiceSize,
            value: ServiceSizeId
          }))}
          notFoundContent={
            marginServiceSizeRelate.isLoading ? (
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          }
          placeholder='Выберите размер пакета'
          allowClear
          disabled={isPackageSizeDisabled}
        />
      </FormItem>
      <FormItem label='Пакет' name='package' rules={formItemRequired}>
        <Select
          onChange={handleChangePackage}
          loading={packages.isLoading}
          options={packages.data?.map(({ ServiceId, ServiceName }) => ({ label: ServiceName, value: ServiceId }))}
          showSearch
          allowClear
          placeholder='Выберите пакет'
          optionFilterProp='label'
          disabled={!isPackageDisabled}
        />
      </FormItem>
      <FormItem label='Комментарий' name='comment' rules={formItemRules}>
        <AutoComplete
          onFocus={onCommentFieldFocus}
          value={form.getFieldsValue(['comment'])}
          onChange={onChangeComment}
          options={comments.data.map(({ PaydCommentDescription }) => ({ value: PaydCommentDescription }))}
          dataSource={comments.data}
          placeholder='Выберите комментарий'
          filterOption
          allowClear
        />
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

CompensationsPackages.propTypes = {
  form: shape({
    setFieldsValue: func,
    getFieldsValue: func
  }).isRequired,

  packages: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,
  validatePaydServiceAvailable: func.isRequired,
  onStartValidatePaydServiceAvailable: func.isRequired,

  comments: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,
  fetchPaydComments: func.isRequired,

  paydPostLimit: shape({
    data: object,
    isLoading: bool,
    error: object
  }).isRequired,

  serviceCompensation: shape({
    data: object,
    isLoading: bool,
    error: object
  }).isRequired,

  marginServiceTypeRelate: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,

  marginServiceSizeRelate: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,

  compensationFormPackage: shape({
    data: array,
    error: object
  }).isRequired,

  compensationForm: shape({
    isLoading: bool
  }).isRequired,

  validatePaydServiceHistory: func.isRequired,
  validatePaydServiceEnabled: func.isRequired,
  onStartValidatePaydServiceEnabled: func.isRequired,
  getMarginServiceTypeRelate: func.isRequired,
  getMarginServiceSizeRelate: func.isRequired,
  addServiceCompensation: func.isRequired,
  autoInteractionData: autoInteractionPropType,
  isDisabled: bool
}

export default CompensationsPackages
