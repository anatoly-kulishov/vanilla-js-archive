export const DEPOSIT_PATH = '/deposit/api/v1';

export const DEPOSIT_URL = {
  baseDeposit: 'http://172.17.1.52:30303/',
  depositProducts: `${DEPOSIT_PATH}/products`,
  depositForm: `${DEPOSIT_PATH}/products/form`,
  profitCalculation: `${DEPOSIT_PATH}/products/profit-calculating`,
  userDeposits: `${DEPOSIT_PATH}/deposits`,
  userDepositInfo: `${DEPOSIT_PATH}/deposits/info`,
  refillDeposit: `${DEPOSIT_PATH}/deposits/refill`,
  recallDeposit: `${DEPOSIT_PATH}/deposits/recall`,
  depositsHistory: `${DEPOSIT_PATH}/deposits/history`,
};
