import { object } from 'yup';
import { authPasswordValidation, documentValidation, phoneValidation } from './validations';

export const AuthPhoneSchema = object({
  phone: phoneValidation,
  password: authPasswordValidation,
});

export const AuthDocumentSchema = object({
  document: documentValidation,
  password: authPasswordValidation,
});
