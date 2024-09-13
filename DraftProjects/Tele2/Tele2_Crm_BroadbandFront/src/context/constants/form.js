import { TariffTypes } from 'constants/tariff'

export const PersonFields = {
  FirstName: 'FirstName',
  MiddleName: 'MiddleName',
  LastName: 'LastName',
  Sex: 'Sex',
  Birthday: 'Birthday',
  BirthPlace: 'BirthPlace',
  IsCitizen: 'IsCitizen',
  Comment: 'Comment'
}

export const AgreementFields = {
  IsNewSubscriber: 'IsNewSubscriber',
  Agreement: 'Agreement',
  IsWinkSetting: 'IsWinkSetting',
  ServiceId: 'ServiceId'
}

export const TimeslotsFields = {
  TimeSlotDate: 'TimeSlotDate',
  TimeSlotTime: 'TimeSlotTime',
  TimeSlotComment: 'TimeSlotComment'
}

export const simNeedTariff = {
  Cost: null,
  CostMonth: null,
  EquipmentId: null,
  FirstPayment: null,
  Id: null,
  Name: null,
  PaymentType: null,
  TotalMonths: null,
  Type: 'sim',
  TypeCode: 'sim',
  TypeName: 'SIM-карта'
}

export const winkNeedTariff = {
  Cost: null,
  CostMonth: null,
  EquipmentId: null,
  FirstPayment: null,
  Id: null,
  Name: null,
  PaymentType: null,
  TotalMonths: null,
  Type: 'wink',
  TypeCode: 'wink',
  TypeName: 'WINK-оборудование'
}

export const broadbandAccessTariff = {
  Cost: null,
  CostMonth: null,
  EquipmentId: null,
  FirstPayment: null,
  Id: null,
  Name: null,
  PaymentType: null,
  TotalMonths: null,
  Type: TariffTypes.BroadbandAccess,
  TypeCode: null,
  TypeName: null
}

export const DocumentFields = {
  DocumentTypeId: 'DocumentTypeId',
  Series: 'Series',
  Number: 'Number',
  IssueDate: 'IssueDate',
  IssueBy: 'IssueBy',
  UnitCode: 'UnitCode',
  EndDate: 'EndDate'
}
