import { formatNumberWithSpaces } from '@/shared';

export function formatOrDefault(value: number) {
  if (isNaN(value) || value === Infinity || value === -Infinity) {
    return '--';
  }
  return formatNumberWithSpaces(value, 2);
}
