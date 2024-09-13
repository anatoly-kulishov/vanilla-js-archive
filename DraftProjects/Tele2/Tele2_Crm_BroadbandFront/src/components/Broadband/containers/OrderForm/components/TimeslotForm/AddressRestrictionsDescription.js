import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

const AddressRestrictionsDescription = props => {
  const { text } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = useCallback(() => setIsExpanded(!isExpanded), [isExpanded])

  const toggleElement = (
    <StyledText underline onClick={handleExpand}>
      {isExpanded ? 'Свернуть' : 'Развернуть'}
    </StyledText>
  )

  return (
    <DescriptionWrapper>
      <Text isExpanded={isExpanded} dangerouslySetInnerHTML={{ __html: text }} />
      {toggleElement}
    </DescriptionWrapper>
  )
}

export default AddressRestrictionsDescription

const DescriptionWrapper = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 8px;
  min-height: 34px;
  padding: 4px 11px;

  div.ant-typography,
  .ant-typography p {
    margin-bottom: 0;
  }
`

const Text = styled.div`
  white-space: ${props => (props.isExpanded ? 'pre-line' : 'nowrap')};
  overflow: hidden;
  flex-shrink: 1;
  text-overflow: ${props => (props.isExpanded ? 'unset' : 'ellipsis')};
`

const StyledText = styled.div`
  color: #44caff;
`
