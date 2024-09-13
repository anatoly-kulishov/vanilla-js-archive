import carImage from '@/shared/ui/icon/assets/images/mercedes-benz-m-class.png';
import carImage2 from '@/shared/ui/icon/assets/images/white-car.png';
import heartImage from '@/shared/ui/icon/assets/images/heart-dms.png';
import houseImage from '@/shared/ui/icon/assets/images/house-full.png';
import apartmentImage from '@/shared/ui/icon/assets/images/apartment-full.png';
import croppedPlanetImage from '@/shared/ui/icon/assets/images/cropped-planet.png';
import exclamationImage from '@/shared/ui/icon/assets/images/exclamation-mark.png';
import washerImage from '@/shared/ui/icon/assets/images/washer-full.png';
import { PATH_PAGE, TSvgIconNames } from '@/shared';

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

type ProductType = 'backBtn' | 'productImage' | 'actionTitle' | 'icon' | 'buttons';

export type ButtonType = { sendButtonText: string; path?: string };

type ProductInfo = Record<ProductType, string | string[] | ButtonType[]>;

export const PRODUCT_INFO: Record<InsuranceType, ProductInfo> = {
  'Автострахование КАСКО': {
    backBtn: 'Автострахование',
    productImage: carImage,
    actionTitle: 'Оформите автострахование КАСКО',
    icon: ['calendar-blue', 'ruble-currency', 'cash', 'wallet-blue'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
      },
    ],
  },
  'Автострахование ОСАГО': {
    backBtn: 'Автострахование',
    productImage: carImage2,
    actionTitle: 'Оформите автострахование ОСАГО',
    icon: ['calendar-blue', 'ruble-currency', 'cash', 'wallet-blue'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
      },
    ],
  },
  'Добровольное медицинское страхование Standart': {
    backBtn: 'Медицинское страхование',
    productImage: heartImage,
    actionTitle: 'Оформите ДМС',
    icon: ['calendar-blue', 'ruble-currency', 'appeals', 'age'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
      },
    ],
  },
  'Добровольное медицинское страхование Standart+': {
    backBtn: 'Медицинское страхование',
    productImage: heartImage,
    actionTitle: 'Оформите ДМС',
    icon: ['calendar-blue', 'ruble-currency', 'appeals', 'age'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
      },
    ],
  },
  'Добровольное медицинское страхование Premium': {
    backBtn: 'Медицинское страхование',
    productImage: heartImage,
    actionTitle: 'Оформите ДМС',
    icon: ['calendar-blue', 'ruble-currency', 'appeals', 'age'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
      },
    ],
  },
  'Добровольное медицинское страхование VIP': {
    backBtn: 'Медицинское страхование',
    productImage: heartImage,
    actionTitle: 'Оформите ДМС',
    icon: ['calendar-blue', 'ruble-currency', 'appeals', 'age'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
      },
    ],
  },
  'Страхование дома': {
    backBtn: 'Страхование имущества',
    productImage: houseImage,
    actionTitle: 'Оформите страхование дома',
    icon: ['calendar-blue', 'ruble-currency', 'cash', 'device'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
        path: PATH_PAGE.homeInsuranceApplicationOnline,
      },
    ],
  },
  'Страхование квартиры': {
    backBtn: 'Страхование имущества',
    productImage: apartmentImage,
    actionTitle: 'Оформите страхование квартиры',
    icon: ['calendar-blue', 'ruble-currency', 'cash', 'device'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
        path: PATH_PAGE.apartamentInsuranceApplicationOnline,
      },
    ],
  },
  'Страхование домашнего имущества': {
    backBtn: 'Страхование имущества',
    productImage: washerImage,
    actionTitle: 'Оформите страхование имущества',
    icon: ['calendar-blue', 'ruble-currency', 'wallet-blue'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
        path: PATH_PAGE.homeContentsInsuranceApplication,
      },
    ],
  },
  'Страхование выезжающих за границу': {
    backBtn: 'Страхование выезжающих за границу',
    productImage: croppedPlanetImage,
    actionTitle: 'Оформите страхование выезжающих за границу',
    icon: ['calendar-blue', 'ruble-currency', 'cash', 'wallet-blue', 'location-point'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
        path: PATH_PAGE.abroadTravelInsuranceApplication,
      },
    ],
  },
  'Страхование от несчастных случаев': {
    backBtn: 'Страхование от несчастных случаев',
    productImage: exclamationImage,
    actionTitle: 'Оформите страхование от несчастногo случая',
    icon: ['calendar-blue', 'ruble-currency', 'cash', 'people'],
    buttons: [
      {
        sendButtonText: 'Подать заявку оффлайн',
        path: PATH_PAGE.insuranceApplicationOffline,
      },
      {
        sendButtonText: 'Подать заявку онлайн',
      },
    ],
  },
};

export const DOCUMENT_TITLE = 'Необходимые документы';

export const CALC_TEXT = 'Рассчитать ₽';

interface IConditions {
  index: string;
  standart: string;
  standartplus: string;
  premium: string;
  vip: string;
}

export const DATA_TITLE: IConditions[] = [
  {
    index: 'Тарифы',
    standart: 'Стандарт',
    standartplus: 'Стандарт +',
    premium: 'Премиум',
    vip: 'VIP',
  },
];

export const DATA_BODY: IConditions[] = [
  {
    index: 'Покрытие',
    standart: 'до 500 000 ₽',
    standartplus: '500 000 -1 000 000 ₽',
    premium: '1 000 000 - 3 000 000 ₽',
    vip: 'до 5 000 000 ₽',
  },
  {
    index: 'Лимит на количество обращений в год',
    standart: '30',
    standartplus: '50',
    premium: '100',
    vip: 'неограниченно',
  },
  {
    index: 'Амбулаторно-поликлинические услуги',
    standart: 'yes',
    standartplus: 'yes',
    premium: 'yes',
    vip: 'yes',
  },
  {
    index: 'Помощь на дому (вызов врача на дом)',
    standart: 'yes',
    standartplus: 'yes',
    premium: 'yes',
    vip: 'yes',
  },
  {
    index: 'Скорая медицинская помощь',
    standart: 'no',
    standartplus: 'yes',
    premium: 'yes',
    vip: 'yes',
  },
  {
    index: 'Экстренный и неотложный стационар',
    standart: 'no',
    standartplus: 'yes',
    premium: 'yes',
    vip: 'yes',
  },
  {
    index: 'Стоматология',
    standart: 'no',
    standartplus: 'no',
    premium: 'yes',
    vip: 'yes',
  },
];

interface IRisks {
  id: string;
  title: string;
  description: string;
  icon: TSvgIconNames;
}

export const RISKS: IRisks[] = [
  {
    id: 'risks-1',
    title: 'Пожар',
    description: '',
    icon: 'fire',
  },
  {
    id: 'risks-2',
    title: 'Взрыв бытового газа',
    description: '',
    icon: 'explosion',
  },
  {
    id: 'risks-3',
    title: 'Стихийные бедствия',
    description: '',
    icon: 'tornado',
  },
  {
    id: 'risks-4',
    title: 'Затопление водой',
    description: 'Из инженерных\nкоммуникаций',
    icon: 'flush',
  },
  {
    id: 'risks-5',
    title: 'Действия третьих лиц',
    description: '',
    icon: 'vandal',
  },
];
