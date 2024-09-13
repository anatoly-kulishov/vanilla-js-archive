import { FC } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import {
  ApplicationMenu,
  Button,
  ICreditProductDetails,
  PATH_PAGE,
  Image,
  Text,
  Skeleton,
  SkeletonContainer,
  Tooltip,
} from '@/shared';
import { BTB_TEXT, SUBTITLE, TOOLTIP_TEXT } from '../constants';
import { createCreditDataArray } from '../utils';
import styles from './CreditApplication.module.scss';

export interface ICreditApplication {
  creditProduct: ICreditProductDetails;
  disabled?: boolean;
  isLoading?: boolean;
}

export const CreditApplication: FC<ICreditApplication> = ({
  creditProduct,
  disabled = false,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const navigateToCalculate = () => {
    navigate(generatePath(PATH_PAGE.creditCalculate, { id }));
  };

  const navigateToCreditForm = () => {
    navigate(generatePath(PATH_PAGE.creditForm, { id }));
  };

  return (
    <div className={styles.wrapper}>
      <Image image={'character-with-plant'} width='383' height='325' />
      <div className={styles.info}>
        <Text tag='h1' weight='bold' className={styles.title}>
          {creditProduct.tagline}
        </Text>
        <Text tag='p' size='s' weight='medium' className={styles.subtitle}>
          {creditProduct.name}
          {SUBTITLE}
        </Text>
        <div className={styles.application}>
          <ApplicationMenu menuList={createCreditDataArray(creditProduct)} />
        </div>
        <div className={styles.buttons}>
          <Button theme='secondary' className={styles.btn} onClick={navigateToCalculate}>
            {BTB_TEXT.calculation}
          </Button>
          {isLoading ? (
            <SkeletonContainer width='161px' height='56px'>
              <Skeleton theme='regular' className={styles.skeleton} />
            </SkeletonContainer>
          ) : disabled ? (
            <Tooltip
              normalTextWrapping
              positionX='left'
              positionY='bottom'
              hideDelay={250}
              elementTooltip={
                <Button className={styles.btn} onClick={navigateToCreditForm} disabled={disabled}>
                  {BTB_TEXT.apply}
                </Button>
              }
            >
              <Text tag='span' size='s'>
                {TOOLTIP_TEXT}
              </Text>
            </Tooltip>
          ) : (
            <Button className={styles.btn} onClick={navigateToCreditForm} disabled={disabled}>
              {BTB_TEXT.apply}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
