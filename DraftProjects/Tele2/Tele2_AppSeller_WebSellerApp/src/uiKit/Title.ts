import styled from 'styled-components';
import { Font } from '../styles';

type Props = {
  align?: 'left' | 'right';
  marginBottom?: number;
  fontSize?: number;
  bold?: boolean;
  fontFamily?: Font;
};

// TODO font-family
const Title = styled.p<Props>`
  margin: 0;
  text-align: ${({ align = 'left' }) => align};
  margin-bottom: ${({ marginBottom = 0 }) => marginBottom}px;
  font-family: ${({ fontFamily }) => fontFamily || Font.T2_REGULAR}, sans-serif;
  font-size: ${({ fontSize = 14 }) => fontSize}px;
  line-height: normal;
`;

export default Title;
