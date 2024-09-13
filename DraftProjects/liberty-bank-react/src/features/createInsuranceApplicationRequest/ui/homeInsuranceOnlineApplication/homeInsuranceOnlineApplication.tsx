import { useState } from 'react';
import { Button, PATH_PAGE, Stepper } from '../../../../shared';
import { HC_CURRENCIES_CODES, HC_FORM_BACK, HC_FORM_NEXT, HC_FORM_SUBMIT } from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateApplicationRequestMutation } from '../../api/createApplicationRequest';
import { IBuildingApplication } from '../../model/types';
import ContractDetailsFrame from '../../shared/ui/contractDetailsFrame';
import DetailsOfHomeFrame from '../../shared/ui/detailsOfHomeFrame';
import { PROPERTIES } from './constants';
import { SendingApplicationInfo } from '@/widgets/sendingApplicationInfo';
import { useNavigate } from 'react-router-dom';

type ThingsValues = Array<{ name: string; cost: string | number; type: string }>;

interface FormValues {
  [key: string]: string | number | null | Date | ThingsValues;
  startDate: Date;
  things: ThingsValues;
}

const HomeInsuranceOnlineApplication = () => {
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
      startDate: undefined,
      yearOfConstruction: null,
      actualCost: null,
      buildingArea: null,
      streetOfBuilding: '',
      houseOfBuilding: '',
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

  const handleReset = () => {
    setCurrentStep(1);
  };

  const [createApplication, { isSuccess, isError, isLoading }] =
    useCreateApplicationRequestMutation();

  const handleSubmit = () => {
    methods.handleSubmit(
      ({
        duration,
        startDate,
        contractCurrency,
        streetOfBuilding,
        houseOfBuilding,
        yearOfConstruction,
        actualCost,
        buildingArea,
      }) => {
        const mappedData = {
          buildingDto: {
            address: streetOfBuilding + ', ' + houseOfBuilding,
            type: 'HOUSE',
            yearBuilt: +(yearOfConstruction as string),
            estimatedValue: +(actualCost as string).split(' ').join(''),
            squareFootage: +(buildingArea as string).split(' ').join(''),
            startDate: startDate.toLocaleDateString('es-CL'),
          },
          applicationDto: {
            productId: 7,
            currencyNumericCode:
              HC_CURRENCIES_CODES[contractCurrency as keyof typeof HC_CURRENCIES_CODES],
            duration: duration,
          },
        };

        createApplication({
          type: 'BUILDING',
          buildingApplication: mappedData as IBuildingApplication,
        });
      },
    )();
    setCurrentStep((prev) => prev + 1);
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
    <ContractDetailsFrame
      {...controls}
      key='ContractDetailsFrame-key'
      properties={PROPERTIES}
      duration={{ type: 'StartDate', maxMonths: 120 }}
    />,
    <DetailsOfHomeFrame {...controls} key='DetailsOfHomeFrame-key' />,
    <SendingApplicationInfo
      sendingStatus={isSuccess}
      handleNavigate={
        isSuccess ? () => navigate(PATH_PAGE.insuranceProducts) : () => setCurrentStep(2)
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

export default HomeInsuranceOnlineApplication;
