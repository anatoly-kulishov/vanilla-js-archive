import styled from 'styled-components'

const Label = styled.label`
  font-family: T2_Rooftop_Regular;
  font-size: 14px;
  line-height: normal;

  &&& {
    font-weight: ${({ bold = false }) => (bold ? 700 : 400)};
  }
`

export default Label
