import React from 'react'
import styled from 'styled-components'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const TreeReason = (props) => {
  TreeReason.propTypes = {
    isActive: PropTypes.bool,
    onSelectReasonCategory: PropTypes.func,
    categories: PropTypes.object,
    reason: PropTypes.object,
    category: PropTypes.object
  }
  const {
    reason,
    category,
    categories,
    isActive,
    onSelectReasonCategory
  } = props

  const isMenu = categories && categories.length > 1

  const { ReasonName } = reason
  const { CategoryName } = category
  const categoriesMenu = (
    <Menu onClick={key => onSelectReasonCategory({ reason, category: categories[key.key] })}>
      {categories.map((item, index) => <Menu.Item key={index}>{item.CategoryName}</Menu.Item>)}
    </Menu>
  )

  if (isMenu) {
    return (
      <DropdownWrapper disabled={!isActive} overlay={categoriesMenu} trigger={['click']}>
        <RequestedReason>
          {isActive && <Arrow /> }
          {' ' + ReasonName + ' ' + (CategoryName || '')}
        </RequestedReason>
      </DropdownWrapper>
    )
  } else {
    return (
      <RequestedReason>
        {' ' + ReasonName + ' ' + (CategoryName || '')}
      </RequestedReason>
    )
  }
}

export default TreeReason

const RequestedReason = styled.a`
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
  display: block;
`

const DropdownWrapper = styled(Dropdown)`
  height: auto;
`

const Arrow = styled(DownOutlined)`
  margin-right: 6px;
`
