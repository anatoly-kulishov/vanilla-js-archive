import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CardType,
  Icon,
  InfoFrame,
  Input,
  Modal,
  PATH_PAGE,
  Text,
  getAccessToken,
  getCustomerId,
  useCloseCardMutation,
} from '@/shared';
import { CLOSE_CARD, ICON_MODAL_PARAMS, PICK_REASON, REASONS_TO_CLOSE, TEXT } from './constants';
import styles from './CloseCreditCard.module.scss';
import { Controller, useForm } from 'react-hook-form';

interface ICloseCreditCard {
  generalDebt: number;
  cardId: string;
}

export const CloseCreditCard: FC<ICloseCreditCard> = ({ generalDebt, cardId: id }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const [closeCard] = useCloseCardMutation();

  const {
    control,
    formState: { isValid },
  } = useForm<{ reason: string }>({
    defaultValues: {
      reason: '',
    },
  });

  const moveBackToMyCards = () => {
    setIsOpenModal(false);
    navigate(PATH_PAGE.myCards);
  };

  const closeObligation = () => {
    setIsOpenModal(false);
  };

  const closeCardController = () => {
    if (generalDebt === 0) {
      const accessToken = getAccessToken();
      const customer = getCustomerId(accessToken!);

      closeCard({ id, customer });
      return;
    }

    setIsOpenModal(true);
  };

  return (
    <div className={styles.closeCardWrapper}>
      <Controller
        control={control}
        name='reason'
        rules={{ required: true }}
        render={({ field }) => (
          <Input.Select
            placeholder={PICK_REASON}
            options={REASONS_TO_CLOSE}
            {...field}
            onMySelect={(value) => {
              field.onChange({
                reason: value,
              });
            }}
          />
        )}
      />

      <Button
        onClick={closeCardController}
        theme='third'
        className={styles.flat_button}
        disabled={!isValid}
      >
        <Icon icon='actions-pin' width='56' height='56' />
        <Text weight='medium' size='s' tag='p'>
          {TEXT}
        </Text>
      </Button>

      <Modal setIsOpen={setIsOpenModal} isOpen={isOpenModal}>
        <InfoFrame
          icon={ICON_MODAL_PARAMS}
          primaryBtnText={CLOSE_CARD.back}
          secondaryBtnText={CLOSE_CARD.closeObligation}
          title={CLOSE_CARD.info}
          cardType={CardType.applicationDeclined}
          onPrimaryButtonClick={moveBackToMyCards}
          onSecondaryButtonClick={closeObligation}
        />
      </Modal>
    </div>
  );
};
