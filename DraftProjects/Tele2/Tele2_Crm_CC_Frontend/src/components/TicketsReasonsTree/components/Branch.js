/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import Checkbox from 'components/Checkbox'
import ArrowIcon from '../assets/arrow.svg'
import BranchActions from './BranchActions'
import BranchCheckbox from './BranchCheckbox'

import VisibilitySensor from 'react-visibility-sensor'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'

class Branch extends Component {
  static propTypes = {
    nesting: PropTypes.number,
    rowActions: PropTypes.object,
    onSelectReasonCategory: PropTypes.func,
    columns: PropTypes.array,
    reason: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      isChildrenToggled: false,
      isCategorySelected: false
    }
  }

  componentDidMount () {
    const { reason } = this.props

    this.setState({
      isChildrenToggled: reason.IsExpanded
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.isVisible
  }

  toggleChildren = () => {
    this.setState({
      isChildrenToggled: !this.state.isChildrenToggled
    })
  }

  renderChildren (children, nesting) {
    const { rowActions, columns, onSelectReasonCategory } = this.props
    return children.map((child, index) => (
      <Branch
        key={index}
        reason={child}
        nesting={nesting + 1}
        columns={columns}
        rowActions={rowActions}
        onSelectReasonCategory={onSelectReasonCategory}
      />
    ))
  }

  renderCategories () {
    const { onSelectReasonCategory, columns, reason } = this.props
    const { Categories } = reason

    const possibleCategoriesIds = columns.map(item => item.CategoryId)

    if (Categories && Categories.length) {
      return possibleCategoriesIds.map((possibleCategoryId, key) => {
        const category = Categories.find((someCategory) => {
          return someCategory.CategoryId === possibleCategoryId
        })

        if (category && category.IsEscalationAllowed) {
          return (
            <BranchCheckbox
              reason={reason}
              key={key}
              onSelectReasonCategory={() => onSelectReasonCategory({ reason, category })}
            />
          )
        } else {
          return <Checkbox key={key} isVisible={false} />
        }
      })
    }
    return null
  }

  onVisibilityChanged = debounce(isVisible => {
    if (isVisible !== this.state.isVisible) {
      this.setState({
        isVisible
      })
    }
  }, 500)

  render () {
    const { reason, nesting, rowActions } = this.props
    const { isChildrenToggled } = this.state

    const width = nesting > 0 && `calc(50% - ${12.5 * nesting + 'px'})`
    const children = reason.Children
    const isChildren = children && children.length > 0
    const reasonId = reason.ReasonId

    const isNotForUse = reason.IsNotForUse
    return (
      <VisibilitySensor
        key='sensor-one'
        partialVisibility
        onChange={this.onVisibilityChanged}
        offset={{ top: -500, bottom: -500 }}
      >
        <Wrapper isChild={nesting > 0} id={`reason-${reasonId}`}>
          <Layer onClick={() => this.toggleChildren()} />
          {isChildren && (
            <Arrow isActive={isChildrenToggled} onClick={() => this.toggleChildren()} />
          )}
          <Title
            onClick={() => this.toggleChildren()}
            isChildren={isChildren}
            bold={isChildrenToggled}
            minWidth={width}
          >
            {reason.ReasonName}
          </Title>
          <CategoriesWrapper>
            {!isNotForUse && this.renderCategories()}
            <BranchActions actions={rowActions} reason={reason} />
          </CategoriesWrapper>
          <ChildWrapper isVisible={isChildrenToggled}>
            {isChildrenToggled && children?.length && this.renderChildren(children, nesting)}
          </ChildWrapper>
        </Wrapper>
      </VisibilitySensor>
    )
  }
}

export default Branch

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  padding: ${props => (props.isChild ? '0 0 0 25px' : '0 10px 0 25px;')};
`

const Layer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.5;

  &:hover {
    background: #48bfec !important;
  }
`

const ChildWrapper = styled.div`
  opacity: ${props => (props.isVisible ? 'block' : 'none')};
  overflow: hidden;
  width: 100%;
`

const Title = styled.div`
  font-size: 14px;
  min-width: ${props => (props.minWidth ? props.minWidth : '50%')};
  max-width: 0;
  font-weight: ${props => (props.bold ? 'bold' : '300')};
  color: black;
  padding: 12px 5px 12px 0px;
  margin-left: ${props => (!props.isChildren ? '25px' : '0')};
  cursor: pointer;
  text-overflow: ellipsis;
`

const Arrow = styled(({ isActive, ...props }) => <ArrowIcon {...props} />)`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  transform: rotate(${props => (props.isActive ? '180deg' : '90deg')});
  z-index: 1;
`

const CategoriesWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`
