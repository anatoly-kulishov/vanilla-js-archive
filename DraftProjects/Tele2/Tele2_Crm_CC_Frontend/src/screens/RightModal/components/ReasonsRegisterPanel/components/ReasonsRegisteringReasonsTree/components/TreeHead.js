/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Tooltip } from 'antd'

import ArrowIcon from '../assets/arrow.svg'
import BranchActions from './BranchActions'

const TreeHead = props => {
  TreeHead.propTypes = {
    isTreeCollapsed: PropTypes.bool,
    onTitleClick: PropTypes.func,
    onCategoryClick: PropTypes.func,
    onArrowClick: PropTypes.func,
    columns: PropTypes.object,
    categorySearchId: PropTypes.object
  }
  const {
    isTreeCollapsed,
    onTitleClick,
    onCategoryClick,
    onArrowClick,
    columns,
    categorySearchId
  } = props

  return (
    <Wrapper>
      <Arrow isActive={!isTreeCollapsed} onClick={onArrowClick} />
      <HeadTitle onClick={onTitleClick}>Название причины</HeadTitle>
      <ColumnWrapper>
        {columns.map((item, index) => (
          <Column>
            <ColumnBranchCheckboxSelector id={`column-t2_CategoryId_${index}`} />
            <Tooltip key={index} title={item.CategoryName}>
              <ColumnTitle
                bold={item.CategoryId === categorySearchId}
                onClick={() =>
                  item.CategoryId === categorySearchId
                    ? onCategoryClick({ field: 'categoryId', value: '' })
                    : onCategoryClick({ field: 'categoryId', value: item.CategoryId })
                }
              >
                {item.ShortName}
              </ColumnTitle>
            </Tooltip>
          </Column>
        ))}
        <BranchActions isVisible={false} />
      </ColumnWrapper>
    </Wrapper>
  )
}

export default TreeHead

const Wrapper = styled.div`
  background-color: #ecfafe;
  padding: 12px 30px 12px 25px;
  display: flex;
  align-items: center;
  z-index: 1;
`

const HeadTitle = styled.div`
  font-size: 14px;
  color: #999999;
  min-width: 50%;
  max-width: 335px;
  cursor: pointer;
  z-index: 2;
`

const ColumnWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  transform: translateX(-1%);
  z-index: 2;
`

const Column = styled.div`
`

const ColumnTitle = styled.div`
  font-size: 14px;
  cursor: pointer;
  transition: color, font-weight .01s ease-out;
  color: ${({ bold }) => bold ? css`#000` : css`#999999`};
  font-weight: ${({ bold }) => bold ? css`bold` : css`400`};
  z-index: 2;
  width: 45px;
  white-space: pre;
`

const ColumnBranchCheckboxSelector = styled.div`
  position: absolute;
  height: 100vh;
  width: 34px;
  top: 34px;
  opacity: 0.5;
`

const Arrow = styled(ArrowIcon)`
  min-width: 15px;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  transition: transform 0.15s ease-out;
  transform: ${({ isActive }) => isActive ? css`rotate(180deg)` : css`rotate(90deg)`};
  z-index: 2;
`
