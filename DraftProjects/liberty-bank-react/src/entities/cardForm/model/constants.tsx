import { CardForm } from '..';
import { CardFormLSApi } from '../lib';
import { BankDeliveryStepPage } from '../ui/cardStepPages/deliveryStepPage/bankDeliveryStepPage/BankDeliveryStepPage';
import { CourierDeliveryStepPage } from '../ui/cardStepPages/deliveryStepPage/courierDeliveryStepPage/CourierDeliveryStepPage';
import { PostDeliveryStepPage } from '../ui/cardStepPages/deliveryStepPage/postDeliveryStepPage/PostDeliveryStepPage';
import {
  AccountSelectionFormPageAccountType,
  AccountSelectionFormPageAccountTypeValue,
  DeliveryPage,
  DeliveryTypeFormPageDeliveryType,
  DeliveryTypeFormPageDeliveryTypeValue,
  ReissueCardFormPageReissueReasons,
  ReissueCardFormPageReasonType,
} from './types';

export const REGION_REG_EXP = /^[А-Яа-яЁё.-]+( [А-Яа-яЁё.-]+)*$/;
export const CITY_REG_EXP = /^[А-Яа-яЁё-]+( [А-Яа-яЁё-]+)*$/;
export const STREET_REG_EXP = /^[А-Яа-яЁё0-9,-]+( [А-Яа-яЁё0-9,-]+)*$/;
export const HOUSE_REG_EXP = /^[А-Яа-яЁё0-9.-/]+( [А-Яа-яЁё0-9.-/]+)*$/;
export const DIGITS_REG_EXP = /^\d+$/;

export const ACCOUNT_SELECTION_STEP_PAGE_TEXT = {
  NEW_ACCOUNT_LABEL: 'С открытием нового счета',
  EXISTING_ACCOUNT_LABEL: 'К действующему счету',
  ACCOUNT_TYPE_TITLE: 'Выпуск карты',
  ACCOUNT_TITLE: 'Выберите счет',
  CURRENCY_TITLE: 'Выберите валюту',
  PAYMENT_SYSTEM_TITLE: 'Выберите платежную систему',
  NO_SUITABLE_ACCOUNTS: 'Нет подходящих счетов',
  SELECT_ACCOUNT: 'Выберите счет',
  VISA: 'VISA',
  MASTERCARD: 'MasterCard',
  MIR: 'MIR',
};

export const DELIVERY_TYPE_STEP_PAGE_TEXT = {
  PAGE_TITLE: 'Каким образом хотите получить карту?',
  COURIER_LABEL: 'Курьером',
  BANK_LABEL: 'В отделение банка',
  POST_LABEL: 'Почтой',
  // TODO: Значение ниже временное. Введено к MVP, после доработки остальных сценариев доставки должно быть удалено.
  COMING_SOON_LABEL: 'Скоро будет доступно',
};

export const COURIER_DELIVERY_STEP_PAGE_TEXT = {
  ADDRESS_TITLE: 'Введите адрес доставки',
  DATE_AND_TIME_TITLE: 'Введите дату и время доставки',
  CITY_LABEL: 'Город',
  STREET_LABEL: 'Улица',
  HOUSE_LABEL: 'Дом',
  APARTMENT_LABEL: 'Квартира',
  FLOOR_LABEL: 'Этаж',
  ENTRANCE_LABEL: 'Подъезд',
  DELIVERY_DATE_LABEL: 'Дата доставки',
  DELIVERY_TIME_LABEL: 'Время доставки',
};

export const POST_DELIVERY_STEP_PAGE_TEXT = {
  PAGE_TITLE: 'Введите адрес доставки',
  REGION_LABEL: 'Регион',
  POST_CODE_LABEL: 'Индекс',
  CITY_LABEL: 'Город',
  STREET_LABEL: 'Улица',
  HOUSE_LABEL: 'Дом',
  APARTMENT_LABEL: 'Квартира',
  FLOOR_LABEL: 'Этаж',
  ENTRANCE_LABEL: 'Подъезд',
  ERROR: {
    REQUIRED: 'Данное поле обязательно для заполнения',
    ALLOWED_SYMBOLS_REGION:
      'В данном поле разрешены для ввода только символы кириллицы, символы "-", ".", и не более одного пробельного символа подряд находящихся не в начале или конце строки',
    ALLOWED_SYMBOLS_CITY:
      'В данном поле разрешены для ввода только символы кириллицы, символ "-", и не более одного пробельного символа подряд находящихся не в начале или конце строки',
    ALLOWED_SYMBOLS_STREET:
      'В данном поле разрешены для ввода только символы кириллицы, символы "-", ",", и не более одного пробельного символа подряд находящихся не в начале или конце строки',
    ALLOWED_SYMBOLS_HOUSE:
      'В данном поле разрешены для ввода только символы кириллицы, символы ".", "-", "/", и не более одного пробельного символа подряд находящихся не в начале или конце строки',
    ONLY_NUMBERS: 'В данном поле разрешён ввод только цифр от 0 до 9',
    MIN_6: 'Количество символов в этом поле не может быть меньше 6',
    MIN_2: 'Количество символов в этом поле не может быть меньше 2',
  },
};

