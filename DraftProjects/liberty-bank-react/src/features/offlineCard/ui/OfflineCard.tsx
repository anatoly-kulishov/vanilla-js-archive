import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import styles from './OfflineCard.module.scss';
import { InsuranceFrame } from './components/InsuranceFrame';
import { INSURANCE } from '../constants/insuranceConsts';
import {
  useCreateApplicationOfflineMutation,
  Button,
  CardType,
  InfoFrame,
  Modal,
  getCustomerId,
  getAccessToken,
  Preloader,
} from '@/shared';
import dayjs from 'dayjs';
import { FormValues } from '../model/types';
import { useEffect, useState } from 'react';

export const OfflineCard = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      surname: '',
      patronym: '',
      mobilePhone: '',
      date: '',
      time: '',
      city: '',
      street: '',
      building: '',
      apartment: undefined,
      floor: undefined,
      entrance: undefined,
      officeNumber: '',
      type: 'HOME',
    },
    mode: 'onChange',
    resetOptions: {
      keepErrors: false,
    },
  });
  const location = useLocation();

  const productId = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clientId = getCustomerId(getAccessToken() as string);

  const [createApplication, { isError, isLoading }] = useCreateApplicationOfflineMutation();

  useEffect(() => {
    if (isLoading) {
      setIsModalOpen(true);
    }
  }, [isLoading]);

  const onSubmitHandler = () => {
    methods.handleSubmit(({ name, surname, patronym, mobilePhone, time, date, ...data }) => {
      const transformDate = dayjs(date).format('YYYY-MM-DD');
      const transformPhone = +(mobilePhone.match(/\d+/g) || []).join('');
      if (data.type === 'BANK') {
        createApplication({
          headers: clientId,
          body: {
            insuranceProductId: String(productId),
            name,
            surname,
            patronym,
            mobilePhone: transformPhone,
            time,
            date: transformDate,
            officeNumber: data.officeNumber,
            type: data.type,
          },
        });
      } else if (data.type === 'HOME') {
        createApplication({
          headers: clientId,
          body: {
            insuranceProductId: String(productId),
            name,
            surname,
            patronym,
            mobilePhone: transformPhone,
            time,
            date: transformDate,
            apartment: +data.apartment,
            building: data.building,
            city: data.city,
            entrance: +data.entrance,
            floor: +data.floor,
            street: data.street,
            type: data.type,
          },
        });
      }
    })();
  };

  const {
    formState: { isValid },
  } = methods;

  const submitButton = (
    <Button
      type='button'
      theme='primary'
      size='s'
      className={styles['submit-btn']}
      onClick={onSubmitHandler}
      disabled={!isValid}
    >
      {INSURANCE.submitButton}
    </Button>
  );
  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <FormProvider {...methods}>
        <form className={styles['form']} onSubmit={onSubmitHandler}>
          <InsuranceFrame submitBtn={submitButton} />
        </form>
      </FormProvider>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={(isOpen: boolean) => {
            setIsModalOpen(isOpen);
          }}
        >
          {isError ? (
            <InfoFrame
              underImageTitle='Произошла ошибка при отправке заявки'
              primaryBtnText='Понятно'
              onPrimaryButtonClick={() => {
                setIsModalOpen(false);
              }}
              cardType={CardType.applicationSent}
              icon={{ width: '580px', image: '404' }}
            />
          ) : (
            <InfoFrame
              underImageTitle='Заявка успешно создана'
              primaryBtnText='Понятно'
              onPrimaryButtonClick={() => {
                setIsModalOpen(false);
              }}
              cardType={CardType.applicationSent}
              icon={{ width: '580px', image: 'current-bill' }}
            />
          )}
        </Modal>
      )}
    </>
  );
};
