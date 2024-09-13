import { IArticle } from '@/shared/api/investmentApi/types';

export const BACKBTN_TEXT = 'Назад';
export const NEWS_TITLE = 'Главные новости для инвестора';

export const FILTER_TEXT = ['Все', 'Акции', 'Экономика', 'Политика', 'Валюта'];

export interface INews {
  image: string;
  id: { timestamp: number; date: Date };
  title: string;
  description: string;
  tagType: string;
}

export type TabType = 'Все' | 'Экономика' | 'Валюта' | 'Акции';

export interface INewsProps {
  newsData: IArticle[];
  filterCurrency: TabType;
}

export type TagTypeMapping = {
  Акции: string;
  Экономика: string;
  Политика: string;
  Валюта: string;
};

export const TAGFILTER = ['', 'ASSETS', 'ECONOMICS', 'POLITIC', 'CURRENCY'];
