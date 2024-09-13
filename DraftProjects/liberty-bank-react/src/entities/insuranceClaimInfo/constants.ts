export const BACKBTN = 'Назад';
export const REGISTERBTN = 'Оформить заявку';
export const PROPERTIES: string[] = [
  'Автострахование ОСАГО',
  'Автострахование КАСКО',
  'Страхование домашнего имущества',
];

export const FIELDS: Record<string, string> = {
  productId: 'policyInfo.productId',
  productName: 'policyInfo.productName',
  currencyNumericCode: 'policyInfo.currencyNumericCode',
  startDate: 'policyInfo.startDate',
  expirationDate: 'policyInfo.expirationDate',
  agreementNumber: 'policyInfo.agreementNumber',
  policyStatus: 'policyInfo.policyStatus',
  bankName: 'bankName',
  checkingAccount: 'checkingAccount',
  correspondentAccount: 'correspondentAccount',
  bankBIC: 'bankBIC',
  bankTIN: 'bankTIN',
  // Сведения о заявителе / Сведения о владельце
  insurer: 'insurer',
  insurerName: 'insurerInfo.insurerName',
  insurerSurname: 'insurerInfo.insurerSurname',
  insurerPatronymic: 'insurerInfo.insurerPatronymic',
  insurerBirthdate: 'insurerInfo.insurerBirthdate',
  documentType: 'documentType',
  passportNumber: 'passportNumber',
  dateOfIssue: 'dateOfIssue',
  issuedBy: 'issuedBy',
  departmentCode: 'departmentCode',
  phoneNumber: 'phoneNumber',
  email: 'email',
  permanentAddress: 'permanentAddress',
  actualAddress: 'actualAddress',
  // Несчастный случай
  injury: 'injury',
  injuryDate: 'injuryDate',
  injuryDescription: 'injuryDescription',
  // Выезжающих за границу
  abroad: 'abroad',
  abroadDate: 'abroadDate',
  country: 'country',
  insuranceSum: 'concretePolicyDetailsDto.insuranceSum',
  buildingAddress: 'buildingApplication.address',
  buildingType: 'buildingApplication.type',
  yearBuilt: 'buildingApplication.yearBuilt',
  buildingValue: 'buildingApplication.estimatedValue',
  squareFootage: 'buildingApplication.squareFootage',
  packageName: 'healthApplication.packageName',
  coverageLimit: 'healthApplication.coverageLimit',
  requestsLimit: 'healthApplication.requestsLimit',
  outpatientService: 'healthApplication.outpatientService',
  homeHelp: 'healthApplication.homeHelp',
  emergencyCare: 'healthApplication.emergencyCare',
  emergencyHospital: 'healthApplication.emergencyHospital',
  stomatology: 'healthApplication.stomatology',
  thingLocation: 'concretePolicyDetailsDto.location',
  thingsName: 'concretePolicyDetailsDto.things[0].name',
  thingsType: 'concretePolicyDetailsDto.things[0].type',
  thingsCost: 'concretePolicyDetailsDto.things[0].cost',
  thingsEventType: 'thingsEventType',
  thingsDate: 'thingsDate',
  thingsDescription: 'thingsDescription',
  countryGroup: 'travelApplication.countryGroup',
  sportType: 'travelApplication.sportType',
  travelBaggage: 'travelApplication.baggage',
  travelCancellation: 'travelApplication.travelCancellation',
  vinCode: 'vehicleApplication.vinCode',
  numberPlate: 'vehicleApplication.numberPlate',
  vehicleBrand: 'concretePolicyDetailsDto.brand',
  vehicleModel: 'concretePolicyDetailsDto.model',
  vehicleFullName: 'concretePolicyDetailsDto.fullName',
  vehicleType: 'vehicleApplication.vehicleType',
  vehicleSum: 'vehicleSum',
  vehicleEvent: 'vehicleEvent',
  vehicleDate: 'vehicleDate',
  vehicleAddress: 'vehicleAddress',
  vehicleDescription: 'vehicleDescription',
  driverId: 'vehicleApplication.drivers[0].driverId',
  driverName: 'vehicleApplication.drivers[0].driverName',
  driverSurname: 'vehicleApplication.drivers[0].driverSurname',
  driverMiddleName: 'vehicleApplication.drivers[0].driverMiddleName',
  vehicleDocumentType: 'vehicleApplication.vehicleDocumentType',
  documentNumber: 'vehicleApplication.documentNumber',
  carOwner: 'vehicleApplication.carOwner',
};

export const insurerOptions = [
  'Застрахованный',
  'Страхователь',
  'Выгодоприобретатель',
  'Наследник по закону',
  'Законный представитель',
];

export const documentOptions: string[] = [
  'Паспорт РФ',
  'Вид на жительство',
  'Удостоверение беженца',
];

export const eventOptions: string[] = ['ДТП без участия ГИБДД', 'ДТП с участием ГИБДД', 'Иное'];

export const accidentOptions: string[] = [
  'травма',
  'инвалидность',
  'временная утрата трудоспособности',
];

export const abroadOptions: string[] = [
  'заболевание, травма',
  'отказ от поездки',
  'задержка или утрата багажа',
  'потеря, кража документов',
];

export const thingsOptions: string[] = [
  'Пожар',
  'Взрыв бытового газа',
  'Порча имущества',
  'Стихийные бедствия',
  'Затопление водой из инженерных коммуникаций',
  'Действия третьих лиц',
];

export const CurrencyNumericCode: Record<string, string> = {
  '643': 'RUB',
  '840': 'USD',
  '978': 'EUR',
};

export const Currencies: Record<string, string> = {
  RUB: 'ruble',
  USD: 'dollar',
  EUR: 'euro',
};
