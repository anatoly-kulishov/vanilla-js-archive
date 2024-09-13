/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import { Switch, Popconfirm } from 'antd'

export default function Restriction ({ restriction, onClick }) {
  Restriction.propTypes = {
    restriction: PropTypes.objectOf(
      PropTypes.shape({
        Code: PropTypes.string,
        Description: PropTypes.string,
        IsActive: PropTypes.string,
        ConflictFlag: PropTypes.bool,
        ConflictMessage: PropTypes.oneOfType([
          PropTypes.string,
          // number corresponds to null
          PropTypes.number
        ])
      })
    ),
    onClick: PropTypes.func.isRequired
  }

  const { Code, IsActive, Description, ConflictMessage } = restriction

  const setRestrictionMessage = `установить запрет?`
  const removeRestrictionMessage = 'снять установленный запрет?'

  const popconfirmMessage = (
    <PopconfirmMessage>
      <MessageTitle>{`Вы уверены, что хотите ${IsActive ? removeRestrictionMessage : setRestrictionMessage}`}</MessageTitle>
      {ConflictMessage && <MessageDescription>{ConflictMessage}</MessageDescription>}
    </PopconfirmMessage>
  )

  return (
    <Wrapper>
      <Popconfirm
        placement='right'
        title={popconfirmMessage}
        onConfirm={() => onClick(!IsActive, Code)}
      >
        <Toggle
          id={Code}
          checked={IsActive}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
        <label htmlFor={Code}>{Description}</label>
      </Popconfirm>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

const Toggle = styled(Switch)`
  margin: 5px;
`

const PopconfirmMessage = styled.div`
`

const MessageTitle = styled.h4`
  font-weight: bolder;
`

const MessageDescription = styled.p`
`
