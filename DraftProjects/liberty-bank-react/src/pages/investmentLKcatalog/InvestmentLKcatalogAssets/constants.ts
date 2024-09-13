/* eslint-disable camelcase */
export const BACKBTN_TEXT = 'Назад';
export const BUYBTN_TEXT = 'Купить';

export const TITLE = 'ПАО «Газпром»';

export const TICKER = 'GAZP';

export const COLUMNS = {
  ticker: 'Тикер',
  profitability: 'Доходность за пол года',
  site: 'Официальный сайт компании',
  link: 'https://www.gazprom.ru/',
  tag: 'Энергетика',
  title: 'О компании',
  description:
    '«Газпром» — глобальная энергетическая компания, кладовая мировых запасов природного газа.' +
    'На нее приходится 12% мировой и 68% российской добычи газа.' +
    'Входит в четвёрку крупнейших российских производителей нефти и является самой прибыльной российской компанией в 2022 году по версии Forbes. Газпром реализует более половины газа на внутреннем рынке.',
  price: 'Цена акции',
  value: -5.07,
};

export const PARAMS = {
  'iss.meta': 'off',
  'iss.only': 'marketdata',
  'marketdata.columns': 'LAST,MARKETPRICE',
  marketprice_board: '1',
};

export const DEFAULT_HALF_YEAR_PROFIT_TPARAMS = {
  'iss.meta': 'off',
  'iss.only': 'candles',
  'candles.columns': 'close,begin',
  interval: '31',
};
