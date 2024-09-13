import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function AddittionInfoCell ({ children }) {
  AddittionInfoCell.propTypes = {
    children: PropTypes.string.isRequired
  }
  return (
    <Wrapper>{children}</Wrapper>
  )
}

const Wrapper = styled.div`
  opacity: 0.7;
`
