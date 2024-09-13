import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { getPartners } from 'utils/api/partners';

const PAGE_SIZE = 20;

type Props = {
  queryName: string;
  inputValue: string | null,
  setDefaultPartner?: ((value: number) => void) | undefined,
};

const usePartners = ({
  queryName,
  inputValue,
  setDefaultPartner,
}: Props) => {
  const [isAllPartnersLoaded, setIsAllPartnersLoaded] = useState(false);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const incrementPageIndex = () => setPageIndex((prevPageIndex) => prevPageIndex + 1);

  useEffect(() => {
    setPageIndex(1);
    setIsAllPartnersLoaded(false);
    setSearchValue(inputValue);
  }, [inputValue]);

  const partners = useInfiniteQuery<Common.Option[]>({
    queryKey: [queryName, searchValue],
    queryFn: () => getPartners({
      pageIndex,
      pageSize: PAGE_SIZE,
      search: searchValue,
    }).then(({ data }) => {
      if (pageIndex === data.totalPages || !data.partners.length) {
        setIsAllPartnersLoaded(true);
      } else {
        incrementPageIndex();
      }

      const firstPartner = data.partners?.[0].id;
      if (firstPartner && setDefaultPartner && pageIndex === 1) {
        setDefaultPartner(firstPartner);
      }

      return data.partners.map(({ id, fullName }) => ({
        value: id,
        label: [id, fullName].filter(Boolean).join(', '),
      })) ?? [];
    }),
    onError: () => {},
    getNextPageParam: (_, pages) => pages.length,
  });

  const partnerOptions = useMemo(() => partners?.data?.pages?.flat(), [partners]);

  return {
    isFetching: partners.isFetching,
    isFetchingNextPage: partners.isFetchingNextPage,
    fetchNextPage: partners.fetchNextPage,
    partnerOptions,
    isAllPartnersLoaded,
  };
};

export default usePartners;
