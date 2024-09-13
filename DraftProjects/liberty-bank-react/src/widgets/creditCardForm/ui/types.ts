import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ICreditCardOrderResponse } from '@/shared';

export type IPostCreditCardOrder = {
  data?: ICreditCardOrderResponse;
  isSuccess: boolean;
  error?: FetchBaseQueryError;
};
