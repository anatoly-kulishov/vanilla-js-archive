/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { arrayOf, object, string, shape, objectOf, func, number } from 'prop-types'
import { Tooltip, notification } from 'antd'
import { UserOutlined, LikeOutlined, BookOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router'

import KmsSearchLine from 'containers/KmsSearchLine'
import conversationPropType from 'constants/conversationPropType'
import ErrorBoundary from 'components/ErrorBoundary'
import { UpdateIdentificationLevelModal } from 'components/UpdateIdentificationLevelModal'
import { checkRight } from 'utils/helpers'

import HeaderButton from '../../components/HeaderButton'
import HeaderTabButton from 'routes/components/HeaderTabButton'
import { isEqual } from 'lodash'
// import { PersonalAccountStateProps } from 'constants/personalAccount'

export default function TwinspotHeader (props) {
  const { userState: { user }, feedbackModalOpen, queryParams, identificationLevels, currentConversation, channels } = props
  const isDeveloper = checkRight(user, 'CC:ShowInDevelopment')
  const { hash } = useLocation()

  const [isModalVisible, setModalVisible] = useState(false)
  const [handlingChannel, setHandlingChannel] = useState('')

  useEffect(() => {
    const { channels, fetchChannels } = props
    if (channels.length === 0) {
      fetchChannels({ isForManualSearch: true })
    } else {
      setHandlingChannel(channels?.filter(channel => channel.Name === 'Email')?.[0]?.Id)
    }
  }, [channels])

  const conversationSubTitle = queryParams?.conversationId.toString() || 'Не определено'

  const getClientSubTitle = () => {
    if (!isEqual(queryParams?.clientId, currentConversation?.ClientId?.toString())) {
      return currentConversation?.ClientId?.toString()
    } else {
      return queryParams?.clientId || currentConversation?.ClientId?.toString() || 'Не определен'
    }
  }

  const getClientSearchParams = () => {
    const searchParams = new URLSearchParams(window.location.search)
    if (!queryParams?.email) {
      searchParams.append('email', currentConversation?.From)
    }
    if (currentConversation?.ClientId && !queryParams?.clientId) {
      searchParams.append('clientId', currentConversation?.ClientId)
    }
    if (currentConversation?.BranchId && !queryParams?.branchId) {
      searchParams.append('branchId', currentConversation?.BranchId)
    }
    if (!isEqual(queryParams?.clientId, currentConversation?.ClientId?.toString())) {
      searchParams.set('clientId', currentConversation?.ClientId)
    }
    if (!isEqual(queryParams?.branchId, currentConversation?.BranchId?.toString())) {
      searchParams.set('branchId', currentConversation?.BranchId)
    }
    if (currentConversation?.LastUsedChannelId === null) {
      searchParams.set('serviceChannelId', handlingChannel)
    } else {
      searchParams.set('serviceChannelId', currentConversation?.LastUsedChannelId)
    }

    return searchParams.toString()
  }

  const handleUpdatingIdentificationLevel = () => {
    const { fetchIdentificationLevels } = props

    if (!(currentConversation?.ClientId && currentConversation?.BranchId)) {
      notification.error({
        message: 'Ошибка идентификации',
        description: 'Необходимо осуществить первоначальную идентификацию для смены уровня'
      })
    } else {
      fetchIdentificationLevels({ id: currentConversation?.IdentificationLevelId })
      setModalVisible(true)
    }
  }

  const handleUpdating = (id) => {
    const { updateIdentificationLevel } = props
    updateIdentificationLevel({
      conversationId: currentConversation?.ConversationId,
      from: currentConversation?.From,
      clientId: currentConversation?.ClientId,
      clientName: currentConversation?.ClientName,
      branchId: currentConversation?.BranchId,
      identificationLevelId: id
    })
    setModalVisible(false)
  }

  return (
    <ErrorBoundary>
      <UpdateIdentificationLevelModal
        isVisible={isModalVisible}
        identificationLevels={identificationLevels}
        onUpdate={handleUpdating}
        onCancel={() => { setModalVisible(false) }}
      />
      <TopNav>
        <Tabs>
          <HeaderTabButton
            title='Обращение'
            subtitle={conversationSubTitle}
            to={{
              pathname: '/twinspot/dialog',
              search: window.location.search + hash
            }}
          />
          <HeaderTabButton
            title='Клиент'
            subtitle={getClientSubTitle()}
            to={{
              pathname: '/twinspot/card/main/balance',
              search: getClientSearchParams() + hash
            }}
            newTab
          />
          {currentConversation?.IdentificationLevelName && <HeaderTabButton
            title='Идентификация'
            subtitle={currentConversation?.IdentificationLevelName}
            onClick={() => handleUpdatingIdentificationLevel()}
          />}
        </Tabs>
        <Tools>
          <KmsSearchLine>
            <HeaderButton icon={<BookOutlined />} >
              KMS
            </HeaderButton>
          </KmsSearchLine>
          <HeaderButton icon={<LikeOutlined />} onClick={feedbackModalOpen}>
            Обратная связь
          </HeaderButton>
          <Tooltip placement='bottom' title={user.DisplayName}>
            <User>{isDeveloper ? <EmojiWrapper>👷</EmojiWrapper> : <UserOutlined />}</User>
          </Tooltip>
        </Tools>
      </TopNav>
    </ErrorBoundary>
  )
}

TwinspotHeader.propTypes = {
  userState: object,
  feedbackModalOpen: func,
  updateIdentificationLevel: func,
  fetchIdentificationLevels: func,
  queryParams: shape({
    conversationId: string,
    clientId: string,
    branchId: string,
    email: string
  }),
  identificationLevels: arrayOf(objectOf({
    IdentificationLevelId: number,
    IdentificationLevelName: string
  })),
  currentConversation: conversationPropType,
  channels: arrayOf(object),
  fetchChannels: func
}

const TopNav = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  background-color: #24272d;
  width: 100%;
  height: 60px;
  padding: 0 16px;
  z-index: 1001;
`
const User = styled.li`
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
  font-weight: normal;
  font-size: 18px;
  margin: 0 5px;
  position: relative;
  top: -2px;
`
const EmojiWrapper = styled.div`
  font-size: 20px;
`
const Tools = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
const Tabs = styled.div`
  justify-content: flex-start;
  display: flex;
  font-weight: bold;
`
