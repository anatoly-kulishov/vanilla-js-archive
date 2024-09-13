import mercedes from '@/shared/ui/icon/assets/images/mercedes-benz.png';
import whiteAudi from '@/shared/ui/icon/assets/images/white-audi.png';
import heart from '@/shared/ui/icon/assets/images/heart.png';
import earth from '@/shared/ui/icon/assets/images/earth.png';
import condo from '@/shared/ui/icon/assets/images/condo.png';
import washer from '@/shared/ui/icon/assets/images/washer.png';
import house from '@/shared/ui/icon/assets/images/house.png';
import cone from '@/shared/ui/icon/assets/images/road-cone.png';

export type InsuranceType =
  | 'Автострахование КАСКО'
  | 'Автострахование ОСАГО'
  | 'Добровольное медицинское страхование Standart'
  | 'Добровольное медицинское страхование Standart+'
  | 'Добровольное медицинское страхование Premium'
  | 'Добровольное медицинское страхование VIP'
  | 'Страхование выезжающих за границу'
  | 'Страхование квартиры'
  | 'Страхование домашнего имущества'
  | 'Страхование дома'
  | 'Страхование от несчастных случаев';

export interface IInsuranceProduct {
  id: string;
  name: string;
  imgName: string;
  path: string;
  pathCalculation: string;
  style: React.CSSProperties;
}

const bgCardInsuranceCar = 'linear-gradient(126deg, #4648A2 21.09%, #BF6AD3 74.58%)';
const bgCardInsuranceHealthStandart = 'linear-gradient(126deg, #2244BC, #758CDD)';
const bgCardInsuranceHealthStandartPlus =
  'linear-gradient(126deg, #4648A2, #554CA8, #7455B5, #A462C8, #BF6AD3)';
const bgCardInsuranceHealthPremium = 'linear-gradient(126deg, #BE1B7D, #FB6269)';
const bgCardInsuranceHealthVip = 'linear-gradient(126deg, #E7402E, #EF668D)';
const bgCardInsuranceTravel = 'linear-gradient(93deg, #2645B3 0%, #2BA3BD 100%)';
const bgCardInsuranceProperty = 'linear-gradient(93deg, #2244BC 0%, #758CDD 100%)';
const bgCardInsuranceAccident = 'linear-gradient(93deg, #BE1B7D 0%, #FB6269 100%)';

export const INSURANCE_INFO: Record<InsuranceType, IInsuranceProduct> = {
  'Автострахование КАСКО': {
    id: '2',
    name: 'Автострахование КАСКО',
    imgName: mercedes,
    path: '/insurance/products/car/kasko',
    pathCalculation: '/insurance/products/car/kasko/calculate',
    style: {
      padding: '86px 0 15px 19px',
      backgroundColor: bgCardInsuranceCar,
    },
  },
  'Автострахование ОСАГО': {
    id: '1',
    name: 'Автострахование ОСАГО',
    imgName: whiteAudi,
    path: '/insurance/products/car/osago',
    pathCalculation: '/insurance/products/car/osago/calculate',
    style: {
      padding: '86px 0 15px 19px',
      backgroundColor: bgCardInsuranceCar,
    },
  },
  'Добровольное медицинское страхование Standart': {
    id: '3',
    name: 'Добровольное медицинское страхование Standart',
    imgName: heart,
    path: '/insurance/products/health/dms',
    pathCalculation: '/insurance/products/health/dms/calculate',
    style: {
      padding: '66px 0 0 20px',
      transform: 'rotate(9.56deg)',
      transformOrigin: '0 0',
      backgroundColor: bgCardInsuranceHealthStandart,
    },
  },
  'Добровольное медицинское страхование Standart+': {
    id: '4',
    name: 'Добровольное медицинское страхование StandartPlus',
    imgName: heart,
    path: '/insurance/products/health/dms',
    pathCalculation: '/insurance/products/health/dms/calculate',
    style: {
      padding: '66px 0 0 20px',
      transform: 'rotate(9.56deg)',
      transformOrigin: '0 0',
      backgroundColor: bgCardInsuranceHealthStandartPlus,
    },
  },
  'Добровольное медицинское страхование Premium': {
    id: '5',
    name: 'Добровольное медицинское страхование Premium',
    imgName: heart,
    path: '/insurance/products/health/dms',
    pathCalculation: '/insurance/products/health/dms/calculate',
    style: {
      padding: '66px 0 0 20px',
      transform: 'rotate(9.56deg)',
      transformOrigin: '0 0',
      backgroundColor: bgCardInsuranceHealthPremium,
    },
  },
  'Добровольное медицинское страхование VIP': {
    id: '6',
    name: 'Добровольное медицинское страхование Vip',
    imgName: heart,
    path: '/insurance/products/health/dms',
    pathCalculation: '/insurance/products/health/dms/calculate',
    style: {
      padding: '66px 0 0 20px',
      transform: 'rotate(9.56deg)',
      transformOrigin: '0 0',
      backgroundColor: bgCardInsuranceHealthVip,
    },
  },
  'Страхование выезжающих за границу': {
    id: '10',
    name: 'Страхование выезжающих за границу',
    imgName: earth,
    path: '/insurance/products/travel/abroad',
    pathCalculation: '/insurance/products/travel/abroad/calculate',
    style: {
      padding: '54px 0 0 0',
      backgroundColor: bgCardInsuranceTravel,
    },
  },
  'Страхование квартиры': {
    id: '8',
    name: 'Страхование квартиры',
    imgName: condo,
    path: '/insurance/products/property/apartment',
    pathCalculation: '/insurance/products/property/apartment/calculate',
    style: {
      padding: '96px 0 0 20px',
      backgroundColor: bgCardInsuranceProperty,
    },
  },
  'Страхование домашнего имущества': {
    id: '9',
    name: 'Страхование домашнего имущества',
    imgName: washer,
    path: '/insurance/products/property/contents',
    pathCalculation: '/insurance/products/property/contents/calculate',
    style: {
      backgroundColor: bgCardInsuranceProperty,
    },
  },
  'Страхование дома': {
    id: '7',
    name: 'Страхование дома',
    imgName: house,
    path: '/insurance/products/property/home',
    pathCalculation: '/insurance/products/property/home/calculate',
    style: {
      padding: '67px 0 0 0',
      backgroundColor: bgCardInsuranceProperty,
    },
  },
  'Страхование от несчастных случаев': {
    id: '11',
    name: 'Страхование от несчастных случаев',
    imgName: cone,
    path: '/insurance/products/accident/details',
    pathCalculation: '/insurance/products/accident/details/calculate',
    style: {
      padding: '69px 7px 0 1px',
      backgroundColor: bgCardInsuranceAccident,
    },
  },
};
