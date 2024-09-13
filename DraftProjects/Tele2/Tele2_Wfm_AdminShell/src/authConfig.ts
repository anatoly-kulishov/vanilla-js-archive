import { AuthProviderProps } from 'oidc-react';

const isProduction = process.env.NODE_ENV === 'production';
const app = process.env.APP;

const authProviderProps: AuthProviderProps = {
  authority: isProduction ? 'https://auth-ENV_APP_URL_AUTH/' : `https://auth-${app}/`,
  clientId: 'wfm_admin',
  responseType: 'id_token token',
  redirectUri: `${window.location.origin}/signin-oidc`,
  postLogoutRedirectUri: `${window.location.origin}/signout-callback-oidc`,
  scope: 'openid profile wfm IdentityServerApi',
  loadUserInfo: true,
  automaticSilentRenew: true,
};

export default authProviderProps;
