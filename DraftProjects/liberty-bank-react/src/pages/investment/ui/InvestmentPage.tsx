import { useNavigate } from 'react-router-dom';
import { Button, Icon, Image, PATH_PAGE, Text, Wrapper } from '@/shared';
import { BTN, BTN_LINK, CONDITIONS, CONDITIONS_TITLE } from '../constants';
import styles from './InvestmentPage.module.scss';

const InvestmentPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper size='l' className={styles['wrapper-padding']}>
      <Text className={styles['title']} tag='h1' weight='bold'>
        {CONDITIONS_TITLE}
      </Text>
      <div className={styles['body-block']}>
        <div className={styles['body-image-block']}>
          <Image image={'brokerImage'} width='572' height='423' />
        </div>
        <div className={styles['body-content-block']}>
          <div className={styles['condition-items']}>
            {CONDITIONS.map((item) => (
              <div className={styles['condition-item']} key={item.id}>
                <Icon icon={item.name} width='48' height='45' />
                <div className={styles['condition-title']}>
                  <Text tag='p' size='ml' weight='medium'>
                    {item.subtitle}
                  </Text>
                </div>
                <Text tag='p' size='s' weight='regular' className={styles['condition-description']}>
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
          <div className={styles['body-button']}>
            <div className={styles['body-block-button']}>
              <Button
                size='m'
                width='max'
                className={styles['account-open-button']}
                theme='secondary'
                onClick={() => {
                  navigate(PATH_PAGE.investmentLK.briefcase.start);
                }}
              >
                {BTN_LINK}
              </Button>
            </div>
            <div className={styles['body-block-button']}>
              <Button
                size='m'
                width='max'
                className={styles['account-open-button']}
                onClick={() => {
                  navigate(PATH_PAGE.investmentDocuments);
                }}
              >
                {BTN}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default InvestmentPage;
