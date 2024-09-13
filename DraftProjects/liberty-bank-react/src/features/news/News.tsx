import { Text, Wrapper, getAccessToken, useGetInvestmentNewsQuery } from '@/shared';
import styles from './News.module.scss';
import { ReactNode, useMemo, useState } from 'react';
import { NewsFilter } from './newsFilter/NewsFilter';
import { NewsCard } from '@/widgets/newsCard';
import { NEWS } from './constants';

export interface Filters {
  category: 'all' | 'bank' | 'technology' | 'investment' | 'insurance';
  text: 'Все категории' | 'Банк' | 'Технологии' | 'Инвестиции' | 'Страхование';
}
type Tags = Record<Filters['category'], Filters['text']>;

const filters: Filters[] = [
  { category: 'all', text: 'Все категории' },
  { category: 'bank', text: 'Банк' },
  { category: 'technology', text: 'Технологии' },
  { category: 'investment', text: 'Инвестиции' },
  { category: 'insurance', text: 'Страхование' },
];

const tagNames: Tags = filters.reduce(
  (acc, ele) => ({
    ...acc,
    [ele.category]: ele.text,
  }),
  {} as Tags,
);

export default function News() {
  const [filterValue, setFilterValue] = useState<Filters['category']>('all');
  const { data: investNews } = useGetInvestmentNewsQuery(undefined, { skip: !getAccessToken() });
  const allNews = useMemo(() => {
    return [...NEWS, ...(investNews ?? [])].sort((a, b) => b.instant - a.instant);
  }, [investNews]);
  const news = allNews.map((ele) => {
    const isFilteredNews =
      filterValue !== 'all' && Array.isArray(ele.tagType) && !ele.tagType.includes(filterValue);
    const isFilteredInvestNews =
      filterValue !== 'all' && filterValue !== 'investment' && !Array.isArray(ele.tagType);
    if (isFilteredNews || isFilteredInvestNews) return null;
    const tags = Array.isArray(ele.tagType)
      ? ele.tagType.map((ele) => tagNames[ele])
      : [ele.tagType];
    const props = { ...ele, tags };
    return <NewsCard {...props} key={ele.id} />;
  });

  function changeFilterValue(value: Filters['category']): void {
    setFilterValue(value);
  }

  return (
    <Wrapper size='l'>
      <section className={styles.section}>
        <Text className={styles.title} tag='h1' weight='bold'>
          Новости
        </Text>
        <div className={styles.content}>
          <NewsWrapper>{news}</NewsWrapper>
          <NewsFilter
            filterValue={filterValue}
            changeFilterValue={changeFilterValue}
            filters={filters}
          />
        </div>
      </section>
    </Wrapper>
  );
}

interface NewsWrapperProps {
  children: ReactNode;
}

function NewsWrapper({ children }: NewsWrapperProps) {
  return <div className={styles['cards-wrapper']}>{children}</div>;
}
