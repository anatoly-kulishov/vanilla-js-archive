import { maskString } from '../maskString/maskString';

export const maskStringAsterisks = (string: string, visibleEnding: number): string =>
  maskString(string, visibleEnding, '*');
