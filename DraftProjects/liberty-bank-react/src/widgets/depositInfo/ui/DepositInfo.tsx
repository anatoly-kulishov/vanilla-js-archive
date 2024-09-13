import { FC } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { createDepositDataArray } from '../utils';
import {
  ApplicationMenu,
  Button,
  CardsList,
  IDepositInfoData,
  Image,
  PATH_PAGE,
  Text,
  transformationDetailsCard,
} from '@/shared';
import styles from './DepositInfo.module.scss';

const MAKE_DEPOSIT = 'Оформить';

interface IDepositInfo {
  depositProduct: IDepositInfoData;
}

export const DepositInfo: FC<IDepositInfo> = ({ depositProduct }) => {
  const navigate = useNavigate();
  const depositApplicationPath = generatePath(PATH_PAGE.depositApplication, {
    id: depositProduct.id,
  });

  const handleClickMakeDeposit = () => {
    navigate(depositApplicationPath);
  };

  return (
    <div className={styles.container}>
      <Text tag='h2' size='xl' weight='bold' className={styles.nameDeposit}>
        {depositProduct.name}
      </Text>
      <div className={styles.depositWrapper}>
        <div className={styles.menuWrapper}>
          <Image image={'heap-of-coins'} width='356' height='329' />
          <div className={styles.wrapper}>
            <Text tag='h1' weight='bold' className={styles.title}>
              {depositProduct.tagline}
            </Text>

            <Text tag='h4' size='s' weight='medium' className={styles.subtitle}>
              {depositProduct.productDetails}
            </Text>

            <ApplicationMenu menuList={createDepositDataArray(depositProduct)} />

            <div className={styles.buttonWrapper}>
              <Button width='max' className={styles.btn} onClick={handleClickMakeDeposit}>
                {MAKE_DEPOSIT}
              </Button>
            </div>
          </div>
        </div>
        <CardsList cards={transformationDetailsCard(depositProduct.depositDetail)} />
      </div>
    </div>
  );
};
