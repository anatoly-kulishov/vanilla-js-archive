import { WebStorageStateStore } from 'oidc-client'
import { UserManager } from 'oidc-react'

import fromEnv from 'config/fromEnv'

export const PREFIX_OIDC_USER_STORE = 'webseller_oidc_user.'

export const userStoreOidc = new WebStorageStateStore({ prefix: PREFIX_OIDC_USER_STORE, store: window.sessionStorage })
const stateStoreOidc = new WebStorageStateStore({ store: window.sessionStorage })

export const userManagerOidc = new UserManager({
  authority: fromEnv('REACT_APP_OIDC_AUTH_HOST'),
  client_id: 'appseller_web',
  redirect_uri: `${window.location.origin}/signin-oidc`,
  post_logout_redirect_uri: `${window.location.origin}/signout-callback-oidc`,
  scope: 'profile openid offline_access appseller wfm crmcc',
  automaticSilentRenew: true,
  client_secret: '9AB79D6C-0DDA-4539-8858-714D02F65535',
  monitorSession: true,
  silentRequestTimeoutInSeconds: 1,
  userStore: userStoreOidc,
  stateStore: stateStoreOidc
})

userManagerOidc.events.addUserSignedOut(() => {
  userManagerOidc.signoutRedirect()
})
