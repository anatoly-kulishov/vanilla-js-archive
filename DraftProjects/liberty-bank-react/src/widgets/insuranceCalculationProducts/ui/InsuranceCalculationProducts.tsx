import styles from './InsuranceCalculationProducts.module.scss';

import { BackButton, Preloader, Text, useGetInsuranceCalculationsPolicyMutation } from '@/shared';
import { INS_BUTTON, RESULT_CALCULATE_MESSAGE, RESULT_CALCULATE_TITLE } from '../constants';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import {
  Dms,
  Osago,
  Kasko,
  CalculateHomeContents,
  CalculateAbroadApplication,
  CalculateAccidentApplication,
  CalculateHomeApplication,
} from '@/features';
import { CalculateApartmentApplication } from '@/features/calculateInsuranceProduct/ui/calculateApplications/calculateApartmentApplications/CalculateApartmentApplications';

interface ICalculationInsuranceProductsTypes {
  nameOfTheProduct: string;
  content?: ReactNode;
}

export const InsuranceCalculationProducts = () => {
  const productType = useParams();

  const [calculationsPolicy, resultCalculate] = useGetInsuranceCalculationsPolicyMutation();

  const insuranceCalculationProducts: ICalculationInsuranceProductsTypes[] = [
    {
      nameOfTheProduct: 'dms',
      content: <Dms calculationsPolicy={calculationsPolicy} />,
    },
    {
      nameOfTheProduct: 'osago',
      content: <Osago calculationsPolicy={calculationsPolicy} />,
    },
    {
      nameOfTheProduct: 'kasko',
      content: <Kasko calculationsPolicy={calculationsPolicy} />,
    },
    {
      nameOfTheProduct: 'contents',
      content: <CalculateHomeContents calculationsPolicy={calculationsPolicy} />,
    },
    {
      nameOfTheProduct: 'abroad',
      content: <CalculateAbroadApplication calculationsPolicy={calculationsPolicy} />,
    },
    {
      nameOfTheProduct: 'details',
      content: <CalculateAccidentApplication calculationsPolicy={calculationsPolicy} />,
    },
    {
      nameOfTheProduct: 'apartment',
      content: <CalculateApartmentApplication calculationsPolicy={calculationsPolicy} />,
    },
    {
      nameOfTheProduct: 'home',
      content: <CalculateHomeApplication calculationsPolicy={calculationsPolicy} />,
    },
  ];

  const productToDisplay = insuranceCalculationProducts.find(
    (product) => product.nameOfTheProduct === productType.product,
  );

  return (
    <div className={styles['wrapper']}>
      <div className={styles['containerBackBtn']}>
        <BackButton
          text={INS_BUTTON}
          theme={'blue'}
          className={styles['backBtn']}
          width='24'
          height='24'
          name='arrow-left-blue'
        />
      </div>
      <div className={styles['resultCalculate']}>
        <Text tag='h4' size='xl' weight='regular'>
          {RESULT_CALCULATE_TITLE}
        </Text>
        {resultCalculate.isLoading ? (
          <Preloader minimized={true} />
        ) : resultCalculate.isError ? (
          <Text tag='span' size='l' weight='regular'>
            Ошибка запроса
          </Text>
        ) : (
          <>
            <Text tag='span' size='l' weight='regular'>
              {resultCalculate.isUninitialized
                ? RESULT_CALCULATE_MESSAGE
                : `${resultCalculate.data?.price} Р`}
            </Text>
            <Text tag='span' size='m' weight='regular'>
              {resultCalculate.isUninitialized || `* ${resultCalculate.data?.message}`}
            </Text>
          </>
        )}
      </div>
      {productToDisplay ? (
        productToDisplay.content
      ) : (
        <Text tag='span' size='m' weight='regular'>
          Форма в разработке
        </Text>
      )}
    </div>
  );
};
