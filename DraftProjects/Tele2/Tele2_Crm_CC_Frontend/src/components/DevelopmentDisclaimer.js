import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DevelopmentDisclaimer = ({ isBordered, isColored, message }) => (
  <Wrapper isBordered={isBordered} isColored={isColored}>
    {`👷` + message + `🚜` + `👷`}
  </Wrapper>
)

export default DevelopmentDisclaimer

DevelopmentDisclaimer.propTypes = {
  isBordered: PropTypes.bool,
  isColored: PropTypes.bool,
  message: PropTypes.string
}

const Wrapper = styled.div`
  background-color: ${props => (props.isColored ? '#fffbe6' : 'white')};
  border: ${props => (props.isBordered ? '1px solid #ffe58f' : '0')};
  padding: 20px;
  margin-right: 30px;
  margin-bottom: 15px;
  border-radius: 4px;
`
