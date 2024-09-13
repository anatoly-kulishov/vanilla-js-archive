import { StatusCodes } from '@/shared/types';
import { ERROR_MESSAGES } from '../consts';
import { UNEXPECTED_ERROR, statusMessages } from '@/shared';

export const errorHandler = {
  phoneVerification: (status: number): string => {
    const messages = { ...statusMessages };

    return messages[status as StatusCodes] ?? UNEXPECTED_ERROR;
  },
  requestVerificationCode: (status: number): string => {
    const messages = { ...statusMessages };

    return messages[status as StatusCodes] ?? UNEXPECTED_ERROR;
  },
  verificationByCode: (status: number, attemptNumber: number): string => {
    const messages = {
      ...statusMessages,
      [StatusCodes.BadRequest]: attemptNumber
        ? ERROR_MESSAGES.invalidCode(attemptNumber)
        : ERROR_MESSAGES.accountBlocked,
    };

    return messages[status as StatusCodes] ?? UNEXPECTED_ERROR;
  },
  password: (status: number): string => {
    const messages = { ...statusMessages };

    return messages[status as StatusCodes] ?? UNEXPECTED_ERROR;
  },
};
