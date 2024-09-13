import * as moment from 'moment'

const DELIMITER = '-------------------'
const EMPTY_LINE = ''

const PROBLEM_TEMPLATE = ['Описание проблемы:', EMPTY_LINE, 'Текст ошибки:', EMPTY_LINE]

const getValue = value => value ?? ''

const getBroadbandOrderInfo = order => {
  const {
    OrderId,
    Address: { CityName },
    Msisdn,
    RtcAccountNumber,
    StatusName,
    InstallationOrderNum,
    CreatedBy,
    CrmOrderId
  } = order ?? {}

  return [
    `ШПД: ${getValue(OrderId)}`,
    `Регион: ${getValue(CityName)}`,
    `Контактный номер: ${getValue(Msisdn)}`,
    `Лицевой счет: ${getValue(RtcAccountNumber)}`,
    `CrmOrderId: ${getValue(CrmOrderId)}`,
    `Статус: ${getValue(StatusName)}`,
    `Номер окна (задание): ${getValue(InstallationOrderNum)}`,
    `Логин пользователя: ${getValue(CreatedBy)}`,
    `Дата и время возникновения ошибки: ${moment().format('DD.MM.YYYY HH:mm')}`
  ]
}

export const createBroadbandDescription = order => {
  const linesArray = [...PROBLEM_TEMPLATE, DELIMITER, ...getBroadbandOrderInfo(order)]

  const description = linesArray.join('\n')

  return description
}
