import { ErrorType } from '@/entities';

export const createMaxCreditRequestError = (error: ErrorType) => ({
  error: {
    status: error.status,
    data: {
      errorMessage:
        'Оформлено максимальное количество заявок, пожалуйста, дождитесь решения по текущим заявкам',
    },
  },
});
