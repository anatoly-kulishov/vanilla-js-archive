import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function FlagNameCell ({ children }) {
  FlagNameCell.propTypes = {
    children: PropTypes.string.isRequired
  }
  return (
    <Wrapper>{children}</Wrapper>
  )
}

const Wrapper = styled.h4`
  font-weight: bold;
  margin-left: -16px;
`
