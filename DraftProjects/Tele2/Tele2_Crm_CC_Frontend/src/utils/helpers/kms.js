import { notification } from 'antd'
import open from 'utils/helpers/windowOpener'
import fromEnv from 'config/fromEnv'

const pathKms = fromEnv('REACT_APP_KMS_DEFAULT')
const pathKmsSearch = fromEnv('REACT_APP_KMS_SEARCH')

export const handleQueryToKms = (query, handlingId, personalAccount) => {
  if (personalAccount) {
    const { ClientCategory, BillingBranchId, AdvertisingAgreement, Msisdn, SubscriberId, ClientId } = personalAccount

    const currentJurClientTypeId = ClientCategory === 'B2B' ? 2 : 1

    open(
      pathKmsSearch +
        '/search/external/' +
        '?searchQuery=' +
        query +
        '&MSISDN=' +
        Msisdn +
        '&externalFilter=GF_REGION%3A' +
        BillingBranchId +
        '&externalFilter=GF_UR_CUSTOMER_TYPE%3A' +
        currentJurClientTypeId +
        '&handlingId=' +
        handlingId +
        '&subscriberId=' +
        SubscriberId +
        '&clientId=' +
        ClientId +
        '&advertisingAgreement=' +
        AdvertisingAgreement
    )
  } else {
    open(`${pathKmsSearch}/search/external/?externalFilter=GF_REGION:''&searchQuery=${query}`)
  }
}

export const openKmsArticle = itemId => {
  open(fromEnv('REACT_APP_KMS_API_OPEN_ARTICLE') + '?item_id=' + itemId)
}

export default function openKms ({ personalAccount, handlingId, isButtonClick }) {
  const {
    ParentClientInfo,
    SubscriberFullInfo,
    BillingBranchId,
    ClientCategory,
    ClientId,
    Msisdn,
    SubscriberId,
    AdvertisingAgreement
  } = personalAccount
  const ClientName = ParentClientInfo?.ClientName
  const { SubscriberFullName: Name } = SubscriberFullInfo?.SubscriberInfo ?? {}

  const currentJurClientTypeId = ClientCategory === 'B2B' ? 2 : 1

  const isPersonalInfo = Msisdn && BillingBranchId && (Name || ClientName)
  const anonymCardRedirectKMS = 1
  if (isPersonalInfo) {
    open(
      pathKmsSearch +
        '/search/external/' +
        '?redirectToHomepage=true' +
        '&MSISDN=' +
        Msisdn +
        '&externalFilter=GF_REGION%3A' +
        BillingBranchId +
        '&externalFilter=GF_UR_CUSTOMER_TYPE%3A' +
        currentJurClientTypeId +
        '&handlingId=' +
        handlingId +
        '&subscriberId=' +
        SubscriberId +
        '&clientId=' +
        ClientId +
        '&advertisingAgreement=' +
        AdvertisingAgreement +
        '&crm_isFocus=' +
        isButtonClick,
      `CRMKMS`
    )
  } else {
    if (!BillingBranchId) {
      notification.open({
        message: `Ошибка перехода в Базу знаний`,
        description: 'Выберите регион для перехода в Базу Знаний',
        type: 'warning'
      })
    } else {
      open(
        pathKmsSearch +
          '/search/external/' +
          '?MSISDN=' +
          Msisdn +
          '&externalFilter=GF_REGION%3A' +
          BillingBranchId +
          '&externalFilter=GF_UR_CUSTOMER_TYPE%3A' +
          anonymCardRedirectKMS +
          '&crm_isFocus=' +
          isButtonClick,
        `CRMKMS`
      )
    }
  }
}

export const prepareImages = htmlText => {
  if (typeof htmlText === 'string') {
    return htmlText.replaceAll(/src=("|')\/(.+)("|')/g, `src=$1${pathKms}/$2$1`) // replace relative url with full
  }
  return htmlText
}
