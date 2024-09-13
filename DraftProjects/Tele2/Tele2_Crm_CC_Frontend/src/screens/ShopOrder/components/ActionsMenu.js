import { Button, Menu } from 'antd'
import React, { useCallback } from 'react'

const ActionsMenu = ({ actions, onActionClick }) => {
  const handleClick = useCallback(
    actionTypeId => () => {
      onActionClick(actionTypeId)
    },
    []
  )

  return (
    <Menu>
      {actions.map(action => (
        <Menu.Item key={action.actionTypeId}>
          <Button onClick={handleClick(action.actionTypeId)}>{action.name}</Button>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default ActionsMenu
