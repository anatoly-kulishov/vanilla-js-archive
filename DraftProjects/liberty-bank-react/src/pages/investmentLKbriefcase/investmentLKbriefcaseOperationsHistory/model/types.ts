export type Filter = {
  [index: string]: boolean;
};

export enum Intention {
  Покупка = 1,
  Продажа = 2,
}

export interface AssetOperation {
  moex_id: string;
  intention: Intention;
  amount: number;
  price: number;
  comission: number;
  created: string;
}

export interface BalanceOperation {
  transaction_id: string;
  broker_account_id?: string;
  transaction_type: string;
  date_time: string;
  total: number;
  created?: number;
}
