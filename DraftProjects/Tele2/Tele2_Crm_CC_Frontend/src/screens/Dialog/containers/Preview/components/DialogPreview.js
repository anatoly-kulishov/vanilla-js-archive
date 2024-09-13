/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { List } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import conversationPropType from 'constants/conversationPropType'
import { conversationStatuses } from 'constants/conversationStatuses'
import fromEnv from 'config/fromEnv'

const getUrl = ({ ConversationId }) => {
  const search = fromEnv('REACT_APP_SEARCH')

  return `${search}/twinspot/dialog?conversationId=${ConversationId}`
}

const getStatus = (statusId) => {
  switch (statusId) {
    case conversationStatuses.idle:
      return 'ОЖИДАНИЕ'
    case conversationStatuses.wip:
      return 'В РАБОТЕ'
    case conversationStatuses.closed:
      return 'ЗАКРЫТО'
    default: return 'НЕДОСТУПНО'
  }
}

const style = { fontSize: 24 }

function DialogPreview (props) {
  DialogPreview.propTypes = {
    dialog: PropTypes.arrayOf(conversationPropType),
    closed: PropTypes.bool,
    isLoading: PropTypes.bool
  }
  const { dialog, closed, isLoading } = props

  return (
    <List
      loading={{
        spinning: isLoading,
        indicator: <LoadingOutlined style={style} spin />
      }}
      header={closed && <ClosedTitle>{'Закрытые диалоги'}</ClosedTitle>}
      dataSource={dialog}
      renderItem={item => {
        const { Subject, StatusId, ConversationId, CreatedOn, CanBeReply, UserFullName } = item
        const DisplayedUser = CanBeReply ? '' : UserFullName ? `(${UserFullName})` : ''

        return (
          <Item>
            <DialogLink data-cy='dialog-link' closed={closed} href={getUrl(item)} target='_blank'>
              {!closed && <StatusTitle>
                <StatusName data-cy='status-name' statusId={StatusId}>
                  {getStatus(StatusId)}
                </StatusName>
                <div>
                  {DisplayedUser}
                </div>
              </StatusTitle>}
              <Header>
                <IdTitle>{ConversationId}</IdTitle>
                <SubjectTitle>{Subject || 'Без темы'}</SubjectTitle>
                <Time>{moment.utc(CreatedOn).local().format('dd, HH:mm')}</Time>
              </Header>
            </DialogLink>
          </Item>)
      }}
    />
  )
}

export default DialogPreview

const ClosedTitle = styled.div`
  padding-left: 8px;
`
const Item = styled(List.Item)`
  padding: 0;
  background: white;
  color: black;
  :hover {
    background: #f5f5f5;
  }
  transition: background 0.08s ease-in-out;
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
`
const IdTitle = styled.div`
  font-size: 14px;
  color: gray;
  padding-right: 8px
`
const SubjectTitle = styled.div`
  width: 100%;
  font-size: 14px;
`
const StatusName = styled.div`
  padding: 0 4px;
  margin-right: 4px;
  background: #40bfee;
  opacity: ${props => props.statusId === conversationStatuses.idle ? 1 : 0.5};
  border-radius: 10px;
  color: white;
`
const StatusTitle = styled.div`
  font-size: 10px;
  letter-spacing: 1px;
  color: gray;
  display: flex;
`
const Time = styled.div`
  font-size: 10px;
  color: gray;
`
const DialogLink = styled.a`
  display: block;
  padding: 12px;
  width: 100%;
  height: 100%;
  color: ${({ closed }) => closed ? '#979797;' : 'unset;'};
  :hover {
    color: black;
  }
`
