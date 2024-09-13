import React from 'react'
import { bool, string, func, oneOf, ReactComponentLike } from 'prop-types'
import styled, { css } from 'styled-components'

import { Button } from 'antd'

export default function UnderlineButton ({ isActive, onClick, children, variant, icon, ...rest }) {
  UnderlineButton.propTypes = {
    isActive: bool,
    children: string.isRequired,
    onClick: func,
    variant: oneOf(['primary', 'secondary']),
    icon: ReactComponentLike
  }

  UnderlineButton.defaultProps = {
    variant: 'primary'
  }

  return (
    <StyledButton icon={icon} type='link' variant={variant} onClick={onClick} isActive={isActive} {...rest}>
      {children}
    </StyledButton>
  )
}
const StyledButton = styled(Button)`
  ${({ variant, isActive }) => css`
    position: relative;
    padding: 0;
    &, :focus, :active {
      color: ${isActive ? css`#6edbff` : variant === 'primary' ? css`black` : css`#7f8285`};
    }
    :hover {
      color: ${variant === 'primary' ? css`black` : css`#7f8285`};
    }
    :hover ::after {
      border-color: #6edbff;
    }
    ::after {
      content: '';
      position: absolute;
      border-bottom-style: dotted;
      bottom: 4px;
      left: 0;
      width: 100%;
      border-bottom: 1px solid #7f8285;
      transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      border-bottom-style: ${variant === 'primary' ? css`solid` : css`dashed`};
  `}
`
