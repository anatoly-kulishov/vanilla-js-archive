import { FieldValues, RegisterOptions } from 'react-hook-form';
import {
  EMAIL_REGEX,
  INVALID_EMAIL_ERROR,
  PASSPORT_REGEX,
  PHONE_REGEX,
  REFUGEE_CERTIFICATE_REGEX,
  RESIDENT_CARD_REGEX,
} from '.';
import { differenceInMonths } from '../shared/lib/differenceInMonths/differenceInMonths';

type ValidationType = {
  [field: string]:
    | Omit<
        RegisterOptions<FieldValues, 'idNumber'>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
};

export const INVALID_FORMAT = 'Недопустимый формат';

export const datePickerValidation = (rule: string, start: Date, end: Date, maxMonths: number) => {
  switch (rule) {
    case 'start':
      return VALIDATION_RULES.startDate;
    case 'end':
      return {
        required: 'Это поле обязательно для заполнения',
        validate: () => {
          if (start && end) {
            if (start >= end) return 'Дата не должна быть раньше или равна дате начала';
            const startDate = new Date(start);
            const endDate = new Date(end);
            const diffInMonths = differenceInMonths(startDate, endDate);
            if (diffInMonths >= maxMonths) {
              return `Разница между датой начала и окончания должна быть от 1 дня до ${maxMonths} месяцев`;
            }
          }
          return true;
        },
      };
  }
};

