import { all, takeEvery } from 'redux-saga/effects'

import {
  FETCH_CURRENT_CONVERSATION,
  FETCH_SENDERS_CONVERSATIONS,
  SET_WORK_STATUS,
  SET_DELAY_STATUS,
  FETCH_IDENTIFY_CONVERSATION,
  UDPATE_IDENTIFICATION_LEVEL,
  FETCH_IDENTIFICATION_LEVELS,
  SET_CLOSE_STATUS
} from 'reducers/twinspot/conversationsReducer'
import { FETCH_CUVO_LINK, FETCH_MESSAGES, SEND_MESSAGE, UPLOAD_FILE } from 'reducers/twinspot/messagesReducer'
import { FETCH_MESSAGE_TEMPLATES } from 'reducers/twinspot/messageTemplatesReducer'

import {
  fetchCurrentConversationSaga,
  fetchSendersConversationsSaga,
  setWorkStatusSaga,
  setDelayStatusSaga,
  fetchIdentifyConversationSaga,
  updateIdentificationLevelSaga,
  fetchIdentificationLevelsSaga,
  setCloseStatusSaga
} from './conversationsSaga'
import { fetchCuvoLinkSaga, fetchMessagesSaga, sendMessageSaga, uploadFileSaga } from './messagesSaga'
import { fetchMessageTemplatesSaga } from './messageTemplatesSaga'

export default function * () {
  yield all([
    takeEvery(FETCH_CURRENT_CONVERSATION, fetchCurrentConversationSaga),
    takeEvery(FETCH_SENDERS_CONVERSATIONS, fetchSendersConversationsSaga),
    takeEvery(SET_WORK_STATUS, setWorkStatusSaga),
    takeEvery(SET_DELAY_STATUS, setDelayStatusSaga),
    takeEvery(SET_CLOSE_STATUS, setCloseStatusSaga),
    takeEvery(UDPATE_IDENTIFICATION_LEVEL, updateIdentificationLevelSaga),
    takeEvery(FETCH_IDENTIFY_CONVERSATION, fetchIdentifyConversationSaga),
    takeEvery(FETCH_IDENTIFICATION_LEVELS, fetchIdentificationLevelsSaga),

    takeEvery(FETCH_MESSAGES, fetchMessagesSaga),
    takeEvery(SEND_MESSAGE, sendMessageSaga),
    takeEvery(UPLOAD_FILE, uploadFileSaga),
    takeEvery(FETCH_CUVO_LINK, fetchCuvoLinkSaga),

    takeEvery(FETCH_MESSAGE_TEMPLATES, fetchMessageTemplatesSaga)
  ])
}
