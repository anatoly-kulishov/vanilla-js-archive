import { AxiosResponse } from 'axios';

import { ErrorResponse } from '../types';

export { getDocumentByWs } from './getDocumentByWs';

export const isSuccessfulResponse = ({ status }: AxiosResponse) => status >= 200 && status < 300;

export const isErrorResponse = (data: unknown): data is ErrorResponse => {
  const typedData = data as ErrorResponse;

  return Boolean(typedData?.message && typedData?.stackTrace);
};

const BUSSINESS_LOGIC_ERROR_NAME = 'BUSSINESS_LOGIC_ERROR_WEBSELLER';

export class BussinessLogicError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = BUSSINESS_LOGIC_ERROR_NAME;
  }
}

export const isBussinessLogicError = (error: unknown) => error instanceof BussinessLogicError;

export const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};
