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
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

class Tree extends Component {
  static propTypes = {
    companyMarks: PropTypes.object,
    filterReasons: PropTypes.func,
    reasonSearchName: PropTypes.object,
    setCompanyMark: PropTypes.func,
    marksChange: PropTypes.func,
    selectedCompanyMarks: PropTypes.object,
    reasons: PropTypes.object,
    categories: PropTypes.object,
    rowActions: PropTypes.object,
    categorySearchId: PropTypes.object,
    interactions: PropTypes.object,
    changedReasonsCategories: PropTypes.func,
    onChangeReasonCategory: PropTypes.func,
    deleteInteraction: PropTypes.func,
    scrollHeight: PropTypes.object,
    isReasonsLoading: PropTypes.bool,
    isReasonsFirstFetchComplete: PropTypes.func,
    rcSearchSend: PropTypes.func,
    searchData: PropTypes.array
  }

  state = {
    isTreeCollapsed: false
  }

  onTreeCollapse = () => {
    this.setState({
      isTreeCollapsed: !this.state.isTreeCollapsed
    })
  }

  handleTreeSearch = ({ field, value }) => {
    const { rcSearchSend, filterReasons } = this.props
    rcSearchSend(value)
    filterReasons({ field, value })
  }

  renderSearch = () => {
    const {
      companyMarks,
      reasonSearchName,
      setCompanyMark,
      marksChange,
      selectedCompanyMarks,
      searchData
    } = this.props

    return (
      <TreeSearch
        onSearch={this.handleTreeSearch}
        companyMarks={companyMarks}
        reasonSearchName={reasonSearchName}
        setCompanyMark={setCompanyMark}
        marksChange={marksChange}
        selectedCompanyMarks={selectedCompanyMarks}
        searchData={searchData}
      />
    )
  }

  renderTree = () => {
    const {
      reasons,
      categories,
      rowActions,
      filterReasons,
      categorySearchId,
      interactions,
      changedReasonsCategories,
      onChangeReasonCategory,
      deleteInteraction,
      isReasonsLoading
    } = this.props

    const { isTreeCollapsed } = this.state

    return (
      <TreeWrapper>
        <TreeHead
          isTreeCollapsed={isTreeCollapsed}
          onTitleClick={() => {
            filterReasons({ field: 'reasonName', value: '' })
            filterReasons({ field: 'categoryId', value: '' })
          }}
          onCategoryClick={filterReasons}
          onArrowClick={() => this.onTreeCollapse()}
          columns={categories}
          categorySearchId={categorySearchId}
          isReasonsLoading={isReasonsLoading}
        />
        <Scroll>
          <TreeBody
            reasons={reasons}
            columns={categories}
            changedReasonsCategories={changedReasonsCategories}
            interactions={interactions}
            onChangeReasonCategory={onChangeReasonCategory}
            isTreeCollapsed={isTreeCollapsed}
            rowActions={rowActions}
            deleteInteraction={deleteInteraction}
            isReasonsLoading={isReasonsLoading}
          />
        </Scroll>
      </TreeWrapper>
    )
  }

  style = { fontSize: '90px', color: '#44CAFF' }

  render () {
    const { scrollHeight, isReasonsLoading, isReasonsFirstFetchComplete } = this.props

    if (isReasonsLoading && !isReasonsFirstFetchComplete) {
      return (
        <Wrapper>
          <LoaderWrapper>
            <LoadingOutlined style={this.style} />
          </LoaderWrapper>
        </Wrapper>
      )
    } else {
      return (
        <Wrapper scrollHeight={scrollHeight}>
          {this.renderSearch()}
          {this.renderTree()}
        </Wrapper>
      )
    }
  }
}

export default Tree

const Wrapper = styled.div`
  height: ${props => props.scrollHeight ? props.scrollHeight : '100%'};
  background: #fff;
`

const TreeWrapper = styled.div`
  height: calc(100% - 78px);
  overflow: hidden;
  position: relative;
  flex: 1;
`

const Scroll = styled.div`
  border-top: 45px solid transparent;
  position: absolute;
  top: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  background: transparent;
`

const LoaderWrapper = styled.div`
  padding: 40px 0;
  text-align: center;
`
