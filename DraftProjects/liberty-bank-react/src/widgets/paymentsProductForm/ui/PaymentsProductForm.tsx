import {
  PaymentsProductFormNumber,
  PaymentsWriteOffCard,
  PaymentsWriteOffDetails,
  PaymentsResult,
} from '@/features';
import styles from './PaymentsProductForm.module.scss';
import { Button } from '@/shared';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const PaymentsProductsForm = () => {
  const { product } = useParams();
  const withoutFirstStep = new RegExp('^(' + 'charity|fdf' + ')$', 'i').test(product || 'mobile');
  const [currentStep, setCurrentStep] = useState(withoutFirstStep ? 1 : 0);
  const [docNumber, setDocNumber] = useState('');

  const handleNextStep = () => {
    if (currentStep < frames.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBackStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const buttonNext = (
    <div className={styles['btn-next']}>
      {
        <Button onClick={handleNextStep} width='max'>
          Далее
        </Button>
      }
    </div>
  );

  const backButton = (
    <div className={styles['btn-next']}>
      {
        <Button onClick={handleBackStep} width='max' theme='secondary'>
          Назад
        </Button>
      }
    </div>
  );

  const frames = [
    <PaymentsProductFormNumber
      key='phone-number'
      type={product}
      button={buttonNext}
      docNumber={docNumber}
      setDocNumber={setDocNumber}
    />,
    <PaymentsWriteOffCard
      key='card-info'
      button={buttonNext}
      type={product}
      withoutTitle={withoutFirstStep}
    />,
    <PaymentsWriteOffDetails
      key='payment-details'
      nextButton={buttonNext}
      backButton={backButton}
      type={product}
    />,
    <PaymentsResult key='payment-result' />,
  ];
  return <div className={styles['form']}>{frames[currentStep]}</div>;
};
