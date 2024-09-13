import { FC, useState, lazy } from 'react';
import { SelectProps } from 'antd/lib/select';
import debounce from 'lodash.debounce';
import usePartners from 'hooks/usePartners';

// @ts-ignore
const LazyLoadSelect = lazy(() => import('tele2_wfm_uilibraryapp/components/LazyLoadSelect'));

const SelectPartner: FC<SelectProps> = ({
  onChange,
  onClear,
  onBlur,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const {
    isFetching,
    isFetchingNextPage,
    partnerOptions,
    fetchNextPage,
    isAllPartnersLoaded,
  } = usePartners({
    queryName: 'partners',
    inputValue: searchValue,
  });

  const onSearch = debounce((value: string) => setSearchValue(value), 300);

  const clearSearchValue = () => setSearchValue(null);

  const handleChange = (value: string, option: any) => {
    if (onChange) {
      onChange(value, option);
    }
    clearSearchValue();
  };

  const handleBlur = (event: any) => {
    if (onBlur) {
      onBlur(event);
    }
    clearSearchValue();
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    clearSearchValue();
  };

  return (
    <LazyLoadSelect
      loading={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      isAllLoaded={isAllPartnersLoaded}
      options={partnerOptions}
      showSearch
      onSearch={onSearch}
      onClear={handleClear}
      onBlur={handleBlur}
      onChange={handleChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default SelectPartner;
