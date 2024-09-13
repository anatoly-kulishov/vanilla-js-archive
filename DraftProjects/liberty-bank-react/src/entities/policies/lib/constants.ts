export const HC_CURRENCIES_CODES: IServices = {
  '643': 'RUB',
  '840': 'USD',
  '978': 'EUR',
};

export const SERVICES_DMS: IServices = {
  outpatientService: 'aмбулаторно-поликлинические услуги',
  homeHelp: 'помощь на дому (вызов врача на дом)',
  emergencyCare: 'скорая медицинская помощь',
  emergencyHospital: 'экстренный и неотложный стационар',
  stomatology: 'стоматология',
};

export const SERVICES_TRAVEL: IServices = {
  sportType: 'активный отдых',
  baggage: 'страхование багажа',
  travelCancellation: 'страхование отмены поездки',
};

type IServices = {
  [key: string]: string;
};
