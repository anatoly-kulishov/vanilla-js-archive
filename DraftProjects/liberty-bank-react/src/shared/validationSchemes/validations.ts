import { string, ValidationError, date, ref } from 'yup';
import * as yup from 'yup';

export const phoneValidation = string()
  .required('Обязательное поле')
  .test({
    test: (value) => {
      const onlyTelNumbers = value.replace(/\D+/g, '');

      if (onlyTelNumbers.length < 11) {
        throw new ValidationError({
          path: 'phone',
          errors: ['Номер телефона должен содержать 11 цифр'],
          message: 'Номер телефона должен содержать 11 цифр',
          inner: [],
          value: value,
          name: 'ValidationError',
          type: 'phoneLength',
        });
      }

      return true;
    },
  });

const authPasswordErrorMessage =
  'Пароль должен содержать от 6 до 20 символов и содержать только латиницу';

export const authPasswordValidation = string()
  .required('Обязательное поле')
  .matches(/^.{6,20}$/, { message: authPasswordErrorMessage })
  .matches(/^[!-~]*$/, { message: authPasswordErrorMessage })
  .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!-/:-@[-`{-~])/, {
    message: authPasswordErrorMessage,
  });

export const documentValidation = string()
  .required('Обязательное поле')
  .matches(/^(?=[a-zA-Zа-яА-Я\d\s,-]{6,20}$)/, {
    message: 'Документ должен содержать от 6 до 20 символов',
  });

export const emailValidation = string()
  .required('Обязательное поле')
  .min(5, 'Недостаточно символов')
  .max(50, 'Максимальная длина не должна превышать 50 символов')
  .matches(/^(?!.*\.\.)(?!.*\.@)[a-zA-Z0-9][\w\-.]{1,29}@[\w-]{2,15}\.[\w-]{2,3}$/, {
    message: 'Введите корректный адрес почты',
  });

export const registrationPasswordValidation = yup
  .string()
  .required('пароль не может быть пустым')
  .test({
    test: (value) => {
      const errors = [
        /^(?=.{6,20}$)/.test(value),
        /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
        /^(?=.*[0-9])/.test(value),
        /^(?=.*[./:;~="[\]{}()<>|`'?!@#$%^&*_+,-])/.test(value),
        !/[^0-9a-zA-Z./:;~="[\]{}()<>|`'?!@#$%^&*_+,-]|\s/.test(value),
      ];

      if (errors.some((error) => !error)) {
        throw new ValidationError([
          {
            path: 'password',
            errors: ['errors'],
            message: JSON.stringify(errors),
            inner: [],
            value: value,
            name: 'ValidationError',
            type: 'pwdValidation',
          },
        ]);
      }

      return true;
    },
  });

export const passwordConfirmValidation = string().oneOf(
  [yup.ref('password'), undefined],
  'Пароли не совпадают',
);

export const accountNameValidation = string()
  .min(1, 'Поле не должно быть пустым')
  .max(30, 'Вы не можете ввести более 30 символов')
  .matches(/^[A-ZА-Яa-zа-яёЁ\d!@#$%^&*()_ -=+\\|[\]{}:`~;.,<>?]+$/, {
    message: 'Вы ввели недопустимые символы',
  })
  .test('accountNameValidation', 'Измените название поля', (value) => {
    return !(value && (value[0] === ' ' || value.trim() === ''));
  });

export const passwordValidationMessages = [
  'Количество символов от 6 до 20',
  'Есть строчные и заглавные буквы',
  'Есть цифры',
  'Есть специальные символы !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
  'Используйте только буквы (a-z, A-Z), цифры и символы !@#&%^&*()-_+;:,./?\\|`~{}',
];

export const PINValidation = string()
  .required('Обязательное поле')
  .length(4, 'Длина пин-кода должна составлять 4 символа')
  .matches(/^[0-9]*$/, {
    message: 'Вы ввели недопустимые символы',
  })
  .trim();

