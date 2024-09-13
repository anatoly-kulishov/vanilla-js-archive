import { getDaysUntilDate } from '@/shared';

export const isWarningDate = (date: string, thresholdDays: number): boolean =>
  getDaysUntilDate(date) <= thresholdDays;
