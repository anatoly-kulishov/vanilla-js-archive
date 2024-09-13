import {
  FC, useState, lazy, useMemo, useEffect,
} from 'react';
import { Typography } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import debounce from 'lodash.debounce';
import { useShellContext } from '@t2crm/wfm-shell-context';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import usePartners from 'hooks/usePartners';

// @ts-ignore
const LazyLoadSelect = lazy(() => import('tele2_wfm_uilibraryapp/components/LazyLoadSelect'));

const { Text } = Typography;

const headerClassname = cn('header');

type Props = {
  className?: string;
  hasLabel?: boolean;
};

const SelectPartner: FC<Props> = ({ className, hasLabel = true }) => {
  const { partnerId, setPartnerId } = useShellContext();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const storagePartnerId = sessionStorage.getItem('prtnrId');
  const storagePartnerFullName = sessionStorage.getItem('prtnrFN');

  const storagePartnerOprion = useMemo<LabeledValue>(
    () => ({
      value: storagePartnerId ? +storagePartnerId : '',
      label: storagePartnerFullName,
    }), [storagePartnerId, storagePartnerFullName],
  );

  useEffect(() => {
    if (storagePartnerId) {
      setPartnerId(+storagePartnerId);
    }
  }, [setPartnerId, storagePartnerId]);

  const setDefaultPartner = storagePartnerId
    ? undefined
    : (value: number) => {
      setPartnerId(value);
      sessionStorage.setItem('prtnrId', value.toString());
    };

  const {
    isFetching,
    isFetchingNextPage,
    partnerOptions,
    fetchNextPage,
    isAllPartnersLoaded,
  } = usePartners({
    queryName: 'switch-partners',
    inputValue: searchValue,
    setDefaultPartner,
  });

  const clearSearchValue = () => setSearchValue(null);

  const onChange = (value: number, option: LabeledValue) => {
    setPartnerId(value);
    sessionStorage.setItem('prtnrId', value.toString());
    sessionStorage.setItem('prtnrFN', option.children);
    clearSearchValue();
  };

  const onSearch = debounce((value: string) => setSearchValue(value), 300);

  return (
    <div className={headerClassname(className || '')}>
      {hasLabel && <Text type="secondary">Партнер: </Text>}
      <LazyLoadSelect
        loading={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        isAllLoaded={isAllPartnersLoaded}
        defaultValue={storagePartnerOprion}
        options={partnerOptions}
        onChange={onChange}
        className={headerClassname('select-partnerid')}
        showSearch
        onSearch={onSearch}
        onClear={clearSearchValue}
        onBlur={clearSearchValue}
        onSelect={clearSearchValue}
        value={partnerId || undefined}
      />
    </div>
  );
};

SelectPartner.defaultProps = {
  className: '',
};

export default SelectPartner;
