import { FC, useState } from 'react';
import {
  Text,
  StatusLabel,
  CURRENCY,
  Modal,
  REQUEST_STATUS_TYPE,
  InfoFrame,
  ICreditRequest,
  ICreditCardRequest,
  useWithdrawCreditRequestMutation,
  Button,
  formatNumberWithSpaces,
  Icon,
  REQUEST_STATUS_TEXT,
  CardType,
  getPeriodText,
  Tooltip,
  formatInterestRate,
  useCancelOrderCardMutation,
} from '@/shared';
import { getRequestFields, getFormatCreationDate, isCreditCardRequest } from './utils';
import {
  WITHDRAW_TEXT,
  REQUEST_TEXT,
  MODAL_TEXT,
  TOOLTIP_TEXT,
  STATUSES_TO_CHECK,
} from './constants';
import styles from './BankProductRequest.module.scss';

interface IBankProductRequest {
  request: ICreditRequest | ICreditCardRequest;
}

export const BankProductRequest: FC<IBankProductRequest> = ({ request }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawCreditRequest] = useWithdrawCreditRequestMutation();
  const [cancelOrderCard] = useCancelOrderCardMutation();

  const creditCardRequest = isCreditCardRequest(request);

  const { id, name, amount, interestRate, status } = request;
  const { periodMonths, creationDate, currency } = getRequestFields(request);

  const hideModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const changeCreditRequestStatus = () => {
    withdrawCreditRequest(id);
  };

  const deleteRequestHandler = () => {
    if (!creditCardRequest) {
      changeCreditRequestStatus();
    }

    cancelOrderCard(id);
    hideModal();
  };

  return (
    <li className={styles.wrapper} data-testid='test-data-bankProductRequestItem'>
      <div className={styles.headerContainer}>
        <Text tag='h2' className={styles.name} data-testid='test-data-name'>
          {name}
        </Text>
        <div className={styles.labelWrapper}>
          <StatusLabel
            type={REQUEST_STATUS_TYPE[status]}
            text={REQUEST_STATUS_TEXT[status]}
            size='s'
            width='fixed'
            data-testid='test-data-status'
          />
          {STATUSES_TO_CHECK.includes(status) && (
            <Tooltip normalTextWrapping>
              <div className={styles.tooltip}>
                {TOOLTIP_TEXT[creditCardRequest ? 'creditCards' : 'credits'][status]?.map(
                  (text) => (
                    <Text key={text} tag='p' weight='light'>
                      {text}
                    </Text>
                  ),
                )}
              </div>
            </Tooltip>
          )}
        </div>
        <Text
          tag='h2'
          size='xl'
          weight='bold'
          className={styles.rate}
          data-testid='test-data-interestRate'
        >
          {formatInterestRate(interestRate)} %
        </Text>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.mainInfo}>
          <div className={styles.amountContainer}>
            <Icon icon={CURRENCY[currency].icon} widthAndHeight='64px' />
            <Text tag='h1' className={styles.amount}>
              {creditCardRequest && REQUEST_TEXT.beforeAmount} {formatNumberWithSpaces(amount)}
            </Text>
          </div>
          <div className={styles.periodValidity}>
            <Text tag='h5' className={styles.mainTitles}>
              {REQUEST_TEXT.periodTitle}
            </Text>
            <Text tag='h2' weight='medium' data-testid='test-data-period'>
              {getPeriodText(periodMonths)}
            </Text>
          </div>
          <div>
            <Text tag='h5' className={styles.mainTitles}>
              {REQUEST_TEXT.dateTitle}
            </Text>
            <Text tag='h2' weight='medium' data-testid='test-data-date'>
              {getFormatCreationDate(creationDate)}
            </Text>
          </div>
        </div>
        {status === 'PENDING' && (
          <Button theme='primary' size='m' className={styles.button} onClick={openModal}>
            {WITHDRAW_TEXT}
          </Button>
        )}
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <InfoFrame
          icon={{ width: '244', height: '200', image: 'close-bill' }}
          primaryBtnText={MODAL_TEXT.cancel}
          secondaryBtnText={MODAL_TEXT.yes}
          title={MODAL_TEXT.question}
          cardType={CardType.cancelRequest}
          onPrimaryButtonClick={hideModal}
          onSecondaryButtonClick={deleteRequestHandler}
        />
      </Modal>
    </li>
  );
};
