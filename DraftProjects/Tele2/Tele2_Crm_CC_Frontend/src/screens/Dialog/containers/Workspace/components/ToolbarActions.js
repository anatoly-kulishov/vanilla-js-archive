/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Button, Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import conversationPropType from 'constants/conversationPropType'
import { conversationStatuses } from 'constants/conversationStatuses'

// TODO: Phase 2
// import { ExportIcon, LinkIcon } from '../../../components/Icons'

function ToolbarActions (props) {
  ToolbarActions.propTypes = {
    statusId: PropTypes.number,
    isEditorEnabled: PropTypes.bool,
    toggleEditor: PropTypes.func,
    // TODO: Phase 2
    // toggleRap: PropTypes.func,
    setWorkStatus: PropTypes.func,
    fetchCuvoLink: PropTypes.func,
    isSetWorkStatusLoading: PropTypes.bool,
    setDelayStatus: PropTypes.func,
    isSetDelayStatusLoading: PropTypes.bool,
    setCloseStatus: PropTypes.func,
    isCloseStatusLoading: PropTypes.bool,
    currentConversation: conversationPropType
  }
  const {
    statusId,
    toggleEditor,
    isEditorEnabled,
    // TODO: Phase 2
    // toggleRap,
    setWorkStatus,
    isSetWorkStatusLoading,
    setDelayStatus,
    isSetDelayStatusLoading,
    setCloseStatus,
    isCloseStatusLoading,
    fetchCuvoLink,
    currentConversation: { CanBeReply, CommentText }
  } = props

  const isCommentText = CommentText !== null

  switch (statusId) {
    case conversationStatuses.closed:
      return <div>{isCommentText && CommentText}</div>
    case conversationStatuses.idle:
      return (
        <div>
          <StyledButton data-cy='setWorkStatus' type='primary' onClick={setWorkStatus} loading={isSetWorkStatusLoading}>
            Взять в работу
          </StyledButton>
        </div>
      )
    case conversationStatuses.wip:
      return (
        <div>
          {CanBeReply && (
            <StyledButton
              data-cy='reply'
              type='primary'
              onClick={() => {
                toggleEditor(!isEditorEnabled)
                fetchCuvoLink()
              }}
              disabled={isEditorEnabled}
            >
              Ответить
            </StyledButton>
          )}
          <Popconfirm
            title='Диалог будет переведен в очередь ожидания'
            onConfirm={() => {
              setDelayStatus()
              toggleEditor(false)
            }}
            okText='Ок'
            cancelText='Отменить'
          >
            <StyledButton data-cy='setIdleStatus' loading={isSetDelayStatusLoading}>
              Отложить
            </StyledButton>
          </Popconfirm>
          <Popconfirm
            title='Диалог будет закрыт без ответа'
            onConfirm={() => {
              setCloseStatus({ WithoutProcessing: true })
              toggleEditor(false)
            }}
            okText='Ок'
            cancelText='Отменить'
          >
            <StyledButton type='danger' data-cy='setCloseStatus' loading={isCloseStatusLoading}>
              Закрыть
            </StyledButton>
          </Popconfirm>

          {/* TODO: Phase 2 */}
          {/* <StyledButton shape='round' onClick={() => { toggleRap({ section: 'reasons' }) }}>Причины обращения</StyledButton> */}
          {/* <StyledButton onClick={() => { alert('Заявили') }}>Заявка</StyledButton> */}
        </div>
      )
    default:
      return null
  }
}

export default ToolbarActions

const StyledButton = styled(Button)`
  font-family: T2HalvarBreit_ExtraBold;
  margin-right: 8px;
  font-size: 13px;
`
