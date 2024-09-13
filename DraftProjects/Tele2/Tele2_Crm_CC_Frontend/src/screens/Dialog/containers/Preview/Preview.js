/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import conversationPropType from 'constants/conversationPropType'
import { UpdateIdentificationLevelModal } from 'components/UpdateIdentificationLevelModal'

import InactiveDialogs from './InactiveDialogs'
import Identification from './components/Identification'
import { identificationLevelIds } from 'constants/twinspot'
import identifyConversationPropType from '../../constants/identifyConversationPropType'
import ManualSearchModal from '../../components/ManualSearchModal'
import { Button } from 'antd'

function Preview (props) {
  const {
    sendersConversations: { opened, closed },
    currentConversation,
    identifyConversation,
    identificationLevels,
    isIdentificationLevelsLoading,
    fetchIdentificationLevels,
    updateIdentificationLevel,
    isSendersConversationsLoading,
    channels
  } = props

  useEffect(() => {
    const { fetchChannels, channels } = props
    channels.length === 0 && fetchChannels({ isForManualSearch: true })
  }, [])

  useEffect(() => {
    const { fetchSendersConversations } = props

    const sender = currentConversation?.From
    if (sender) {
      fetchSendersConversations({ from: sender })
    }
  }, [currentConversation])

  const [isIdentifyModalVisible, setIdentifyModalVisible] = useState(false)
  const [isSearchModalVisible, setSearchModalVisible] = useState(false)
  const [currentClient, setCurrentClient] = useState({ isDs: false, client: null })

  const handleUpdatingIdentificationLevel = (isDs, client) => {
    if (isDs) {
      updateIdentificationLevel({
        ...client,
        identificationLevelId: identificationLevelIds.three
      })
    } else {
      fetchIdentificationLevels({ id: currentConversation?.IdentificationLevelId })
      setCurrentClient({ isDs, client })
      setIdentifyModalVisible(true)
    }
  }

  const handleUpdating = (id) => {
    const handlingChannel = channels?.filter(channel => channel.Name === 'Email')?.[0]?.Id

    updateIdentificationLevel({
      ...currentClient.client,
      identificationLevelId: id,
      conversationId: currentConversation?.ConversationId,
      lastUsedChannelId: handlingChannel
    })
    setCurrentClient(null)
    setIdentifyModalVisible(false)
    setSearchModalVisible(false)
  }

  const handleClientSearch = () => {
    const { fetchChannels, fetchIdentificationLevels } = props

    setSearchModalVisible(true)
    fetchIdentificationLevels({ id: currentConversation?.IdentificationLevelId })
    fetchChannels({ isForManualSearch: true })
  }

  return <Wrapper>
    <IdentificationWrapper>
      <ManualSearchModal
        isVisible={isSearchModalVisible}
        onCancel={() => setSearchModalVisible(false)}
        handleUpdatingIdentificationLevel={handleUpdatingIdentificationLevel}
      />
      <UpdateIdentificationLevelModal
        isVisible={isIdentifyModalVisible}
        identificationLevels={identificationLevels}
        onUpdate={handleUpdating}
        onCancel={() => setIdentifyModalVisible(false)}
      />
      <Identification
        currentConversation={currentConversation}
        identifyConversation={identifyConversation}
        identificationLevels={identificationLevels}
        isIdentificationLevelsLoading={isIdentificationLevelsLoading}
        handleUpdatingIdentificationLevel={handleUpdatingIdentificationLevel}
      />
      <SearchButton onClick={handleClientSearch}>Привязать клиента вручную</SearchButton>
    </IdentificationWrapper>
    <InactiveList>
      <InactiveDialogs isLoading={isSendersConversationsLoading} opened={opened} closed={closed} />
    </InactiveList>
  </Wrapper>
}

Preview.propTypes = {
  sendersConversations: PropTypes.shape({
    opened: PropTypes.arrayOf(conversationPropType),
    closed: PropTypes.arrayOf(conversationPropType)
  }),
  currentConversation: conversationPropType,
  fetchSendersConversations: PropTypes.func,
  identifyConversation: identifyConversationPropType,
  identificationLevels: PropTypes.arrayOf(PropTypes.shape({
    IdentificationLevelId: PropTypes.number,
    IdentificationLevelName: PropTypes.string
  })),
  isIdentificationLevelsLoading: PropTypes.bool,
  fetchIdentificationLevels: PropTypes.func,
  updateIdentificationLevel: PropTypes.func,
  fetchChannels: PropTypes.func,
  isSendersConversationsLoading: PropTypes.bool,
  channels: PropTypes.arrayOf(PropTypes.object)
}

export default Preview

const Wrapper = styled.div`
  background: white;
  height: calc(100vh - 60px);
  overflow-y: auto;
  position: sticky;
  top: 60px;
  display: flex;
  flex-direction: column;
  border-right: 1px #e7e7f0 solid;
`
const IdentificationWrapper = styled.div`
  border-bottom: 2px #e7e7f0 solid;
  padding: 12px;
  overflow-y: auto;
  flex: 1;
`
const SearchButton = styled(Button)`
  width: 100%;
`
const InactiveList = styled.div`
  overflow-y: auto;
  flex: 1;
`
