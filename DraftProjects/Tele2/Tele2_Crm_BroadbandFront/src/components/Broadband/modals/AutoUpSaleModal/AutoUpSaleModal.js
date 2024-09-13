import { useCallback } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Alert, Button, Checkbox, Form, Modal, Row, Space, Tag } from 'antd'
import styled from 'styled-components'

import EquipmentField from 'components/Broadband/components/EquipmentField'
import SpeedToTechnologyBlock from 'components/Broadband/components/SpeedToTechnologyBlock'
import CancelAutoUpSaleModal from './CancelAutoUpSaleModal'

import { prepareModifyOrderEditSessionData } from 'components/Broadband/helpers/order'
import { useBroadbandContext } from '../../../../context/hooks/useBroadbandContext'
import useFillUpSaleModal from '../hooks/useFillUpSaleModal'
import { getEquipmentTypeIdOptions } from 'components/Broadband/helpers/equipments'
import { getUpsaleStatusColor } from 'components/Broadband/helpers/broadband'
import { UPSALE_TYPE } from 'constants/upSaleType'

const MAX_EQUIPMENT_AMOUNT = 5

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 }
}

const speedToTechnologyFieldName = 'ServiceId'

const propTypes = {}

const AutoUpSaleModal = props => {
  const { orderEquipmentSpeed } = props

  const {
    isAutoUpSaleModalVisible,
    order,
    orderState,
    upSaleSpeedToTechnology,
    upSaleEquipmentTypes,
    createOrderEditSessionState,
    orderEditSessionState,
    changeCancelAutoUpSaleModalVisibility,
    handleChangeAutoUpSale: onChangeAutoUpSale,
    isChangeAutoUpSaleLoading,
    deleteOrderEditSessionState
  } = useBroadbandContext()

  const [form] = Form.useForm()

  useFillUpSaleModal({ form, isModalVisible: isAutoUpSaleModalVisible, upSaleType: UPSALE_TYPE.AUTO })

  const handleCancel = useCallback(
    () => changeCancelAutoUpSaleModalVisibility(true),
    [changeCancelAutoUpSaleModalVisibility]
  )

  const orderData = order.data
  const isSpeedToTechnology = upSaleSpeedToTechnology?.length > 0

  const { OrderId: orderId, IsOnlime: isOnlime } = orderState ?? {}
  const { IsNewSubscriber } = orderData ?? {}
  const { sessionId } = createOrderEditSessionState.data ?? {}
  const { statusName, statusId, upsaleOrderId, isBcAllowed, isEqAllowed, isWinkAllowed, isSimAllowed } =
    orderEditSessionState.data ?? {}

  const showAlert = isOnlime
  const alertMessage = `В ЛКД создана заявка на изменение заказа номер ${upsaleOrderId}`

  const isSimDisabled = !isSimAllowed || IsNewSubscriber
  const isWinkDisabled = !isWinkAllowed
  const areEquipmentsDisabled = !isEqAllowed
  const isSpeedToTechnologyDisabled = !isBcAllowed
  const areFooterButtonsDisabled = deleteOrderEditSessionState.isLoading || isChangeAutoUpSaleLoading

  const handleSave = useCallback(async () => {
    const values = await form.validateFields()
    const modifyOrderEditSessionData = prepareModifyOrderEditSessionData(
      values,
      upSaleSpeedToTechnology,
      upSaleEquipmentTypes,
      sessionId
    )
    const orderParams = { orderId }
    const payload = { modifyOrderEditSessionData, orderParams }

    onChangeAutoUpSale(payload)
  }, [upSaleSpeedToTechnology, upSaleEquipmentTypes, sessionId, orderId])

  return (
    <StyledModal
      zIndex='1002'
      width='73vw'
      centered
      closable={false}
      visible={isAutoUpSaleModalVisible}
      title={
        <HeaderWrapper>
          <ModalHeader>Автоматическое изменение заказа по заявке {orderId}</ModalHeader>
        </HeaderWrapper>
      }
      footer={
        <Space>
          <Button onClick={handleCancel} disabled={areFooterButtonsDisabled}>
            Отмена
          </Button>
          <Button type='primary' onClick={handleSave} disabled={areFooterButtonsDisabled}>
            Подтвердить
          </Button>
        </Space>
      }
    >
      <Space direction='vertical'>
        <Row>
          <Tag data-tid='span__auto-upsale-modal-form__order-id'>{sessionId}</Tag>
          <Tag data-tid='span__auto-upsale-modal-form__order-status-name' color={getUpsaleStatusColor(statusId)}>
            {statusName}
          </Tag>
        </Row>
        {showAlert && <StyledAlert showIcon type='warning' message={alertMessage} />}
      </Space>
      <StyledForm {...formItemLayout} form={form}>
        {isSpeedToTechnology && (
          <StyledFormItem name={speedToTechnologyFieldName} label='Технология и скорость подключения'>
            <SpeedToTechnologyBlock
              speedToTechnology={upSaleSpeedToTechnology}
              disabled={isSpeedToTechnologyDisabled}
              orderEquipmentSpeed={orderEquipmentSpeed}
            />
          </StyledFormItem>
        )}
        <Form.List name='Equipments'>
          {(fields, { add, remove }) => {
            const listValue = form.getFieldValue('Equipments')
            const typeIdOptions = getEquipmentTypeIdOptions(listValue, upSaleEquipmentTypes)
            const isNewEquipmentAdded = listValue?.some(value => value === undefined)

            const isAddDisabled =
              fields.length >= MAX_EQUIPMENT_AMOUNT ||
              areEquipmentsDisabled ||
              !typeIdOptions.length ||
              isNewEquipmentAdded

            return (
              <>
                {fields.map((field, index) => (
                  <EquipmentField
                    listValue={listValue}
                    listName='Equipments'
                    field={field}
                    index={index}
                    remove={remove}
                    canBeRemoved={false}
                    form={form}
                    equipmentTypes={upSaleEquipmentTypes}
                    dataTidParentComponent='auto-upsale-modal-form'
                    disabled={areEquipmentsDisabled}
                    speedToTechnologyFieldName={speedToTechnologyFieldName}
                    typeIdOptions={typeIdOptions}
                  />
                ))}
                <StyledFormItem>
                  <Button type='text' onClick={() => add()} block icon={<PlusOutlined />} disabled={isAddDisabled}>
                    Добавить оборудование
                  </Button>
                </StyledFormItem>
              </>
            )
          }}
        </Form.List>
        <StyledFormItem label='Дополнительные опции'>
          <StyledFormItem valuePropName='checked' name='IsWinkSetting'>
            <Checkbox disabled={isWinkDisabled}>Требуется настройка Wink</Checkbox>
          </StyledFormItem>
          <StyledFormItem valuePropName='checked' name='IsSim'>
            <Checkbox disabled={isSimDisabled}>Требуется Sim-карта</Checkbox>
          </StyledFormItem>
        </StyledFormItem>
      </StyledForm>
      <CancelAutoUpSaleModal />
    </StyledModal>
  )
}

AutoUpSaleModal.propTypes = propTypes

export default AutoUpSaleModal

const HeaderWrapper = styled.div`
  padding-right: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalHeader = styled.span`
  font-family: T2_DisplaySerif_Bold_Short;
  font-size: 16px;
`

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 4px;
`

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 10px 24px;
  }
`
const StyledAlert = styled(Alert)`
  margin-bottom: 8px;
`

const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding: 0;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
`
