import { useParams } from 'react-router-dom';
import styles from './InsuranceEditOrder.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/shared';
import ContractDetailsFrame from '@/features/createInsuranceApplicationRequest/shared/ui/contractDetailsFrame';
import { COUNTRY_GROUP } from '@/features/createInsuranceApplicationRequest/ui/travelInsuranceApplicationForm/constants';

import {
  RADIO_VARIANTS,
  DURATION_INFO,
  DMS_OPTIONS,
  ACCIDENT_OPTIONS,
  ABROAD_SUM,
  SAVE_CHANGES,
} from '../constant';
import { CurrenciesType } from '@/features/createInsuranceApplicationRequest/model/types';

interface FormValues {}

export const InsuranceEditPolicy = () => {
  const { productId } = useParams();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    resetOptions: {
      keepErrors: false,
    },
  });

  const {
    formState: { isValid },
  } = methods;

  const currencies: CurrenciesType[] = ['rub', 'usd', 'eur'];

  const submitButton = (
    <Button
      type='button'
      theme='primary'
      size='s'
      className={styles['next-btn']}
      onClick={() => null}
      disabled={!isValid}
    >
      {SAVE_CHANGES}
    </Button>
  );

  const getActivity = (productId: string | undefined) => {
    if (productId == '11') return ACCIDENT_OPTIONS;
    else if (Number(productId) >= 3 && Number(productId) <= 6) return DMS_OPTIONS;
    else if (productId == '10') return ABROAD_SUM;
  };

  const countryGroup = productId === '10' ? COUNTRY_GROUP : undefined;

  return (
    <FormProvider {...methods}>
      <form className={styles['form']}>
        <ContractDetailsFrame
          submitButton={submitButton}
          currencies={currencies}
          properties={RADIO_VARIANTS[productId || '1']}
          countryGroup={countryGroup}
          duration={DURATION_INFO}
          hasSportActivity={productId == '10'}
          accidentActivity={getActivity(productId)}
          key='ContractDetailsFrame-key'
        />
      </form>
    </FormProvider>
  );
};
