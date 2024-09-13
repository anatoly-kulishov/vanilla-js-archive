import styles from '../PaymentsCreateFavoriteModal.module.scss';
import { SelectedPaymentCard } from '@/entities/selectedPaymentCard';
import { MOCK_DATA } from '@/pages/paymentsProducts/constants';
import { FC } from 'react';
import { IFavoriteProduct } from '../PaymentsCreateFavoriteModal';
import { Text } from '@/shared';

interface ProductNameProps {
  favoriteProduct: IFavoriteProduct;
  setFavoriteProduct: (product: IFavoriteProduct) => void;
}

export const ProductName: FC<ProductNameProps> = ({ favoriteProduct, setFavoriteProduct }) => {
  return (
    <div className={styles['services-container']}>
      <Text tag='h3' weight='medium' className={styles['services-title']}>
        {favoriteProduct.product.name}
      </Text>
      <div className={styles['services']}>
        {MOCK_DATA.category.map((category) => {
          if (category.name === favoriteProduct.product.name) {
            {
              return category.subCategory.map((subCategory) => (
                <SelectedPaymentCard
                  key={subCategory.title}
                  onClick={() => {
                    setFavoriteProduct({
                      ...favoriteProduct,
                      productName: {
                        name: subCategory.title,
                        titleEn: subCategory.titleEn,
                      },
                    });
                  }}
                  paymentName={subCategory.title}
                  active={favoriteProduct.productName.name === subCategory.title}
                />
              ));
            }
          }
        })}
      </div>
    </div>
  );
};
