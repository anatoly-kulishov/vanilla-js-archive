import { Text } from '@/shared';
import { HC_CLIENT } from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { FormFrameProps } from '../../model/types';
import { FC } from 'react';
import { ClientInfoField } from '../../ui/components/clientInfoField/clientInfoField';
import { RegistrationAddressField } from '../../ui/components/registrationAddressField/registrationAddressField';

const ClientContactsFrame: FC<FormFrameProps> = ({ stepper, prevButton, nextButton }) => {
  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
          {HC_CLIENT.title}
        </Text>
        {stepper}
      </div>
      <div className={styles['form__body']}>
        <ClientInfoField />
        <RegistrationAddressField />
      </div>
      <div className={styles['form__footer']}>
        <div>{prevButton}</div>
        <div>{nextButton}</div>
      </div>
    </div>
  );
};

export default ClientContactsFrame;
