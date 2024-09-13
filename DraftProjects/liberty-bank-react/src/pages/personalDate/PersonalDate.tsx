import { FC, useEffect, useState } from 'react';
import {
  Button,
  Text,
  Input,
  useLazyGetCustomerInfoQuery,
  getCustomerId,
  getAccessToken,
  PATH_PAGE,
  trimQuotesReg,
} from '@/shared';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './PersonalDate.module.scss';

const MOCK_CUSTOMER_INFO = {
  phone: '+7 (922) 1110500',
  pasport: '11 45 657654',
  street: 'Б-р Энтузиастов',
  home: 'д. 2',
  apartment: 'кв. 24',
  city: ' г. Москва',
  postcode: ' 134567',
};

const PersonalDate: FC = () => {
  const [getCustomerInfo, { data: customerInfo, isSuccess }] = useLazyGetCustomerInfoQuery();
  const accessToken = getAccessToken();

  const { pathname } = useLocation();
  const [isChangeEmail, setIsChangeEmail] = useState(pathname === PATH_PAGE.customer.changeEmail);

  useEffect(() => {
    setIsChangeEmail(pathname === PATH_PAGE.customer.changeEmail);
  }, [pathname]);

  const navigate = useNavigate();
  const handlerClick = () => {
    setIsChangeEmail(true);
    navigate(PATH_PAGE.customer.changeEmail);
  };

  useEffect(() => {
    if (accessToken) {
      getCustomerInfo({
        customerId: getCustomerId(accessToken),
        accessToken: accessToken.replace(trimQuotesReg, ''),
      });
    }
  }, [accessToken]);

  return !isChangeEmail ? (
    <div className={styles.userData__block}>
      <div className={styles.userData__item_doc}>
        <Text tag='h4' weight='medium'>
          Документы
        </Text>
        <div className={styles.item__input}>
          <Text tag='p' size='s'>
            Серия и номер паспорта/ВНЖ
          </Text>
          <Text tag='p' size='s' weight='medium'>
            {MOCK_CUSTOMER_INFO.pasport}
          </Text>
        </div>
      </div>
      <div className={styles.userData__item_contacts}>
        <Text tag='h4' weight='medium'>
          Контактные данные
        </Text>
        <div className={styles.contacts_items}>
          <div className={styles.contactTel}>
            <Text className={styles.item_text} tag='p' size='xs'>
              Нужен для того, чтобы подтверждать операции и настройки счета
            </Text>
            {isSuccess && (
              <Input.Tel
                label='Телефон'
                mask='+7 (***) *** ****'
                defaultValue={customerInfo?.mobilePhone}
                className={styles.inputTel}
                disabled
              />
            )}
            <Text className={styles.item_text} tag='p' size='xs'>
              Чтобы привязать новый телефон позвоните по номеру 8 800 666-99-98. Звонок бесплатный
            </Text>
          </div>
          <div className={styles.contactEmail}>
            <Text className={styles.item_text} tag='p' size='xs'>
              На почту приходят, счета и справки
            </Text>
            {isSuccess && (
              <Input.Email
                label='Email'
                defaultValue={customerInfo?.email}
                className={styles.inputEmail}
                disabled
              />
            )}
            <Button theme='tertiary' className={styles.button} onClick={handlerClick}>
              Изменить
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.userData__item_address}>
        <Text tag='h4' weight='medium'>
          Адрес
        </Text>
        <Text className={styles.item_text} tag='p' size='xs'>
          Банк будет направлять туда почтовую корреспонденцию
        </Text>
        <div className={styles.inputs__block}>
          <div className={styles.item__input}>
            <Text tag='p' size='s'>
              Улица
            </Text>
            <Text tag='p' size='s' weight='medium'>
              {MOCK_CUSTOMER_INFO.street}
            </Text>
          </div>
          <div className={styles.item__input}>
            <Text tag='p' size='s'>
              Квартира
            </Text>
            <Text tag='p' size='s' weight='medium'>
              {MOCK_CUSTOMER_INFO.apartment}
            </Text>
          </div>
          <div className={styles.item__input}>
            <Text tag='p' size='s'>
              Индекс
            </Text>
            <Text tag='p' size='s' weight='medium'>
              {MOCK_CUSTOMER_INFO.postcode}
            </Text>
          </div>
          <div className={styles.item__input}>
            <Text tag='p' size='s'>
              Дом
            </Text>
            <Text tag='p' size='s' weight='medium'>
              {MOCK_CUSTOMER_INFO.home}
            </Text>
          </div>
          <div className={styles.item__input}>
            <Text tag='p' size='s'>
              Город
            </Text>
            <Text tag='p' size='s' weight='medium'>
              {MOCK_CUSTOMER_INFO.city}
            </Text>
          </div>
        </div>
        <Text className={styles.item_text} tag='p' size='xs'>
          Для изменения адреса регистрации необходимо обратиться в ближайшее отделение банка
        </Text>
      </div>
      <Outlet />
    </div>
  ) : (
    <Outlet />
  );
};

export default PersonalDate;
