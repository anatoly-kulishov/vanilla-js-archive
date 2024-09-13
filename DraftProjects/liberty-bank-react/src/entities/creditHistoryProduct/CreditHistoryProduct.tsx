import { FC, useState } from 'react';
import { ServiceUnavailableWindow } from '@/entities';
import {
  Text,
  ICreditHistoryProduct,
  Icon,
  CURRENCY,
  formatNumberWithSpaces,
  Button,
  CopyButton,
  getPeriodText,
  Modal,
  formatInterestRate,
} from '@/shared';
import { formatDateWithLocale } from './utils';
import { TEXT } from './constants';
import styles from './CreditHistoryProduct.module.scss';

export const CreditHistoryProduct: FC<ICreditHistoryProduct> = (creditProduct) => {
  const [paymentHistoryModal, setPaymentHistoryModal] = useState(false);

  const {
    name,
    creditMainAccountNumber,
    creditAmount,
    currencyCode,
    openingDate,
    closingDate,
    interestRate,
    periodMonths,
  } = creditProduct;

  return (
    <>
      <li className={styles.container}>
        <div className={styles.title}>
          <Icon icon={CURRENCY[creditProduct.currencyCode].icon} widthAndHeight='64px' />
          <div className={styles.title__info}>
            <Text
              tag='h3'
              weight='medium'
              className={styles.title__info_name}
              data-testid='creditName'
            >
              {name}
            </Text>
            <span className={styles.title__info_accountNumber}>
              <Text tag='h4' weight='medium' data-testid='creditAccountNumber'>
                {TEXT.accountNumber}: {creditMainAccountNumber}
              </Text>
              <CopyButton value={creditMainAccountNumber} />
            </span>
          </div>
          <div className={styles.title__amount}>
            <Text tag='span'>{TEXT.creditAmount}</Text>
            <Text
              tag='span'
              size='xl'
              weight='bold'
              className={styles.title__amount_value}
              data-testid='creditAmount'
            >
              {formatNumberWithSpaces(creditAmount, 2)} {CURRENCY[currencyCode].text}
            </Text>
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.info}>
            <div className={styles.info__element}>
              <Text tag='span' weight='regular' className={styles.info__element_title}>
                {TEXT.approvalDate}
              </Text>
              <Text
                tag='span'
                size='l'
                weight='medium'
                className={styles.info__element_value}
                data-testid='approvalDate'
              >
                {formatDateWithLocale(openingDate)}
              </Text>
            </div>
            <div className={styles.info__element}>
              <Text tag='span' weight='regular' className={styles.info__element_title}>
                {TEXT.repaymentDate}
              </Text>
              <Text
                tag='span'
                size='l'
                weight='medium'
                className={styles.info__element_value}
                data-testid='closingDate'
              >
                {formatDateWithLocale(closingDate)}
              </Text>
            </div>
            <div className={styles.info__element}>
              <Text tag='span' weight='regular' className={styles.info__element_title}>
                {TEXT.interestRate}
              </Text>
              <Text
                tag='span'
                size='l'
                weight='medium'
                className={styles.info__element_value}
                data-testid='interestRate'
              >
                {formatInterestRate(interestRate)} %
              </Text>
            </div>
            <div className={styles.info__element}>
              <Text tag='span' weight='regular' className={styles.info__element_title}>
                {TEXT.creditTerm}
              </Text>
              <Text
                tag='span'
                size='l'
                weight='medium'
                className={styles.info__element_value}
                data-testid='periodMonths'
              >
                {getPeriodText(periodMonths)}
              </Text>
            </div>
          </div>
          <div className={styles.button_wrapper}>
            <Button onClick={() => setPaymentHistoryModal(true)}>{TEXT.paymentHistory}</Button>
          </div>
        </div>
      </li>
      <Modal isOpen={paymentHistoryModal} setIsOpen={setPaymentHistoryModal}>
        <ServiceUnavailableWindow hideModal={() => setPaymentHistoryModal(false)} />
      </Modal>
    </>
  );
};
