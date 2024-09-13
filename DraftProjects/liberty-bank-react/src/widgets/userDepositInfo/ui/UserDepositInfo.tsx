import { FC, useState } from 'react';
import classNames from 'classnames';
import {
  ChangeRenewalStatus,
  CloseDepositBillsModal,
  RenewalStatus,
  RevokeUserDeposit,
  THRESHOLD_DAYS,
  isWarningDate,
  MoneyTransferForm,
} from '@/entities';
import {
  ACCOUNT_STATUS_TYPE,
  Button,
  CURRENCY,
  CopyButton,
  DotsButton,
  IUserDepositInfoWithId,
  Icon,
  Modal,
  StatusLabel,
  TSvgIconNames,
  Text,
  formatDate,
  formatInterestRate,
  formatNumberWithSpaces,
  useChangeRenewalStatusMutation,
} from '@/shared';
import { USER_DEPOSIT_INFO_TEXT, depositScheme } from '../constants';
import styles from './UserDepositInfo.module.scss';

export const UserDepositInfo: FC<IUserDepositInfoWithId> = ({
  userDepositInfo: {
    name,
    openDate,
    closeDate,
    periodMonths,
    currentBalance,
    interestRate,
    currencyCode,
    autoRenewal,
    depAccountNumber,
    schemaName,
    initialAmount,
    isActive,
  },
  id = '',
}) => {
  const [isAutoRenewal, setIsAutoRenewal] = useState(autoRenewal);
  const [isOpenChangeRenewalStatusModal, setIsOpenChangeRenewalStatusModal] = useState(false);
  const [isOpenRenewalStatusModal, setIsOpenRenewalStatusModal] = useState(false);
  const [revokeModal, setRevokeModal] = useState(false);
  const [billsModal, setBillsModal] = useState(false);
  const [isMoneyTransferModalOpen, setIsMoneyTransferModalOpen] = useState(false);

  const hideRenewalStatusModal = () => setIsOpenRenewalStatusModal(false);
  const hideChangeRenewalStatusModal = () => setIsOpenChangeRenewalStatusModal(false);
  const hideBillsModal = () => setBillsModal(false);
  const hideRevokeModal = () => setRevokeModal(false);
  const hideMoneyTransferModal = () => setIsMoneyTransferModalOpen(false);
  const handleRecall = () => setRevokeModal(true);
  const handleShowBills = () => setBillsModal(true);
  const handleDotsProlongationUse = () => setIsOpenChangeRenewalStatusModal(true);

  const DOTS_MENU_USER_DEPOSIT_INFO_TEXT = [
    { text: 'Реквизиты', onClick: () => {} },
    { text: 'График начисления процентов', onClick: () => {} },
    { text: 'Информация о пополнении депозита', onClick: () => {} },
    {
      text: autoRenewal ? 'Отказ от пролонгации депозита' : 'Пролонгация депозита',
      onClick: handleDotsProlongationUse,
    },
  ];

  const [changeRenewalStatus] = useChangeRenewalStatusMutation();

  const handleOpenRenewalStatusModal = () => {
    changeRenewalStatus({ autoRenewal: !isAutoRenewal, depositId: id })
      .unwrap()
      .then(() => {
        setIsAutoRenewal((prevValue) => !prevValue);
        hideChangeRenewalStatusModal();
        setIsOpenRenewalStatusModal(true);
      })
      .catch((err) => {
        if (err.status === 409) {
          hideChangeRenewalStatusModal();
          setIsAutoRenewal(!autoRenewal);
        }
        throw err;
      });
  };

  const handleRefill = () => {
    setIsMoneyTransferModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__title}>
          <div className={styles.cardHeader}>
            <div className={styles.primeInfo}>
              <Icon icon={CURRENCY[currencyCode].icon as TSvgIconNames} widthAndHeight='64px' />
              <Text tag='h2' size='xl' weight='bold' className={styles.primeInfo__text}>
                {name}
              </Text>
              <div className={styles.labelContainer}>
                {isActive ? (
                  <>
                    <StatusLabel
                      size='m'
                      text={USER_DEPOSIT_INFO_TEXT.statusLabelText}
                      type={ACCOUNT_STATUS_TYPE['active']}
                    />
                    <StatusLabel
                      size='m'
                      text={USER_DEPOSIT_INFO_TEXT.labelCapitalization}
                      type={ACCOUNT_STATUS_TYPE['active']}
                    />
                  </>
                ) : (
                  <StatusLabel
                    size='m'
                    text={USER_DEPOSIT_INFO_TEXT.statusLabelTextClosed}
                    type={ACCOUNT_STATUS_TYPE['closed']}
                  />
                )}
              </div>
            </div>
            <DotsButton elements={DOTS_MENU_USER_DEPOSIT_INFO_TEXT} />
          </div>

          <div className={styles.depositAccount}>
            <Text tag='h3' className={styles.depositAccount__text} data-testid='depAccountNumber'>
              {USER_DEPOSIT_INFO_TEXT.accountNumberText} {depAccountNumber}
            </Text>
            <CopyButton value={depAccountNumber} />
          </div>
        </div>

        <div className={styles.container__description}>
          <div className={styles.depositInfo}>
            <div className={styles.detailInfo}>
              <Text tag='p' className={styles.detailInfo__title}>
                {USER_DEPOSIT_INFO_TEXT.depositScheme}
              </Text>
              <Text tag='p' size='m' weight='medium'>
                {depositScheme[schemaName]}
              </Text>
            </div>

            <div className={styles.detailInfo}>
              <Text tag='p' className={styles.detailInfo__title}>
                {USER_DEPOSIT_INFO_TEXT.durationOfDeposit}
              </Text>
              <Text tag='p' size='m' weight='medium' data-testid='periodMonths'>
                {periodMonths} {USER_DEPOSIT_INFO_TEXT.month}
              </Text>
            </div>
            <div className={styles.detailInfo}>
              <Text tag='p' className={styles.detailInfo__title}>
                {USER_DEPOSIT_INFO_TEXT.interestRate}
              </Text>
              <Text
                tag='p'
                size='m'
                weight='medium'
                className={
                  isActive ? styles.detailInfo__activeDeposit : styles.detailInfo__inactiveDeposit
                }
              >
                {formatInterestRate(interestRate)} %
              </Text>
            </div>
            <div className={styles.detailInfo}>
              <Text tag='p' className={styles.detailInfo__title}>
                {USER_DEPOSIT_INFO_TEXT.openDate}
              </Text>
              <Text tag='p' size='m' weight='medium'>
                {formatDate(openDate)}
              </Text>
            </div>
            <div className={styles.detailInfo}>
              <Text tag='p' className={styles.detailInfo__title}>
                {USER_DEPOSIT_INFO_TEXT.closeDate}
              </Text>
              <Text
                tag='p'
                size='m'
                weight='medium'
                className={classNames({
                  [styles.warning]: isWarningDate(closeDate, THRESHOLD_DAYS),
                })}
              >
                {formatDate(closeDate)}
              </Text>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.totalBalance}>
              <div className={styles.detailInfo}>
                <Text tag='p' className={styles.detailInfo__title}>
                  {USER_DEPOSIT_INFO_TEXT.depositAmount}
                </Text>
                <Text tag='p' size='l' weight='bold'>
                  {formatNumberWithSpaces(currentBalance, 2)} {CURRENCY[currencyCode].text}
                </Text>
              </div>
              <div className={styles.detailInfo}>
                <Text tag='p' className={styles.detailInfo__title}>
                  {USER_DEPOSIT_INFO_TEXT.totalAmount}
                </Text>
                <Text tag='p' size='l' weight='bold'>
                  {formatNumberWithSpaces(initialAmount, 2)} {CURRENCY[currencyCode].text}
                </Text>
              </div>
            </div>

            {isActive ? (
              <div className={styles.buttonBlock}>
                <Button theme='secondary' width='max' onClick={handleRecall}>
                  {USER_DEPOSIT_INFO_TEXT.recall}
                </Button>
                <Button theme='primary' width='max' onClick={handleRefill}>
                  {USER_DEPOSIT_INFO_TEXT.replenish}
                </Button>
              </div>
            ) : (
              <Button theme='primary' width='auto' onClick={handleShowBills}>
                {USER_DEPOSIT_INFO_TEXT.withdrawFunds}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isOpenChangeRenewalStatusModal} setIsOpen={setIsOpenChangeRenewalStatusModal}>
        <ChangeRenewalStatus
          autoRenewal={isAutoRenewal}
          handleOpenRenewalStatusModal={handleOpenRenewalStatusModal}
          handleCancel={hideChangeRenewalStatusModal}
        />
      </Modal>

      <Modal isOpen={isOpenRenewalStatusModal} setIsOpen={setIsOpenRenewalStatusModal}>
        <RenewalStatus autoRenewal={isAutoRenewal} handleCancel={hideRenewalStatusModal} />
      </Modal>

      <Modal isOpen={revokeModal} setIsOpen={setRevokeModal}>
        <RevokeUserDeposit hideRevokeModal={hideRevokeModal} depAccountNumber={depAccountNumber} />
      </Modal>

      <Modal isOpen={billsModal} setIsOpen={setBillsModal}>
        <CloseDepositBillsModal hideBillsModal={hideBillsModal} />
      </Modal>

      <Modal isOpen={isMoneyTransferModalOpen} setIsOpen={setIsMoneyTransferModalOpen}>
        <MoneyTransferForm
          hideModal={hideMoneyTransferModal}
          currency={currencyCode}
          balance={currentBalance}
          accountNumber={depAccountNumber}
        />
      </Modal>
    </>
  );
};
