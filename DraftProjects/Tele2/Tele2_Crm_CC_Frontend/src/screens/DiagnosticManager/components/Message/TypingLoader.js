import styled, { keyframes } from 'styled-components'

const dotFalling = keyframes`
  0% {
    box-shadow: 9999px -15px 0 0 rgba(152, 128, 255, 0);
  }
  25%,
  50%,
  75% {
    box-shadow: 9999px 0 0 0 #40bfee;
  }
  100% {
    box-shadow: 9999px 15px 0 0 rgba(152, 128, 255, 0);
  }
`

const dotFallingBefore = keyframes`
  0% {
    box-shadow: 9984px -15px 0 0 rgba(152, 128, 255, 0);
  }
  25%,
  50%,
  75% {
    box-shadow: 9984px 0 0 0 #40bfee;
  }
  100% {
    box-shadow: 9984px 15px 0 0 rgba(152, 128, 255, 0);
  }
`

const dotFallingAfter = keyframes`
  0% {
    box-shadow: 10014px -15px 0 0 rgba(152, 128, 255, 0);
  }
  25%,
  50%,
  75% {
    box-shadow: 10014px 0 0 0 #40bfee;
  }
  100% {
    box-shadow: 10014px 15px 0 0 rgba(152, 128, 255, 0);
  }
`
const DiagnosticLoader = styled.div`
  position: relative;
  left: -9999px;
  width: 7px;
  height: 7px;
  border-radius: 5px;
  background-color: #40bfee;
  color: #40bfee;
  box-shadow: 9999px 0 0 0 #40bfee;
  animation: ${dotFalling} 1s infinite linear;
  animation-delay: .1s;

  :before, :after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  :before {
    width: 7px;
    height: 7px;
    border-radius: 5px;
    background-color: #40bfee;
    color: #40bfee;
    animation: ${dotFallingBefore} 1s infinite linear;
    animation-delay: 0s;
  }

  :after {
    width: 7px;
    height: 7px;
    border-radius: 5px;
    background-color: #40bfee;
    color: #40bfee;
    animation: ${dotFallingAfter} 1s infinite linear;
    animation-delay: .2s;
  }
`

export default DiagnosticLoader
