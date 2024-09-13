import { OPTIONS } from '@/widgets/insuranceEditOrder/constant';
import { ReactNode } from 'react';

type DocumentsType = {
  id: number;
  label: string;
  name: string;
};

export type CurrenciesType = 'rub' | 'usd' | 'eur';

type CountryGroupType = {
  label: string;
  options: string[];
};

export type DurationType = {
  type: string;
  maxMonths: number;
  title?: string;
};

export type DocumentInfoType = {
  application_id: string;
  product_id: string;
  product_name: string;
  client_id: string;
  document_type: string;
};

export interface IApplication {
  type: 'VEHICLE' | 'HEALTH' | 'THING' | 'TRAVEL' | 'BUILDING' | 'ACCIDENT';
  vehicleApplication?: IVehicleApplication;
  healthApplication?: IHealthApplication;
  thingApplication?: IThingApplication;
  travelApplication?: ITravelApplication;
  buildingApplication?: IBuildingApplication;
  accidentApplication?: IAccidentApplication;
}

export interface IDocumentsApplication {
  info: DocumentInfoType;
  files: File[];
}

export interface IDocumentsResponse {
  uri?: string;
  type?: string;
  message: string;
  timestamp?: string;
}

export interface IVehicleApplication {}

export interface IHealthApplication {}

export interface IThingApplication {
  insuranceProductId: number;
  currencyNumericCode: number;
  duration: number;
  insurerIsOwner: boolean;
  things: IThingRequestDto[];
  constructionMaterial: string;
  isSecuritySystem: boolean;
  floor: number;
  location: string;
  startDate: string;
  startInsurance: string;
}

export interface ITravelApplication {
  insuranceProductId: number;
  currencyNumericCode: number;
  duration: number;
  insurerIsOwner: true;
  countryGroup: string;
  insurerIsPerson: true;
  insuranceSum: number;
  startDate: string;
  expirationDate: string;
  property: {
    sportType: string;
    baggage: boolean;
    travelCancellation: boolean;
  };
  insuredPerson: {
    name: string;
    surname: string;
    patronym: string;
    birthdate: string;
    registrationAddress: string;
    actualAddress: string;
  };
}

export interface IBuildingApplication {
  buildingDto: {
    address: string;
    type: string;
    yearBuilt: number;
    estimatedValue: number;
    squareFootage: number;
  };
  applicationDto: {
    productId: number;
    currencyNumericCode: number;
    duration: number;
  };
}

export interface IAccidentApplication {}

export interface IThingRequestDto {
  name: string;
  type: string;
  cost: number | null;
}
export interface IApplicationResponse {
  applicationId: string;
  status: string;
  message: string;
}

export type constructionMaterialType =
  | 'CERAMIC_BLOCK'
  | 'CONCRETE'
  | 'BRICK'
  | 'REINFORCED_CONCRETE_SLAB'
  | 'EXPANDED_CLAY_CONCRETE_PANEL'
  | 'FOAM_AERATED_CONCRETE_BLOCK'
  | 'TIMBER'
  | 'WOODEN_FRAME';
export type thingRequestDtoType =
  | 'FURNITURE'
  | 'HOUSEHOLD_APPLIANCES'
  | 'ELECTRONIC'
  | 'CLOTH'
  | 'SPORT_EQUIPMENT'
  | 'CHILDREN_THING_TOY'
  | 'INTERIOR_ACCESSORIES';

interface RADIO_INFO {
  name: string;
  title: string;
}

export interface FormFrameProps {
  submitButton: ReactNode;
  prevButton?: ReactNode;
  nextButton?: ReactNode;
  stepper?: ReactNode;
  title?: string;
  addressVisible?: boolean;
  duration?: DurationType;
  properties?: RADIO_INFO[];
  countryGroup?: CountryGroupType;
  currencies?: CurrenciesType[];
  documents?: DocumentsType[];
  hasSportActivity?: boolean;
  accidentActivity?: OPTIONS;
}
