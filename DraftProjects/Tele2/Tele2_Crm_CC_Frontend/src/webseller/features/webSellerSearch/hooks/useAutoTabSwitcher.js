import { WebSellerSearchMainTabsKeys, WebSellerSearchSubTabsKeys } from 'webseller/features/webSellerSearch/constants'

const useAutoTabSwitcher = (activeMainTabKey, activeSubTabKey, setActiveSubTabKey) => {
  switch (activeSubTabKey) {
    case WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER: {
      if (activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME) {
        setActiveSubTabKey(WebSellerSearchSubTabsKeys.INN)
      }
      return
    }
    case WebSellerSearchSubTabsKeys.INN: {
      if (activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER) {
        setActiveSubTabKey(WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER)
      }
      return
    }
    case WebSellerSearchSubTabsKeys.CLIENT_NAME: {
      if (
        activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
        activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME
      ) {
        setActiveSubTabKey(WebSellerSearchSubTabsKeys.OGRN)
      }
      return
    }
    case WebSellerSearchSubTabsKeys.OGRN: {
      if (
        activeMainTabKey === WebSellerSearchMainTabsKeys.MSISDN ||
        activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
        activeMainTabKey === WebSellerSearchMainTabsKeys.ICC
      ) {
        setActiveSubTabKey(WebSellerSearchSubTabsKeys.MANAGER_IDENTITY_DOCUMENT)
      }
      return
    }
    case WebSellerSearchSubTabsKeys.MANAGER_IDENTITY_DOCUMENT: {
      if (
        activeMainTabKey === WebSellerSearchMainTabsKeys.ICC ||
        activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
        activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME
      ) {
        setActiveSubTabKey(WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER)
      }
      return
    }
    default:
      return null
  }
}

export default useAutoTabSwitcher
