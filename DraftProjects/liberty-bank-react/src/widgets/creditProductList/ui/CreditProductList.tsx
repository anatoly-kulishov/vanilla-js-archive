import { useFormContext } from 'react-hook-form';
import { BankProduct, IFiltersFormFields } from '@/entities';
import { InfoFrame, CardType, Text, ICreditProduct } from '@/shared';
import { CREDIT_PRODUCT_LIST_TEXT, noDataIcon } from '../constants';
import styles from './CreditProductList.module.scss';

export const CreditProductList = () => {
  const { getValues } = useFormContext<IFiltersFormFields<ICreditProduct[]>>();
  const actualProductsList = getValues('actualProductsList');

  return (
    <>
      <Text tag='h3' weight='medium' size='m'>
        {CREDIT_PRODUCT_LIST_TEXT.title}
      </Text>

      <div className={styles.container}>
        {actualProductsList?.length ? (
          <ul className={styles.credits_wrapper}>
            {actualProductsList.map(
              ({
                id,
                name,
                interestRate,
                details,
                currencyCodeList,
                minSum,
                maxSum,
                minPeriodMonths,
                maxPeriodMonths,
              }) => (
                <BankProduct
                  key={id}
                  id={id}
                  name={name}
                  interestRate={interestRate}
                  productDetails={details}
                  minDurationMonths={minPeriodMonths}
                  maxDurationMonths={maxPeriodMonths}
                  amountMin={minSum}
                  amountMax={maxSum}
                  currencyCodes={currencyCodeList}
                  serviceType='credit'
                />
              ),
            )}
          </ul>
        ) : (
          <div className={styles.frame_wrapper}>
            <InfoFrame
              title={CREDIT_PRODUCT_LIST_TEXT.noData}
              icon={noDataIcon}
              cardType={CardType.openCard}
            />
          </div>
        )}
      </div>
    </>
  );
};