export const VALIDATION_RULES: ValidationType = {
  contractDate: {
    required: 'Это поле обязательно для заполнения',
    validate: (v: Date) => {
      if (v <= new Date()) return 'Дата не должна быть раньше или равна текущей дате';
      const checkDate = new Date();
      checkDate.setMonth(checkDate.getMonth() + 1);
      if (v > checkDate)
        return 'Разница между текущей датой и введенной пользователем должна <=30 дней';
      return true;
    },
  },
  lastName: {
    required: 'Не должен быть пустым',
    pattern: {
      value: /^(?![- '])[а-яА-ЯЁё \-']*[а-яА-ЯЁё]+$/g,
      message: 'Недопустимое значение',
    },
    validate: (v: string) => {
      if (/([-' ]){2,}/g.test(v)) return 'Недопустимое сочетание символов';
      if (v.length < 1) return 'Необходимо ввести не менее одного символа';
    },
    maxLength: { value: 30, message: 'Превышено допустимое количество символов' },
  },
  firstName: {
    required: 'Не должен быть пустым',
    pattern: {
      value: /^(?![- '])[а-яА-ЯЁё \-']*[а-яА-ЯЁё]+$/g,
      message: 'Содержит недопустимые символы',
    },
    validate: (v: string) => {
      if (/([-' ]){2,}/g.test(v)) return 'Недопустимое сочетание символов';
      if (v.length < 1) return 'Необходимо ввести не менее одного символа';
    },
    maxLength: {
      value: 30,
      message: 'Превышено допустимое количество символов',
    },
  },
  patronymic: {
    pattern: {
      value: /^(?![- '])[а-яА-ЯЁё \-']*[а-яА-ЯЁё]+$/g,
      message: 'Недопустимое значение',
    },
    validate: (v: string) => {
      if (/([-' ]){2,}/g.test(v)) return 'Недопустимое сочетание символов';
      if (v && v.length < 2) return 'Необходимо ввести не менее двух символов';
    },
    maxLength: { value: 30, message: 'Превышено допустимое количество символов' },
  },
  dateOfBirth: {
    required: 'Выберите дату рождения',
    validate: (v: Date) => {
      if (v > new Date()) return 'Дата не должна быть позже текущей даты';
      const checkDate = new Date();
      checkDate.setFullYear(checkDate.getFullYear() - 100);
      if (v < checkDate)
        return 'Разница между текущей датой и введенной не должна быть больше 100 лет';
      return true;
    },
  },
  phoneNumber: {
    required: 'Введите номер телефона',
    pattern: { value: PHONE_REGEX, message: INVALID_FORMAT },
  },
  email: {
    required: 'Введите E-mail',
    pattern: { value: EMAIL_REGEX, message: INVALID_EMAIL_ERROR },
    min: { value: 2, message: INVALID_EMAIL_ERROR },
    max: { value: 50, message: INVALID_EMAIL_ERROR },
  },
  documentType: {
    required: 'Выберите тип документа',
  },
  issuedBy: {
    required: 'Введите наименование органа выдавшего документ',
    minLength: { value: 2, message: 'От 2 знаков' },
    maxLength: { value: 200, message: 'До 200 знаков' },
    pattern: { value: /^(?![0])^(?! )[А-ЯЁа-яё\s",.№0-9]*$/, message: INVALID_FORMAT },
  },
  dateOfIssue: {
    required: 'Введите дату выдачи документа',
    validate: (v) => {
      if (v > new Date()) return 'Дата не должна быть позже текущей даты';
    },
  },
  dateOfMeeting: {
    required: 'Укажите дату встречи',
    validate: (v: Date) => {
      const checkMonthDate = new Date();
      checkMonthDate.setMonth(checkMonthDate.getMonth() + 2);
      const checkDayDate = new Date();
      checkDayDate.setDate(checkMonthDate.getDate() + 1);
      if (v <= checkDayDate) return 'Значение должно быть не меньше тек. даты + 1 день';
      if (v >= checkMonthDate) return 'Значение должно быть не более 2х месяцев с тек. даты';
    },
  },
  timeOfMeeting: {
    required: 'Укажите время встречи',
    validate: (v) => {
      const [hour, minute] = v.split(':');
      if (!minute || +hour >= 24 || +minute >= 60)
        return 'Время должно быть в 24-ех часовом формате ';
      if (+hour >= 20 || +hour < 8)
        return 'Допустимое значение для выбора времени с 08:00 до 20:00 ';
    },
  },
  passportNumber: {
    deps: 'documentSelect',
    required: 'Введите серию и номер паспорта',
    pattern: { value: PASSPORT_REGEX, message: 'Недопустимый формат серии и номера паспорта' },
  },
  refugeeCertificateNumber: {
    deps: 'documentSelect',
    required: 'Введите серию и номер документа',
    pattern: {
      value: REFUGEE_CERTIFICATE_REGEX,
      message: 'Недопустимый формат серии и номера документа',
    },
  },
  residentCardNumber: {
    deps: 'documentSelect',
    required: 'Введите серию и номер документа',
    pattern: {
      value: RESIDENT_CARD_REGEX,
      message: 'Недопустимый формат серии и номера документа',
    },
  },
  thingsName: {
    required: 'Введите название объекта страхования',
    minLength: { value: 3, message: 'От 3 знаков' },
    maxLength: { value: 50, message: 'До 50 знаков' },
    pattern: {
      value: /^(?![0])[а-яА-ЯЁёa-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~]*$/,
      message: INVALID_FORMAT,
    },
  },
  thingsCost: {
    required: 'Введите оценочную стоимость объекта в рублях',
    pattern: { value: /^(?![0])[0-9\s]*$/, message: 'Не должен начинаться с 0' },
    validate: (v) => {
      const price = Number(v.replaceAll(' ', ''));
      if (price < 5000) return 'От 5000 рублей';
      if (price > 25000000) return 'До 25 000 000 рублей';
      return true;
    },
  },
  thingsFiles: {
    validate: (v: File[]) => {
      if (v.length > 10) return 'Не больше 10 файлов';
      return true;
    },
  },
  homeFiles: {
    required: 'Не должно быть пустым',
    validate: (v: File[]) => {
      if (v.length > 10) return 'Не больше 10 файлов';
      return true;
    },
  },
  constructionMaterial: {
    required: 'Выберите материал постройки',
  },
  startDate: {
    required: 'Это поле обязательно для заполнения',
    min: {
      value: new Date().setHours(0, 0, 0, 0),
      message: 'Невозможно выбрать дату меньше сегодняшней',
    },
    validate: (v: Date) => {
      const checkDate = new Date();
      checkDate.setFullYear(checkDate.getFullYear() + 1);
      if (v > checkDate) return 'Не может быть позже текущей даты более чем на 1 год';
      return true;
    },
  },
  region: {
    validate: (v: string) => !/[^а-яА-ЯЁё0-9]/g.test(v) || INVALID_FORMAT,
    required: 'Введите название области/края',
    minLength: { value: 2, message: 'От 2 знаков' },
    maxLength: { value: 50, message: 'До 50 знаков' },
    pattern: { value: /^[а-яА-ЯЁё\s-]*$/, message: INVALID_FORMAT },
  },
  city: {
    required: 'Введите название города',
    minLength: { value: 2, message: 'От 2 знаков' },
    maxLength: { value: 50, message: 'До 50 знаков' },
    pattern: { value: /^[а-яА-ЯЁё\s-]*$/, message: INVALID_FORMAT },
  },
  street: {
    required: 'Не должен быть пустым',
    pattern: {
      value: /^(?![- '])[а-яА-ЯЁё0-9 \-']*[а-яА-ЯЁё0-9]+$/g,
      message: 'Недопустимое значение',
    },
    validate: (v: string) => {
      if (/([-' ]){2,}/g.test(v)) return 'Недопустимое сочетание символов';
      if (v.length < 2) return 'Необходимо ввести не менее двух символов';
    },
    maxLength: { value: 45, message: 'Превышено допустимое количество символов' },
  },
  house: {
    required: 'Введите номер дома',
    pattern: {
      value: /^(?![- /])[а-яА-ЯЁё0-9 \-/]*[а-яА-ЯЁё0-9]+$/g,
      message: 'Недопустимое значение',
    },
    validate: (v: string) => {
      if (/([-/ ]){2,}/g.test(v)) return 'Недопустимое сочетание символов';
      if (/^\d+$/g.test(v) && v.length > 5) return 'Введите не более 5 цифр';
      if (
        !/^((([0-9]{0,5})|[А-Яа-яЁё0-9]{0,4})|([0-9А-Яа-яЁё]{0,4}((\/)|(-))[0-9А-Яа-яЁё]{0,3}))$/g.test(
          v,
        )
      )
        return 'Формат данных не соответствует установленному';
    },
    minLength: { value: 1, message: 'От 1 знака' },
    maxLength: { value: 10, message: 'До 10 знака' },
  },
  office: {
    required: 'Не должно быть пустым',
    pattern: { value: /^[0-9]*$/, message: 'Содержит недопустимые символы' },
    validate: (v: string) => {
      if (!/^\S*$/g.test(v)) return INVALID_FORMAT;
    },
    minLength: { value: 1, message: 'От 1 знака' },
    maxLength: { value: 3, message: 'Введите не более 3 цифр' },
  },
  floor: {
    pattern: { value: /^[0-9]*$/, message: 'Содержит недопустимые символы' },
    validate: (v: string) => {
      if (!/^\S*$/g.test(v)) return INVALID_FORMAT;
      if (/^0/.test(v)) return 'Не должен начинаться с 0';
    },
    minLength: { value: 1, message: 'От 1 знака' },
    maxLength: { value: 3, message: 'Введите не более 3 цифр' },
  },
  apartment: {
    pattern: { value: /^[0-9]*$/, message: 'Содержит недопустимые символы' },
    validate: (v: string) => {
      if (!/^\S*$/g.test(v)) return INVALID_FORMAT;
      if (/^0/.test(v)) return 'Не должен начинаться с 0';
    },
    minLength: { value: 1, message: 'От 1 знака' },
    maxLength: { value: 4, message: 'Введите не более 4 цифр' },
  },
  entrance: {
    pattern: { value: /^[0-9]*$/, message: 'Содержит недопустимые символы' },
    validate: (v: string) => {
      if (!/^\S*$/g.test(v)) return INVALID_FORMAT;
      if (/^0/.test(v)) return 'Не должен начинаться с 0';
    },
    minLength: { value: 1, message: 'От 1 знака' },
    maxLength: { value: 3, message: 'Введите не более 3 цифр' },
  },
  fullAddress: {
    required: 'Введите адрес. Пример ввода: г. Москва, ул. Ленина 57, кв. 357',
    validate: (v) => {
      if (!v) return true;
      if (v.length < 6) return 'От 6 символов';
      if (v.length > 500) return 'До 500 символов';
      if (/^[' -.,()IV]/.test(v)) return 'Не может начинаться со специального символа';
      if (!/^(?![' -.,()IV])[А-Яа-яЁё0-9\s'"-.,()/\\]+$/.test(v)) return 'Недопустимый формат';
      if (/[%#$!@*&]/.test(v)) return 'Недопустимый формат';
    },
  },
  vehicleAddress: {
    required: 'Введите адрес. Пример ввода: г. Москва, ул. Ленина 57, кв. 357',
    validate: (v) => {
      if (!v) return true;
      if (v.length < 6) return 'От 6 символов';
      if (v.length > 500) return 'До 500 символов';
      if (/^[' -.,()IV]/.test(v)) return 'Не может начинаться со специального символа';
      if (!/^(?![' -.,()IV])[А-Яа-яЁё0-9\s'-.,()\\/]+$/.test(v)) return 'Недопустимый формат';
    },
  },
  yearOfConstruction: {
    required: 'Введите год постройки',
    max: {
      value: Number(new Date().getFullYear()),
      message: `Не может быть позже ${Number(new Date().getFullYear())}`,
    },
    min: {
      value: 1950,
      message: 'Минимальное значение 1950',
    },
    minLength: { value: 4, message: INVALID_FORMAT },
    maxLength: { value: 4, message: INVALID_FORMAT },
    pattern: { value: /^(?![0])[0-9]*$/, message: INVALID_FORMAT },
  },
  buildingArea: {
    required: 'Введите площадь строения',
    min: {
      value: 0,
      message: 'Не должна быть меньше 0',
    },
    pattern: { value: /^(?![0])/, message: 'Не должна начинаться с 0' },
  },
  actualCost: {
    required: 'Введите действительную стоимость',
    min: {
      value: 0,
      message: 'Не должна быть меньше 0',
    },
    pattern: { value: /^(?![0])[0-9\s]*$/, message: INVALID_FORMAT },
  },
  insuranceAmount: {
    required: 'Введите страховую сумму',
    minLength: {
      value: 1,
      message: INVALID_FORMAT,
    },
    maxLength: {
      value: 10,
      message: INVALID_FORMAT,
    },
    pattern: { value: /^(?![0])[0-9\s]*$/, message: INVALID_FORMAT },
  },
  durationApartment: {
    required: 'Это поле обязательно для заполнения',
    minLength: { value: 1, message: 'От 1 знака' },
    maxLength: {
      value: 2,
      message: 'До 2 знаков',
    },
    min: { value: 1, message: 'От 1 месяца' },
    max: { value: 60, message: 'До 60 месяцев' },
    pattern: { value: /^(?![0])[0-9]*$/, message: INVALID_FORMAT },
  },
  durationHome: {
    required: 'Это поле обязательно для заполнения',
    minLength: { value: 1, message: 'От 1 знака' },
    maxLength: {
      value: 3,
      message: 'До 3 знаков',
    },
    min: { value: 1, message: 'От 1 месяца' },
    max: { value: 120, message: 'До 120 месяцев' },
    pattern: { value: /^(?![0])[0-9]*$/, message: INVALID_FORMAT },
  },
  durationAbroad: {
    required: 'Это поле обязательно для заполнения',
    validate: (v: Date) => {
      if (v <= new Date()) return 'Дата не должна быть раньше или равна текущей дате';
      const checkDate = new Date();
      checkDate.setMonth(checkDate.getMonth() + 12);
      if (v > checkDate)
        return 'Разница между датой начала и окончания поездки должна быть меньше 365 дней';
    },
  },
  bankName: {
    required: 'Введите наименование банка',
    minLength: { value: 2, message: 'От 2 знаков' },
    maxLength: { value: 50, message: 'До 50 знаков' },
    pattern: {
      value: /^(?![0])^(?! )^(?!["(),\-.№0-9])[А-ЯЁа-яё\s"(),\-.№0-9]*$/,
      message: INVALID_FORMAT,
    },
  },
  bankBIC: {
    required: 'Укажите БИК',
    pattern: { value: /^(04)/, message: 'БИК должен начинаться с 04' },
    maxLength: { value: 9, message: 'Не может быть больше 9 цифр' },
  },
  propertyDocs: { validate: (value: File[]) => (value.length ? true : 'Не должно быть пустым') },
};

export const dropzoneOptions = {
  accept: {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'application/pdf': ['.pdf'],
  },
  multiple: true,
  maxSize: 5242880,
  maxFiles: 10,
};
