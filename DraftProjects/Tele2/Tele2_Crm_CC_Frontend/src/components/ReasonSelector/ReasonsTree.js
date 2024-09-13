import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { groupBy } from 'lodash'
import { ReasonProps } from 'constants/reasonsList'
import { Tree } from 'antd'

function renderNode (reason, groupedReasons, isAdmin) {
  return (
    <Tree.TreeNode
      key={reason.ReasonId}
      title={
        <Row>
          <Title>{ reason.ReasonName }</Title>
          { isAdmin && <Mnemo>{reason.MnemoCode}</Mnemo> }
        </Row>
      }
    >
      { groupedReasons[reason.ReasonId] &&
        groupedReasons[reason.ReasonId].map(childReason => renderNode(childReason, groupedReasons, isAdmin))
      }
    </Tree.TreeNode>
  )
}

const defaultExpandedKeys = (groupedReasons, openTree) => {
  const arr = []
  if (openTree) {
    sortBranchExpanded(groupedReasons, arr)
  }
  return arr
}

function sortBranchExpanded (reason, arr) {
  for (const key in reason) {
    reason[key].map(el => {
      if (el.IsExpanded !== undefined) {
        if (el.IsExpanded) {
          arr.push(el.ReasonId)
        }
      } else {
        sortBranchExpanded(el, arr)
      }
    })
  }
}

const ReasonsTree = ({ filteredReasons, onSelect, isAdmin, openTree }) => {
  const groupedReasons = groupBy(filteredReasons, 'ParentId')

  return (
    <StyledTree onSelect={onSelect} defaultExpandedKeys={defaultExpandedKeys(groupedReasons, openTree)}>
      { groupedReasons[0] && groupedReasons[0].map(reason => renderNode(reason, groupedReasons, isAdmin)) }
    </StyledTree>
  )
}

ReasonsTree.propTypes = {
  filteredReasons: PropTypes.arrayOf(
    ReasonProps
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  openTree: PropTypes.bool
}

ReasonsTree.defaultProps = {
  isAdmin: false
}

export default ReasonsTree

const StyledTree = styled(Tree)`
  li {
    display: flex;
    flex-wrap: wrap;

    .ant-tree-node-content-wrapper {
      padding-right: 0;
      width: calc(100% - 24px);
    }

    ul {
      width: 100%;
    }
  }
`

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Title = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-shrink: 1;
`

const Mnemo = styled.div`
  width: 100px;
  padding: 0 20px;
  flex-shrink: 0;
  text-align: right;
`
