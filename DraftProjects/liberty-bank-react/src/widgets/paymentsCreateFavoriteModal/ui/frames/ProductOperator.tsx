import styles from '../PaymentsCreateFavoriteModal.module.scss';
import { FC } from 'react';
import { IFavoriteProduct } from '../PaymentsCreateFavoriteModal';
import { Input, Text } from '@/shared';
import { MOCK_PRODUCTS } from '@/pages/paymentProductService/const';
import { SelectedPaymentCard } from '@/entities/selectedPaymentCard';

interface ProductOperatorProps {
  favoriteProduct: IFavoriteProduct;
  setFavoriteProduct: (product: IFavoriteProduct) => void;
}

export const ProductOperator: FC<ProductOperatorProps> = ({
  favoriteProduct,
  setFavoriteProduct,
}) => {
  return (
    <div className={styles['services-container']}>
      <Text tag='h3' weight='medium' className={styles['services-title']}>
        {favoriteProduct.productName.name}
      </Text>
      <Input.Search className={styles['input-search']} />
      <div className={styles['services']}>
        {MOCK_PRODUCTS[favoriteProduct.product.titleEn][favoriteProduct.productName.titleEn].map(
          (productOperator) => (
            <SelectedPaymentCard
              key={productOperator.title}
              onClick={() => {
                setFavoriteProduct({
                  ...favoriteProduct,
                  productOperator: {
                    name: productOperator.title,
                    titleEn: '',
                  },
                });
              }}
              paymentName={productOperator.title}
              active={favoriteProduct.productOperator.name === productOperator.title}
            />
          ),
        )}
      </div>
    </div>
  );
};
