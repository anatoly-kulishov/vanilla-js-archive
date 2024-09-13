import styles from '../PaymentsCreateFavoriteModal.module.scss';
import { SelectedPaymentCard } from '@/entities/selectedPaymentCard';
import { MOCK_DATA } from '@/pages/paymentsProducts/constants';
import { FC } from 'react';
import { IFavoriteProduct } from '../PaymentsCreateFavoriteModal';

interface ProductGroupProps {
  favoriteProduct: IFavoriteProduct;
  setFavoriteProduct: (product: IFavoriteProduct) => void;
}

export const ProductGroup: FC<ProductGroupProps> = ({ favoriteProduct, setFavoriteProduct }) => {
  return (
    <div className={styles['services']}>
      {MOCK_DATA.category.map((category) => (
        <SelectedPaymentCard
          key={category.name}
          onClick={() => {
            setFavoriteProduct({
              ...favoriteProduct,
              product: { name: category.name, titleEn: category.titleEn },
            });
          }}
          paymentName={category.name}
          active={favoriteProduct.product.name === category.name}
        />
      ))}
    </div>
  );
};
