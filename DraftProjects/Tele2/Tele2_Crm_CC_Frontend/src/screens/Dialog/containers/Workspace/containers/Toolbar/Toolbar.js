/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import conversationPropType from 'constants/conversationPropType'
import { conversationStatuses } from 'constants/conversationStatuses'

// TODO: Phase 2
// import { ExportIcon, LinkIcon } from '../../../components/Icons'
import ToolbarSkeleton from '../../components/ToolbarSkeleton'
import ToolbarActions from '../../components/ToolbarActions'

function Toolbar (props) {
  Toolbar.propTypes = {
    currentConversation: conversationPropType,
    isCurrentConversationLoading: PropTypes.bool
  }

  const { currentConversation, isCurrentConversationLoading } = props

  if (!currentConversation) {
    // TODO: Skeleton
    return <div>Loading...</div>
  }

  const {
    ConversationId,
    Subject: SubjectText,
    StatusName,
    CanBeModified,
    StatusId,
    UserFullName,
    CanBeReply
  } = currentConversation
  const DisplayedUser = CanBeReply ? '' : UserFullName ? `(${UserFullName})` : ''

  return (
    <Wrapper>
      {isCurrentConversationLoading ? (
        <ToolbarSkeleton />
      ) : (
        <Fragment>
          <Title>
            <Subject data-cy='subject'>{`${ConversationId}: ${SubjectText || 'Без темы'}`}</Subject>
            <Status data-cy='status' statusId={StatusId}>{`${StatusName} ${DisplayedUser}`}</Status>
          </Title>
          <ActionsWrapper>
            {CanBeModified && <ToolbarActions statusId={StatusId} {...props} />}
            <SubActionsGroup>
              {/* TODO: Phase 2 */}
              {/* <Button icon={<LinkIcon />} type='text' shape='circle' />
              <Button icon={<ExportIcon />} type='text' shape='circle' /> */}
            </SubActionsGroup>
          </ActionsWrapper>
        </Fragment>
      )}
    </Wrapper>
  )
}

export default Toolbar

const Wrapper = styled.div`
  padding: 24px;
  background: white;
  border-bottom: 2px #e7e7f0 solid;
`
const ActionsWrapper = styled.div`
  padding-top: 8px;
  display: grid;
  grid-gap: 1vw;
  grid-template-rows: auto;
  grid-template-columns: 4fr 1fr;
`

const Title = styled.div`
  display: flex;
  align-items: baseline;
`
const Subject = styled.h3`
  font-weight: bold;
  line-height: 18px;
`
const Status = styled.div`
  padding: 0 6px;
  margin: 4px 8px;
  font-size: 14px;
  background: #40bfee;
  opacity: ${props => (props.statusId === conversationStatuses.idle ? 1 : 0.5)};
  border-radius: 10px;
  color: white;
`
const SubActionsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`
