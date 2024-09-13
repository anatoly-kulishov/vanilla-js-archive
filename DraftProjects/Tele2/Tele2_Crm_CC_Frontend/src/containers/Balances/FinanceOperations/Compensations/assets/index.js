import styled from 'styled-components'
import { ReactComponent as EraserIcon } from './eraser-icon.svg'

export const Eraser = styled(EraserIcon)`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-top: 5px;
  transition: transform 0.03s ease-out;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.97);
  }
`
