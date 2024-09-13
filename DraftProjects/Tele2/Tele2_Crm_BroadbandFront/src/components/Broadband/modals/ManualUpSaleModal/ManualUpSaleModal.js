import { PlusOutlined } from '@ant-design/icons'
import { Alert, Button, Checkbox, Form, Input, Modal, Space } from 'antd'
import { object } from 'prop-types'
import { useCallback } from 'react'
import styled from 'styled-components'

import EquipmentField from 'components/Broadband/components/EquipmentField'
import SpeedToTechnologyBlock from 'components/Broadband/components/SpeedToTechnologyBlock'

import { prepareChangeOrderData } from 'components/Broadband/helpers/order'
import { useBroadbandContext } from '../../../../context/hooks/useBroadbandContext'
import useFillUpSaleModal from '../hooks/useFillUpSaleModal'
import { checkSelectedEquipmentTypes, getEquipmentTypeIdOptions } from 'components/Broadband/helpers/equipments'
import { UPSALE_TYPE } from 'constants/upSaleType'
import { winkAlert } from 'constants/equipment'

const MAX_EQUIPMENT_AMOUNT = 5

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 }
}

const speedToTechnologyFieldName = 'ServiceId'

const propTypes = { mainForm: object, orderEquipmentSpeed: object }

const ManualUpSaleModal = props => {
  const { mainForm, orderEquipmentSpeed } = props
  const {
    isManualUpSaleModalVisible,
    orderState,
    upSaleSpeedToTechnology,
    upSaleEquipmentTypes,
    changeManualUpSaleModalVisibility,
    handleChangeManualUpSale,
    changeMainFormState,
    isChangeManualUpSaleLoading
  } = useBroadbandContext()

  const [form] = Form.useForm()
  const selectedEquipments = Form.useWatch('Equipments', form)

  useFillUpSaleModal({ form, isModalVisible: isManualUpSaleModalVisible, upSaleType: UPSALE_TYPE.MANUAL })

  const handleClose = useCallback(() => {
    changeManualUpSaleModalVisibility(false)
  }, [changeManualUpSaleModalVisibility])

  const orderId = orderState.OrderId

  const isSpeedToTechnology = upSaleSpeedToTechnology?.length > 0

  const handleSave = useCallback(async () => {
    try {
      const formValues = await form.validateFields()
      const { IsSim } = formValues
      const { IsNewSubscriber } = orderState

      const changeOrderData = prepareChangeOrderData(formValues, upSaleEquipmentTypes, orderId)
      const orderParams = { orderId }
      const payload = { orderParams, changeOrderData }
      handleChangeManualUpSale(payload)

      if (!IsNewSubscriber && IsSim) {
        mainForm.setFieldsValue({ IsNewSubscriber: true })
        changeMainFormState({ IsNewSubscriber: true })
      }
    } catch {}
  }, [orderId, upSaleEquipmentTypes, orderState])

  const { isTVSetTopBoxSelected, isWinkSelected } = checkSelectedEquipmentTypes(selectedEquipments)
  const isWinkAlertVisible = isTVSetTopBoxSelected && !isWinkSelected

  return (
    <StyledModal
      zIndex='1002'
      width='73vw'
      centered
      visible={isManualUpSaleModalVisible}
      onCancel={handleClose}
      title={
        <HeaderWrapper>
          <ModalHeader>Ручное изменение заказа по заявке {orderId}</ModalHeader>
        </HeaderWrapper>
      }
      footer={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type='primary' onClick={handleSave} loading={isChangeManualUpSaleLoading}>
            Подтвердить
          </Button>
        </Space>
      }
    >
      <StyledAlert showIcon type='info' message='Сохранение изменений будет произведено только в системе Tele2' />
      {isWinkAlertVisible && <StyledAlert showIcon type={winkAlert.type} message={winkAlert.message} />}
      <StyledForm {...formItemLayout} form={form}>
        {isSpeedToTechnology && (
          <StyledFormItem name={speedToTechnologyFieldName} label='Технология и скорость подключения'>
            <SpeedToTechnologyBlock
              speedToTechnology={upSaleSpeedToTechnology}
              orderEquipmentSpeed={orderEquipmentSpeed}
            />
          </StyledFormItem>
        )}
        <Form.List name='Equipments'>
          {(fields, { add, remove }) => {
            const isNewEquipmentAdded = selectedEquipments?.some(value => value === undefined)
            const typeIdOptions = getEquipmentTypeIdOptions(selectedEquipments, upSaleEquipmentTypes)

            const isAddDisabled = fields.length >= MAX_EQUIPMENT_AMOUNT || !typeIdOptions.length || isNewEquipmentAdded

            return (
              <>
                {fields.map((field, index) => (
                  <EquipmentField
                    listValue={selectedEquipments}
                    listName='Equipments'
                    field={field}
                    index={index}
                    remove={remove}
                    canBeRemoved={false}
                    form={form}
                    equipmentTypes={upSaleEquipmentTypes}
                    dataTidParentComponent='manual-upsale-modal-form'
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
            <Checkbox>Требуется настройка Wink</Checkbox>
          </StyledFormItem>
          <StyledFormItem valuePropName='checked' name='IsSim'>
            <Checkbox>Требуется Sim-карта</Checkbox>
          </StyledFormItem>
        </StyledFormItem>
        <StyledFormItem label='Добавить комментарий' name='Comment'>
          <Input placeholder='Комментарий' />
        </StyledFormItem>
      </StyledForm>
    </StyledModal>
  )
}

ManualUpSaleModal.propTypes = propTypes

export default ManualUpSaleModal

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
