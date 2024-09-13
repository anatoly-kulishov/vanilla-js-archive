/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import TreeHead from './components/TreeHead'
import TreeBody from './components/TreeBody'
import TreeSearch from './components/TreeSearch'
import PropTypes from 'prop-types'
import {
  CreateTicketModalCategoriesProps,
  CreateTicketModalReasonsProps,
  CreateTicketModalSelectedReasonProps,
  CreateTicketModalSelectedCategoryProps
} from 'constants/tickets'

class TicketsReasonsTree extends Component {
  static propTypes = {
    areEditRights: PropTypes.bool,
    selectReasonCategory: PropTypes.func,
    isToggled: PropTypes.bool,
    isArrowDisabled: PropTypes.bool,
    filterReasons: PropTypes.func,

    reasons: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalReasonsProps)),
    categories: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalCategoriesProps)),
    isReasonsCategoriesLoading: PropTypes.bool,
    isReasonsCategoriesError: PropTypes.bool,
    selectedReason: CreateTicketModalSelectedReasonProps,
    selectedCategory: CreateTicketModalSelectedCategoryProps,
    categorySearchId: PropTypes.object,
    isTree: PropTypes.bool,
    scrollHeight: PropTypes.bool,
    onReasonClear: PropTypes.func,
    reasonSearchName: PropTypes.string,
    isFieldChangeHandle: PropTypes.func,
    rowActions: PropTypes.object
  }
  state = {
    isDerivedDisable: false,
    isTreeCollapsed: false,
    isTreeToggled: true,
    search: null
  }

  static getDerivedStateFromProps = (props, state) => {
    const { selectedReason, selectedCategory } = props
    const { isDerivedDisable } = state

    if (selectedReason && selectedCategory && !isDerivedDisable) {
      return ({ isTreeCollapsed: true, isDerivedDisable: true })
    }
    return null
  }

  onTreeCollapse = () => {
    this.setState({
      isTreeCollapsed: !this.state.isTreeCollapsed
    })
  }

  onSearch = ({ value }) => {
    const { selectedReason, filterReasons, onReasonClear, isFieldChangeHandle } = this.props
    if (value && !selectedReason) {
      const minLength = 3 // reasonsParameters && reasonsParameters.find(item => item.ParamName === 'MinLength').ParamValue
      const maxLength = 6 // reasonsParameters && reasonsParameters.find(item => item.ParamName === 'MaxLength').ParamValue

      if (minLength <= value.length && maxLength >= value.length) {
        filterReasons({ value: value, field: 'reasonName' })
      }
    } else if (value === '' || !value) {
      onReasonClear()
      filterReasons({ value: value, field: 'reasonName' })
    }
    isFieldChangeHandle(value, 'reasonSearchName')
  }

  toggleTree () {
    this.setState({
      isTreeToggled: !this.state.isTreeToggled
    })
  }
  selectReasonCategoryAction = ({ reason, category }) => {
    const { selectReasonCategory } = this.props

    selectReasonCategory(reason, category)
    this.onTreeCollapse()
  }

  renderSearch () {
    const { isTreeCollapsed } = this.state
    const {
      areEditRights,
      selectedReason,
      selectedCategory,
      isArrowDisabled,
      isFieldChangeHandle,
      reasonSearchName
    } = this.props

    if (!selectedReason) {
      return (
        <TreeSearch
          isFieldChangeHandle={isFieldChangeHandle}
          onClick={this.onTreeCollapse}
          onSearch={this.onSearch}
          isDisabled={!areEditRights}
          isTreeCollapsed={isTreeCollapsed}
          isArrowDisabled={isArrowDisabled}
          reasonSearchName={reasonSearchName}
          selectedReason={selectedReason}
        />
      )
    } else {
      const reasonToSearch = selectedReason && selectedReason.ReasonName
      const categoryToSearch = selectedCategory && selectedCategory.CategoryName
      const reasonCategoryToSearch = reasonToSearch + ' ' + categoryToSearch
      return (
        <TreeSearch
          isFieldChangeHandle={isFieldChangeHandle}
          onClick={this.onTreeCollapse}
          onSearch={this.onSearch}
          isDisabled={!areEditRights}
          isTreeCollapsed={isTreeCollapsed}
          isArrowDisabled={false}
          reasonSearchName={reasonCategoryToSearch}
          selectedReason={selectedReason}
        />
      )
    }
  }

  renderTree () {
    const {
      reasons,
      isReasonsCategoriesLoading,
      isReasonsCategoriesError,
      categories,
      isToggled,
      categorySearchId,
      filterReasons,
      onReasonClear,
      rowActions
    } = this.props
    const { isTreeCollapsed } = this.state

    return (
      <TreeWrapper isToggled={isToggled}>
        <TreeHead
          isTreeCollapsed={isTreeCollapsed}
          onTitleClick={() => {
            filterReasons({ field: 'reasonName', value: '' })
            filterReasons({ field: 'categoryId', value: '' })
          }}
          onCategoryClick={filterReasons}
          onArrowClick={() => this.toggleTree()}
          columns={categories}
          categorySearchId={categorySearchId}
          onReasonClear={onReasonClear}
          isTreeToggled={this.state.isTreeToggled}
        />
        <Scroll>
          <TreeBody
            isTreeCollapsed={isTreeCollapsed}
            rowActions={rowActions}
            reasons={reasons}
            isReasonsCategoriesLoading={isReasonsCategoriesLoading}
            isReasonsCategoriesError={isReasonsCategoriesError}
            columns={categories}
            onSelectReasonCategory={this.selectReasonCategoryAction}
          />
        </Scroll>
      </TreeWrapper>
    )
  }

  render () {
    const { isTree, scrollHeight, isToggled } = this.props

    return (
      <Wrapper scrollHeight={scrollHeight} isTree={isTree && isToggled}>
        { this.renderSearch() }
        { this.renderTree() }
      </Wrapper>
    )
  }
}

export default TicketsReasonsTree

const Wrapper = styled.div`
  height: ${props => props.scrollHeight ? props.scrollHeight : '100%'};
  background: #fff;
`

const TreeWrapper = styled.div`
  display: ${props => (props.isTreeCollapsed ? 'none' : 'block')};
  will-change: transform, opacity;
  flex: 1;
`

const Scroll = styled.div`
  top: 0;
  margin-left: auto;
  margin-right: auto;
  overflow-y: scroll;
  width: 100%;
  height: ${props => props.isTreeToggled ? '0px' : 'auto'};
  max-height: 450px;
  background: transparent;
`
