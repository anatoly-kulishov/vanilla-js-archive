/*
  Achtung!
  This code is a piece of shit.
  It will be change after global refactoring all ours backend.
*/
import { Modal } from 'antd'
import { isNil } from 'lodash'
import uuid from 'uuid'
import open from 'utils/helpers/windowOpener'

export const generateNewUrl = () => {
  const currentParams = new URLSearchParams(window.location.search)
  const newParams = new URLSearchParams()

  newParams.append('handlingTechId', uuid.v4())
  !isNil(currentParams.get('msisdn')) && newParams.append('msisdn', currentParams.get('msisdn'))
  !isNil(currentParams.get('email')) && newParams.append('email', currentParams.get('email'))
  !isNil(currentParams.get('interactionAddress')) && newParams.append('interactionAddress', currentParams.get('interactionAddress'))
  !isNil(currentParams.get('interactionType')) && newParams.append('interactionType', currentParams.get('interactionType'))
  !isNil(currentParams.get('serviceChannelId')) && newParams.append('serviceChannelId', currentParams.get('serviceChannelId'))
  !isNil(currentParams.get('eduId')) && newParams.append('eduId', currentParams.get('eduId'))
  !isNil(currentParams.get('dialogId')) && newParams.append('dialogId', currentParams.get('dialogId'))
  !isNil(currentParams.get('dialogChannel')) && newParams.append('dialogChannel', currentParams.get('dialogChannel'))
  !isNil(currentParams.get('dialogNickname')) && newParams.append('dialogNickname', currentParams.get('dialogNickname'))
  return newParams
}

export default (messageText) => {
  if (messageText.toUpperCase().includes('ОБРАЩЕНИЕ ЗАКРЫТО')) {
    const newUrl = new URL(window.location.href)

    newUrl.search = generateNewUrl().toString()

    Modal.confirm({
      title: 'Обращение уже закрыто. Открыть новое?',
      okText: 'Открыть новое обращение',
      cancelText: 'Отказаться',
      onOk: () => {
        open(newUrl.toString(), '_self')
      }
    })
    // Saga's notification disable
    return false
  } else {
    // Saga's notification will be displayed
    return true
  }
}
