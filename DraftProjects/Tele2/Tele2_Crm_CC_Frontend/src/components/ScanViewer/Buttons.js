import React from 'react'
import styled, { css } from 'styled-components'
import {
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
  AimOutlined,
  CaretLeftOutlined,
  CaretRightOutlined
} from '@ant-design/icons'
import { Tooltip } from 'antd'

export const PrevButton = ({ onClick }) => (
  <PrevButtonStyled onClick={onClick}>
    <LeftOutlined />
  </PrevButtonStyled>
)
export const NextButton = ({ onClick }) => (
  <NextButtonStyled onClick={onClick}>
    <RightOutlined />
  </NextButtonStyled>
)
export const ZoomInButton = ({ onClick }) => (
  <ZoomInButtonStyled onClick={onClick}>
    <PlusOutlined />
  </ZoomInButtonStyled>
)
export const ZoomOutButton = ({ onClick }) => (
  <ZoomOutButtonStyled onClick={onClick}>
    <MinusOutlined />
  </ZoomOutButtonStyled>
)
export const ResetButton = ({ onClick }) => (
  <ResetButtonStyled onClick={onClick}>
    <AimOutlined />
  </ResetButtonStyled>
)
export const ChooseNextBox = ({ onClick }) => (
  <Tooltip title='Выбрать следующее совпадение' placement='left'>
    <ChooseNextBoxStyled onClick={onClick}>
      <CaretRightOutlined />
    </ChooseNextBoxStyled>
  </Tooltip>
)
export const ChoosePrevBox = ({ onClick }) => (
  <Tooltip title='Выбрать предыдущее совпадение' placement='left'>
    <ChoosePrevBoxStyled onClick={onClick}>
      <CaretLeftOutlined />
    </ChoosePrevBoxStyled>
  </Tooltip>
)

const buttonStyles = css`
  position: absolute;
  background-color: rgba(238, 238, 238, 0.7);
  border: 0;
  border-radius: 4px;
  cursor: pointer;
`

const PrevButtonStyled = styled.button`
  ${buttonStyles};
  left: 8px;
`

const NextButtonStyled = styled.button`
  ${buttonStyles};
  right: 8px;
`

export const ZoomInButtonStyled = styled.button`
  ${buttonStyles};
  right: 8px;
  top: 8px;
`

export const ResetButtonStyled = styled.button`
  ${buttonStyles};
  right: 8px;
  top: 36px;
`

export const ZoomOutButtonStyled = styled.button`
  ${buttonStyles};
  right: 8px;
  top: 64px;
`

export const ChooseNextBoxStyled = styled.button`
  ${buttonStyles};
  right: 8px;
  top: 116px;
`
export const ChoosePrevBoxStyled = styled.button`
  ${buttonStyles};
  right: 8px;
  top: 144px;
`
