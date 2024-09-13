import { Button, Modal, Select, Input, notification } from 'antd'
import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { RIGHT_MODAL_COMMENT_MODAL } from 'constants/logModalNames'

const Option = Select.Option
const TextArea = Input.TextArea

class CommentModal extends Component {
  static propTypes = {
    commentTemplateId: PropTypes.object,
    commentText: PropTypes.object,
    templates: PropTypes.object,
    isModalToggled: PropTypes.bool,
    isCommentFree: PropTypes.bool,
    onClose: PropTypes.func,
    editInteractionComment: PropTypes.func
  }
  state = {
    template: null,
    comment: ''
  }

  componentDidMount () {
    const { commentTemplateId, commentText, templates } = this.props
    const template = commentTemplateId && templates?.find(item => item.TemplateId === commentTemplateId)

    this.setState({
      template: template?.TemplateId ?? null,
      comment: commentText
    })
  }

  componentDidUpdate = prevProps => {
    const { isModalToggled } = this.props
    if (!prevProps.isModalToggled && isModalToggled === true) {
      logIfEnabled({ type: MODAL_OPEN, log: RIGHT_MODAL_COMMENT_MODAL })
    } else if (prevProps.isModalToggled === true && isModalToggled === false) {
      logIfEnabled({ type: MODAL_CLOSE, log: RIGHT_MODAL_COMMENT_MODAL })
    }
  }

  onDataClear = () => {
    this.setState({
      template: null,
      comment: ''
    })
  }

  onSelectChange = templateId => {
    const { templates } = this.props
    const template = templates.find(item => item.TemplateId === templateId)

    this.setState({
      template: template.TemplateId,
      comment: template.TemplateText
    })
  }

  onCommentChange = elem => {
    this.setState({
      comment: elem.target.value
    })
  }

  onSaveChanges = () => {
    const { onClose, isCommentFree, editInteractionComment, templates } = this.props
    const { comment, template } = this.state

    const templateObj = templates.find(item => item.TemplateId === template)

    if (isCommentFree) {
      if (comment) {
        onClose()
        editInteractionComment(comment, templateObj)
      } else {
        notification.open({
          type: `error `,
          message: 'Ошибка комментария',
          description: 'Необходимо указать текст комментария'
        })
      }
    } else {
      if (comment && template) {
        onClose()
        editInteractionComment(comment, templateObj)
      } else {
        notification.open({
          type: `error `,
          message: 'Ошибка комментария',
          description: 'Необходимо указать шаблон и текст комментария'
        })
      }
    }
  }

  render () {
    const { isModalToggled, isCommentFree, commentText, commentTemplateId, templates, onClose } = this.props

    const { template, comment } = this.state

    const isSaveButton = isCommentFree ? comment && comment !== commentText : template && template !== commentTemplateId
    const textLettersCount = comment && comment.split('').length

    return (
      <Modal
        title='Регистрация комментария'
        visible={isModalToggled}
        onCancel={onClose}
        // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
        footer={[
          <Button disabled={!isSaveButton} type='primary' onClick={this.onSaveChanges}>
            Сохранить изменения
          </Button>,
          <ReasonButton onClick={this.onDataClear}>Очистить</ReasonButton>
        ]}
      >
        <ReasonContent>
          <Text>Комментарий (обязательный)</Text>
          <SelectWrapper
            disabled={!templates || !templates.length}
            value={template || 'Выбрать шаблон'}
            onChange={this.onSelectChange}
            defaultOpen={templates && templates.length}
          >
            {templates &&
              templates.map((item, id) => (
                <Option key={id} value={item.TemplateId}>
                  {item.TemplateName}
                </Option>
              ))}
          </SelectWrapper>
          <TextAreaContent>
            <TextAreaWrapper
              placeholder='Напишите свой комментарий'
              onChange={this.onCommentChange}
              value={comment || template}
              disabled={!isCommentFree}
            />
            <LettersCount>{textLettersCount}</LettersCount>
          </TextAreaContent>
        </ReasonContent>
      </Modal>
    )
  }
}

export default CommentModal

const ReasonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Text = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`

const SelectWrapper = styled(Select)`
  width: 100%;
`

const TextAreaContent = styled.div`
  width: 100%;
  position: relative;
`

const TextAreaWrapper = styled(TextArea)`
  height: 90px !important;
  resize: none;
  margin-bottom: 5px;
`

const LettersCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  color: rgb(217, 217, 217);
  font-size: 10px;
  z-index: 2;
  letter-spacing: 1px;
`

const ReasonButton = styled(Button)``
