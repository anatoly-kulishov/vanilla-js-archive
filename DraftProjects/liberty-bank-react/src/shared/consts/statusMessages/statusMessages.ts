import { StatusCodes } from '@/shared/types';

export const statusMessages: Record<StatusCodes, string> = {
  [StatusCodes.BadRequest]: 'Пожалуйста, проверьте введённые данные.',
  [StatusCodes.Unauthorized]: 'Ваша сессия истекла или данные неверны. Пожалуйста, войдите заново.',
  [StatusCodes.Forbidden]:
    'Ваша учетная запись заблокирована. Для изменения статуса обратитесь в отделение банка.',
  [StatusCodes.NotFound]: 'Запрашиваемый ресурс не найден.',
  [StatusCodes.NotAcceptable]: 'Неприемлемый запрос.',
  [StatusCodes.UnsupportedMediaType]: `Формат переданных данных не поддерживается. 
    Пожалуйста, убедитесь, что используете поддерживаемые форматы и повторите попытку.`,
  [StatusCodes.InternalServerError]: `Произошла ошибка на нашей стороне. 
    Мы уже работаем над её устранением. Пожалуйста, попробуйте позже.`,
  [StatusCodes.ServiceUnavailable]:
    'Сервис временно недоступен из-за технических работ. Пожалуйста, проверьте позже.',
};

export const UNEXPECTED_ERROR = 'Произошла непредвиденная ошибка.';
