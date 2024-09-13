import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import HistoryNavigation from './HistoryNavigation'

export default function HistoryHeader ({ cardMode, user }) {
  HistoryHeader.propTypes = {
    cardMode: PropTypes.number.isRequired,
    user: PropTypes.object
  }

  return (
    <Wrapper data-cy='historyHeader'>
      <Title>История</Title>
      <HistoryNavigation cardMode={cardMode} user={user} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0 10px;
  height: 100%;
  border-bottom: 1px solid #e4e4e9;
`
const Title = styled.h3`
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 16px;
  font-family: T2HalvarBreit_ExtraBold;
  margin: 0;
`
