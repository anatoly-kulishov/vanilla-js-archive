import { FC, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InDevelopmentModal } from '../../entities/inDevelopmentModal/inDevelopmentModal.tsx';
import {
  DMSClaim,
  InsuranceFormInfo,
  OsagoClaim,
  PropertyClaim,
  AccidentClaim,
  AbroadClaim,
} from '../../entities/insuranceClaimInfo';
import { ITypes } from '../../entities/insuranceClaimInfo/lib/types.ts';
import styles from './InsuranceClaim.module.scss';
import {
  BackButton,
  Button,
  Modal,
  Preloader,
  Text,
  useGetInsurancePoliciesQuery,
  Wrapper,
  IInsurancePolicies,
  TAllConcretePolicyDetailsDto,
} from '../../shared';
import { BACKBTN, REGISTERBTN } from '../../entities/insuranceClaimInfo/constants.ts';

export const PoliciesTypes: ITypes[] = [
  {
    policyName: 'Автострахование ОСАГО',
    header: 'Страховой случай по ОСАГО',
    content: <OsagoClaim />,
  },
  {
    policyName: 'Автострахование КАСКО',
    header: 'Страховой случай по КАСКО',
    content: <OsagoClaim />,
  },
  {
    policyName: 'Добровольное медицинское страхование',
    header: 'Получение медпомощи при наступлении страхового случая по ДМС',
    content: <DMSClaim />,
  },
  {
    policyName: 'Страхование домашнего имущества',
    header: 'Пострадало имущество',
    content: <PropertyClaim />,
  },
  {
    policyName: 'Страхование дома',
    header: 'Пострадало имущество',
    content: <PropertyClaim />,
  },
  {
    policyName: 'Страхование квартиры',
    header: 'Пострадало имущество',
    content: <PropertyClaim />,
  },
  {
    policyName: 'Страхование выезжающих за границу',
    header: 'Страховой случай в поездке',
    content: <AbroadClaim />,
  },
  {
    policyName: 'Страхование от несчастных случаев',
    header: 'Произошел несчастный случай',
    content: <AccidentClaim />,
  },
];

const InsuranceClaim: FC = () => {
  const policyId = useParams().policyId as string;
  const { data, isLoading, isError, isSuccess } = useGetInsurancePoliciesQuery(policyId);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const methods = useForm<IInsurancePolicies<TAllConcretePolicyDetailsDto>>({
    mode: 'onTouched',
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
    values: data as IInsurancePolicies<TAllConcretePolicyDetailsDto>,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;
  const onSubmit: SubmitHandler<IInsurancePolicies<TAllConcretePolicyDetailsDto>> = () => {
    const out = {
      type: 'VEHICLE',
      vehicleCompensationApplicationRequest: {
        productId: 1,
        policyId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        applicant: 'OWNER',
        eventDate: '2023-12-20',
        description:
          'Утром, в понедельник, ехал по Садовой, когда остановился на светофоре, получил удар в левое заднее крыло. Свидетелей нет',
        nameBank: 'Филиал №2351 Банка ВТБ (ПАО), в г. Краснодаре',
        account: '40817810950202020202',
        correspondentAccount: '30101810202020202020',
        innBank: '7702075392',
        eventType: 'ROAD_ACCIDENT_WITHOUT_TRAFFIC_POLICE',
        modelAuto: 'Ford Focus 4',
        eventAddress: 'г. Ростов-на-Дону, ул. Ленина д.125',
        RCBIC: '040349758',
      },
    };
    /* eslint-disable no-console */
    console.log(out);
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {isError && 'Что-то пошло не так'}
      {isSuccess && (
        <Wrapper size='l'>
          <BackButton
            text={BACKBTN}
            theme={'blue'}
            className={styles['backBtn']}
            width='24'
            height='24'
            name='arrow-left-blue'
          />
          <div className={styles['form']}>
            {PoliciesTypes.map((policy) => {
              if (policy.policyName === data?.policyInfo.productName) {
                return (
                  <Fragment key={policy.policyName}>
                    <Text tag='h3' weight='medium' className={styles['form__header']}>
                      {policy.header}
                    </Text>
                    <FormProvider {...methods}>
                      <form className={styles['form__body']} onSubmit={handleSubmit(onSubmit)}>
                        {policy.policyName === 'Добровольное медицинское страхование' ? (
                          policy.content
                        ) : (
                          <InsuranceFormInfo
                            policyName={policy.policyName}
                            content={policy.content}
                          />
                        )}
                        <div className={styles['form__footer']}>
                          <Button
                            type='submit'
                            className={styles['form__btn']}
                            onClick={() => setIsOpen(true)}
                            disabled={!isValid}
                            width='max'
                          >
                            {REGISTERBTN}
                          </Button>
                        </div>
                      </form>
                    </FormProvider>
                  </Fragment>
                );
              }
            })}
          </div>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <InDevelopmentModal setIsOpen={setIsOpen} />
          </Modal>
        </Wrapper>
      )}
    </>
  );
};

export default InsuranceClaim;
