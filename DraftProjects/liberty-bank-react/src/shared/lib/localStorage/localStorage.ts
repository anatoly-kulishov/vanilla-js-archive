import { IAssetsFavorites, IInvestOptions, IToken, InvestNotification } from '../..';

export const setTokensIntoStorage = (tokens: IToken): void => {
  if (tokens.refreshToken) {
    localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));
  }
  localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken));
  window.dispatchEvent(new Event('storage'));
};

export const removeTokensFromStorage = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.dispatchEvent(new Event('storage'));
};

export const setInvestOptionsIntoStorage = (investOptions: IInvestOptions): void => {
  localStorage.setItem('investOptions', JSON.stringify(investOptions));
};

export const setBrokerAccountStatusToLS = (status: boolean): void => {
  localStorage.setItem('brokerAccountStatus', JSON.stringify(status));
};

export const setAssetsFavoritesIntoStorage = (assets: IAssetsFavorites): void => {
  localStorage.setItem('assetsFavorites', JSON.stringify(assets));
};

export const getAccessToken = (): string | null => localStorage.getItem('accessToken');
export const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');
export const getInvestOptionsIntoStorage = (): string | null =>
  localStorage.getItem('investOptions');
export const getAssetsFavoritesIntoStorage = (): string | null =>
  localStorage.getItem('assetsFavorites');
export const getBrokerAccountStatusFromLS = (): string | null =>
  localStorage.getItem('brokerAccountStatus');
export const getNotificationsFromLS = (): string | null =>
  localStorage.getItem('investNotifications');

export const setFavoritesTickersToLS = (
  tickerName: string,
  category: keyof IAssetsFavorites,
): void => {
  const currentFavorites = JSON.parse(getAssetsFavoritesIntoStorage()!) || {
    stocks: [],
    bonds: [],
    currency: [],
  };
  localStorage.setItem(
    'assetsFavorites',
    JSON.stringify({
      ...currentFavorites,
      [category]: [...currentFavorites[category], tickerName],
    }),
  );
};

export const setInvestNotificationsToLS = (
  tickerName: string,
  notification: InvestNotification,
): void => {
  const currentNotifications = JSON.parse(getNotificationsFromLS()!) || {};

  const tickerNotifications = currentNotifications[tickerName] || [];

  const updatedNotifications = {
    ...currentNotifications,
    [tickerName]: [...tickerNotifications, notification],
  };

  localStorage.setItem('investNotifications', JSON.stringify(updatedNotifications));
};

export const deleteFromFavoritesTickersToLS = (
  tickerName: string,
  category: keyof IAssetsFavorites,
): void => {
  const currentFavorites = JSON.parse(getAssetsFavoritesIntoStorage()!);
  localStorage.setItem(
    'assetsFavorites',
    JSON.stringify({
      ...currentFavorites,
      [category]: [...currentFavorites[category].filter((el: string) => el !== tickerName)],
    }),
  );
};

export function getFavoritesByCategory(category: keyof IAssetsFavorites): string[] {
  const assetsFavoritesInToStorage: IAssetsFavorites = JSON.parse(
    getAssetsFavoritesIntoStorage() || 'null',
  ) || {
    stocks: [],
    bonds: [],
    currency: [],
  };
  return assetsFavoritesInToStorage[category] || [];
}
