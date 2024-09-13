import React, { Fragment, useCallback, useEffect } from 'react'
import { shape, object, array, bool, func, string } from 'prop-types'
import { Select, AutoComplete, Form, Skeleton, Empty } from 'antd'
import { maxCommentLength } from 'constants/compensations'
import autoInteractionPropType from 'constants/propTypes/autoInteractionPropType'
import CompensationsPromoFooter from './CompensationPromoFooter'

const { Item: FormItem } = Form
const skeletonParagraphStyle = { rows: 3, width: '100%' }
const formItemRequired = [{ required: true }]
const formItemRules = [
  { max: maxCommentLength, message: `Длина комментария не должна превышать ${maxCommentLength} символов` },
  { required: true }
]

const CompensationsPromo = (props) => {
  const {
    form,
    comments,
    fetchPaydComments,
    getPromocodeType,
    getPromocodeServiceType,
    getMarginServiceSizeRelateInPromo,
    promocodeTypes,
    promocodeServiceTypes,
    marginServiceSizeRelateInPromo,
    compensationForm,
    compensationFormPromocode,
    addPromocode,
    addPromocodeCompensation,
    autoInteractionData,
    handlingTechId,
    msisdn,
    isDisabled
  } = props

  const onPackageSizeFocus = useCallback(() => getMarginServiceSizeRelateInPromo(), marginServiceSizeRelateInPromo.data)
  const onCommentFieldFocus = useCallback(() => fetchPaydComments(), comments.data)
  const onPromoTypeFocus = useCallback(
    () =>
      getPromocodeType({
        ServiceTypeId: form.getFieldValue('promoServiceType'),
        ServiceSizeId: form.getFieldValue('promoServiceSize')
      }),
    promocodeTypes.data
  )

  useEffect(() => {
    const { isLoading, error } = addPromocode
    if (!isLoading && (error?.type === 'success' || error?.type === 'warning')) {
      form.resetFields()
      form.validateFields()
    }
  }, [addPromocode.isLoading])

  useEffect(() => {
    promocodeServiceTypes.data && getPromocodeServiceType()
  }, [])

  const onChangeComment = useCallback(
    value => {
      form.setFieldsValue({
        comment: value?.replace('/', '')
      })
    },
    [form.getFieldValue('comment')]
  )

  const optionPromocodeType = compensationFormPromocode?.data?.map(({ CompensationTypeName, CompensationTypeId, PaidTypeId }) => ({
    label: CompensationTypeName,
    value: CompensationTypeId,
    key: PaidTypeId
  }))

  const isPromoTypeDisabled =
    !!form.getFieldValue('promoServiceType') && !!form.getFieldsValue('promoServiceSize')

  const isPromoServiceTypeDisabled = !!promocodeServiceTypes.error.data
  const isPackageSizeDisabled = !!marginServiceSizeRelateInPromo.error.data && marginServiceSizeRelateInPromo.error?.type !== 'success'

  const handleSubmit = useCallback((isSms) => {
    const {
      documentTypeId,
      promoServiceType,
      promoServiceSize,
      promocodeType,
      comment
    } = form.getFieldsValue(['documentTypeId', 'promoServiceType', 'promoServiceSize', 'promocodeType', 'comment'])

    const selectedPromocodeType = promocodeTypes?.data?.find(type => type?.PromocodeTypeId === promocodeType)

    addPromocodeCompensation({
      promocodeTypeId: promocodeType,
      promocodeTypeName: selectedPromocodeType.PromocodeTypeName,
      promocodeNotifyText: selectedPromocodeType.PromocodeServiceNotificationText,
      promocodeCampaignId: selectedPromocodeType.BrecampaignId,
      promocodeScenarioId: selectedPromocodeType.BreScenarioId,
      promocodePrefix: selectedPromocodeType.PromocodePrefix,
      promocodeSignNum: selectedPromocodeType.PromocodeSignNum,
      promocodeExpirePeriod: selectedPromocodeType.PromocodeExpirePeriod,
      documentTypeId: documentTypeId,
      serviceTypeId: promoServiceType,
      serviceSizeId: promoServiceSize,
      handlingTechId,
      ...autoInteractionData,
      CommentText: comment,
      PerformActivation: !isSms,
      msisdn
    })
  }, [promocodeTypes])

  const isSubmitDisabled = addPromocode.isLoading || isDisabled

  return (
    <Fragment>
      <FormItem label='Тип зачисления' name='documentTypeId' rules={formItemRequired}>
        <Select
          loading={compensationForm.isLoading}
          options={optionPromocodeType}
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
      <FormItem label='Тип компенсации' name='promoServiceType' rules={formItemRequired}>
        <Select
          loading={promocodeServiceTypes.isLoading}
          options={promocodeServiceTypes?.data?.map(({ ServiceTypeId, ServiceTypeName }) => ({
            label: ServiceTypeName,
            value: ServiceTypeId
          }))}
          notFoundContent={
            promocodeServiceTypes.isLoading ? (
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          }
          placeholder='Выберите тип компенсации'
          allowClear
          disabled={isPromoServiceTypeDisabled}
        />
      </FormItem>
      <FormItem label='Размер компенсации' name='promoServiceSize' rules={formItemRequired}>
        <Select
          onFocus={onPackageSizeFocus}
          loading={marginServiceSizeRelateInPromo.isLoading}
          options={marginServiceSizeRelateInPromo.data?.map(({ ServiceSizeId, ServiceSize }) => ({
            label: ServiceSize,
            value: ServiceSizeId
          }))}
          notFoundContent={
            marginServiceSizeRelateInPromo.isLoading ? (
              <Skeleton active title={false} paragraph={skeletonParagraphStyle} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          }
          placeholder='Выберите размер компенсации'
          allowClear
          disabled={isPackageSizeDisabled}
        />
      </FormItem>
      <FormItem label='Тип промокода' name='promocodeType' rules={formItemRequired}>
        <Select
          onFocus={onPromoTypeFocus}
          loading={promocodeTypes.isLoading}
          options={promocodeTypes.data?.map(({ PromocodeTypeId, PromocodeTypeName }) => ({
            label: PromocodeTypeName,
            value: PromocodeTypeId
          }))}
          showSearch
          allowClear
          placeholder='Тип промокода'
          optionFilterProp='label'
          disabled={!isPromoTypeDisabled}
        />
      </FormItem>
      <FormItem label='Комментарий' name='comment' rules={formItemRules}>
        <AutoComplete
          onFocus={onCommentFieldFocus}
          value={form.getFieldsValue(['comment'])}
          onChange={onChangeComment}
          options={comments.data?.map(({ PaydCommentDescription }) => ({ value: PaydCommentDescription }))}
          dataSource={comments.data}
          placeholder='Выберите комментарий'
          filterOption
          allowClear
        />
      </FormItem>
      <CompensationsPromoFooter
        onConfirm={handleSubmit}
        isSubmitDisabled={isSubmitDisabled}
      />
    </Fragment>
  )
}

CompensationsPromo.propTypes = {
  form: shape({
    setFieldsValue: func,
    getFieldsValue: func
  }).isRequired,
  comments: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,
  fetchPaydComments: func.isRequired,
  marginServiceSizeRelateInPromo: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,
  compensationForm: shape({
    isLoading: bool
  }).isRequired,
  promocodeTypes: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,
  promocodeServiceTypes: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,
  compensationFormPromocode: shape({
    data: array,
    isLoading: bool,
    error: object
  }).isRequired,
  addPromocode: shape({
    data: array,
    isLoading: bool,
    isError: bool
  }).isRequired,
  getMarginServiceSizeRelateInPromo: func.isRequired,
  getPromocodeType: func.isRequired,
  getPromocodeServiceType: func.isRequired,
  addPromocodeCompensation: func.isRequired,
  autoInteractionData: autoInteractionPropType,
  msisdn: string,
  handlingTechId: string,
  isDisabled: bool
}

export default CompensationsPromo
