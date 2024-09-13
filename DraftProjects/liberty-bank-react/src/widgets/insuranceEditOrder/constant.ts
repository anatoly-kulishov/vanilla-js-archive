import { SPORT_ACTIVITY_GROUP_VALUES } from '@/features';

export const SAVE_CHANGES = 'Сохранить изменения';

export interface RADIO_INFO {
  name: string;
  title: string;
}

export interface VARIANTS_TYPE {
  [key: string]: RADIO_INFO[];
}

export const RADIO_VARIANTS: VARIANTS_TYPE = {
  '2': [
    {
      name: 'Risktheft',
      title: 'Страхование от угона',
    },
    {
      name: 'Riskfire',
      title: 'Страхование от пожара',
    },
    {
      name: 'Risknature',
      title: 'Страхование от природных бедствий',
    },
  ],
  '10': [
    {
      name: 'ChangeTitle1',
      title: 'Активный отдых',
    },
    {
      name: 'ChangeTitle2',
      title: 'Страхование багажа',
    },
    {
      name: 'ChangeTitle3',
      title: 'Отмена поездка',
    },
  ],
};

export const DURATION_INFO = {
  title: 'Дата поездки',
  type: 'DatePicker',
  maxMonths: 12,
};

export interface OPTIONS {
  onlySum?: boolean;
  optionInfo?: {
    name: string;
    placeholder: string;
    options: string[];
  };
}

export const ACCIDENT_OPTIONS: OPTIONS = {
  optionInfo: {
    name: 'accident',
    placeholder: 'Активности',
    options: Object.keys(SPORT_ACTIVITY_GROUP_VALUES),
  },
};

export const ABROAD_SUM: OPTIONS = {
  onlySum: true,
};

export const DMS_OPTIONS: OPTIONS = {
  optionInfo: {
    name: 'dms',
    placeholder: 'Пакет страхования',
    options: ['Standart', 'Standart +', 'Premium', 'VIP'],
  },
};
