export interface IQuestionnaireListInfo {
  id: number;
  title: string;
  tag: string[];
}

export interface IQuestionnaireListQuestion {
  id: number;
  title: string;
  tag: string;
}

export type TFooterBtn = Record<string, string>;
