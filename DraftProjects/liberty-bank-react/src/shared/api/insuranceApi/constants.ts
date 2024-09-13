export const INSURANCE_PATH = '/insurance-service/api/v1';

export const INSURANCE_PATH_STRAPI = '/api';

export const INSURANCE_URL = {
  baseInsurance: 'http://172.17.1.79:30303',
  insuranceGroupsProducts: `${INSURANCE_PATH}/insurance/groups-products`,
  insuranceProduct: `${INSURANCE_PATH}/insurance/groups-products/products`,
  insurancePopularProducts: `${INSURANCE_PATH}/policies/popular-products`,
  insurancePolicies: `${INSURANCE_PATH}/policies`,
  insuranceApplicationOffline: `${INSURANCE_PATH}/insurance/call-slot`,
  insuranceCalculationsPolicy: `${INSURANCE_PATH}/calculations/policy`,
  insuranceOrders: `${INSURANCE_PATH}/insurance/applications/submitted`,
};

export const INSURANCE_STRAPI_URL = {
  baseInsurance: 'http://172.17.1.79:32222',
  insuranceProduct: `${INSURANCE_PATH_STRAPI}/catalog-infos`,
  groupProducts: `${INSURANCE_PATH_STRAPI}/product-groups`,
};

export const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZWNoY2F0IiwidXVpZCI6ImE2OWYyNWQ3LTMzMDktNDE2ZC05OWNjLTI0ODk1YmVlMTY3NyJ9.RZPzT8ZDJSO1qbgebO439fsN6y8muhBjpLlviMOUOIc';

export const tokenStrapi =
  'Bearer e7cecd9513ce64401c8a54485d9926ef00f9478488b73dc4e518eb0f8765db07c4bb8cbbb8c7039a' +
  '74c45f1dd1b7a6f3e5cf1acc2df1811d6f077222a1d3f058650f1e75a54bd9d4970dae9939173c2ffdc778ea78699afd0f13e9b78b8dbf2b7adcf8ac19e181a851f25b224921ee8132776a0a6a5c8394f2f275291dea5118';

export const groupNames = [
  'Автострахование',
  'Страхование имущества',
  'Добровольное медицинское страхование',
  'Страхование от несчастных случаев',
  'Страхование выезжающих за границу',
];

export const MAX_RETRIES = 5;
