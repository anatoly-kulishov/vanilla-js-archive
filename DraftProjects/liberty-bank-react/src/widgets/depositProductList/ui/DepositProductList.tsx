import { useFormContext } from 'react-hook-form';
import { BankProduct, IFiltersFormFields } from '@/entities';
import { CardType, IDepositProduct, InfoFrame } from '@/shared';
import { MESSAGE_ICON, TITLE_TEXT } from '../constants';
import styles from './DepositProductList.module.scss';

export const DepositProductList = () => {
  const { getValues } = useFormContext<IFiltersFormFields<IDepositProduct[]>>();
  const actualProductsList = getValues('actualProductsList');

  return (
    <div className={styles.container}>
      {actualProductsList?.length ? (
        <ul className={styles.deposits_wrapper}>
          {actualProductsList.map(
            ({
              id,
              name,
              maxInterestRate,
              productDetails,
              minDurationMonths,
              maxDurationMonths,
              amountMin,
              amountMax,
              currencyCodes,
            }) => (
              <BankProduct
                key={id}
                id={id}
                name={name}
                interestRate={maxInterestRate}
                productDetails={productDetails}
                minDurationMonths={minDurationMonths}
                maxDurationMonths={maxDurationMonths}
                amountMin={amountMin}
                amountMax={amountMax}
                currencyCodes={currencyCodes}
                serviceType='deposit'
              />
            ),
          )}
        </ul>
      ) : (
        <div className={styles.frame_wrapper}>
          <InfoFrame icon={MESSAGE_ICON} cardType={CardType.dontOpen} title={TITLE_TEXT} />
        </div>
      )}
    </div>
  );
};
