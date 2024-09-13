import {
  Modal,
  InfoFrame,
  CardType,
  setIsSettingsChanged,
  setCatalogFilter,
  CatalogFilters,
  CurrencyValues,
  getInvestOptionsIntoStorage,
  IInvestOptions,
  setBriefcaseCurrency,
} from '@/shared';
import { FC } from 'react';
import { TEXT, ICON } from '../constants';
import { useDispatch } from 'react-redux';

interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  saveOptions: () => void;
}

export const InvestOptionsModal: FC<IModal> = ({ isModalOpen, setIsModalOpen, saveOptions }) => {
  const dispatch = useDispatch();

  const investOptionsIntoStorage: IInvestOptions = JSON.parse(
    getInvestOptionsIntoStorage() || 'null',
  );
  const briefcaseCurrencyInStorage: CurrencyValues =
    investOptionsIntoStorage?.briefcaseCurrency || CurrencyValues.ruble;

  const catalogFilterInStorage: CatalogFilters =
    investOptionsIntoStorage?.catalogFilter || CatalogFilters.withAllAssets;

  function toValueInStorage() {
    dispatch(setBriefcaseCurrency(briefcaseCurrencyInStorage));
    dispatch(setCatalogFilter(catalogFilterInStorage));
    dispatch(setIsSettingsChanged(false));
  }

  const hideModal = () => setIsModalOpen(false);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={(isOpen: boolean) => {
        if (!isOpen) {
          toValueInStorage();
        }
        setIsModalOpen(isOpen);
      }}
    >
      <InfoFrame
        icon={ICON}
        primaryBtnText={TEXT.no}
        secondaryBtnText={TEXT.yes}
        title={TEXT.title}
        subTitle={TEXT.substring}
        underImageTitle={TEXT.imageText}
        cardType={CardType.closeBill}
        onPrimaryButtonClick={() => {
          toValueInStorage();
          hideModal();
        }}
        onSecondaryButtonClick={() => {
          saveOptions();
          hideModal();
        }}
      />
    </Modal>
  );
};
