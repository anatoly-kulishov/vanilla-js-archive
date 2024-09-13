import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BackButton,
  Button,
  Checkbox,
  PATH_PAGE,
  Text,
  Wrapper,
  useLazyGetInvestmentPersonalDocumentQuery,
  useLazyGetInvestmentCommonDocumentQuery,
  usePostBrokerAccountOpenMutation,
} from '@/shared';
import {
  BACKBTN_TEXT,
  BTN_SIGNDOCS_TEXT,
  CHECKBOX_TEXT,
  DOCUMENTS_LIST_ITEMS,
  DOCUMENTS_LIST_TITLE,
} from '../constants';
import styles from './investmentDocuments.module.scss';
import { InvestmentBrokerBillDataForm } from '@/widgets/investmentBrokerBillDataForm';
import { BrokerBillForm } from '@/widgets/investmentBrokerBillDataForm/model/types';

const InvestmentDocuments = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [accOpen] = usePostBrokerAccountOpenMutation();
  const [getInvestPersonalDocument] = useLazyGetInvestmentPersonalDocumentQuery();
  const [getInvestCommonDocument] = useLazyGetInvestmentCommonDocumentQuery();

  const clickHandler = (data: BrokerBillForm) => {
    accOpen({ accountName: data.accountName, currencyCode: data.currencyType })
      .unwrap()
      .then((responce) => {
        navigate(PATH_PAGE.investmentSms, { state: { documentId: responce.documentId } });
      });
  };

  const openPdf = (urlPdf: string, type: string) => {
    switch (type) {
      case '': {
        navigate(PATH_PAGE.investmentDocumentsQuestionnaire);
        break;
      }
      case 'common': {
        getInvestCommonDocument(urlPdf).then((res) => {
          const blob = new Blob([res.data!], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_self');
        });
        break;
      }
      case 'personal': {
        getInvestPersonalDocument(urlPdf).then((res) => {
          const blob = new Blob([res.data!], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_self');
        });
        break;
      }
    }
  };

  return (
    <Wrapper size='l'>
      <BackButton
        click={() => navigate(PATH_PAGE.investment)}
        text={BACKBTN_TEXT}
        theme={'blue'}
        className={styles.backbutton}
        width='24'
        height='24'
        name='arrow-left-blue'
      />

      <div className={styles.documents}>
        <Text tag={'h2'} weight={'bold'} size={'xl'}>
          {DOCUMENTS_LIST_TITLE}
        </Text>
        <div className={styles.documents__list}>
          {DOCUMENTS_LIST_ITEMS.map((item) => (
            <Button key={item.id} onClick={() => openPdf(item.url, item.type)} theme='tertiary'>
              <Text
                tag={'p'}
                weight={'regular'}
                size={'s'}
                className={styles['documents__list-text']}
              >
                {item.title}
              </Text>
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.checkbox}>
        <Checkbox name={'checkbox'} checked={isActive} onChange={() => setIsActive(!isActive)} />
        <label htmlFor='checkbox'>
          <Text tag={'p'} weight={'regular'} size={'xs'} className={styles['checkbox-text']}>
            {CHECKBOX_TEXT}
          </Text>
        </label>
      </div>

      <InvestmentBrokerBillDataForm onSubmit={clickHandler} />

      <Button
        type={'submit'}
        theme={'primary'}
        disabled={!isActive}
        className={styles['btn-signdocs']}
        form='investment-documents-form'
      >
        {BTN_SIGNDOCS_TEXT}
      </Button>
    </Wrapper>
  );
};

export default InvestmentDocuments;
