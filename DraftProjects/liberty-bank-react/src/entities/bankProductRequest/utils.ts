import { ICreditCardRequest, ICreditRequest } from '@/shared';

export const isCreditCardRequest = (
  request: ICreditRequest | ICreditCardRequest,
): request is ICreditCardRequest => (request as ICreditCardRequest).validityTerm !== undefined;

export const getRequestFields = (request: ICreditRequest | ICreditCardRequest) => {
  const creditCardRequest = isCreditCardRequest(request);

  if (creditCardRequest) {
    return {
      periodMonths: request.validityTerm,
      currency: request.currency,
      creationDate: request.createdAt,
    };
  }

  return {
    periodMonths: request.periodMonths,
    currency: request.currencyCode,
    creationDate: request.creationDate,
  };
};

export const getFormatCreationDate = (creationDate: string) =>
  new Date(creationDate).toLocaleDateString('ru-RU');
