import { cardModes } from 'constants/cardModes'
import { clientCategories } from 'constants/personalAccountStrings'

export const getCardMode = (clientCategory, msisdn, appMode) => {
  switch (clientCategory.toUpperCase()) {
    case clientCategories.anonimous:
      return cardModes.anonymous
    case clientCategories.B2C:
      if (appMode === 'MixxCustomer') {
        return cardModes.leon
      }
      return cardModes.subscriber
    case clientCategories.B2B:
      if (msisdn) {
        return cardModes.subscriber
      }
      return cardModes.client
    default:
      return cardModes.unknown
  }
}
