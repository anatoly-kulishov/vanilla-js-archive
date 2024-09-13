import React, { useCallback } from 'react'
import { Button, Form, Input, Modal, Space } from 'antd'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { prepareDeleteOrderEditSessionData } from 'components/Broadband/helpers/order'

const { Item, useForm } = Form

const CancelAutoUpSaleModal = () => {
  const {
    isCancelAutoUpSaleModalVisible,
    changeCancelAutoUpSaleModalVisibility,
    createOrderEditSessionState,
    deleteOrderEditSession
  } = useBroadbandContext()

  const [form] = useForm()

  const { sessionId } = createOrderEditSessionState.data ?? {}

  const handleSave = useCallback(() => {
    const values = form.getFieldsValue()
    const data = prepareDeleteOrderEditSessionData(sessionId, values)
    deleteOrderEditSession(data)
  }, [sessionId])

  const handleCancel = useCallback(
    () => changeCancelAutoUpSaleModalVisibility(false),
    [changeCancelAutoUpSaleModalVisibility]
  )

  return (
    <Modal
      visible={isCancelAutoUpSaleModalVisible}
      onCancel={handleCancel}
      title='Добавить комментарий'
      zIndex='1003'
      footer={
        <Space>
          <Button onClick={handleCancel}>Отмена</Button>
          <Button type='primary' onClick={handleSave}>
            Подтвердить
          </Button>
        </Space>
      }
    >
      <Form form={form} colon={false}>
        <Item label='Комментарий' name='comment'>
          <Input />
        </Item>
      </Form>
    </Modal>
  )
}

export default CancelAutoUpSaleModal
