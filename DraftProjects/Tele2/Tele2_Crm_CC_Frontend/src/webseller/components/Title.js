import styled from 'styled-components'
import { T2_ROOFTOP_MEDIUM } from 'webseller/helpers/styles'

const Title = styled.p`
  margin: 0;
  text-align: ${({ align = 'left' }) => align};
  margin-bottom: ${({ marginBottom = 0 }) => marginBottom}px;
  font-family: ${({ fontFamily }) => fontFamily || T2_ROOFTOP_MEDIUM}, sans-serif;
  font-size: ${({ fontSize = 14 }) => fontSize}px;
  font-weight: ${({ bold = false }) => (bold ? 700 : 400)};
  line-height: normal;
`

export default Title
