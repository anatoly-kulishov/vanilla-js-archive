import styled from 'styled-components'

const ButtonGhost = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
  font-family: T2_Rooftop_Regular;
  font-size: 14px;
  line-height: normal;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default ButtonGhost
