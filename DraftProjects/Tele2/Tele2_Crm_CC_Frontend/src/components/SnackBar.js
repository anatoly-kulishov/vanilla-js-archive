import React from 'react'
import { oneOfType, string, elementType } from 'prop-types'
import styled from 'styled-components'

export default function SnackBar ({ children, color, ...rest }) {
  SnackBar.propTypes = {
    children: oneOfType([string, elementType]),
    color: string
  }

  return (
    <Wrapper color={color} {...rest}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px 25px;
  transition: background-color 0.3s ease-out;
  background-color: ${({ color }) => color};
`
