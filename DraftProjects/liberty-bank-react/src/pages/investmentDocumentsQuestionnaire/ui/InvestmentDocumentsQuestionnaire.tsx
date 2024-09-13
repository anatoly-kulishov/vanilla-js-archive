import {
  Button,
  IResponseInvestUserInfo,
  Link,
  PATH_PAGE,
  RadioButton,
  Text,
  Wrapper,
  useLazyGetInvestUserInfoQuery,
  usePostQuestionnaireQuestionsMutation,
} from '@/shared';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FOOTER_BTN_TEXT,
  QUESTIONNAIRE_LIST_ITEMS_INFO,
  QUESTIONNAIRE_LIST_ITEMS_QUESTION,
  QUESTIONNAIRE_TITLE,
} from '../constants';
import styles from './InvestmentDocumentsQuestionnaire.module.scss';

const InvestmentDocumentsQuestionnaire: FC = () => {
  const [userData, setUserData] = useState<IResponseInvestUserInfo | null>(null);
  const [getInvestUserInfo, { data, isSuccess }] = useLazyGetInvestUserInfoQuery();
  const [postQuestionnaireQuestions] = usePostQuestionnaireQuestionsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    getInvestUserInfo().then((data) => {
      if ('error' in data) {
        navigate(PATH_PAGE.error, {
          state: { error: data.error, path: PATH_PAGE.investmentDocuments },
        });
      }
    });
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      setUserData({
        ...(data as IResponseInvestUserInfo),
        residence: false,
        representative: false,
        abroadTax: false,
        beneficiary: false,
        beneficialOwner: false,
      });
    }
  }, [isSuccess, data]);

  const handleToggle = (tag: keyof IResponseInvestUserInfo) => {
    setUserData((prev) => {
      if (prev === null) {
        return null;
      }
      return {
        ...prev,
        [tag]: !prev[tag] as IResponseInvestUserInfo[keyof IResponseInvestUserInfo],
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userData) {
      postQuestionnaireQuestions({ data: userData }).then((data) => {
        if ('error' in data) {
          navigate(PATH_PAGE.error, { state: { error: data.error } });
        } else {
          navigate(PATH_PAGE.investmentDocuments);
        }
      });
    }
  };

  return (
    <Wrapper size='l'>
      <Text tag='h1' size='xl' weight='bold' className={styles.questionnaire__title}>
        {QUESTIONNAIRE_TITLE}
      </Text>
      <div className={styles.questionnaire__list}>
        {QUESTIONNAIRE_LIST_ITEMS_INFO.map((item) => (
          <div key={item.id} className={styles['questionnaire__list-items']}>
            <Text
              tag={'p'}
              weight={'medium'}
              size={'s'}
              className={styles['questionnaire__list-items-title']}
            >
              {item.title}
            </Text>

            <div className={styles['questionnaire__list-items-values']}>
              {item.tag.map((tag, index) => (
                <Text
                  key={index}
                  tag={'p'}
                  weight={'medium'}
                  size={'s'}
                  className={styles['questionnaire__list-items-values-text']}
                >
                  {tag === 'mobilePhone'
                    ? `+${userData?.[tag as keyof IResponseInvestUserInfo]}`
                    : userData?.[tag as keyof IResponseInvestUserInfo]}
                </Text>
              ))}
            </div>
          </div>
        ))}

        <form className={styles['questionnaire__list-forms']} onSubmit={handleSubmit}>
          {QUESTIONNAIRE_LIST_ITEMS_QUESTION.map((item) => (
            <div key={item.id} className={styles['questionnaire__list-forms-questions']}>
              <Text tag={'p'} weight={'medium'} size={'s'}>
                {item.title}
              </Text>
              <div className={styles['questionnaire__list-forms-items']}>
                <div className={styles['questionnaire__list-forms-items-label']}>
                  <RadioButton
                    name={item.tag}
                    value='Yes'
                    subLabel='Да'
                    checked={!!userData?.[item.tag as keyof IResponseInvestUserInfo]}
                    onChange={() => handleToggle(item.tag as keyof IResponseInvestUserInfo)}
                  />
                </div>
                <div className={styles['questionnaire__list-forms-label']}>
                  <RadioButton
                    name={item.tag}
                    value='No'
                    subLabel='Нет'
                    checked={!userData?.[item.tag as keyof IResponseInvestUserInfo]}
                    onChange={() => handleToggle(item.tag as keyof IResponseInvestUserInfo)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className={styles['questionnaire__list-form-footer']}>
            <Link to={PATH_PAGE.investmentDocuments} nowrap>
              <Text tag={'span'} size={'s'} weight='semibold'>
                {FOOTER_BTN_TEXT.back}
              </Text>
            </Link>
            <Button
              theme='primary'
              className={styles['questionnaire__list-form-footer-btn']}
              type='submit'
              width='max'
            >
              {FOOTER_BTN_TEXT.accept}
            </Button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default InvestmentDocumentsQuestionnaire;
