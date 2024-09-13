import { object } from 'yup';
import { creditSmsValidation } from './validations';

export const creditSmsSchema = object().shape({
  sms: creditSmsValidation,
});
