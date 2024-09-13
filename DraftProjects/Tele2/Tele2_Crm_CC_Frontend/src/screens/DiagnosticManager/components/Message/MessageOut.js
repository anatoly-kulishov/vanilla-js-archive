import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function MessageOut (props) {
  MessageOut.propTypes = {
    stepName: PropTypes.string,
    text: PropTypes.string
  }
  const { stepName, text } = props
  return (
    <Wrapper>
      <StepName>{stepName}</StepName>
      <Answer>{text}</Answer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  white-space: pre-line;
  margin-bottom: 15px;
  padding: 10px;
  text-align: left;
  background: #CDF2FF;
  border-radius: 10px;

  margin-left: 35%;
  width: 65%;
  @media (max-width: 1300px) {
    width: 75%;
    margin-left: 25%;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin-left: 20%;
  }
`
const StepName = styled.div`
  color: #696F76;
  font-size: 9px;
`
const Answer = styled.div`
  color: black;
`
