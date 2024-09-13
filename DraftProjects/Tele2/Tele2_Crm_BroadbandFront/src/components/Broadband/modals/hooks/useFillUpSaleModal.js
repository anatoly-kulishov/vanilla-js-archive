import { useMemo, useEffect } from 'react'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { TariffTypes } from 'constants/tariff'
import { getTariffItemByType } from 'helpers/agreement'
import { getSpeedToTechnologyServiceId } from 'components/Broadband/helpers/broadband'
import { fillUpSaleEquipments, getUpSaleEquipmentTypeParams } from 'components/Broadband/helpers/equipments'
import { getUpSaleSpeedToTechnologyParams } from 'helpers/speedToTechnology'

const useFillUpSaleModal = ({ form, isModalVisible, upSaleType }) => {
  const {
    order,
    speedToTechnology,
    upSaleEquipmentTypes,
    rtcKey,
    getUpSaleEquipmentTypes,
    getUpSaleSpeedToTechnology,
    formInitData
  } = useBroadbandContext()

  const orderData = order.data
  const { subscriberRatePlanId } = formInitData ?? {}

  const initialFormValues = useMemo(() => {
    if (orderData && speedToTechnology && upSaleEquipmentTypes) {
      const isWinkSetting = Boolean(getTariffItemByType(orderData, TariffTypes.Wink))
      const isSim = Boolean(getTariffItemByType(orderData, TariffTypes.Sim))

      const serviceId = getSpeedToTechnologyServiceId(orderData, speedToTechnology)

      const { Equipments } = fillUpSaleEquipments(orderData, upSaleType)

      const values = {
        ServiceId: serviceId,
        Equipments,
        IsWinkSetting: isWinkSetting,
        IsSim: isSim
      }
      return values
    }
    return null
  }, [orderData && speedToTechnology && upSaleEquipmentTypes])

  useEffect(() => {
    if (isModalVisible && orderData) {
      const equipmentTypeParams = getUpSaleEquipmentTypeParams(orderData, rtcKey, upSaleType)
      const speedToTechnologyParams = getUpSaleSpeedToTechnologyParams(orderData, subscriberRatePlanId, rtcKey)

      getUpSaleEquipmentTypes(equipmentTypeParams)
      getUpSaleSpeedToTechnology(speedToTechnologyParams)
    }
  }, [isModalVisible, orderData])

  useEffect(() => {
    if (isModalVisible && initialFormValues) {
      form.setFieldsValue(initialFormValues)
    }
  }, [isModalVisible, initialFormValues])
}

export default useFillUpSaleModal
