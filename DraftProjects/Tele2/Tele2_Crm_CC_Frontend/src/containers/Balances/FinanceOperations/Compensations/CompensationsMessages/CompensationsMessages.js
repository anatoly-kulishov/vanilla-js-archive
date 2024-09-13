import React, { useEffect, useRef } from 'react'
import { array } from 'prop-types'
import styled from 'styled-components'
import { colors } from 'utils/helpers'

export default function CompensationsMessages ({ compensationMessages }) {
  CompensationsMessages.propTypes = {
    compensationMessages: array
  }

  const messagesWrapperRef = useRef(null)

  useEffect(() => {
    messagesWrapperRef.current.scrollTop = messagesWrapperRef.current.scrollHeight
  })

  return (
    <MessagesWrapper ref={messagesWrapperRef}>
      {compensationMessages?.map(({ error }, idx) => (
        <Message key={idx} backgroundColor={colors[error.type]}>
          <MessageContent>{error?.data?.length ? error.data : []}</MessageContent>
        </Message>
      ))}
    </MessagesWrapper>
  )
}

const MessagesWrapper = styled.div`
  border-left: 1px solid #f0f0f0;
  overflow-y: auto;
`
const Message = styled.div`
  background-color: ${props => props.backgroundColor};
  border-radius: 10px;
  margin: 10px 0;
  :first-child {
    margin-top: 0;
  }
`
const MessageContent = styled.div`
  padding: 10px;
`
