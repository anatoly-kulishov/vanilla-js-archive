import styled, { css } from 'styled-components'

const Tag = styled.button`
  ${({ onClick }) => onClick && css`cursor: pointer;`}
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  border-radius: 4px;
  line-height: 17px;
  font-size: 12px;
  padding: 2px 4px 2px 4px;
  margin-right: 10px;
  border: 1px solid;
  width: ${props => (props.width ? `${props.width}px` : 'unset')};
  background-color: ${props => {
    switch (props.color) {
      case 'green':
        return '#F6FFED'
      case 'grey':
        return '#F5F5F5'
      case 'yellow':
        return '#FFFDCE'
      case 'blue':
        return '#cee2ff'
      default:
        return '#FFF1F0'
    }
  }};
  border-color: ${props => {
    switch (props.color) {
      case 'green':
        return '#B7EB8F'
      case 'grey':
        return '#D9D9D9'
      case 'yellow':
        return '#ECE885'
      case 'blue':
        return '#8eafee'
      default:
        return '#FFA39E'
    }
  }};
  color: ${props => {
    switch (props.color) {
      case 'green':
        return '#52C41A'
      case 'grey':
        return '#595959'
      case 'yellow':
        return '#C4BD1A'
      case 'blue':
        return '#306ecb'
      default:
        return '#F5222D'
    }
  }};
`

export default Tag
