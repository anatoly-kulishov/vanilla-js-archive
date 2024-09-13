import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import { Message, MessageO } from 'assets'

import styled from 'styled-components'

const CoveragesAndOfficesNoteButton = props => {
  CoveragesAndOfficesNoteButton.propTypes = {
    record: PropTypes.object,
    interactions: PropTypes.array,
    onClick: PropTypes.func
  }

  const { record, interactions, onClick } = props

  const { RelationId } = record
  const hasNote = useMemo(
    () =>
      RelationId && interactions.length > 0 && interactions.find(interaction => interaction.RelationId === RelationId),
    [record, interactions]
  )

  const handleClick = useCallback(
    event => {
      event.stopPropagation()
      if (!hasNote) {
        onClick(record)
      }
    },
    [hasNote, record]
  )

  return (
    <IconWrapper onClick={handleClick} cursor={hasNote ? 'default' : 'pointer'}>
      {hasNote ? <Message /> : <MessageO />}
    </IconWrapper>
  )
}

const IconWrapper = styled.div`
  margin-left: 4px;
  margin-top: 11px;
  &:hover {
    cursor: pointer;
  }
`

export default CoveragesAndOfficesNoteButton
