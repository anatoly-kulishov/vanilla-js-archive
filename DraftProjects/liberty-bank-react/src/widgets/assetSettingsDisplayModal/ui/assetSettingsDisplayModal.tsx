import {
  Text,
  Modal,
  Button,
  Input,
  getAssetsFavoritesIntoStorage,
  IAssetsFavorites,
  setAssetsFavoritesIntoStorage,
} from '@/shared';
import { FC, useState } from 'react';
import style from './assetSettingsDisplayModal.module.scss';
import { ASSET_VALUES, AssetValues, INPUT_PLACEHOLDER } from '../constants';
import classNames from 'classnames';
import { BondsFavorites } from './bonds/BondsFavorites';
import { StockFavorites } from './stocks/StocksFavorites';
import { CurrencyFavorites } from './currency/CurrencyFavorites';

interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AssetSettingsDisplayModal: FC<IModal> = ({ isModalOpen, setIsModalOpen }) => {
  const [activeSection, setActiveSection] = useState(AssetValues.stock);
  const [isHasChanges, setIsHasChanges] = useState(false);

  const assetsFavoritesInToStorage: IAssetsFavorites = JSON.parse(
    getAssetsFavoritesIntoStorage() || 'null',
  ) || {
    stock: [],
    bonds: [],
    currency: [],
  };

  const [stockFavorites, setStockFavorites] = useState(assetsFavoritesInToStorage.stocks);
  const [bondsFavorites, setBondsFavorites] = useState(assetsFavoritesInToStorage.bonds);
  const [currencyFavorites, setCurrencyFavorites] = useState(assetsFavoritesInToStorage.currency);

  function saveChangesToStorage() {
    setAssetsFavoritesIntoStorage({
      stocks: stockFavorites,
      bonds: bondsFavorites,
      currency: currencyFavorites,
    });
    setIsHasChanges(false);
  }

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} className={style.modal}>
      <>
        <div className={style['assetSettings']}>
          <div className={style['navBar']}>
            {ASSET_VALUES.map((item) => (
              <Button theme='icon' key={item} onClick={() => setActiveSection(item)}>
                <Text
                  tag='h4'
                  className={classNames({
                    [style['navBar__button__active']]: activeSection === item,
                  })}
                  size='m'
                >
                  {item}
                </Text>
              </Button>
            ))}
          </div>
          <div className={style['input-search']}>
            <Input.Search placeholder={INPUT_PLACEHOLDER} />
          </div>
          {activeSection === AssetValues.stock && (
            <StockFavorites
              stockFavoritesNames={stockFavorites}
              setStockFavoritesNames={setStockFavorites}
              setIsHasChanges={setIsHasChanges}
            />
          )}
          {activeSection === AssetValues.bonds && (
            <BondsFavorites
              bondsFavoritesNames={bondsFavorites}
              setBondsFavoritesNames={setBondsFavorites}
              setIsHasChanges={setIsHasChanges}
            />
          )}
          {activeSection === AssetValues.currency && (
            <CurrencyFavorites
              currencyFavoritesNames={currencyFavorites}
              setCurrencyFavoritesNames={setCurrencyFavorites}
              setIsHasChanges={setIsHasChanges}
            />
          )}
        </div>
        <Button
          size='l'
          type='submit'
          width='max'
          onClick={saveChangesToStorage}
          disabled={!isHasChanges}
          className={style['save-btn']}
        >
          Сохранить изменения отображения данных
        </Button>
      </>
    </Modal>
  );
};
