import { CardBenefits, CardProduct, CardTariffs } from '@/entities';
import { PATH_PAGE, useGetGroupedCardProductsQuery } from '@/shared';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CardProductPage.module.scss';
import { groupingDebitCardProduct } from './lib/utils';

function CardProductPage() {
  const { productType } = useParams();
  const navigate = useNavigate();
  const cardProductName = decodeURI(productType as string);
  const { data: cardProduct, isError, error } = useGetGroupedCardProductsQuery(cardProductName);

  if (isError) {
    navigate(PATH_PAGE.error, {
      state: { error: error, path: PATH_PAGE.cardProducts },
    });
  }

  if (cardProduct && !isError) {
    const groupedCard = groupingDebitCardProduct(cardProduct);

    return (
      <section className={styles['product']}>
        <CardProduct {...groupedCard} />
        <CardBenefits typeName={cardProductName} />
        <div className={styles['product__tariffs']}>
          <CardTariffs title='Тариф' {...groupedCard} />
        </div>
      </section>
    );
  }
}

export default CardProductPage;
