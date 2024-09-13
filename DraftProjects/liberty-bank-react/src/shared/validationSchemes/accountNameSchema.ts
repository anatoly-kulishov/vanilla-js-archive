import { object } from 'yup';
import { accountNameValidation } from './validations';

export const accountNameSchema = object({
  name: accountNameValidation,
});
