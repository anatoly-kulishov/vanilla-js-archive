/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Checkbox from 'components/Checkbox'
import BranchCheckbox from './BranchCheckbox'
import BranchCheckboxModal from './BranchCheckboxModal'
import PropTypes from 'prop-types'
import ArrowIcon from '../assets/arrow.svg'
import BranchActions from './BranchActions'

import VisibilitySensor from 'react-visibility-sensor'
import { get, isEqual } from 'lodash'

class Branch extends Component {
  static propTypes = {
    reason: PropTypes.object,
    rowActions: PropTypes.object,
    columns: PropTypes.object,
    onChangeReasonCategory: PropTypes.func,
    changedReasonsCategories: PropTypes.object,
    deleteInteraction: PropTypes.func,
    interactions: PropTypes.object,
    nesting: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      isVisible: false,
      isChildrenToggled: false,
      isCategorySelected: false
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const werePropsChanged = !isEqual(nextProps, this.props)
    const wasStateChanged = !isEqual(nextState, this.state)

    return nextState.isVisible && (werePropsChanged || wasStateChanged)
  }

  componentDidMount () {
    const { reason } = this.props

    this.setState({
      isChildrenToggled: reason.IsExpanded
    })
  }

  componentWillUnmount () {
    clearTimeout(this.isVisibleTimer)
  }

  toggleChildren = () => {
    this.setState({
      isChildrenToggled: !this.state.isChildrenToggled
    })
  }

  renderChildren = (children, nesting, interactions) => {
    const { rowActions, columns, onChangeReasonCategory, changedReasonsCategories, deleteInteraction } = this.props

    if (children && children.length) {
      return children.map((child, index) => {
        return (
          <Branch
            key={index}
            reason={child}
            nesting={nesting + 1}
            columns={columns}
            rowActions={rowActions}
            onChangeReasonCategory={onChangeReasonCategory}
            changedReasonsCategories={changedReasonsCategories}
            deleteInteraction={deleteInteraction}
            interactions={interactions}
          />
        )
      })
    }
    return null
  }

  renderCategories = (reasonId, categories) => {
    const { onChangeReasonCategory, deleteInteraction, changedReasonsCategories, columns, reason, interactions } =
      this.props

    const possibleCategoriesIds = columns.map(item => item.CategoryId) // Array.apply(null, {length: columns.length}).map(Number.call, Number)

    if (categories && categories.length) {
      return possibleCategoriesIds.map((possibleCategoryId, key) => {
        const category = categories.find((category, index) => category.CategoryId === possibleCategoryId)

        if (category) {
          const changedCategory = get(changedReasonsCategories, [reason.ReasonId, category.CategoryId], {})
          const isModalToggled = changedCategory.isModalToggled
          const interaction = interactions.find(
            interaction =>
              interaction.ReasonId === reason.ReasonId &&
              interaction.CategoryId === category.CategoryId &&
              interaction.RegisteringCaseId === 1
          )

          const isCategoryActive =
            changedCategory.active === undefined
              ? false
              : changedCategory.active === 'error'
                ? 'error'
                : changedCategory.active

          const checkboxLoading = !isModalToggled && reason

          return (
            <CheckboxWrapper disabled={isCategoryActive} key={possibleCategoryId}>
              <BranchCheckbox
                id={`t2_CategoryId_${category.CategoryId}`}
                reason={reason}
                loading={checkboxLoading}
                category={category}
                changedCategory={changedCategory && Object.keys(changedCategory) ? changedCategory : null}
                isChecked={isCategoryActive}
                interaction={interaction}
                deleteInteraction={deleteInteraction}
                onChangeReasonCategory={onChangeReasonCategory}
              />
              {reason && (
                <BranchCheckboxModal
                  reason={reason}
                  category={category}
                  changedCategory={changedCategory}
                  isModalToggled={isModalToggled}
                  onChangeReasonCategory={onChangeReasonCategory}
                />
              )}
            </CheckboxWrapper>
          )
        } else {
          return <Checkbox key={key} isVisible={false} />
        }
      })
    }
    return null
  }

  onVisibilityChanged = isVisible => {
    if (isVisible !== this.state.isVisible) {
      clearTimeout(this.isVisibleTimer)
      this.isVisibleTimer = setTimeout(() => {
        this.setState({
          isVisible
        })
      }, 500)
    }
  }

  offsetStyle = { top: -500, bottom: -500 }

  render () {
    const { reason, nesting, rowActions, interactions } = this.props
    const { isChildrenToggled } = this.state

    const width = nesting > 0 && `calc(50% - ${12.5 * nesting + 'px'})`

    const categories = reason.Categories
    const children = reason.Children
    const reasonId = reason.ReasonId
    const isChildren = children && children.length > 0

    const isNotForUse = reason.IsNotForUse

    return (
      <VisibilitySensor
        key='sensor-one'
        partialVisibility
        onChange={this.onVisibilityChanged}
        offset={this.offsetStyle}
      >
        <Wrapper isChild={nesting > 0} id={`reason-${reasonId}`}>
          <Layer
            onClick={() => this.toggleChildren()}
            data-title={reason.ReasonDescription}
            hasDesc={reason.ReasonDescription}
          />
          {isChildren && <Arrow isActive={isChildrenToggled} onClick={() => this.toggleChildren()} />}
          <Title
            className={'branchTitle'}
            onClick={() => this.toggleChildren()}
            isChildren={isChildren}
            bold={isChildrenToggled && isChildren}
            minWidth={width}
          >
            {reason.ReasonName}
          </Title>
          <CategoriesWrapper>
            {!isNotForUse && this.renderCategories(reasonId, categories)}
            {!isNotForUse && (
              <BranchActions
                actions={rowActions}
                interactions={interactions}
                reason={reason}
                isCategorySelected
                isVisible={categories && categories.length > 0}
              />
            )}
          </CategoriesWrapper>
          <ChildWrapper isVisible={isChildrenToggled}>
            {isChildrenToggled && this.renderChildren(children, nesting, interactions)}
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

const Layer = styled.a`
  position: absolute;
  height: 44px;
  width: 100%;
  top: 0;
  left: 0;
  &::before {
    display: ${props => (props.hasDesc ? css`block` : css`none`)};
  }

  &:hover::before {
    content: attr(data-title);
    position: absolute;
    top: 44px;
    left: 0;
    padding: 3px 6px;
    border-radius: 2px;
    background: #fff;
    color: #000;
    font-size: 12px;
    font-family: T2_Rooftop_Regular;
    font-size: 13px;
    max-width: 50%;
    z-index: 4;
    pointer-events: none;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  &:hover {
    background-color: #48bfec80 !important;
  }
`

const Title = styled.div`
  font-size: 14px;
  min-width: ${props => (props.minWidth ? props.minWidth : '50%')};
  max-width: 0;
  font-weight: ${props => (props.bold ? 'bold' : '300')};
  color: black;
  padding: 12px 5px 12px 0px;
  margin-left: ${props => (!props.isChildren ? '25px' : '0')};
  text-overflow: ellipsis;
  white-space: pre;
  overflow: hidden;
`

const ChildWrapper = styled.div`
  opacity: ${props => (props.isVisible ? 'block' : 'none')};
  width: 100%;
`

const Arrow = styled(ArrowIcon)`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  transform: ${props => (props.isActive ? css`rotate(180deg)` : css`rotate(90deg)`)};
  z-index: 1;
`

const CategoriesWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`

const CheckboxWrapper = styled.div`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'unset')};
  z-index: 2;
`
