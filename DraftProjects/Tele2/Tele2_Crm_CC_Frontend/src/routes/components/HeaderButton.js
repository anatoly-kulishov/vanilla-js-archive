/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Tooltip } from 'antd'
import Icon from '@ant-design/icons'

export default function HeaderButton ({ children, icon, ...rest }) {
  if (!icon) {
    return (
      <StyledButton type='text' shape='round' {...rest}>
        {children}
      </StyledButton>
    )
  } else {
    if (children) {
      return (
        <Tooltip title={children} overlayStyle={{ maxWidth: '500px', whiteSpace: 'nowrap' }}>
          <StyledButton type='text' shape='round' icon={<StyledIcon component={() => icon} />} {...rest} />
        </Tooltip>
      )
    } else {
      return <StyledButton type='text' shape='round' icon={<StyledIcon component={() => icon} />} {...rest} />
    }
  }
}

HeaderButton.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.node
}

const StyledIcon = styled(Icon)`
  font-size: 20px;
`

const StyledButton = styled(Button)`
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: white;
  :focus,
  :hover {
    background-color: #3a3e46;
    color: white;
  }
`
