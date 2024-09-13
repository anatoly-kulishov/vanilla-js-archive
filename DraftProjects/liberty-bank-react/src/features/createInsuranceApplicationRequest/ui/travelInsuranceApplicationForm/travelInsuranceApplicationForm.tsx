import { useState } from 'react';
import { Button, PATH_PAGE, Stepper } from '../../../../shared';
import { HC_CURRENCIES_CODES, HC_FORM_BACK, HC_FORM_NEXT, HC_FORM_SUBMIT } from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateApplicationRequestMutation } from '../../api/createApplicationRequest';
import ContractDetailsFrame from '../../shared/ui/contractDetailsFrame';
import {
  ABOARD_COUNTRY_GROUP,
  COUNTRY_GROUP,
  CURRENCIES,
  DURATION,
  PROPERTIES,
  SPORT_ACTIVITY_GROUP,
} from './constants';
import { InsuredPersonsFrame } from '../../shared/ui/insuredPersonsFrame';
import { InsuranceSumFrame } from '../../shared/ui/insuranceSumFrame';
import dayjs from 'dayjs';
import { SendingApplicationInfo } from '@/widgets/sendingApplicationInfo';
import { useNavigate } from 'react-router-dom';

type InsuredPersonValues = Array<{
  name: string;
  surname: string;
  patronymic: string;
  dateOfBirth: string;
  apartament: string;
  city: string;
  entrance: string;
  house: string;
  region: string;
  street: string;
}>;

interface FormValues {
  duration: number;
  countryGroup: keyof typeof ABOARD_COUNTRY_GROUP;
  insuranceSum: string;
  sportType: keyof typeof SPORT_ACTIVITY_GROUP;
  baggage: boolean;
  travelCancellation: boolean;
  contractCurrency: keyof typeof HC_CURRENCIES_CODES;
  currencyNumericCode: string;
  insuredPerson: InsuredPersonValues;
  startDate: string;
  endDate: string;
}

const TravelInsuranceApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    resetOptions: {
      keepErrors: false,
    },
    defaultValues: {
      duration: 0,
      countryGroup: undefined,
      insuranceSum: '',
      sportType: undefined,
      baggage: false,
      travelCancellation: false,
      contractCurrency: 'USD',
      startDate: '',
      endDate: '',
      insuredPerson: [
        {
          name: '',
          surname: '',
          patronymic: '',
          dateOfBirth: '',
          apartament: '',
          city: '',
          entrance: '',
          house: '',
          region: '',
          street: '',
        },
      ],
    },
  });
  const {
    formState: { isValid },
    reset,
  } = methods;

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
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
    methods.handleSubmit((data) => {
      const person = data.insuredPerson[0];
      const adress = `РФ, г.${person.city}, ул. ${person.street}, д. ${person.house}, кв. ${person.apartament}`;
      createApplication({
        type: 'TRAVEL',
        travelApplication: {
          insuranceProductId: 10,
          currencyNumericCode: HC_CURRENCIES_CODES[data.contractCurrency],
          insurerIsOwner: true,
          insurerIsPerson: true,
          duration: data.duration,
          countryGroup: ABOARD_COUNTRY_GROUP[data.countryGroup],
          startDate: dayjs(data.startDate).format('DD-MM-YYYY'),
          expirationDate: dayjs(data.endDate).format('DD-MM-YYYY'),
          property: {
            sportType: SPORT_ACTIVITY_GROUP[data.sportType],
            baggage: data.baggage,
            travelCancellation: data.travelCancellation,
          },
          insuredPerson: {
            name: person.name,
            surname: person.surname,
            patronym: person.patronymic,
            birthdate: dayjs(person.dateOfBirth).format('YYYY-MM-DD'),
            registrationAddress: adress,
            actualAddress: adress,
          },
          insuranceSum: +data.insuranceSum,
        },
      });
    })();

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
      currencies={CURRENCIES}
      properties={PROPERTIES}
      countryGroup={COUNTRY_GROUP}
      duration={DURATION}
      hasSportActivity={true}
      key='ContractDetailsFrame-key'
    />,
    <InsuredPersonsFrame {...controls} key='InsuredPersonsFrame-key' />,
    <InsuranceSumFrame {...controls} key='InsuranceSumFrame-key' />,
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

export default TravelInsuranceApplicationForm;
