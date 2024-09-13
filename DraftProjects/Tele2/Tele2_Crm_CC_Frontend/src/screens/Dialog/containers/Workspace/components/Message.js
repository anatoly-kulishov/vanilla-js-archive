/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { bool, string, number, arrayOf, shape } from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { ReplyIcon } from '../../../components/Icons'
import { Attachment } from './Attachment'

export default function Message (props) {
  Message.propTypes = {
    IsIncoming: bool,
    From: string,
    DisplayFrom: string,
    CreatedOn: string,
    UniqueBody: string,
    UserFullName: string,
    HasAttachments: bool,
    Id: number,
    Attachments: arrayOf(shape({
      FileName: string,
      AttachmentId: string
    }))
  }

  const { IsIncoming, From, DisplayFrom, CreatedOn, UniqueBody, UserFullName, HasAttachments, Attachments, Id } = props

  return (
    <Wrapper>
      <Header>
        {!IsIncoming && <HeaderLabel data-cy='replyIcon'><ReplyIcon /></HeaderLabel>}
        <HeaderLabel data-cy='from'>{From}</HeaderLabel>
        <HeaderLabel data-cy='user'>{IsIncoming ? DisplayFrom : UserFullName}</HeaderLabel>
        <HeaderLabel data-cy='createdOn'>{moment.utc(CreatedOn).local().format('DD.MM.YYYY HH:mm')}</HeaderLabel>
        <HeaderLabelBold>{IsIncoming ? '' : `Номер ответа CUVO: ${Id}`}</HeaderLabelBold>
      </Header>
      <Text>
        {/* Render email body */}
        <div data-cy='messageText' dangerouslySetInnerHTML={{ __html: UniqueBody }} />
      </Text>
      <FilesBlock>
        {HasAttachments && Attachments?.map(attachment => (<Attachment {...attachment} />))}
      </FilesBlock>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: white;
  box-shadow: 0 0px 10px rgba(32,33,36,0.05);
  border-radius: 10px;
  padding: 0 16px 16px;
  margin: 16px;
  :last-child {
    border-bottom: none;
  }
`
const Header = styled.div`
  display: flex;
  border-bottom: 1px #EBEBF3 solid;
  margin-bottom: 8px;
  padding: 14px 0;
`
const HeaderLabel = styled.label`
  font-size: 13px;
  padding-left: 8px;
`
const HeaderLabelBold = styled(HeaderLabel)`
  font-weight: bold;
`
const Text = styled.div`
  padding: 12px 8px;
`
const FilesBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
`
