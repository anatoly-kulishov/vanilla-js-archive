/*********************** Simple Selectors ***********************/
export const getAllAccounts = (state) => state.accounts.fetchedAccounts;
export const getSelectedAccount = (state) => state.accounts.selectedAccount;
export const getAccountsLoadingStatus = (state) => state.accounts.isLoading;
export const getAccountsTerm = (state) => state.accounts.term;
