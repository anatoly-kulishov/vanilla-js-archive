import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Common from '@t2crm/wfm-utils/lib/types/common';

dayjs.extend(duration);

export const trimObjFields = (obj: Common.KeyValue) => Object
  .keys(obj)
  .reduce((acc, key) => {
    acc[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
    return acc;
  }, {});

export const convertMinutesToHours = (minutes: number) => {
  if (minutes <= 0) {
    return '';
  }

  const hours = Math.floor(dayjs.duration({ minutes }).asHours());
  const remainingMinutes = Math.floor(minutes - hours * 60);

  if (remainingMinutes < 60 && hours > 0) {
    return `${hours} ч ${remainingMinutes} мин`;
  }

  if (hours === 0) {
    return `${remainingMinutes} мин`;
  }

  return `${hours} ч`;
};
