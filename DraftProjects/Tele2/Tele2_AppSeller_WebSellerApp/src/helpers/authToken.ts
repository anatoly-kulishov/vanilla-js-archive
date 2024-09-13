import { PREFIX_OIDC_USER_STORE } from './oidc';
import { joinToString } from './joinToString';

export const DEFAULT_AUTH_TOKEN_STORAGE_KEY = 'token';

export const getAuthToken = () => {
  const storedDefaultToken = localStorage.getItem(DEFAULT_AUTH_TOKEN_STORAGE_KEY);
  if (storedDefaultToken) {
    return storedDefaultToken;
  }

  const oidcSessionStorageKey = Object.keys(sessionStorage).find((key) =>
    key.startsWith(PREFIX_OIDC_USER_STORE)
  );

  const { access_token: accessToken, token_type: tokenType } = JSON.parse(
    sessionStorage.getItem(oidcSessionStorageKey) || '{}'
  );

  if (accessToken) {
    return joinToString([tokenType || 'Bearer', accessToken]);
  }

  return null;
};
