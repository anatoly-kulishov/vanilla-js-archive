import { object } from 'yup';
import {
  documentValidation,
  emailValidation,
  oldPasswordValidation,
  passwordConfirmValidation,
  phoneValidation,
  registrationPasswordValidation,
} from './validations';

export const phoneSchema = object().shape({
  phone: phoneValidation,
});

export const passwordSchema = object().shape({
  password: registrationPasswordValidation,
  confirmPassword: passwordConfirmValidation,
});

export const documentSchema = object().shape({
  document: documentValidation,
});

export const changeEmailSchema = object().shape({
  email: emailValidation,
});

export const changePasswordSchema = object({
  oldPassword: oldPasswordValidation,
  password: registrationPasswordValidation,
  confirmPassword: passwordConfirmValidation,
});
