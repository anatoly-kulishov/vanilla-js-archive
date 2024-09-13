const INVEST_PATH = '/investment/api/v1';

export const INVEST_URL = {
  baseUrl: 'http://172.17.1.79:30303',
  investCustomerAuth: `${INVEST_PATH}/auth`,
  investUserInfo: `${INVEST_PATH}/customers/questionnaire-form`,
  investSmsSend: `${INVEST_PATH}/customers/documents/sign`,
  investBrokerAcc: `${INVEST_PATH}/customers/broker-accounts`,
  investAllBrokerAccounts: `${INVEST_PATH}/customers/numberBrokerAccounts`,
  investBrokerAccId: `${INVEST_PATH}/customers/brokerAccountId`,
  investBrokerAccountOpen: `${INVEST_PATH}/customers/accounts/open`,
  investSmsVerificationAccountOpen: `${INVEST_PATH}/sms/open/verify`,
  investSmsVerificationAccountClose: `${INVEST_PATH}/sms-verification/close`,
  investNews: `${INVEST_PATH}/lk/analytics/news/feed`,
  investSingleNews: `${INVEST_PATH}/lk/analytics/news`,
  investAsset: `${INVEST_PATH}/lk/catalog/company/`,
  investArticle: `${INVEST_PATH}/lk/analytics/article`,
  investArticles: `${INVEST_PATH}/lk/articles`,
  investArticlesFeed: `${INVEST_PATH}/lk/articles/feed`,
  investAnalyticsShort: `${INVEST_PATH}/lk/analytics/articles/short`,
  investPersonalDocument: `${INVEST_PATH}/documents/personal`,
  investCommonDocument: `${INVEST_PATH}/documents/common`,
};
