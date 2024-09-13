import { Button, Icon, Modal, Text } from '@/shared';
import styles from './PoliciesBtn.module.scss';
import { InDevelopmentModal } from '../inDevelopmentModal/inDevelopmentModal';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  productId: number;
  docNumber: string;
}

export const PoliciesBtn: FC<Props> = ({ productId, docNumber }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className={styles['action-container']}>
      <Button
        theme={'icon'}
        className={styles['btn-title']}
        onClick={() =>
          navigate(`${productId}/edit`, {
            state: {
              docNumber,
            },
          })
        }
      >
        <Icon icon={'pencil-blue'} />
        <Text tag={'p'} weight={'medium'} size={'s'}>
          Редактировать
        </Text>
      </Button>
      <Button theme={'icon'} className={styles['btn-title']} onClick={() => setIsOpen(true)}>
        <Icon icon={'upload'} />
        <Text tag={'p'} weight={'medium'} size={'s'}>
          Скачать полис
        </Text>
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <InDevelopmentModal setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};
