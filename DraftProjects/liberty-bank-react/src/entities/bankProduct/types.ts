import { IInfoCreditForm } from '@/shared';

export type GetInfoCreditForm = {
  data: IInfoCreditForm | undefined;
  isLoading: boolean;
  error: ErrorType | undefined;
};

export type ErrorType = {
  status: number;
  data: {
    errorMessage: string;
  };
};
