import React from 'react'
import { Alert } from 'antd'
import { bool, number, object } from 'prop-types'
import styled from 'styled-components'

import { UpsaleStatuses } from 'constants/upsaleStatuses'
import { getUpsaleStatusText, getInfoCodeAlerts } from 'components/Broadband/helpers/broadband'
import { winkAlert } from 'constants/equipment'
import { checkSelectedEquipmentTypes } from 'components/Broadband/helpers/equipments'

export default function EquipmentAlerts (props) {
  const {
    isSpeedToTechnologyOutdated,
    isSpeedToTechnology,
    orderEquipmentSpeed,
    upsaleOrderStatusId,
    infoCode,
    selectedEquipments
  } = props
  let message = ''
  let type = ''

  if (isSpeedToTechnologyOutdated) {
    message = 'Выбранная технология и скорость подключения устарели и более недоступны'
    type = 'error'
  }
  if (!isSpeedToTechnology) {
    message = 'Список технологий и скоростей доступен только после проверки возможности подключения'
    type = 'warning'
  } else {
    message = 'В случае изменения типа технологий все наборы оборудования будут удалены'
    type = 'info'
  }

  if (upsaleOrderStatusId === UpsaleStatuses.InProcessing) {
    message = getUpsaleStatusText(UpsaleStatuses.InProcessing)
    type = 'warning'
  }
  if (upsaleOrderStatusId === UpsaleStatuses.Done) {
    message = getUpsaleStatusText(UpsaleStatuses.Done)
    type = 'success'
  }
  if (upsaleOrderStatusId === UpsaleStatuses.Error) {
    message = getUpsaleStatusText(UpsaleStatuses.Error)
    type = 'error'
  }

  if (infoCode) {
    const { text, alertType } = getInfoCodeAlerts(infoCode)
    message = text
    type = alertType
  }

  const commonAlert = { message, type }

  const alerts = [commonAlert]

  if (orderEquipmentSpeed !== undefined) {
    const { Name, Cost } = orderEquipmentSpeed ?? {}
    const orderEquipmentAlert = { message: `Текущая скорость ${Name} - ${Cost} руб.`, type: 'info' }

    alerts.push(orderEquipmentAlert)
  }

  const { isTVSetTopBoxSelected, isWinkSelected } = checkSelectedEquipmentTypes(selectedEquipments)
  if (isTVSetTopBoxSelected && !isWinkSelected) {
    alerts.push({ message: winkAlert.message, type: winkAlert.type })
  }

  return (
    <Wrapper>
      {alerts.map(({ message, type }) => (
        <Alert message={message} type={type} showIcon />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

EquipmentAlerts.propTypes = {
  isSpeedToTechnologyOutdated: bool,
  isSpeedToTechnology: bool,
  orderEquipmentSpeed: object,
  upsaleOrderStatusId: number,
  infoCode: number
}
