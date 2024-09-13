import React from 'react'
import styled from 'styled-components'
import Icon from '@ant-design/icons'
import AttachIconSvg from '../asserts/attach-icon.svg'
import ExportIconSvg from '../asserts/export-icon.svg'
import LinkIconSvg from '../asserts/link-icon.svg'
import ReplyIconSvg from '../asserts/reply_indicator.svg'

export function AttachIcon () {
  return <StyledIcon component={AttachIconSvg} />
}

export function ExportIcon () {
  return <StyledIcon component={ExportIconSvg} />
}

export function LinkIcon () {
  return <StyledIcon component={LinkIconSvg} />
}

export function ReplyIcon () {
  return <StyledIcon component={ReplyIconSvg} />
}

const StyledIcon = styled(Icon)`
  font-size: 24px;
  padding-right: 5px;
`
