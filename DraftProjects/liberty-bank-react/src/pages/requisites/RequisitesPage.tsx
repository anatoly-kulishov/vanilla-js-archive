import { Requisites } from '@/entities';
import { BackButton, Button, Text, Wrapper, useLazyGetRequisitesQuery } from '@/shared';
import { RequisitesSend } from '@/widgets/requisitesSend';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { REQUISITES, TEXT } from './constants';

import styles from './RequisitesPage.module.scss';

const RequisitesPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getRequisites, { data: requisites }] = useLazyGetRequisitesQuery();
  const [sendRequisites, setSendRequisites] = useState(false);

  const createRequisiteValues = (): string[] => {
    if (!requisites) return [];

    const { accountInfo, bankInfo } = requisites;
    const { accountNumber, customerName, customerSurname, customerPatronymic } = accountInfo;
    const {
      bankNameFull,
      correspondentAccount,
      TIN,
      KPP,
      OKPO,
      OGRN,
      swiftCode,
      bankPostalAddress,
    } = bankInfo;

    let accountOwner: string;
    customerPatronymic
      ? (accountOwner = `${customerSurname} ${customerName} ${customerPatronymic}`)
      : (accountOwner = `${customerSurname} ${customerName}`);

    return [
      accountOwner,
      accountNumber,
      bankNameFull,
      correspondentAccount,
      TIN,
      KPP,
      OKPO,
      OGRN,
      swiftCode,
      bankPostalAddress,
    ];
  };

  const requisitesValues = useMemo(() => createRequisiteValues(), [requisites]);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getRequisites(id ?? '');
  }, [id]);

  const handleSend = () => {
    setSendRequisites(!sendRequisites);
  };

  const handleDownload = () => {
    // TODO Добавить обработчик после как документ будет приходить от API
  };

  // TODO Добавить обработчик ошибок - error boundary или компонент

  return (
    <Wrapper size='l'>
      <div className={styles['requisites__header-container']}>
        <BackButton
          text={TEXT.back}
          theme='blue'
          height='24'
          width='24'
          click={sendRequisites ? () => setSendRequisites(!sendRequisites) : goBack}
        />
        {sendRequisites && (
          <Text tag='h2' size='m' weight='medium'>
            {TEXT.header}
          </Text>
        )}
      </div>
      {sendRequisites ? (
        <RequisitesSend />
      ) : (
        <div className={styles['requisites__body-container']}>
          <Text tag='h2' size='m' weight='medium' className={styles['requisites__title']}>
            {TEXT.header}
          </Text>
          {requisitesValues && (
            <Requisites requisitesName={REQUISITES} requisitesResult={requisitesValues} />
          )}
          <div className={styles['requisites__footer-container']}>
            <span onClick={goBack} className={styles['requisites__back-btn']}>
              {TEXT.back}
            </span>
            <div className={styles['requisites__btn-container']}>
              <Button
                theme='secondary'
                size='m'
                onClick={handleSend}
                className={styles['requisites__action-btn']}
              >
                {TEXT.send}
              </Button>
              <Button
                theme='primary'
                size='m'
                onClick={handleDownload}
                className={styles['requisites__action-btn']}
              >
                {TEXT.download}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default RequisitesPage;
