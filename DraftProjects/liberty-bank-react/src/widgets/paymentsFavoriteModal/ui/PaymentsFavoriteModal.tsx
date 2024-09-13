import { Button, CardType, InfoFrame, Modal, Text } from '@/shared';
import { FC, useState } from 'react';
import styles from './PaymentsFavoriteModal.module.scss';
import { ICON, TEXT } from '../constants';

interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paymentFavoriteInfo: IFavoriteInfo;
}
interface IFavoriteInfo {
  title: string;
  number: string;
  cardType: string;
}

export const PaymentsFavoriteModal: FC<IModal> = ({
  isModalOpen,
  setIsModalOpen,
  paymentFavoriteInfo: paymentFavoriteInfo,
}) => {
  const [isDeletedModal, setIsDeletedModal] = useState(false);
  const [closeCardModal, setCloseCardModal] = useState(false);

  const hideModal = () => setIsModalOpen(false);
  const closeFavoriteModal = () => {
    // TODO логика закрытия счета
    setIsDeletedModal(false);
    setCloseCardModal(true);
  };

  if (isDeletedModal) {
    return (
      <Modal
        isOpen={isModalOpen}
        setIsOpen={(isOpen: boolean) => {
          setIsModalOpen(isOpen);
        }}
      >
        <InfoFrame
          title={TEXT.title}
          primaryBtnText={TEXT.no}
          secondaryBtnText={TEXT.yes}
          onPrimaryButtonClick={hideModal}
          onSecondaryButtonClick={closeFavoriteModal}
          cardType={CardType.closeBill}
          icon={ICON}
        />
      </Modal>
    );
  }
  if (closeCardModal) {
    return (
      <Modal
        isOpen={isModalOpen}
        setIsOpen={(isOpen: boolean) => {
          setIsModalOpen(isOpen);
        }}
      >
        <div className={styles['close-card-modal']}>
          <Text tag='h4' size='m' weight='medium'>
            Избранный платеж успешно удален
          </Text>
          <Button className={styles['close-card-modal__button']} onClick={hideModal}>
            Понятно
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={(isOpen: boolean) => {
        setIsModalOpen(isOpen);
      }}
    >
      <div className={styles['modal']}>
        <div className={styles['titles']}>
          <Text tag='h2' className={styles['title']}>
            {paymentFavoriteInfo.title}
          </Text>
          <Text tag='h3' className={styles['title']}>
            {paymentFavoriteInfo.number}
          </Text>
        </div>
        <div className={styles['target-payment']}>
          <Text tag='h3' className={styles['target-payment__title']}>
            Назначение платежа
          </Text>
          <Text tag='h3'>{paymentFavoriteInfo.cardType}</Text>
        </div>
        <div className={styles['buttons']}>
          <Button size='m' onClick={hideModal}>
            Оплатить
          </Button>
          <Button
            size='m'
            onClick={() => {
              setIsDeletedModal(true);
            }}
          >
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
