import { FC, memo } from 'react';
import { setCatalogFilter, setIsSettingsChanged, Text, CatalogFilters, Input } from '@/shared';
import { useDispatch } from 'react-redux';
import { CATALOG_FILTER_VALUES, ASSETS_TITLE } from '../constants';
import { SelectedOption } from '../model/types';

interface ISelectAssetsFilter {
  catalogFilter: CatalogFilters;
  setIsAssetsOptionsModalOpen?: (state: boolean) => void;
  isFromSettingsPage?: boolean;
  inline?: boolean;
  buttonTextWidth?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'ml' | 'xss' | 'sxs';
}

export const SelectAssetsFilter: FC<ISelectAssetsFilter> = memo(function SelectAssetsFilter({
  catalogFilter,
  setIsAssetsOptionsModalOpen,
  isFromSettingsPage = false,
  inline = false,
}) {
  const dispatch = useDispatch();

  function selectCatalogFilter(selectedOption: SelectedOption) {
    const filter = selectedOption as CatalogFilters;
    catalogFilter === filter || !isFromSettingsPage || dispatch(setIsSettingsChanged(true));
    switch (filter) {
      case CatalogFilters.withAllAssets: {
        dispatch(setCatalogFilter(CatalogFilters.withAllAssets));
        break;
      }
      case CatalogFilters.withSelectedAssets: {
        dispatch(setCatalogFilter(CatalogFilters.withSelectedAssets));
        if (setIsAssetsOptionsModalOpen) {
          setIsAssetsOptionsModalOpen(true);
        }
        break;
      }
      case CatalogFilters.withBriefcase: {
        dispatch(setCatalogFilter(CatalogFilters.withBriefcase));
        break;
      }
    }
  }

  return (
    <div>
      <div>
        {!inline && (
          <Text tag={'p'} weight='medium' size='m'>
            {ASSETS_TITLE}
          </Text>
        )}
        <Input.Select
          options={CATALOG_FILTER_VALUES}
          onMySelect={selectCatalogFilter}
          value={catalogFilter}
        />
      </div>
    </div>
  );
});
