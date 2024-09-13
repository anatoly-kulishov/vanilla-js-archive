import { FC, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { ServiceUnavailableWindow, DebtInfo } from '@/entities';
import {
  ACCOUNT_STATUS_TYPE,
  Button,
  CURRENCY,
  CopyButton,
  DotsButton,
  ICurrentCredit,
  Modal,
  PATH_PAGE,
  StatusLabel,
  Text,
  formatDate,
  formatInterestRate,
  formatNumberWithSpaces,
} from '@/shared';
import { ACTIVE_USER_CREDIT_TEXT, DOTS_MENU_TEXT } from '../constants';
import styles from './ActiveUserCreditProduct.module.scss';

export const ActiveUserCreditProduct: FC<ICurrentCredit> = ({
  name,
  periodMonths,
  interestRate,
  currencyCode,
  creditAmount,
  generalDebt,
  currPeriodTransaction,
  paymentDate,
  outstandingPrincipal,
  creditAccountNumber,
}) => {
  const [isModalUnavailableOpen, setIsModalUnavailableOpen] = useState(false);
  const [isModalDebtInfoOpen, setIsModalDebtInfoOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const navigateToPaymentSchedule = () => {
    navigate(
      generatePath(PATH_PAGE.myCreditPaymentSchedule, {
        id,
      }),
    );
  };

  const openModalUnavailable = () => setIsModalUnavailableOpen(true);
  const hideModalUnavailable = () => setIsModalUnavailableOpen(false);

  const openModalDebtInfo = () => setIsModalDebtInfoOpen(true);
  const hideModalDebtInfo = () => setIsModalDebtInfoOpen(false);

  const filteredDotsMenu =
    outstandingPrincipal === 0
      ? DOTS_MENU_TEXT.filter((dot) => dot.text !== 'Информация о задолженности')
      : DOTS_MENU_TEXT;

  const DOTS_MENU_TEXT_CLICK_FIX = filteredDotsMenu.map((dot) => {
    switch (dot.text) {
      case 'График платежей':
        return { ...dot, onClick: navigateToPaymentSchedule };
      case 'Реквизиты':
        return { ...dot, onClick: openModalUnavailable };
      case 'Информация о задолженности':
        return { ...dot, onClick: openModalDebtInfo };
      default:
        return { ...dot, onClick: openModalUnavailable };
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.infoBlock}>
        <div className={styles.accountInfo}>
          <div className={styles.accountDescriptionContainer}>
            <div className={styles.accountDetails}>
              <Text tag='span' size='ml' weight='medium' data-testid='title'>
                {name}
              </Text>
              <StatusLabel
                text={ACTIVE_USER_CREDIT_TEXT.statusLabelText}
                type={ACCOUNT_STATUS_TYPE['active']}
              />
            </div>
            <div className={styles.accountNumber}>
              <Text
                tag='p'
                size='s'
                weight='regular'
                className={styles.accountNumber__text}
                data-testid='creditAccountNumber'
              >
                {ACTIVE_USER_CREDIT_TEXT.creditAccountNumber}
                {creditAccountNumber}
              </Text>
              <CopyButton value={creditAccountNumber} />
            </div>
          </div>
          <DotsButton
            elements={DOTS_MENU_TEXT_CLICK_FIX}
            width={outstandingPrincipal === 0 ? 'xs' : 'auto'}
          />
        </div>
      </div>

      <div className={styles.paymentBlock}>
        <div className={styles.contractBlock}>
          <div className={styles.contractBlockContainer}>
            <Text
              tag='h5'
              size='xs'
              weight='regular'
              className={styles.contractBlockContainer__title}
            >
              {ACTIVE_USER_CREDIT_TEXT.currPeriodTransaction}
            </Text>
            <Text tag='h2' size='ml' weight='medium' data-testid='nextPayment'>
              {formatNumberWithSpaces(currPeriodTransaction, 2)} {CURRENCY[currencyCode].text}
            </Text>
          </div>
          <div className={styles.contractBlockContainer}>
            <Text
              tag='h5'
              size='xs'
              weight='regular'
              className={styles.contractBlockContainer__title}
            >
              {ACTIVE_USER_CREDIT_TEXT.paymentDate}
            </Text>
            <Text tag='h2' size='ml' weight='medium' data-testid='paymentDate'>
              {formatDate(paymentDate)}
            </Text>
          </div>
          <div className={styles.contractBlockContainer}>
            <Text
              tag='h5'
              size='xs'
              weight='regular'
              className={styles.contractBlockContainer__title}
            >
              {ACTIVE_USER_CREDIT_TEXT.creditAmount}
            </Text>
            <Text tag='h2' size='ml' weight='medium' data-testid='creditLimit'>
              {formatNumberWithSpaces(creditAmount, 2)} {CURRENCY[currencyCode].text}
            </Text>
          </div>
          <div className={styles.contractBlockContainer}>
            <Text
              tag='h5'
              size='xs'
              weight='regular'
              className={styles.contractBlockContainer__title}
            >
              {ACTIVE_USER_CREDIT_TEXT.creditTerm}
            </Text>
            <Text tag='h2' size='ml' weight='medium' data-testid='periodMonths'>
              {periodMonths} {ACTIVE_USER_CREDIT_TEXT.month}
            </Text>
          </div>
          <div className={styles.contractBlockContainer}>
            <Text
              tag='h5'
              size='xs'
              weight='regular'
              className={styles.contractBlockContainer__title}
            >
              {ACTIVE_USER_CREDIT_TEXT.interestRate}
            </Text>
            <Text tag='h2' size='ml' weight='medium' data-testid='interestRate'>
              {formatInterestRate(interestRate)} %
            </Text>
          </div>
        </div>
        <div className={styles.repayContainer}>
          <div className={styles.numberContainer}>
            <div className={styles.contractBlockContainer__repay}>
              <Text
                tag='h5'
                size='xs'
                weight='regular'
                className={styles.contractBlockContainer__title}
              >
                {ACTIVE_USER_CREDIT_TEXT.generalDebt}
              </Text>
              <Text tag='span' size='l' weight='bold' data-testid='repay'>
                {formatNumberWithSpaces(generalDebt, 2)} {CURRENCY[currencyCode].text}
              </Text>
            </div>
            {outstandingPrincipal > 0 && (
              <div className={styles.contractBlockContainer__alert}>
                <Text tag='h5' weight='regular' className={styles.contractBlockContainer__alert}>
                  {ACTIVE_USER_CREDIT_TEXT.debt}
                </Text>
                <Text tag='span' size='l' weight='bold' data-testid='debt'>
                  {formatNumberWithSpaces(outstandingPrincipal, 2)} {CURRENCY[currencyCode].text}
                </Text>
              </div>
            )}
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              width='max'
              theme='secondary'
              className={styles.buttonPay}
              onClick={openModalUnavailable}
            >
              {ACTIVE_USER_CREDIT_TEXT.repay}
            </Button>
            <Button width='max' className={styles.buttonPay} onClick={openModalUnavailable}>
              {ACTIVE_USER_CREDIT_TEXT.pay}
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalUnavailableOpen} setIsOpen={setIsModalUnavailableOpen}>
        <ServiceUnavailableWindow hideModal={hideModalUnavailable} />
      </Modal>
      <Modal isOpen={isModalDebtInfoOpen} setIsOpen={setIsModalDebtInfoOpen}>
        <DebtInfo
          hideDebtInfoModal={hideModalDebtInfo}
          openUnavailableModal={openModalUnavailable}
          currencyCode={currencyCode}
        />
      </Modal>
    </div>
  );
};
