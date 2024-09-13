import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Preview from './containers/Preview'
import Workspace from './containers/Workspace'

function Dialog (props) {
  const { queryParams: { conversationId } } = props

  useEffect(() => {
    const { fetchConversations } = props
    fetchConversations({ conversationId: +conversationId })
  }, [conversationId])

  return (
    <Wrapper>
      <Preview />
      <Workspace />
    </Wrapper>
  )
}

Dialog.propTypes = {
  queryParams: PropTypes.shape({
    conversationId: PropTypes.string
  }),
  fetchConversations: PropTypes.func
}

export default Dialog

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 300px auto;
  color: black;
`
