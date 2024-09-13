import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import conversationPropType from 'constants/conversationPropType'

import messagePropType from '../../constants/messagePropType'
import Toolbar from './containers/Toolbar'
import Editor from './containers/Editor'
import Message from './components/Message'
import MessageSkeleton from './components/MessagesSkeleton'
import { isoDateSorter } from 'utils/helpers'

const style = { fontSize: 24 }
function Workspace ({ isMessagesLoading, messages, queryParams: { conversationId }, fetchMessages }) {
  useEffect(() => {
    fetchMessages({ conversationId })
  }, [conversationId])

  const [isEditorEnabled, toggleEditor] = useState(false)

  const sortMessages = () => {
    const sortingMessages = [...messages]
    return sortingMessages?.sort((messageA, messageB) => isoDateSorter(messageB.CreatedOn, messageA.CreatedOn))
  }

  return (
    <Wrapper>
      <ToolbarWrapper>
        <Toolbar toggleEditor={toggleEditor} isEditorEnabled={isEditorEnabled} />
        {isEditorEnabled && <Editor toggleEditor={toggleEditor} />}
      </ToolbarWrapper>
      <Spin spinning={isMessagesLoading} indicator={<LoadingOutlined style={style} spin />}>
        <MessagesWrapper>
          {isMessagesLoading && <MessageSkeleton />}
          {!isMessagesLoading && sortMessages().map((message, index) => <Message key={index} {...message} />)}
        </MessagesWrapper>
      </Spin>
    </Wrapper>
  )
}

Workspace.propTypes = {
  isMessagesLoading: PropTypes.bool,
  queryParams: PropTypes.shape({
    conversationId: PropTypes.string
  }),
  messages: PropTypes.arrayOf(messagePropType),
  currentConversation: PropTypes.arrayOf(conversationPropType),
  fetchMessages: PropTypes.func
}

export default Workspace

const Wrapper = styled.div`
  overflow-y: auto;
`
const ToolbarWrapper = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
`
const MessagesWrapper = styled.div`
  z-index: 0;
`
