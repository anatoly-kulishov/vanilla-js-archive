export type IAssetParams = string | undefined;
export type IArticlesParams = {
  articleType: string;
  tag?: string;
};

export type IAssetResponse = {
  issuerId: string;
  name: string;
  info: string;
  url: string;
  logo: string;
  ticker: string;
  type: string;
  country: string;
};

export enum EArticleType {
  'NEWS',
  'ANALYTICS',
}

export interface IArticle {
  id: string;
  title: string;
  text: string;
  tagType: string[];
  articleType: EArticleType;
  description: string;
  instant: Date;
  image: string;
}

type tagString = {
  tagType: string;
};

export type IArticleResponse = Omit<IArticle, 'tagType'> & tagString;

export type IShortArticle = Omit<IArticle, 'text'>;
