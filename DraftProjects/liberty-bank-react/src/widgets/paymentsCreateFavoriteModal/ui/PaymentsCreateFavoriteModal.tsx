import {
  Button,
  CardType,
  InfoFrame,
  Modal,
  Text,
  getAuthToken,
  useCreateSelectedPaymentMutation,
} from '@/shared';
import { FC, useState } from 'react';
import styles from './PaymentsCreateFavoriteModal.module.scss';
import { ProductGroup } from './frames/ProductGroup';
import { ProductName } from './frames/ProductName';
import { ProductOperator } from './frames/ProductOperator';
import { PaymentDetails } from './frames/PaymentDetails';
import { useSelector } from 'react-redux';

interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IProduct {
  name: string;
  titleEn: string;
}
export interface IFavoriteProduct {
  productName: IProduct;
  product: IProduct;
  productOperator: IProduct;
}

export const PaymentsCreateFavoriteModal: FC<IModal> = ({ isModalOpen, setIsModalOpen }) => {
  const [framesPage, setFramesPage] = useState(0);
  const [favoriteProduct, setFavoriteProduct] = useState({
    product: {
      name: '',
      titleEn: '',
    },
    productName: {
      name: '',
      titleEn: '',
    },
    productOperator: {
      name: '',
      titleEn: '',
    },
  });
  const [docNumber, setDocNumber] = useState<string>('');
  const clientId = useSelector(getAuthToken);

  const [createSelected, createResult] = useCreateSelectedPaymentMutation();

  const createSelectedPayment = () => {
    if (clientId) {
      createSelected({
        clientId: clientId,
        paymentType: favoriteProduct.productName.titleEn,
        providerId: '2',
        providerName: favoriteProduct.productOperator.name,
        indificationNumber: docNumber,
      });
      setFramesPage((prev) => prev + 1);
    }
  };
  const hideModal = () => setIsModalOpen(false);

  const frames = [
    <ProductGroup
      key={0}
      favoriteProduct={favoriteProduct}
      setFavoriteProduct={setFavoriteProduct}
    />,
    <ProductName
      key={1}
      favoriteProduct={favoriteProduct}
      setFavoriteProduct={setFavoriteProduct}
    />,
    <ProductOperator
      key={2}
      favoriteProduct={favoriteProduct}
      setFavoriteProduct={setFavoriteProduct}
    />,
    <PaymentDetails
      docNumber={docNumber}
      setDocNumber={setDocNumber}
      key='details'
      favoriteProduct={favoriteProduct}
    />,
  ];

  function checkDisabled() {
    if (framesPage === 0 && !!favoriteProduct.product.name) {
      return false;
    }
    if (framesPage === 1 && !!favoriteProduct.productName.name) {
      return false;
    }
    if (framesPage === 2 && !!favoriteProduct.productOperator.name) {
      return false;
    }
    if (framesPage === 3) {
      return false;
    }
    return true;
  }

  return framesPage == frames.length ? (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={(isOpen: boolean) => {
        setIsModalOpen(isOpen);
      }}
    >
      {createResult.isError ? (
        <InfoFrame
          title='Что-то пошло не так'
          primaryBtnText='Понятно'
          onPrimaryButtonClick={hideModal}
          cardType={CardType.applicationSent}
          icon={{ width: '580px', image: 'failed-open-bill' }}
        />
      ) : (
        <InfoFrame
          underImageTitle={'Избранный платёж успешно создан'}
          primaryBtnText='Понятно'
          onPrimaryButtonClick={hideModal}
          cardType={CardType.applicationSent}
          icon={{ width: '580px', image: 'current-bill' }}
          isLoading={createResult.isLoading}
        />
      )}
    </Modal>
  ) : (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={(isOpen: boolean) => {
        setIsModalOpen(isOpen);
      }}
    >
      <div className={styles['modal']}>
        <Text tag='h3' className={styles['title']}>
          Создание избранного платежа
        </Text>
        {frames[framesPage]}
        <div className={styles['button-container']}>
          <Button
            className={styles['button']}
            onClick={() => {
              setFramesPage((prev) => prev - 1);
            }}
            disabled={framesPage < 1}
          >
            Назад
          </Button>
          {framesPage == frames.length - 1 ? (
            <Button
              className={styles['button']}
              onClick={createSelectedPayment}
              disabled={checkDisabled()}
            >
              {'Сохранить'}
            </Button>
          ) : (
            <Button
              className={styles['button']}
              onClick={() => {
                setFramesPage((prev) => prev + 1);
              }}
              disabled={checkDisabled()}
            >
              {'Далее'}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
