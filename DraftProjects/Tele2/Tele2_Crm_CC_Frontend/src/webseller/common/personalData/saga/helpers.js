import { select } from 'redux-saga/effects'
import { selectIdentityDocumentTypes } from '../selectors'

export function * getIdentityDocumentInfoById (typeId) {
  const identityDocumentTypes = yield select(selectIdentityDocumentTypes)

  const documentInfo = identityDocumentTypes?.find(document => document.id === Number(typeId)) || {}

  return {
    ruTitle: documentInfo.name,
    docOutType: documentInfo.docOutType,
    pcdbId: documentInfo.pcdbId
  }
}
