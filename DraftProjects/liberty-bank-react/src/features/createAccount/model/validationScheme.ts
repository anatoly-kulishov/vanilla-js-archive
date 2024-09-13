import * as yup from 'yup';

export const validationScheme = yup.object().shape({
  isMain: yup.boolean().required(),
  currency: yup.string().required(),
  accountType: yup.string().required(),
  customerId: yup.string().required(),
});
