import styled from 'styled-components'

const Scrollable = styled.div`
  max-height: ${({ maxHeight }) => maxHeight}px;
  overflow: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }
`

export default Scrollable
