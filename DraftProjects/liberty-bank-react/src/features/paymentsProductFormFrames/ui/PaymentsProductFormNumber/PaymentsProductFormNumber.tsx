import { Input, Text } from '@/shared';
import styles from './PaymentsProductFormNumber.module.scss';
import { FC, ReactNode } from 'react';
import { MASK_MOCK, ProductType } from './const';

interface PaymentsProductFormNumberProps {
  button: ReactNode;
  docNumber: string;
  setDocNumber: (value: string) => void;
  type?: string;
}

export const PaymentsProductFormNumber: FC<PaymentsProductFormNumberProps> = ({
  type = 'internet',
  button,
  docNumber,
  setDocNumber,
}) => {
  const inputTel = new RegExp('^(' + 'mobile|lottery|charity|tourism' + ')$', 'i').test(type);

  const getMask = (type: string) => {
    if (inputTel) return { mask: '+7 (***) *** ** **', placeholder: '+7 (***) *** ** **' };
    if (type === MASK_MOCK.taxes) {
      return { mask: '************', placeholder: 'XXXXXXXXXXXX' };
    }
    if (type === MASK_MOCK.fines) {
      return { mask: '********************', placeholder: 'XXXXXXXXXXXXXXXXXXXX' };
    }
    return { mask: '************', placeholder: 'XXXXXXXXXX' };
  };

  const { mask, placeholder } = getMask(type);

  return (
    <div className={styles['form-number']}>
      <div className={styles['input-container']}>
        <Text tag='h5' size='s' weight='regular'>
          {ProductType[type]}
        </Text>
        {inputTel ? (
          <Input.Tel
            white
            size='m'
            required
            className={styles['form__input']}
            mask={mask}
            placeholder={placeholder}
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
          />
        ) : (
          <Input.Text
            white
            size='m'
            className={styles['form__input']}
            chars={/[0-9]/}
            mask={mask}
            placeholder={placeholder}
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
          />
        )}
      </div>
      {button}
    </div>
  );
};
