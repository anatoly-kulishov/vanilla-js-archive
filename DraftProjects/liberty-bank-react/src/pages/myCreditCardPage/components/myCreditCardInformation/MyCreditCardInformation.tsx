import { FC, useState } from 'react';
import { Navigate, generatePath, useNavigate, useParams } from 'react-router-dom';
import { MyCardInfo, CloseCreditCard } from '@/widgets';
import { ServiceUnavailableWindow } from '@/entities';
import {
  Button,
  CardType,
  Icon,
  InfoFrame,
  Modal,
  PATH_PAGE,
  Spinner,
  Text,
  useBlockCardMutation,
  useGetUserCreditCardQuery,
  useUnBlockCardMutation,
} from '@/shared';
import {
  ICON_MODAL_PARAMS,
  INFO_MESSAGES,
  MODAL_BLOCK_CARD,
  MODAL_CLOSE_CARD,
  TEXT,
} from './constants';
import { formatDateToMMYY } from './utils';
import styles from './MyCreditCardInformation.module.scss';

export const MyCreditCardInformation: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inProgressModal, setInProgressModal] = useState(false);
  const navigate = useNavigate();

  const [isOpenBlockCardModal, setIsOpenBlockCardModal] = useState(false);
  const [isOpenCloseCardModal, setIsOpenCloseCardModal] = useState(false);
  const [isClosingCardInProcess, setIsClosingCardInProcess] = useState(false);

  const [blockCard] = useBlockCardMutation();
  const [unblockCard] = useUnBlockCardMutation();

  if (!id) {
    return <Navigate to={PATH_PAGE.cardProducts} replace />;
  }

  const { data: myCreditCardInfo, isLoading, error } = useGetUserCreditCardQuery(id);

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  const openModalBlockCard = () => setIsOpenBlockCardModal(true);
  const openModalCloseCard = () => setIsOpenCloseCardModal(true);

  const hideModalBlockCard = () => setIsOpenBlockCardModal(false);
  const hideModalCloseCard = () => setIsOpenCloseCardModal(false);

  const handleServiceInProgress = () => {
    setInProgressModal(true);
  };

  const cardOperationNavigate = (path: string) => {
    navigate(generatePath(path, { id }));
  };

  const toggleBlock = () => {
    if (myCreditCardInfo?.status === 'BLOCKED') {
      unblockCard(id);
      hideModalCloseCard();
      return;
    }

    blockCard(id);
    hideModalBlockCard();
  };

  const closeCardController = () => {
    setIsClosingCardInProcess(true);
    hideModalCloseCard();
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isClosingCardInProcess && (
        <>
          <Text className={styles.closeCardHeader} tag='h2' size='m' weight='medium'>
            {INFO_MESSAGES.header}
          </Text>

          {INFO_MESSAGES.info.map((message, index) => (
            <li className={styles.message} key={index}>
              {message}
            </li>
          ))}
        </>
      )}
      {myCreditCardInfo && (
        <MyCardInfo
          cardInfo={{
            balance: myCreditCardInfo.generalBalance - myCreditCardInfo.generalDebt,
            cardNumber: myCreditCardInfo.firstTwelveNumbers + myCreditCardInfo.lastFourNumbers,
            cardStatus: myCreditCardInfo.status,
            closedAt: formatDateToMMYY(myCreditCardInfo.endDate),
            currency: myCreditCardInfo.currency,
            expiredAt: myCreditCardInfo.endDate,
            level: myCreditCardInfo.level,
            paymentSystem: myCreditCardInfo.paymentSystem,
            securityCode: myCreditCardInfo.securityCode,
            typeName: myCreditCardInfo.level,
            cardName: myCreditCardInfo.name,
          }}
        />
      )}
      {myCreditCardInfo && isClosingCardInProcess ? (
        <CloseCreditCard generalDebt={myCreditCardInfo.generalDebt} cardId={id} />
      ) : (
        <>
          <div className={styles.buttons__group}>
            <Text tag='h2' weight='medium' size='m' className={styles.buttons__group_title}>
              {TEXT.cardInfo}
            </Text>
            <div className={styles.buttons_container}>
              <Button
                onClick={handleServiceInProgress}
                theme='third'
                className={styles.flat_button}
              >
                <Icon icon='doc-blue' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.details}
                </Text>
              </Button>
              <Button
                onClick={handleServiceInProgress}
                theme='third'
                className={styles.flat_button}
              >
                <Icon icon='info-rate' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.rates}
                </Text>
              </Button>
              <Button
                onClick={handleServiceInProgress}
                theme='third'
                className={styles.flat_button}
              >
                <Icon icon='info-limits' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.requisites}
                </Text>
              </Button>
              <Button
                onClick={handleServiceInProgress}
                theme='third'
                className={styles.flat_button}
              >
                <Icon icon='doc-blue' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.interestFreeEndDate}
                </Text>
              </Button>
              <Button
                onClick={handleServiceInProgress}
                theme='third'
                className={styles.flat_button}
              >
                <Icon icon='info-rate' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.getExtract}
                </Text>
              </Button>
            </div>
          </div>
          <div className={styles.buttons__group}>
            <Text tag='h2' weight='medium' size='m' className={styles.buttons__group_title}>
              {TEXT.cardManage}
            </Text>
            <div className={styles.buttons_container}>
              <Button
                onClick={() => cardOperationNavigate(PATH_PAGE.creditCardChangePIN)}
                theme='third'
                className={styles.flat_button}
              >
                <Icon icon='actions-pin' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.changePin}
                </Text>
              </Button>
              <Button onClick={openModalBlockCard} theme='third' className={styles.flat_button}>
                <Icon icon='actions-pin' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.blockUnblock}
                </Text>
              </Button>
              <Button onClick={openModalCloseCard} theme='third' className={styles.flat_button}>
                <Icon icon='actions-pin' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.closeCard}
                </Text>
              </Button>
              <Button
                onClick={() => cardOperationNavigate(PATH_PAGE.creditCardChangeLimits)}
                theme='third'
                className={styles.flat_button}
              >
                <Icon icon='actions-pin' width='56' height='56' />
                <Text weight='medium' size='s' tag='p'>
                  {TEXT.changeLimits}
                </Text>
              </Button>
            </div>
          </div>
        </>
      )}
      <Modal setIsOpen={setInProgressModal} isOpen={inProgressModal}>
        <ServiceUnavailableWindow hideModal={() => setInProgressModal(false)} />
      </Modal>
      <Modal setIsOpen={setIsOpenBlockCardModal} isOpen={isOpenBlockCardModal}>
        <InfoFrame
          icon={ICON_MODAL_PARAMS}
          primaryBtnText={MODAL_BLOCK_CARD.cancel}
          secondaryBtnText={
            myCreditCardInfo?.status === 'ACTIVE'
              ? MODAL_BLOCK_CARD.block
              : MODAL_BLOCK_CARD.unblock
          }
          title={MODAL_BLOCK_CARD.question}
          cardType={CardType.closeBill}
          onPrimaryButtonClick={hideModalBlockCard}
          onSecondaryButtonClick={toggleBlock}
        />
      </Modal>
      <Modal setIsOpen={setIsOpenCloseCardModal} isOpen={isOpenCloseCardModal}>
        <InfoFrame
          icon={ICON_MODAL_PARAMS}
          primaryBtnText={MODAL_CLOSE_CARD.cancel}
          secondaryBtnText={MODAL_CLOSE_CARD.close}
          title={MODAL_CLOSE_CARD.question}
          cardType={CardType.closeBill}
          onPrimaryButtonClick={hideModalCloseCard}
          onSecondaryButtonClick={closeCardController}
        />
      </Modal>
    </>
  );
};
