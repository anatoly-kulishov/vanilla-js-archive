export const CARDS_PATH = '/card-service/api/v1';

export const CREDIT_CARDS_PATH = '/credit-card/api/v1';

export const CARDS_URL = {
  baseCards: 'http://172.17.1.79:30303/',
  userCards: `${CARDS_PATH}/cards`,
  cardProducts: `${CARDS_PATH}/card-products`,
  groupedCardProducts: `${CARDS_PATH}/card-products/typeName`,
  cardProductBenefits: `${CARDS_PATH}/card-product-benefits`,
  cardInfo: `${CARDS_PATH}/cards/:id`,
  cardTariffs: 'tariffs',

  creditCardProducts: `${CREDIT_CARDS_PATH}/products`,
  creditCardOrders: `${CREDIT_CARDS_PATH}/orders`,
  userCreditCards: `${CREDIT_CARDS_PATH}/credit-cards`,
  changeCreditCardPIN: `${CREDIT_CARDS_PATH}/credit-cards/pin`,
  blockCreditCard: `${CREDIT_CARDS_PATH}/credit-cards/block`,
  unBlockCreditCard: `${CREDIT_CARDS_PATH}/credit-cards/unblock`,
  closeCreditCard: `${CREDIT_CARDS_PATH}/credit-cards/close`,
};
