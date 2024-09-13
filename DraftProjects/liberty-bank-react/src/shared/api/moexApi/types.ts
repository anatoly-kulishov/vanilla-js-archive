export type ITickersParams = {
  'iss.meta': string;
  securities: string;
  'iss.only': string;
  'marketdata.columns': string;
  marketprice_board: string;
};

export type ICandlesParams = {
  params:
    | {
        'iss.only': string;
      }
    | undefined;
  activeTicker: string;
};

export type IHalfYearProfitParams = {
  params:
    | {
        'iss.meta': string;
        'iss.only': string;
        'candles.columns': string;
        interval: string;
        from: string;
        till: string;
      }
    | undefined;
  ticker: string | undefined;
};

export type ITickersResponse = {
  marketdata: {
    columns: string[];
    data: [string, number, number, number, number][];
  };
};

export type ITickersFormatted = {
  name: string;
  currentValue: number;
  changedValue: number;
  changedValueInPercent: number;
  change: string;
}[];

export type ICandlesResponse = {
  candles: {
    data: [[number, string]] | [];
  };
};

export type ICandlesFormatted = [[number, string]] | [];
