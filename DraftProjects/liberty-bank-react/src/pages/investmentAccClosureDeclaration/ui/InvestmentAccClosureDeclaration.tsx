import { Requisites } from '@/entities';
import {
  Button,
  Checkbox,
  IResponseInvestClosingStatement,
  Link,
  PATH_PAGE,
  Text,
  Wrapper,
  useLazyGetBrokerAccountIdQuery,
  useLazyGetInvestClosingSmsQuery,
  useLazyGetInvestClosingStatementQuery,
  useLazyGetInvestmentPersonalDocumentQuery,
} from '@/shared';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHECKBOX_TEXT, PDF_NAME, REQUISITES, TEXT } from '../constants';
import { creationDataArray } from '../lib/index';
import styles from './InvestmentAccClosureDeclaration.module.scss';

const InvestmentAccClosureDeclaration = () => {
  const [userData, setUserData] = useState<string[]>([]);
  const [getBrokerId] = useLazyGetBrokerAccountIdQuery();
  const [getInvestClosingStatement, { data, isSuccess }] = useLazyGetInvestClosingStatementQuery();
  const [getInvestClosingSms] = useLazyGetInvestClosingSmsQuery();
  const [getInvestPersonalDocument] = useLazyGetInvestmentPersonalDocumentQuery();
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getBrokerId().then((data) => {
      getInvestClosingStatement({ brokerId: data?.data?.brokerAccountId as string }).then(
        (data) => {
          if ('error' in data) {
            navigate(PATH_PAGE.error, {
              state: { error: data.error, path: PATH_PAGE.investmentLK.briefcase.start },
            });
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setUserData(creationDataArray(data as IResponseInvestClosingStatement));
    }
  }, [isSuccess, data]);

  const clickHandle = () => {
    getInvestClosingSms().then(() => {
      navigate(PATH_PAGE.investmentSms, { state: { close: true } });
    });
  };

  const openPdf = () => {
    getInvestPersonalDocument(PDF_NAME).then((res) => {
      const blob = new Blob([res.data!], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_self');
    });
  };

  return (
    <Wrapper size='l'>
      <div className={styles['body-container']}>
        <div className={styles['title-container']}>
          {TEXT.title.map((title) => (
            <Fragment key={title}>
              <Text tag='h2' size='m' weight='medium'>
                {title}
              </Text>
            </Fragment>
          ))}
        </div>
        <Requisites requisitesName={REQUISITES} requisitesResult={userData} />
        <div className={styles['checkbox']}>
          <Checkbox name={'checkbox'} checked={isActive} onChange={() => setIsActive(!isActive)} />

          <Text tag={'p'} weight={'regular'} size={'xs'} className={styles['checkbox-text']}>
            {CHECKBOX_TEXT[0]}
            <Link to={PATH_PAGE.investmentDocuments}>
              <Text
                tag={'p'}
                weight={'regular'}
                size={'xs'}
                className={styles['checkbox-text-click']}
              >
                {CHECKBOX_TEXT[1]}
              </Text>
            </Link>
            {CHECKBOX_TEXT[2]}
          </Text>
        </div>
        <div className={styles['footer-container']}>
          <Link to={PATH_PAGE.investmentLK.briefcase.start}>
            <Text tag={'span'} size={'s'} weight='medium'>
              {TEXT.cancellation}
            </Text>
          </Link>
          <div className={styles['btn-container']}>
            <Button
              theme='secondary'
              size='m'
              className={styles['btn-button']}
              onClick={() => openPdf()}
            >
              {TEXT.download}
            </Button>

            <Button
              theme='primary'
              size='m'
              className={styles['btn-button']}
              disabled={!isActive}
              onClick={clickHandle}
            >
              {TEXT.sign}
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default InvestmentAccClosureDeclaration;
