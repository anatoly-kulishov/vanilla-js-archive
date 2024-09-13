import React from 'react'
import { PhoneOutlined } from '@ant-design/icons'
import { Popover, Skeleton, Space } from 'antd'
import styled from 'styled-components'
import { object } from 'prop-types'

import { EmailIcon } from 'assets/index'
import { setClsColor } from '../helpers'

const propTypes = { record: object }

const CLSCheckDescriptionColumn = props => {
  const { record } = props
  const { CLSCheckDescription, CLSCheck, isLoading } = record

  if (isLoading) {
    return (
      <Space>
        <Skeleton.Avatar active size='small' />
        <Skeleton.Avatar active size='small' />
      </Space>
    )
  }

  const popoverContent = (
    <PopoverContentWrapper>
      <MultiLinedText>{CLSCheckDescription}</MultiLinedText>
    </PopoverContentWrapper>
  )

  const emailIconColor = setClsColor(CLSCheck, 'email')
  const phoneIconColor = setClsColor(CLSCheck, 'phone')

  return (
    <Popover content={popoverContent}>
      <IconContainer>
        <StyledIcon as={EmailIcon} color={emailIconColor} />
        <StyledIcon as={PhoneOutlined} color={phoneIconColor} />
      </IconContainer>
    </Popover>
  )
}

CLSCheckDescriptionColumn.propTypes = propTypes

export default CLSCheckDescriptionColumn

const StyledIcon = styled.div`
  width: 25px;
  height: 25px;
  fill: ${props => props.color};
  svg {
    fill: ${props => props.color};
    width: 23px;
    height: 23px;
  }
`

const IconContainer = styled.div`
  display: flex;
`

const MultiLinedText = styled.div`
  white-space: pre-line;
`

const PopoverContentWrapper = styled.div`
  max-width: 500px;
  max-height: 400px;
  overflow-y: auto;
`
