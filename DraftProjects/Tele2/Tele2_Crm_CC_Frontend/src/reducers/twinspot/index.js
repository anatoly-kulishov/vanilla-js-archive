import { combineReducers } from 'redux'

import conversations from './conversationsReducer'
import messages from './messagesReducer'
import messageTemplates from './messageTemplatesReducer'

export default combineReducers({
  conversations,
  messages,
  messageTemplates
})
