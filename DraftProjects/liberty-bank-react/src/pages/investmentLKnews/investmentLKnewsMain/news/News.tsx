import InfiniteScroll from '@/widgets/InfiniteScroll/ui/InfiniteScroll';
import { FC } from 'react';
import { INewsProps } from '@/pages/investmentLKnews/investmentLKnewsMain/constants';

export const News: FC<INewsProps> = ({ newsData, filterCurrency }) => {
  return <InfiniteScroll key={JSON.stringify(filterCurrency)} filteredNews={newsData} />;
};