export const BANK_DELIVERY_STEP_PAGE_TEXT = {
  PAGE_TITLE: 'Список отделений банка',
  INPUT_PLACEHOLDER: 'Поиск',
  BRANCHES_NOT_FOUND: 'Отделения не найдены',
  QUERY_REQUIREMENTS: 'Введите название улицы и дома',
  BANK_BRANCH_NUMBER: 'Отделение банка №',
  BANK_BRANCHES_CLOSED: 'Закрыто',
  BANK_BRANCHES_OPEN: 'Открыто',
  NO_FOUND: 'Отделения не найдены',
  SEARCH_ERROR: 'Что-то пошло не так. Пожалуйста обновите страницу, либо попробуйте позже',
  // TODO: Временные данные. После перевода поиска на новый EP удалить
  SEARCH_INSTRUCTION:
    'Пожалуйста полностью введите название населённого пункта без указания типа населённого пункта (например: Москва), либо номер банковского отделения (например: 283)',
};

export const REISSUE_REASON_STEP_PAGE = {
  CHOOSE_A_REASON: 'Выберите причину перевыпуска карты',
  CARD_LOST: 'Карта утеряна',
  CARD_EXPIRED: 'Истек срок действия',
};

export const newAccount: AccountSelectionFormPageAccountType = {
  value: AccountSelectionFormPageAccountTypeValue.NEW,
  label: ACCOUNT_SELECTION_STEP_PAGE_TEXT.NEW_ACCOUNT_LABEL,
};

export const existingAccount: AccountSelectionFormPageAccountType = {
  value: AccountSelectionFormPageAccountTypeValue.EXISTING,
  label: ACCOUNT_SELECTION_STEP_PAGE_TEXT.EXISTING_ACCOUNT_LABEL,
};

export const cardLost: ReissueCardFormPageReasonType = {
  value: ReissueCardFormPageReissueReasons.LOST,
  label: REISSUE_REASON_STEP_PAGE.CARD_LOST,
};

export const cardExpired: ReissueCardFormPageReasonType = {
  value: ReissueCardFormPageReissueReasons.EXPIRED,
  label: REISSUE_REASON_STEP_PAGE.CARD_EXPIRED,
};

export const accountTypes: AccountSelectionFormPageAccountType[] = [existingAccount, newAccount];

export const reissueReasons: ReissueCardFormPageReasonType[] = [cardLost, cardExpired];

export const courierDelivery: DeliveryTypeFormPageDeliveryType = {
  value: DeliveryTypeFormPageDeliveryTypeValue.COURIER,
  /* label: DELIVERY_TYPE_STEP_PAGE_TEXT.COURIER_LABEL, */
  // TODO: Значения ниже временные. Введены к MVP, после доработки остальных сценариев доставки должно быть удалено.
  label: DELIVERY_TYPE_STEP_PAGE_TEXT.COMING_SOON_LABEL,
  disabled: true,
};

export const bankDelivery: DeliveryTypeFormPageDeliveryType = {
  value: DeliveryTypeFormPageDeliveryTypeValue.BANK,
  label: DELIVERY_TYPE_STEP_PAGE_TEXT.BANK_LABEL,
  // TODO: Значение ниже временное. Введено к MVP, после доработки остальных сценариев доставки должно быть удалено.
  disabled: false,
};

export const postDelivery: DeliveryTypeFormPageDeliveryType = {
  value: DeliveryTypeFormPageDeliveryTypeValue.POST,
  label: DELIVERY_TYPE_STEP_PAGE_TEXT.POST_LABEL,
  // TODO: Значения ниже временные. Введены к MVP, после доработки остальных сценариев доставки должно быть удалено.
  disabled: false,
};

export const deliveryTypes: DeliveryTypeFormPageDeliveryType[] = [
  bankDelivery,
  courierDelivery,
  postDelivery,
];

export const orderCardFormLSApi = new CardFormLSApi(CardForm.ORDER_CARD);
export const reissueCardFormLSApi = new CardFormLSApi(CardForm.REISSUE_CARD);

export const deliveryPages: Record<DeliveryTypeFormPageDeliveryTypeValue, DeliveryPage> = {
  [DeliveryTypeFormPageDeliveryTypeValue.COURIER]: CourierDeliveryStepPage,
  [DeliveryTypeFormPageDeliveryTypeValue.BANK]: BankDeliveryStepPage,
  [DeliveryTypeFormPageDeliveryTypeValue.POST]: PostDeliveryStepPage,
};
