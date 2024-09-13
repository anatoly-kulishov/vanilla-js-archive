export const AgreementKey = {
  isAgreeUseSubscriberInfo: 'isAgreeUseSubscriberInfo',
  isPersonalDataDelegation: 'isPersonalDataDelegation',
  isRefuseSmsAdvertising: 'isRefuseSmsAdvertising',
  isNotAcceptDs: 'isNotAcceptDs',
  isNotTariffSms: 'isNotTariffSms'
}

export const agreementsMap = {
  [AgreementKey.isAgreeUseSubscriberInfo]:
    'Не согласен на использование сведений обо мне для оказания справочных и иных информационных услуг',
  [AgreementKey.isPersonalDataDelegation]:
    'Не согласен на передачу сведений обо мне третьим лицам в соответствии с п. 8.4.2 условий оказания услуг связи',
  [AgreementKey.isRefuseSmsAdvertising]: 'Не согласен получать рекламу',
  [AgreementKey.isNotAcceptDs]:
    'Не согласен на присоединение к оферте об использовании аналога собственноручной подписи',
  [AgreementKey.isNotTariffSms]: 'Не согласен получать изменения тарифов в Личном кабинете вместо SMS'
}
