import { Button, PATH_PAGE, Stepper } from '@/shared';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  HC_BUILDING_MATERIAL,
  HC_CURRENCIES_CODES,
  HC_FORM_BACK,
  HC_FORM_NEXT,
  HC_FORM_SUBMIT,
  HC_TYPE_OF_PROPERTY,
} from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { SendingApplicationInfo } from '@/widgets/sendingApplicationInfo';
import { useCreateApplicationRequestMutation } from '../../api/createApplicationRequest';
import ContractFrame from './contractFrame';
import LocationFrame from './locationFrame';
import PropertyFrame from './propertyFrame';
import dayjs from 'dayjs';

interface Thing {
  name: string;
  cost: string;
  type: keyof typeof HC_TYPE_OF_PROPERTY;
}

interface FormValues {
  contractCurrency: keyof typeof HC_CURRENCIES_CODES;
  duration: string;
  contractDate: string;
  things: Thing[];
  constructionMaterial: keyof typeof HC_BUILDING_MATERIAL;
  isSecuritySystem: 'Да' | 'Нет';
  floor: number;
  city: string;
  street: string;
  house: string;
  apartment: string;
}

const CreateHomeContentsInsuranceApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState([1, 4]);
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    resetOptions: {
      keepErrors: false,
    },
    defaultValues: {
      contractCurrency: 'RUB',
      duration: '',
      contractDate: undefined,
      things: [{ name: '', cost: '', type: undefined }],
      constructionMaterial: undefined,
      isSecuritySystem: 'Да',
      floor: 0,
      city: '',
      street: '',
      house: '',
      apartment: '',
    },
  });
  const {
    formState: { isValid },
    reset,
    trigger,
  } = methods;

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
    setVisitedSteps((prev) => (!prev.includes(currentStep) ? [...prev, currentStep] : prev));
    if (visitedSteps.includes(currentStep)) trigger();
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : 0));
    reset(undefined, { keepDirtyValues: true, keepErrors: true, keepValues: true });
  };

  const [createApplication, { isSuccess, isError, isLoading }] =
    useCreateApplicationRequestMutation();

  const handleSubmit = () => {
    methods.handleSubmit((data) => {
      const address = `РФ, г.${data.city}, ул. ${data.street}, д. ${data.house}, кв. ${data.apartment}`;
      createApplication({
        type: 'THING',
        thingApplication: {
          insuranceProductId: 9,
          insurerIsOwner: true,
          duration: parseInt(data.duration) * 30,
          isSecuritySystem: data.isSecuritySystem === 'Да',
          location: address,
          currencyNumericCode: HC_CURRENCIES_CODES[data.contractCurrency],
          floor: +data.floor,
          startDate: dayjs(data.contractDate).format('DD-MM-YYYY'),
          startInsurance: dayjs(data.contractDate).format('YYYY-MM-DD'),
          things: [
            {
              name: data.things[0].name,
              cost: +data.things[0].cost,
              type: HC_TYPE_OF_PROPERTY[data.things[0].type],
            },
          ],
          constructionMaterial: HC_BUILDING_MATERIAL[data.constructionMaterial],
        },
      });
    })();
    setCurrentStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  const stepper = <Stepper totalSteps={3} currentStep={currentStep} />;

  const prevButton = (
    <Button onClick={handlePrevStep} theme='third' className={styles['back-btn']}>
      {HC_FORM_BACK}
    </Button>
  );
  const nextButton = (
    <Button
      onClick={handleNextStep}
      theme='primary'
      size='s'
      className={styles['next-btn']}
      disabled={!isValid}
    >
      {HC_FORM_NEXT}
    </Button>
  );
  const submitButton = (
    <Button
      type='button'
      theme='primary'
      size='s'
      className={styles['next-btn']}
      onClick={handleSubmit}
      disabled={!isValid}
    >
      {HC_FORM_SUBMIT}
    </Button>
  );

  const controls = { stepper, prevButton, nextButton, submitButton };

  const frames = [
    <ContractFrame {...controls} key='ContractFrame-key' />,
    <PropertyFrame {...controls} key='PropertyFrame-key' />,
    <LocationFrame {...controls} key='LocationFrame-key' />,
    <SendingApplicationInfo
      sendingStatus={isSuccess}
      handleNavigate={
        isSuccess ? () => navigate(PATH_PAGE.insuranceProducts) : () => setCurrentStep(4)
      }
      handleReset={isError ? handleReset : undefined}
      loading={isLoading}
      key='InfoFrame-key'
    />,
  ];

  return (
    <FormProvider {...methods}>
      <form className={styles['form']} onSubmit={handleSubmit}>
        {frames[currentStep - 1]}
      </form>
    </FormProvider>
  );
};

export default CreateHomeContentsInsuranceApplication;
