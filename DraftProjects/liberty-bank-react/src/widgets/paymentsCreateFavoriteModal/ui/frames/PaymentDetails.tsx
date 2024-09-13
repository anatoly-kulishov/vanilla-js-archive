import styles from '../PaymentsCreateFavoriteModal.module.scss';
import { FC } from 'react';
import { IFavoriteProduct } from '../PaymentsCreateFavoriteModal';
import { Icon, Input, Text } from '@/shared';
import { PaymentsProductFormNumber } from '@/features';

interface PaymentDetailsProps {
  favoriteProduct: IFavoriteProduct;
  docNumber: string;
  setDocNumber: (value: string) => void;
}

export const PaymentDetails: FC<PaymentDetailsProps> = ({
  favoriteProduct,
  docNumber,
  setDocNumber,
}) => {
  return (
    <div className={styles['services-container']}>
      <Text tag='h3' weight='medium' className={styles['services-title']}>
        {favoriteProduct.productOperator.name}
      </Text>
      <div className={styles['form-wrapper']}>
        <div className={styles['form-wrapper__container']}>
          <PaymentsProductFormNumber
            type={favoriteProduct.productName.titleEn}
            button={null}
            docNumber={docNumber}
            setDocNumber={setDocNumber}
          />
          <div className={styles['form-wrapper__content']}>
            <Text tag='h5' size='s' weight='regular'>
              Выберите карту списания
            </Text>
            <Input.Select
              value='Карта МИР *** 0804'
              white
              options={['Карта МИР *** 0037', 'Карта МИР *** 0804']}
              size='m'
            />
          </div>
          <div className={styles['form-wrapper__content']}>
            <Text tag='h5' size='s' weight='regular'>
              Введите сумму
            </Text>
            <Input.Number contentRight={<Icon icon={'ruble-small'} />} white size='s' />
          </div>
        </div>
      </div>
    </div>
  );
};
