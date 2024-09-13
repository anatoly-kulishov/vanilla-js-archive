import React, { useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { IN, OUT } from 'constants/diagnosticManagerMessage'
import DiagnosticLoader from '../components/Message/TypingLoader'
import MessageIn from '../components/Message/MessageIn'
import MessageOut from '../components/Message/MessageOut'

function MessagesArea (props) {
  MessagesArea.propTypes = {
    height: PropTypes.number,
    Messages: PropTypes.array,
    IsDiagnosticLoading: PropTypes.bool
  }
  const { Messages: messages, IsDiagnosticLoading: isDiagnosticLoading } = props
  const wrapperRef = createRef()

  useEffect(() => {
    wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight
  })

  return (
    <Wrapper ref={wrapperRef}>
      {isDiagnosticLoading && <LoaderWrapper><DiagnosticLoader /></LoaderWrapper>}
      {messages && messages.map((item, index) => {
        switch (item.messageType) {
          case IN: return <MessageIn key={index} {...item} />
          case OUT: return <MessageOut key={index} {...item} />
          default: return null
        }
      })}
    </Wrapper>
  )
}

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  ...state.diagnosticManager.diagnosticManager
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesArea)

const Wrapper = styled.div`
  transition: height 0.2s ease-in;
  display: grid;
  padding: 6px 21px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: unset;
  }
  ::-webkit-scrollbar-thumb {
    background: #e0e0e0;
  }
`
const LoaderWrapper = styled.div`
  padding: 7px 21px;
  display: flex;
  justify-content: center;
`
