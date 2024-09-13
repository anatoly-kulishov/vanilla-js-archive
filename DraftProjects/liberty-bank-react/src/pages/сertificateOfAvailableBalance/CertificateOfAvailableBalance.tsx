import { Requisites } from '@/entities';
import { BackButton, Button, Text, Wrapper } from '@/shared';
import { useNavigate } from 'react-router-dom';
import style from './CertificateOfAvailableBalance.module.scss';
import { BALANCE_NAME, BALANCE_RESULT, TEXT_BALANCE } from './constants';

const CertificateOfAvailableBalance = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper size='l'>
      <div className={style.backButtton}>
        <BackButton
          text={TEXT_BALANCE.back}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
      </div>
      <div className={style.availableBalanceContainer}>
        <div className={style.availableBalanceTitle}>
          <Text tag='h2' size='m' weight='medium'>
            {'AO «Liberty Bank»'}
          </Text>
          <Text tag='h2' size='m' weight='medium'>
            {'Справка об остатке денежных средств на счете'}
          </Text>
        </div>
        <Requisites requisitesName={BALANCE_NAME} requisitesResult={BALANCE_RESULT} />
        <div className={style.availableBalanceControl}>
          <button onClick={goBack} className={style.availableBalanceControlBackBtn}>
            {TEXT_BALANCE.back}
          </button>
          <Button className={style.availableBalanceControlSend}>{TEXT_BALANCE.download}</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CertificateOfAvailableBalance;
