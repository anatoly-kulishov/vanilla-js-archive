import { object } from 'yup';
import { PINValidation, approvedPINValidation, newPINValidation } from './validations';

export const PinCodeSchema = object({
  pinCode: PINValidation,
});

export const changePINSchema = object({
  oldPin: PINValidation,
  newPin: newPINValidation,
  approvedPin: approvedPINValidation,
});
