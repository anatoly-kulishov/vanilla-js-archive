import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import HistoryHeader from './components/navigation/HistoryHeader'
import HistoryRouter from './HistoryRouter'

import { HistoryContextProvider } from './HistoryContext'

export default function History ({ user, cardMode }) {
  History.propTypes = {
    user: PropTypes.object,
    cardMode: PropTypes.number
  }

  return (
    <HistoryContextProvider>
      <Wrapper>
        <HistoryHeader cardMode={cardMode} user={user} />
        <HistoryRouter />
      </Wrapper>
    </HistoryContextProvider>
  )
}

const Wrapper = styled.div`
  margin-right: 30px;
  background-color: #ffffff;
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.08);
  border-radius: 10px;
`
