import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

function Card ({ children, title, isNested, isHidden }) {
  Card.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    isNested: PropTypes.bool,
    isHidden: PropTypes.bool
  }
  Card.defaultProps = {
    isNested: false,
    isHidden: false
  }

  if (!isHidden) {
    return (
      <CardWrapper hidden={isHidden} isNested={isNested}>
        {title && <CardTitle>{title}</CardTitle>}
        {children}
      </CardWrapper>
    )
  }
  return null
}

function ExtendableCardPanel ({ children }) {
  ExtendableCardPanel.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
  }
  return <PanelWrapper>{children}</PanelWrapper>
}

export default {
  ExtendableCardPanel,
  Card
}

const PanelWrapper = styled.div`
  margin-right: 30px;
  background-color: transparent;
`

const CardWrapper = styled.div`
  background-color: white;
  box-shadow: 0 0px 10px rgba(32,33,36,0.08);
  border-radius: 10px;
  ${({ isNested }) => css`
    padding: ${!isNested ? css`20px` : css`0`};
    :not(:last-child) {
      margin-bottom: ${!isNested ? css`15px` : css`30px`};
    }
    box-shadow: none;
  `}
`

const CardTitle = styled.h1`
  margin-bottom: 15px;
  font-size: 16px;
  font-family: T2HalvarBreit_ExtraBold;
`
