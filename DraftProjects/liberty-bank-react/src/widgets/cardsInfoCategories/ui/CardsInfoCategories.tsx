import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardType,
  ICardInfo,
  InfoFrame,
  Modal,
  Text,
  PATH_PAGE,
  useChangeCardStatusMutation,
  getAccessToken,
  getCustomerId,
  getLinkWithParams,
  useSetFavoriteStatusMutation,
  CategoryLink,
} from '@/shared';
import { SECTIONS, COLOR, TEXT, CARD_STATUS, DIR, CardAction } from '../constants/constants';
import { getCardActions } from '../helpers/getCardActions';
import { getModalTitle } from '../helpers/getModalTitle';
import { getCardInfo } from '../helpers/getCardInfo';
import { modalInfo } from '../model/types';
import styles from './CardsInfoCategories.module.scss';

interface Props {
  card: ICardInfo;
  cardId: string;
}

export const CardsInfoCategories = ({ card, cardId }: Props) => {
  const [modalState, setModalState] = useState<modalInfo>({ isModal: false, link: null });
  const [isMainCard, setIsMainCard] = useState(card.favourite);
  const navigate = useNavigate();

  const [changeStatus] = useChangeCardStatusMutation();
  const [setFavoriteStatus] = useSetFavoriteStatusMutation();

  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const cardActions = useMemo(() => getCardActions(card), [card?.cardStatus]);
  const cardInfo = useMemo(() => getCardInfo(card), [card?.cardStatus]);

  const handleModalOpen = () => {
    setModalState({ isModal: true, link: null });
  };

  const handleCancelModal = () => {
    setModalState(() => ({ isModal: false, link: null }));
  };

  const handleConfirmModal = () => {
    if (modalState.link === CardAction.CLOSE) {
      /* navigate(getLinkWithParams(PATH_PAGE.closeCard, { id: cardId })); */
      /*
       * TODO: Тут этап с СМС аутентификацией отключён до создания SMS Service
       * ниже временное решение которое нужно будет удалить после создания SMS Service
       */
      changeStatus({ cardId, cardStatus: 'CLOSED', customerId });
    }

    if (modalState.link === CardAction.BLOCK) {
      changeStatus({ cardId, cardStatus: CARD_STATUS.BLOCKED, customerId });
      /*
       * TODO: Убрать строку ниже после рефакторинга EP
       */
      setFavoriteStatus({ id: cardId, favourite: false, customerId });
      setIsMainCard(false);
      handleCancelModal();
    }

    if (modalState.link === CardAction.UNBLOCK) {
      changeStatus({ cardId, cardStatus: CARD_STATUS.ACTIVE, customerId });
      handleCancelModal();
    }
    setModalState(() => ({ isModal: false, link: null }));
  };

  const handleNavigateToTransfer = () => {
    navigate(`${PATH_PAGE.transfers.home}`);
  };

  useEffect(() => {
    if (card.favourite !== isMainCard) {
      setFavoriteStatus({ id: cardId, favourite: isMainCard, customerId });
    }
  }, [isMainCard]);

  const renderModal = () => {
    const { link, isModal } = modalState;
    const { cardStatus, balance } = card;

    if (!isModal) {
      return null;
    }

    const modalTitle = getModalTitle(cardStatus, link, balance);

    if (link === CardAction.CLOSE && balance !== undefined && !isNaN(balance) && balance !== 0) {
      return (
        <Modal isOpen={isModal} setIsOpen={handleModalOpen}>
          <InfoFrame
            icon={{
              width: '300',
              height: '300',
              image: balance > 0 ? 'info-success-card-limit' : 'failed-open-bill-red',
            }}
            onCloseClick={handleCancelModal}
            title={modalTitle}
            cardType={CardType.closeBill}
            onPrimaryButtonClick={handleNavigateToTransfer}
            primaryBtnText={balance > 0 ? TEXT.transfer : TEXT.topUp}
          />
        </Modal>
      );
    }

    return (
      <Modal isOpen={isModal} setIsOpen={handleModalOpen}>
        <InfoFrame
          icon={{
            width: '300',
            height: '300',
            image: 'choiceIsYesNo',
          }}
          onCloseClick={handleCancelModal}
          title={modalTitle}
          cardType={CardType.closeBill}
          onPrimaryButtonClick={handleConfirmModal}
          onSecondaryButtonClick={handleCancelModal}
          primaryBtnText={TEXT.yes}
          secondaryBtnText={TEXT.no}
        />
      </Modal>
    );
  };

  return (
    <div>
      <div className={styles['categories-info']}>
        <Text tag='h2' size='m' weight='medium'>
          {SECTIONS.info}
        </Text>
        <div className={styles['categories-list']}>
          {cardInfo.map((category) => (
            <CategoryLink
              openModal={setModalState}
              key={category.name}
              modalType={category.modalType}
              icon={category.icon}
              name={category.name}
              linkStatus={
                category.link ? getLinkWithParams(category.link, { id: cardId }) : undefined
              }
              state={card}
              dir={DIR.cards}
              color={COLOR.white}
            />
          ))}
        </div>
      </div>
      <div className={styles['categories-action']}>
        <Text tag='h2' size='m' weight='medium'>
          {SECTIONS.action}
        </Text>
        <div className={styles['categories-list']}>
          {cardActions?.map((category) => (
            <CategoryLink
              openModal={setModalState}
              key={category.name}
              icon={category.icon}
              modalType={category.modalType}
              name={category.name}
              linkStatus={
                category.link ? getLinkWithParams(category.link, { id: cardId }) : undefined
              }
              state={card}
              dir={DIR.cards}
              color={COLOR.white}
              hasSwitcher={category.hasSwitcher}
              switcherIsOn={isMainCard}
              handleSwitcher={() => setIsMainCard(!isMainCard)}
            />
          ))}
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default CardsInfoCategories;
