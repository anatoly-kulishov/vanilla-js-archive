import UnitMenuButton from '@/entities/unitMenuButton/UnitMenuButton';
import UnitMenuCard from '@/entities/unitMenuCard/UnitMenuCard';
import CashbackCard from '@/entities/unitMenuCashbackCard/CashbackCard';
import MyProductsCard from '@/entities/unitMenuMyProductsCard/MyProductsCard';
import { Button, Icon, Image, Input, PATH_PAGE, Wrapper } from '@/shared';
import health from '@/shared/ui/icon/assets/images/health.png';
import product from '@/shared/ui/icon/assets/images/product.png';
import styles from './BodyUnitMenu.module.scss';
import { TEXT } from './consts';

const mockData = [
  {
    title: 'Свой',
    text: 'Кэшбек 5%',
    img: product,
    bgStyle: 'product',
  },
  {
    title: 'Здоровье',
    text: 'Кэшбек 4%',
    img: health,
    bgStyle: 'health',
  },
];

const mockCardsFav = [
  {
    svg: <Icon icon={'bag'} widthAndHeight={'32px'} />,
    text: 'Пополнить счет Ozon',
  },
  {
    svg: <Icon icon={'phone'} widthAndHeight={'32px'} />,
    text: 'Билайн 96588949999',
  },
  {
    svg: <Icon icon={'facilities'} widthAndHeight={'32px'} />,
    text: 'Перевод маме на карту',
  },
  {
    svg: <Icon icon={'wallet'} widthAndHeight={'32px'} />,
    text: 'Коммунальные платежи',
  },
];

const mockCardsPop = [
  {
    svg: <Icon icon={'call'} widthAndHeight={'32px'} />,
    text: 'Перевести по телефону',
  },
  {
    svg: <Icon icon={'facilities'} widthAndHeight={'32px'} />,
    text: 'Перевести на другую карту',
  },
  {
    svg: <Icon icon={'phone'} widthAndHeight={'32px'} />,
    text: 'Оплатить мобильный',
  },
  {
    svg: <Icon icon={'docs'} widthAndHeight={'32px'} />,
    text: 'Перевести по реквизитам',
  },
];

const mockCardsProduct = [
  {
    svgCur: <Icon icon={'dollar'} widthAndHeight={'40px'} />,
    sum: '30 000',
    type: 'Дебетовая',
    bonus: '1000',
    svgCard: <Image image={'card1'} width={'50px'} height={'30px'} />,
    date: '03/27',
  },
  {
    svgCur: <Icon icon={'yen'} widthAndHeight={'40px'} />,
    sum: '51 000',
    type: 'All games',
    bonus: '1200',
    svgCard: <Image image={'card4'} width={'50px'} height={'30px'} />,
    date: '03/27',
  },
  {
    svgCur: <Icon icon={'ruble'} widthAndHeight={'40px'} />,
    sum: '20 000',
    type: 'La moda',
    bonus: '300',
    svgCard: <Image image={'card3'} width={'50px'} height={'30px'} />,
    date: '03/27',
  },
  {
    svgCur: <Icon icon={'euro'} widthAndHeight={'40px'} />,
    sum: '3 000',
    type: 'Кредитная',
    bonus: '900',
    svgCard: <Image image={'card2'} width={'50px'} height={'30px'} />,
    date: '03/27',
  },
];

const BodyUnitMenu = () => {
  return (
    <Wrapper size='l'>
      <div className={styles['all']}>
        <div className={styles['my-products']}>
          <UnitMenuButton text={TEXT.myProducts} href={PATH_PAGE.myCards} />
          <ul className={styles['my-products__cards']}>
            {mockCardsProduct.map((item, index) => (
              <MyProductsCard key={index} item={item} href={PATH_PAGE.myCards} />
            ))}
          </ul>
          <Button
            className=''
            size='m'
            theme='primary'
            type='button'
            width='max'
            href={PATH_PAGE.cardProducts}
          >
            {TEXT.newProduct}
          </Button>
        </div>
        <div className={styles['right']}>
          <Input.Search placeholder='Поиск' />
          <div className={styles['block']}>
            <UnitMenuButton text={TEXT.favorities} href='#' />
            <ul className={styles['block__cards']}>
              {mockCardsFav.map((card, index) => (
                <UnitMenuCard key={index} card={card} />
              ))}
            </ul>
          </div>
          <div className={styles['block']}>
            <UnitMenuButton text={TEXT.popular} href='#' />
            <ul className={styles['block__cards']}>
              {mockCardsPop.map((card, index) => (
                <UnitMenuCard key={index} card={card} />
              ))}
            </ul>
          </div>
          <div className={styles['cashback']}>
            <UnitMenuButton text={TEXT.cashback} href='#' />
            <ul className={styles['cashback__cards']}>
              {mockData.map((item) => (
                <CashbackCard key={item.title} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BodyUnitMenu;
