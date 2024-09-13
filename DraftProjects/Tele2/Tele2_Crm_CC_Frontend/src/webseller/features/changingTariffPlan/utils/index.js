/**
 * Функция для проверки является ли текущий сервис заблокированым в UI
 * @param service
 * @returns {boolean|*}
 */
export const checkDisableService = service =>
  +service.CostMonthWithTaxPs === 0 ||
  service.IsParentService ||
  service.IsChildService ||
  service.AvailableServiceStatusPs === 'Unknown'
