import { call, select } from 'redux-saga/effects'

import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import safeGetWhoIsIt from '../../helpers/safeGetters/safeGetWhoIsIt'

export function * websellerPreprocessMassProblemForRegionSaga (payload) {
  try {
    const { branches } = yield select(selectActiveSalesOffice)
    const { BillingBranchId: clientRegion } = yield call(safeGetWhoIsIt)

    const sellerRegions = branches?.map(({ id }) => id) || []

    const regionsSet = new Set([...payload.Regions, ...sellerRegions, clientRegion])
    const regions = Array.from(regionsSet)

    return {
      ...payload,
      Regions: regions
    }
  } catch {
    return payload
  }
}
