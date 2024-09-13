import { object, string } from 'yup';
import {
  POST_DELIVERY_STEP_PAGE_TEXT,
  REGION_REG_EXP,
  DIGITS_REG_EXP,
  STREET_REG_EXP,
  HOUSE_REG_EXP,
  CITY_REG_EXP,
} from './constants';

export const cardOrderPostDeliveryFormScheme = object().shape({
  region: string()
    .required(POST_DELIVERY_STEP_PAGE_TEXT.ERROR.REQUIRED)
    .min(6, POST_DELIVERY_STEP_PAGE_TEXT.ERROR.MIN_6)
    .test('region', POST_DELIVERY_STEP_PAGE_TEXT.ERROR.ALLOWED_SYMBOLS_REGION, (value) => {
      return value ? REGION_REG_EXP.test(value) : true;
    }),
  postCode: string()
    .required(POST_DELIVERY_STEP_PAGE_TEXT.ERROR.REQUIRED)
    .min(6, POST_DELIVERY_STEP_PAGE_TEXT.ERROR.MIN_6)
    .test('postCode', POST_DELIVERY_STEP_PAGE_TEXT.ERROR.ONLY_NUMBERS, (value) => {
      return value ? DIGITS_REG_EXP.test(value) : true;
    }),
  city: string()
    .required(POST_DELIVERY_STEP_PAGE_TEXT.ERROR.REQUIRED)
    .min(2, POST_DELIVERY_STEP_PAGE_TEXT.ERROR.MIN_2)
    .test('city', POST_DELIVERY_STEP_PAGE_TEXT.ERROR.ALLOWED_SYMBOLS_CITY, (value) => {
      return value ? CITY_REG_EXP.test(value) : true;
    }),
  street: string()
    .required(POST_DELIVERY_STEP_PAGE_TEXT.ERROR.REQUIRED)
    .min(2, POST_DELIVERY_STEP_PAGE_TEXT.ERROR.MIN_2)
    .test('street', POST_DELIVERY_STEP_PAGE_TEXT.ERROR.ALLOWED_SYMBOLS_STREET, (value) => {
      return value ? STREET_REG_EXP.test(value) : true;
    }),
  building: string()
    .required(POST_DELIVERY_STEP_PAGE_TEXT.ERROR.REQUIRED)
    .test('building', POST_DELIVERY_STEP_PAGE_TEXT.ERROR.ALLOWED_SYMBOLS_HOUSE, (value) => {
      return value ? HOUSE_REG_EXP.test(value) : true;
    }),
  apartment: string().test(
    'apartment',
    POST_DELIVERY_STEP_PAGE_TEXT.ERROR.ONLY_NUMBERS,
    (value) => {
      return value ? DIGITS_REG_EXP.test(value) : true;
    },
  ),
  floor: string().test('floor', POST_DELIVERY_STEP_PAGE_TEXT.ERROR.ONLY_NUMBERS, (value) => {
    return value ? DIGITS_REG_EXP.test(value) : true;
  }),
  entrance: string().test('entrance', POST_DELIVERY_STEP_PAGE_TEXT.ERROR.ONLY_NUMBERS, (value) => {
    return value ? DIGITS_REG_EXP.test(value) : true;
  }),
});
