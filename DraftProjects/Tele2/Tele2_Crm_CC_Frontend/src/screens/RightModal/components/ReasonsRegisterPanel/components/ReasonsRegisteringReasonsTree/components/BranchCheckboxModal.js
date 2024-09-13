/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Select, Button, Modal, Input } from 'antd'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { BRANCH_CHECKBOX_MODAL } from 'constants/logModalNames'

const Option = Select.Option
const TextArea = Input.TextArea

class BranchCheckboxModal extends Component {
  static propTypes = {
    category: PropTypes.object,
    changedCategory: PropTypes.func,
    reason: PropTypes.object,
    onChangeReasonCategory: PropTypes.func,
    isModalToggled: PropTypes.bool
  }

  componentDidUpdate = prevProps => {
    const { isModalToggled } = this.props
    if (!prevProps.isModalToggled && isModalToggled === true) {
      logIfEnabled({ type: MODAL_OPEN, log: BRANCH_CHECKBOX_MODAL })
    } else if (prevProps.isModalToggled === true && isModalToggled === false) {
      logIfEnabled({ type: MODAL_CLOSE, log: BRANCH_CHECKBOX_MODAL })
    }
  }

  onDataClear = () => {
    const { reason, category, onChangeReasonCategory } = this.props

    onChangeReasonCategory(reason, category, 'tooltipSelectValue', null)
    onChangeReasonCategory(reason, category, 'tooltipCommentValue', null)
  }

  onSelectChange = templateId => {
    const { reason, category, onChangeReasonCategory, changedCategory } = this.props

    const template = changedCategory.commentTemplates.find(item => item.TemplateId === templateId)
    onChangeReasonCategory(reason, category, 'tooltipSelectValue', template.TemplateName)
    onChangeReasonCategory(reason, category, 'tooltipCommentValue', template.TemplateText)
  }

  onCommentChange = elem => {
    const { reason, category, onChangeReasonCategory } = this.props

    onChangeReasonCategory(reason, category, 'tooltipCommentValue', elem.target.value)
  }

  onCreateNote = () => {
    const { reason, category, onChangeReasonCategory } = this.props

    onChangeReasonCategory(reason, category, 'createNote')
    this.handleCloseModal()
  }

  handleCloseModal = () => {
    const { category, reason, onChangeReasonCategory } = this.props
    onChangeReasonCategory(reason, category, 'isModalToggled', false)
  }

  render () {
    const { category, changedCategory, reason, onChangeReasonCategory, isModalToggled } = this.props

    const template = changedCategory.tooltipSelectValue || null
    const comment = changedCategory.tooltipCommentValue || null

    const isCommentFree = category.IsCommentFree
    const isCommentRequired = category.IsCommentRequired
    const isButtonVisible = !!template || !!(comment && comment !== '')

    const templates = changedCategory.commentTemplates
    const textLettersCount = comment && comment.split('').length

    const isCreateButton =
      (isCommentRequired && !isCommentFree && templates && !templates.length) ||
      (isCommentRequired && comment) ||
      !isCommentRequired

    return (
      <Modal
        title='Регистрация комментария'
        visible={isModalToggled}
        onCancel={() => {
          this.handleCloseModal()
          onChangeReasonCategory(reason, category, 'active', 'error')
        }}
        footer={[
          <Button disabled={!isCreateButton} type='primary' onClick={this.onCreateNote} key='createNoteButton'>
            Создать
          </Button>,
          <ReasonButton visible='true' disabled={!isButtonVisible} onClick={this.onDataClear} key='clearDataButton'>
            Очистить
          </ReasonButton>
        ]}
      >
        <ReasonContent>
          <Text>Комментарий {isCommentRequired && '(обязательный)'}</Text>
          <SelectWrapper
            disabled={!templates || !templates.length}
            value={template || 'Выбрать шаблон'}
            onChange={this.onSelectChange}
            defaultOpen={templates && templates.length}
          >
            {templates &&
              templates.map((item, index) => (
                <Option key={index} value={item.TemplateId}>
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

export default BranchCheckboxModal

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

const ReasonButton = styled(Button)`
  will-change: transform, opacity;
  opacity: ${props => (props.visible === 'true' ? '1' : 0)};
  transform: translateY(${props => (props.visible === 'true' ? '0' : '-10%')});
  overflow: hidden;
  transition: all 0.3s ease-out;
  align-self: flex-end;
`