export const newPINValidation = PINValidation.notOneOf(
  [ref('oldPin')],
  'Новый пин-код должен отличаться',
);

export const approvedPINValidation = PINValidation.oneOf([ref('newPin')], 'Пин-коды не совпадают');

export const oldPasswordValidation = string().required('Обязательное поле');

export const addClientsLastNameValidation = string()
  .required('Обязательное поле')
  .max(30, 'Значение должно иметь не более 30 символов')
  .matches(/^[a-zа-я]+([a-zа-я-' ]+)?$/i, {
    message: 'Некорректное значение',
  });

export const addClientsFirstNameValidation = string()
  .required('Обязательное поле')
  .max(30, 'Значение должно иметь не более 30 символов')
  .matches(/^[a-zа-я]+([a-zа-я-' ]+)?$/i, {
    message: 'Некорректное значение',
  });

export const addClientPatronymicValidation = string()
  .nullable()
  .notRequired()
  .when('patronymic', {
    is: (value: string) => value?.length,
    then: (rule) => rule.matches(/^[a-zа-я]+([a-zа-я-' ]+)?$/i, 'Некорректное значение'),
  })
  .max(30, 'Значение должно иметь не более 30 символов');

export const addClientMobilePhoneValidation = string()
  .required('Обязательное поле')
  .matches(/^7[0-9]{10}$/, {
    message: 'Номер телефона должен состоять из 11 цифр',
  });

export const addClientEmailValidation = string()
  .nullable()
  .notRequired()
  .when('email', {
    is: (value: string) => value?.length,
    then: (rule) =>
      rule.matches(
        /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Некорректное значение',
      ),
  });

export const addClientInnValidation = string()
  .required('Обязательное поле')
  .matches(/^[0-9]{4} [0-9]{5} [0-9]{1}$/, {
    message: 'Значение должно содержать только цифры в формате: ХХХХ ХХХХХ Х',
  });

export const addClientCountryValidation = string()
  .max(30, 'Значение должно иметь не более 30 символов')
  .required('Обязательное поле')
  .matches(/^[a-zа-я]+([a-zа-я- ]+)?$/i, {
    message: 'Некорректное значение. Допустимы только буквы латинского алфавита и кириллица.',
  });

export const addClientCityValidation = string()
  .max(30, 'Значение должно иметь не более 30 символов')
  .required('Обязательное поле')
  .matches(/^[a-zа-я]+([a-zа-я- ]+)?$/i, {
    message: 'Некорректное значение. Допустимы только буквы латинского алфавита и кириллица.',
  });

export const addClientRegionValidation = string()
  .nullable()
  .notRequired()
  .when('region', {
    is: (value: string) => value?.length,
    then: (rule) =>
      rule.matches(
        /^[a-zа-я]+([a-zа-я- ]+)?$/i,
        'Некорректное значение. Допустимы только буквы латинского алфавита и кириллица.',
      ),
  })
  .max(30, 'Значение должно иметь не более 30 символов');

export const addClientStreetValidation = string()
  .required('Обязательное поле')
  .max(30, 'Значение должно иметь не более 30 символов')
  .matches(/^[a-zа-я]+([a-zа-я- ]+)?$/i, {
    message: 'Некорректное значение. Допустимы только буквы латинского алфавита и кириллица.',
  });

export const addClientHouseNumberValidation = string()
  .required('Обязательное поле')
  .max(30, 'Значение должно иметь не более 30 символов')
  .matches(/^[1-9]+([0-9a-zа-я/]+)?$/i, {
    message: 'Некорректное значение',
  });

export const addClientEntranceNumberValidation = string()
  .nullable()
  .notRequired()
  .when('entranceNumber', {
    is: (value: string) => value?.length,
    then: (rule) => rule.matches(/^[1-9]+([0-9a-zа-я -]+)?$/i, 'Некорректное значение'),
  })
  .max(30, 'Значение должно иметь не более 30 символов');

export const addClientNumberApartmentValidation = string()
  .nullable()
  .notRequired()
  .when('numberApartment', {
    is: (value: string) => value?.length,
    then: (rule) => rule.matches(/^[1-9]+([0-9a-zа-я -]+)?$/i, 'Некорректное значение'),
  })
  .max(30, 'Значение должно иметь не более 30 символов');

export const addClientPostcodeValidation = string()
  .nullable()
  .notRequired()
  .when('postcode', {
    is: (value: string) => value?.length,
    then: (rule) => rule.matches(/^[0-9]+$/, 'Значение должно содержать только цифры'),
  })
  .max(6, 'Значение должно иметь не более 6 символов');

export const addClientPassportNumberValidation = string()
  .required('Обязательное поле')
  .matches(/^([a-zа-я0-9- ']+)?[a-zа-я0-9]+([a-zа-я0-9- ']+)?$/i, {
    message: 'Некорректное значение',
  })
  .min(6, 'Значение должно иметь не менее 6 символов')
  .max(20, 'Значение должно иметь не более 20 символов');

export const addClientPassportIssuedByValidation = string()
  .required('Обязательное поле')
  .matches(/^[a-zа-я ]+$/i, {
    message: 'Некорректное значение',
  })
  .max(50, 'Значение должно иметь не более 50 символов');

export const addClientPassportDepartamentCodeValidation = string()
  .required('Обязательное поле')
  .matches(/^[0-9]{3}-[0-9]{3}$/, {
    message: 'Значение должно содержать только цифры в формате: ХХХ-XXX',
  });

export const addClientCitizenshipValidation = string()
  .required('Обязательное поле')
  .matches(/^[a-zа-я]+([a-zа-я- /]+)?$/i, {
    message: 'Некорректное значение',
  })
  .min(2, 'Значение должно иметь не менее 2 символов')
  .max(50, 'Значение должно иметь не более 50 символов');

export const addClientCodewordValidation = string()
  .required('Обязательное поле')
  .matches(/^[a-zа-я]+([a-zа-я !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+)?$/i, {
    message: 'Некорректное значение',
  })
  .max(20, 'Значение должно иметь не более 20 символов');

export const creditSmsValidation = string()
  .required('Обязательное поле')
  .matches(/^[0-9]{6}$/, {
    message: 'Код неверный',
  });

export const coordinatesValidation = string().matches(
  /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
  {
    message: 'Не верный формат координат',
  },
);
export const ATMNumberValidation = string().matches(/^\d{4}\/\d+$/, {
  message: 'Не верно указан номер банкомата',
});

export const roomNumberValidation = string()
  .max(20, 'Значение не должно содержать больше чем 20 символов')
  .matches(/^\d+(\.\d+)?$/, {
    message: 'Не верно указан номер помещения',
  });

export const paymentAccountValidation = string()
  .required('Обязательное поле')
  .matches(/^[\d]{3} [\d]{2} [\d]{3} [\d]{1} [\d]{4} [\d]{7}$/, {
    message: 'Значение должно содержать только цифры в формате: ХХХ ХХ ХХХ Х ХХХХ ХХХХХХХ',
  });

export const cardDeliveryCity = string()
  .required('Обязательное поле')
  .min(2, 'Значение должно иметь не менее 2 символов')
  .max(20, 'Значение должно иметь не более 20 символов');

export const cardDeliveryStreet = string()
  .required('Обязательное поле')
  .min(2, 'Значение должно иметь не менее 2 символов')
  .max(30, 'Значение должно иметь не более 30 символов');

export const cardDeliveryBuilding = string()
  .required('Обязательное поле')
  .max(10, 'Значение должно иметь не более 10 символов');

export const cardDeliveryDate = date().required('Обязательное поле');

export const cardDeliveryTime = string()
  .required('Обязательное поле')
  .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Время необходимо указать в формате ЧЧ:ММ',
  });
