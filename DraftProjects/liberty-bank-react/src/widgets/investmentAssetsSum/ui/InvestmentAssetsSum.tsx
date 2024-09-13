import { Text } from '@/shared';
import { BONDS_SUM, STOCKS_SUM } from '../constants';
import { useCalculateAssetSum } from '../hooks';

import styles from './InvestmentAssetsSum.module.scss';

interface InvestmentAssetsSumProps {
  assetsData: (string | number)[][];
}

export const InvestmentAssetsSum = (props: InvestmentAssetsSumProps) => {
  const { assetsData } = props;

  const assetSums = useCalculateAssetSum(assetsData);

  return (
    <div className={styles.container}>
      <Text tag='span' size='m' weight='medium'>
        {`${STOCKS_SUM}: ${assetSums.stockSum} RUB`}
      </Text>
      <Text tag='span' size='m' weight='medium'>
        {`${BONDS_SUM}: ${assetSums.bondsSum} RUB`}
      </Text>
    </div>
  );
};
