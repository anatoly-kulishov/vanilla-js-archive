export type InsuranceGroupName =
  | 'Автострахование'
  | 'Страхование имущества'
  | 'Добровольное медицинское страхование'
  | 'Страхование от несчастных случаев'
  | 'Страхование выезжающих за границу';

export interface IRequiredDocument {
  id: number;
  name: string;
  description: string;
}

export interface IInsuranceGroupsProductsItem {
  id: number;
  attributes: {
    id_product: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface IInsuranceProductsName {
  data: IInsuranceGroupsProductsItem[];
}

export interface IInsuranceAttributesInfo {
  group_id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Products_name: IInsuranceProductsName;
}

export interface IInsuranceGroupsInfo {
  id: number;
  attributes: IInsuranceAttributesInfo;
}

export interface IInsuranceGroupsProducts {
  data: IInsuranceGroupsInfo[];
  meta?: {
    pagination: Record<string, number>;
  };
}

export interface IInsuranceResponce {
  data: IInsurancePolicy[];
}

export interface IInsurancePolicy {
  id: number;
  attributes: {
    product_id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    catalog_info: ICatalogInfo;
    insurance_product: IInsuranceProduct;
  };
}

export interface IInsuranceOrders {
  applicationId: string;
  productId: number;
  submissionDate: string;
  status: 'PENDING' | 'CHANGESPENDING' | 'APPROVED' | 'PAID' | 'CANCELED' | 'REJECTED';
  productName: string;
}

export interface IInsuranceAttributes {
  productName: string;
  productDescription: string;
  possibleCurrencies: IPossibleCurrencies[];
  numericCode: number;
  letterCode: string;
  possibleSum: string;
  requiredDocuments: IRequiredDocument[];
  splitPayPossibility: boolean;
  splitPayConditions: string;
  onlineInsurancePossibility: boolean;
  possibleAgreementLength: string;
  possibleInsuredAmount: string;
  startCondition: string;
  insuranceConditions: string;
}

export interface IInsuranceProduct {
  data: {
    id: number;
    attributes: IInsuranceAttributes;
  };
}

export interface IInsuranceData {
  productName: string;
  productDescription: string;
  requiredDocuments: IRequiredDocument[];
  catalogInfo: ICatalogInfo[];
}

export interface ICatalogInfo {
  id: number;
  description: string;
  fixedTooltip: boolean;
  tooltip: ITooltip[];
  tooltipPosition: 'right' | 'left' | undefined;
  tooltip_name: string;
  costCalc?: boolean;
}

export interface ITooltip {
  id: number;
  name: string;
  descriptionInside: string;
}

export interface IPossibleCurrencies {
  numericCode: number;
  letterCode: string;
}

export interface IInsurancePopularCard {
  id: number;
  name: string;
}

export interface IInsurancePopularProducts {
  products: IInsurancePopularCard[];
}

export interface IInsurancePolicyInfo {
  productId: number;
  productName: string;
  currencyNumericCode: number;
  startDate: string;
  expirationDate: string;
  agreementNumber: string;
  policyStatus: string;
}

export interface IInsuranceAllPoliciesInfo {
  policyId: string;
  startDate: string;
  policyName: string;
  expirationDate: string;
  agreementNumber: string;
  policyStatus: string;
  currencyNumericCode: number;
  duration: number;
  insuredSum: number;
  objectApplication: string;
}

export interface IInsuranceInsurerInfo {
  insurerName: string;
  insurerSurname: string;
  insurerPatronymic: string;
  insurerBirthdate: string;
}

export interface IInsuranceBuildingApplication {
  address: string;
  type: string;
  yearBuilt: number;
  estimatedValue: number;
  squareFootage: number;
  insuranceSum?: number;
  location?: string;
  things?: IThings[];
}

export interface IInsuranceHealthApplication {
  packageName: string;
  coverageLimit: string;
  requestsLimit: number;
  outpatientService: boolean;
  homeHelp: boolean;
  emergencyCare: boolean;
  emergencyHospital: boolean;
  stomatology: boolean;
}

export interface IThings {
  name: string;
  type: string;
  cost: number;
}

export interface IInsuranceThingApplication {
  location: string;
  things: IThings[];
  insuranceSum?: number;
}

export interface IInsuranceTravelApplication {
  countryGroup: string;
  insuranceSum: string;
  sportType: string;
  baggage: boolean;
  travelCancellation: boolean;
}

export interface IInsuranceDrivers {
  licenseId: string;
  driverName: string;
  driverSurname: string;
  driverPatronymic: string;
}

export interface IInsuranceVehicleApplication {
  vinCode: string;
  numberPlate: string;
  brand: string;
  model: string;
  fullName?: string;
  vehicleType: string;
  drivers: IInsuranceDrivers[];
  vehicleDocumentType: string;
  documentNumber: string;
  carOwner: string;
  price: number;
  insuranceSum?: number;
}

export interface IInsuranceAllPolicies {
  policies: IInsuranceAllPoliciesInfo[];
}

export interface IInsuranceAccidents {
  insuranceSum: string;
}
export interface IInsurancePolicies<T> {
  policyInfo: IInsurancePolicyInfo;
  insurerInfo: IInsuranceInsurerInfo;
  concretePolicyDetailsDto: T;
}

export type TAllConcretePolicyDetailsDto =
  | IInsuranceAccidents
  | IInsuranceBuildingApplication
  | IInsuranceHealthApplication
  | IInsuranceThingApplication
  | IInsuranceTravelApplication
  | IInsuranceVehicleApplication;

export interface ThingCalculationDto {
  type: 'THING';
  thingCalculationDto: {
    cost: number;
    duration: number;
    constructionMaterial: string;
    securitySystem: boolean;
    floor: number;
    risk: boolean;
  };
}

export interface AccidentCalculationDto {
  type: 'ACCIDENT';
  accidentCalculationDto: {
    duration: number;
    age: number;
    activities: number[];
    insuranceSum: string;
  };
}

export interface BuildingCalculationDto {
  type: 'BUILDING';
  buildingCalculationDto: {
    buildingType: string;
    estimatedValue: string;
    squareFootage: string;
    riskWater: boolean;
    riskFire: boolean;
    riskOther: boolean;
    riskNature: boolean;
  };
}

export interface TravelCalculationDto {
  type: 'TRAVEL';
  travelCalculationDto: {
    countryGroup: string;
    startDate: string;
    endDate: string;
    insuranceSum: string;
    persons: TravelCalculationPerson[];
  };
}

export interface TravelCalculationPerson {
  birthdate: string;
  sportType: string;
  travelCancellation: boolean;
  baggage: boolean;
}
export interface HealthCalculationDto {
  type: 'HEALTH';
  healthCalculationDto: {
    startingDate?: Date;
    endingDate?: Date;
    duration: number;
    insuredSum: number;
    insuredPersonAge: number;
    baseMedicineProgramm: string;
  };
}

export interface VehicleCalculationDto {
  type: 'VEHICLE';
  vehicleCalculationDto: OsagoCalculationDto | CascoCalculationDto;
}

export interface CascoCalculationDto {
  cascoCalculationDto: {
    price: string;
    yearOfRelease: string;
    mileage: string;
    drivers: Driver[];
    riskTheft: boolean;
    riskFire: boolean;
    riskNature: boolean;
  };
}

export interface Driver {
  age: string;
  experience: string;
  yearWithoutAccident: string;
}

export interface OsagoCalculationDto {
  osagoCalculationDto: {
    duration: string;
    drivers: Driver[];
    mileage: string;
    yearOfRelease: string;
  };
}

export interface OsagoCalculationDriver {
  name: string;
  surname: string;
  patronym: string;
  birthdate: string;
  licenseId: string;
  licenseIssuingDate: string;
  yearWithoutAccident: number;
  firstLicenseIssuingDate: string;
}

export interface ApartmentCalculationDto {
  type: 'BUILDING';
  buildingCalculationDto: {
    buildingType: 'APARTMENT';
    estimatedValue: string;
    squareFootage: string;
    riskFire: boolean;
    riskWater: boolean;
    riskOther: boolean;
    riskNature: boolean;
  };
}

export type IInsuranceCalculationsPolicy =
  | VehicleCalculationDto
  | HealthCalculationDto
  | TravelCalculationDto
  | BuildingCalculationDto
  | AccidentCalculationDto
  | ThingCalculationDto
  | ApartmentCalculationDto;

export type IInsuranceCalculationsPolicyResponse = {
  price: number;
  message: string;
};

export interface IApplicationOfflineRequest {
  headers: string;
  body: IApplicationOfflineBodyHomeRequest | IApplicationOfflineBodyBankRequest;
}

export interface IApplicationOfflineBodyRequest {
  insuranceProductId: string;
  name: string;
  surname: string;
  patronym: string;
  mobilePhone: number;
  date: string;
  time: string;
}
export interface IApplicationOfflineBodyHomeRequest extends IApplicationOfflineBodyRequest {
  city: string;
  street: string;
  building: string;
  apartment: number;
  floor: number;
  entrance: number;
  type: 'HOME';
}
export interface IApplicationOfflineBodyBankRequest extends IApplicationOfflineBodyRequest {
  officeNumber: string;
  type: 'BANK';
}
