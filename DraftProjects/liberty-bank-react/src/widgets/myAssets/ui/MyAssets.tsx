import { FC, useEffect, useState } from 'react';
import { Text, Collapse, Button, Modal, CardType, InfoFrame, PATH_PAGE } from '@/shared';
import { ASSETS, BUTTON_TEXT, TITLE, ASSETS_BUY_MODAL } from '../constants';
import styles from './MyAssets.module.scss';
import {
  useGetBondsQuery,
  useGetCurrenciesQuery,
  useGetStocksQuery,
} from '@/shared/api/investmentApi/mosBirjaApi';
import { availableAssetsCount, cols } from '../consts';
import { useNavigate } from 'react-router-dom';

export interface IMyAssetsProps {
  isTest: boolean;
}

interface IMyAssets {
  [key: string]: (string | number)[][] | null;
}

interface IHeaderCols {
  [key: string]: string[];
}

export const MyAssets: FC<IMyAssetsProps> = ({ isTest }) => {
  const [stocksData, setStocksData] = useState<(string | number)[][] | null>(null);
  const [bondsData, setBondsData] = useState<(string | number)[][] | null>(null);
  const [currenciesData, setCurrenciesData] = useState<(string | number)[][] | null>(null);
  const [assetsModal, setAssetsModal] = useState(false);
  const navigate = useNavigate();

  const { data: stocksQueryData, refetch: refetchStocks } = useGetStocksQuery();
  const { data: bondsQueryData, refetch: refetchBonds } = useGetBondsQuery();
  const { data: currenciesQueryData, refetch: refetchCurrency } = useGetCurrenciesQuery();
  useEffect(() => {
    if (isTest) {
      const interval = setInterval(() => {
        refetchBonds();
        refetchStocks();
        refetchCurrency();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isTest]);

  useEffect(() => {
    if (stocksQueryData) {
      setStocksData(
        stocksQueryData.map((subArray, index) => {
          return [...subArray, availableAssetsCount.stocks[index]];
        }),
      );
    }
  }, [stocksQueryData]);

  useEffect(() => {
    if (bondsQueryData) {
      setBondsData(
        bondsQueryData.map((subArray, index) => {
          return [...subArray, availableAssetsCount.bonds[index]];
        }),
      );
    }
  }, [bondsQueryData]);

  useEffect(() => {
    if (currenciesQueryData) {
      setCurrenciesData(
        currenciesQueryData.map((subArray, index) => {
          return [...subArray, availableAssetsCount.currency[index]];
        }),
      );
    }
  }, [currenciesQueryData]);

  const assetsData: IMyAssets = {
    Акции: stocksData,
    Облигации: bondsData,
    Валюта: currenciesData,
  };

  const defineAssetForRender = (type: string, assets: IMyAssets) => {
    const headers: IHeaderCols = cols;
    return (
      <div className={styles.content}>
        <div className={type === 'Облигации' ? styles.bondsHeader : styles.header}>
          {headers[type].map((item, index) => (
            <div key={index} className={styles.item}>
              <Text tag='h4' weight='medium'>
                {item}
              </Text>
            </div>
          ))}
        </div>

        {assets[type]?.map((asset, index) => (
          <div
            key={index}
            className={type === 'Облигации' ? styles.bondsContentItems : styles.contentItems}
          >
            {asset.map((assetItem, index) => (
              <div key={index} className={styles.item}>
                <Text
                  tag='h4'
                  weight='medium'
                  className={
                    (type === 'Акции' || type === 'Валюта') && index == 2
                      ? getColorClass(assetItem as string)
                      : ''
                  }
                >
                  {assetItem}
                </Text>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const getColorClass = (priceChange: string) => {
    const sign = priceChange[0];
    return sign === '+' ? styles.green : styles.red;
  };

  const handleRecall = () => {
    setAssetsModal(true);
  };

  const hideRevokeModal = () => {
    setAssetsModal(false);
  };

  const handleAcceptRevoke = () => {
    navigate(PATH_PAGE.investmentLK.testing);
    hideRevokeModal();
  };

  return (
    <div>
      <Text tag='p' size='m' weight='medium' className={styles.title}>
        {TITLE}
      </Text>
      <div className={styles.container}>
        {ASSETS.map((item, i) => (
          <Collapse
            key={i}
            disabled={!isTest}
            title={item.title}
            iconAttributes={item.icon}
            button={
              <Button
                theme='tertiary'
                className={styles.button}
                onClick={
                  isTest ? () => navigate(PATH_PAGE.investmentLK.catalog.assets) : handleRecall
                }
              >
                {BUTTON_TEXT}
              </Button>
            }
          >
            {defineAssetForRender(item.title, assetsData)}
          </Collapse>
        ))}
      </div>
      <Modal isOpen={assetsModal} setIsOpen={setAssetsModal}>
        <InfoFrame
          title={ASSETS_BUY_MODAL.buyQuestion}
          icon={{ width: '244', height: '200', image: 'failed-open-bill' }}
          primaryBtnText={ASSETS_BUY_MODAL.buyButtonTest}
          onPrimaryButtonClick={handleAcceptRevoke}
          cardType={CardType.applicationDeclined}
          onSecondaryButtonClick={hideRevokeModal}
          secondaryBtnText={ASSETS_BUY_MODAL.buyButtonCancel}
        />
      </Modal>
    </div>
  );
};
