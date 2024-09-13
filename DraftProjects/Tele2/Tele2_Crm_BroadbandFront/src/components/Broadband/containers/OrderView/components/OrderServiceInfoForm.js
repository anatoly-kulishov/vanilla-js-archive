import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { Button, Select, Form, Spin, Input } from 'antd'

const { useForm } = Form

const NO_SUB_CHANNEL_OPTION = { key: 'Нет подканала', label: 'Нет подканала', value: null }
const CONTACT_POINT_RULES = [{ max: 25, message: 'Максимальная длина точки контакта: 25 символов' }]

export default function OrderServiceInfoForm (props) {
  const { isHidden, isCreating, areFormControlsDisabled, areFormActionsDisabled } = props

  const { order, orderState, handbooks, modifyOrder, changeMainFormState, modifyOrderState } = useBroadbandContext()

  const [form] = useForm()

  const [isEditing, setIsEditing] = useState(false)

  const { isLoading, isSuccess } = modifyOrderState

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false)
    }
  }, [isSuccess])

  const info = useMemo(
    () => ({
      orderId: orderState.OrderId,
      createdBy: order.data?.CreatedBy ?? '',
      createdOn: order.data?.CreatedOn
        ? moment.utc(order.data?.CreatedOn).local().format('DD.MM.YYYY HH:mm')
        : 'Нет даты',
      systemName: handbooks?.Systems?.find(system => system.Id === orderState.SystemId)?.Name,
      channelName: order.data?.ChannelName ?? 'Нет канала',
      subChannelName: orderState?.BusinessChannelKey ?? NO_SUB_CHANNEL_OPTION.label,
      contactPoint: orderState.ContactPoint ?? 'Нет'
    }),
    [orderState, order, handbooks]
  )

  const { orderId, createdBy, createdOn, channelName, subChannelName, contactPoint, systemName } = info

  const [subChannelOptions, systemOptions] = useMemo(() => {
    const subChannelOptions = [
      NO_SUB_CHANNEL_OPTION,
      ...(handbooks?.BusinessChannelKeys?.map(subChannel => ({
        key: subChannel.Id,
        label: subChannel.Id,
        value: subChannel.Id
      })) ?? [])
    ]
    const systemOptions =
      handbooks?.Systems?.map(system => ({
        key: system.Id,
        label: system.Name,
        value: system.Id
      })) ?? []

    return [subChannelOptions, systemOptions]
  }, [handbooks])

  const initialFormValues = useMemo(
    () => ({
      systemId: orderState?.SystemId,
      businessChannelKey: orderState?.BusinessChannelKey ?? NO_SUB_CHANNEL_OPTION.value,
      contactPoint: orderState?.ContactPoint
    }),
    [orderState]
  )

  const handleEdit = useCallback(() => {
    form.resetFields()
    setIsEditing(true)
  }, [])

  const handleCancel = useCallback(() => {
    form.resetFields()
    setIsEditing(false)
  }, [])

  const handleSave = useCallback(async () => {
    try {
      const { businessChannelKey, systemId, contactPoint } = await form.validateFields()

      const data = {
        BusinessChannelKey: businessChannelKey,
        SystemId: systemId,
        ContactPoint: contactPoint === '' ? null : contactPoint
      }

      if (isCreating) {
        setIsEditing(false)
        changeMainFormState(data)
      } else {
        modifyOrder({ ...data, OrderId: orderId })
      }
    } catch {}
  }, [orderId, isCreating])

  return (
    <div hidden={!isHidden}>
      <Wrapper>
        <Spin spinning={isLoading}>
          <Header>
            <Title>Системная информация по заявке</Title>
            {isEditing ? (
              <div>
                <Button
                  size='small'
                  type='text'
                  onClick={handleSave}
                  disabled={areFormActionsDisabled || areFormControlsDisabled}
                >
                  Сохранить
                </Button>
                <Button
                  size='small'
                  type='text'
                  onClick={handleCancel}
                  disabled={areFormActionsDisabled || areFormControlsDisabled}
                >
                  Отменить
                </Button>
              </div>
            ) : (
              <Button
                size='small'
                type='text'
                onClick={handleEdit}
                disabled={areFormActionsDisabled || areFormControlsDisabled}
              >
                Изменить
              </Button>
            )}
          </Header>
          <Cost>
            <Form form={form} layout='inline' size='small' initialValues={initialFormValues}>
              <KeyValueField>
                <Field>Номер заявки</Field>
                <ValueField>{orderId}</ValueField>
              </KeyValueField>
              <KeyValueField>
                <Field>Создана</Field>
                <ValueField>{`${createdBy} ${createdOn}`}</ValueField>
              </KeyValueField>
              <KeyValueField>
                <Field>Система</Field>
                {isEditing ? (
                  <Form.Item name='systemId'>
                    <Select options={systemOptions} disabled={areFormActionsDisabled || areFormControlsDisabled} />
                  </Form.Item>
                ) : (
                  <ValueField>{systemName}</ValueField>
                )}
              </KeyValueField>
              <KeyValueField>
                <Field>Канал</Field>
                <ValueField>{channelName}</ValueField>
              </KeyValueField>
              <KeyValueField>
                <Field>Подканал</Field>
                {isEditing ? (
                  <Form.Item name='businessChannelKey'>
                    <Select options={subChannelOptions} disabled={areFormActionsDisabled || areFormControlsDisabled} />
                  </Form.Item>
                ) : (
                  <ValueField>{subChannelName}</ValueField>
                )}
              </KeyValueField>
              <KeyValueField>
                <Field>Точка контакта</Field>
                {isEditing ? (
                  <Form.Item name='contactPoint' rules={CONTACT_POINT_RULES}>
                    <Input disabled={areFormActionsDisabled || areFormControlsDisabled} />
                  </Form.Item>
                ) : (
                  <ValueField>{contactPoint}</ValueField>
                )}
              </KeyValueField>
            </Form>
          </Cost>
        </Spin>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  top: 0;
  z-index: 3;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  padding: 0px 21px 16px 21px;
  overflow: auto;
  border-bottom: 1px solid #f0f0f0;
`
const Cost = styled.div`
  padding: 5px 0px;
  display: flex;
`
const KeyValueField = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 24px;
`
const Field = styled.div`
  /* width: 50%; */
  font-size: 12px;
`
const ValueField = styled.div`
  color: #000;
  font-size: 13px;
  /* width: 50%; */
`
const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 10px 0px;
`
const Title = styled.div`
  font-size: 14px;
  color: black;
`
