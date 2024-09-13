import React from 'react'
import { string, func } from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'
import { VerticalAlignBottomOutlined, CloseOutlined } from '@ant-design/icons'
import AuthenticatedFileLink from 'hocs/AuthenticatedFileLink'
import { fileStorage } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export function Attachment (props) {
  Attachment.propTypes = {
    FileName: string,
    AttachmentId: string,
    onDelete: func
  }
  const { FileName, AttachmentId, onDelete } = props

  const url = `${http}${pathBe}:${fileStorage}/files/downloadFileById?fileId=${AttachmentId}`

  return (
    <Wrapper>
      <Label>{FileName}</Label>
      <AuthenticatedFileLink
        url={url}
        fileName={FileName}
      >
        <StyledButton icon={<VerticalAlignBottomOutlined />} type='text' />
      </AuthenticatedFileLink>
      {onDelete && <Button icon={<CloseOutlined />} type='text' onClick={onDelete} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: 4px;
  border: 1px solid lightgray;
  padding: 4px;
  display: flex;
  align-items: baseline;
  margin: 0 4px 4px 0;
`
const Label = styled.div`
  margin: 0 4px;
`
const StyledButton = styled(Button)`
  margin-right: 8px;
`
