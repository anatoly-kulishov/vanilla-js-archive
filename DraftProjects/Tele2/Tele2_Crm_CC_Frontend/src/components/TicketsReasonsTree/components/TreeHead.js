/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import ArrowIcon from '../assets/arrow.svg'
import BranchActions from './BranchActions'
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'

const TreeHead = props => {
  TreeHead.propTypes = {
    onTitleClick: PropTypes.func,
    isTreeCollapsed: PropTypes.bool,
    onCategoryClick: PropTypes.func,
    onArrowClick: PropTypes.func,
    columns: PropTypes.array,
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

  if (!isTreeCollapsed) {
    return (
      <Wrapper>
        <Arrow isActive onClick={onArrowClick} />
        <HeadTitle onClick={onTitleClick}>Название услуги</HeadTitle>
        <ColumnWrapper>
          {columns && columns.map((item, id) => (
            <Tooltip key={id} title={item.CategoryName}>
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
          ))}
          <BranchActions isVisible={false} />
        </ColumnWrapper>
      </Wrapper>
    )
  } else {
    return null
  }
}

export default TreeHead

const Wrapper = styled.div`
  background-color: #ecfafe;
  padding: 12px 30px 12px 25px;
  display: ${props => (props.isTreeCollapsed ? 'none' : 'flex')};
  align-items: center;
  z-index: 1;
`

const HeadTitle = styled.div`
  font-size: 13px;
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
  z-index: 2;
`

const ColumnTitle = styled.div`
  font-size: 13px;
  color: ${props => (props.bold ? '#000' : '#999999')};
  cursor: pointer;
  font-weight: ${props => (props.bold ? 'bold' : '400')};
  z-index: 2;
`

const Arrow = styled(({ isActive, ...props }) => <ArrowIcon {...props} />)`
  min-width: 15px;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  transform: rotate(${props => (props.isActive ? '180deg' : '90deg')});
  z-index: 0;
  visibility: hidden;
`
