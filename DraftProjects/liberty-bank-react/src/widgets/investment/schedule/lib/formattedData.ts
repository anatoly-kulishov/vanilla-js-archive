import { CandlesFilter } from '../model/types';

export const getFormattedDate = (date: string, filter: CandlesFilter): string => {
  let dateArr: string[] = [];
  if (filter === 'Д') {
    dateArr = date.split(' ')[1].split(':');
    return `${dateArr[0]}:${dateArr[1]}`;
  } else {
    dateArr = date.split(' ')[0].split('-');
    return `${dateArr[2]}/${dateArr[1]}`;
  }
};

export const getLocaleDate = (date: Date): string => {
  return date.toLocaleDateString().replace(/\./g, '-').split('-').reverse().join('-');
};
