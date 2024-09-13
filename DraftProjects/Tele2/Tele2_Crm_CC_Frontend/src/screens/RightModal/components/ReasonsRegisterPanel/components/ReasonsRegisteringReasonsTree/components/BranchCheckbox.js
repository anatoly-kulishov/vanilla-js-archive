/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import Checkbox from 'components/Checkbox'
import { notification } from 'antd'
import { isEqual } from 'lodash'
import PropTypes from 'prop-types'

class BranchCheckbox extends Component {
  static propTypes = {
    id: PropTypes.string,
    reason: PropTypes.object,
    category: PropTypes.object,
    onChangeReasonCategory: PropTypes.func,
    interaction: PropTypes.object,
    deleteInteraction: PropTypes.object,
    isChecked: PropTypes.bool,
    changedCategory: PropTypes.func,
    loading: PropTypes.bool
  }

  static getDerivedStateFromProps (props, state) {
    const { changedCategory, onChangeReasonCategory, reason, category } = props
    const { commentTemplates } = state

    const isCommentTemplatesChanged = !isEqual(commentTemplates, changedCategory.commentTemplates)

    if (isCommentTemplatesChanged && changedCategory.commentTemplates) {
      if (!changedCategory.commentTemplates.length) {
        if (category.IsCommentFree) {
          onChangeReasonCategory(reason, category, 'isModalToggled', !changedCategory.isModalToggled)
        } else {
          onChangeReasonCategory(reason, category, 'createNote')
        }
      } else if (changedCategory.commentTemplates.length === 1) {
        const firstTemplate = changedCategory.commentTemplates[0].TemplateName

        onChangeReasonCategory(reason, category, 'tooltipSelectValue', firstTemplate)
        onChangeReasonCategory(reason, category, 'tooltipCommentValue', firstTemplate)

        category.IsCommentFree
          ? onChangeReasonCategory(reason, category, 'isModalToggled', !changedCategory.isModalToggled)
          : onChangeReasonCategory(reason, category, 'createNote')
      } else if (changedCategory.commentTemplates.length > 1) {
        onChangeReasonCategory(reason, category, 'isModalToggled', !changedCategory.isModalToggled)
      }

      return {
        commentTemplates: changedCategory.commentTemplates
      }
    }

    if (state.isCheckboxClicked === props.isChecked || props.isChecked === 'error') {
      return {
        isCheckboxClicked: false
      }
    } else {
      return null
    }
  }

  state = {
    isCheckboxClicked: false,
    commentTemplates: null
  }

  onCreateInteraction = () => {
    const { reason, category, onChangeReasonCategory } = this.props

    const isOnlyOneCategory = reason.IsOnlyOneCategory
    const isCommentRequired = category.IsCommentRequired

    const hasReasonActiveCategory = reason.Categories.filter(item => item.active).length > 0
    const isRegisterError = isOnlyOneCategory && hasReasonActiveCategory

    if (isRegisterError) {
      notification.open({
        message: `Ошибка создания заметки `,
        description: 'По данной причине возможна регистрация только одной категории',
        type: 'error'
      })

      return null
    }

    if (!isCommentRequired) {
      onChangeReasonCategory(reason, category, 'createNote')
    } else if (isCommentRequired) {
      onChangeReasonCategory(reason, category, 'fetchTemplates')
      this.setState({
        commentTemplates: null
      })
    }

    this.setState({
      isCheckboxClicked: true
    })
  }

  onDeleteInteraction = () => {
    const {
      interaction: { InteractionNoteId }
    } = this.props

    this.setState({ isCheckboxClicked: true })
    setTimeout(() => this.setState({ isCheckboxClicked: false }), 500)

    this.props.deleteInteraction({ interactionId: InteractionNoteId })
  }

  onCheckboxHover = hover => {
    const { reason, id } = this.props
    const reasonNode = document.querySelector(`#reason-${reason.ReasonId}`).firstChild
    const columnNode = document.querySelector(`#column-${id}`)

    if (hover) {
      reasonNode.style.background = '#48bfec80'
      columnNode.style.background = '#48bfec80'
      columnNode.style.transition = 'background 0.05s ease-in'
      reasonNode.style.transition = 'background 0.05s ease-in'
    } else {
      reasonNode.style.background = 'unset'
      columnNode.style.background = 'unset'
    }
  }

  render () {
    const { isChecked, id, loading } = this.props
    const { isCheckboxClicked } = this.state

    return (
      <div onMouseLeave={() => this.onCheckboxHover(false)} onMouseEnter={() => this.onCheckboxHover(true)}>
        <Checkbox
          id={id}
          isVisible
          loading={isCheckboxClicked && loading}
          isChecked={isChecked && isChecked !== 'error'}
          disabled={isCheckboxClicked}
          onChange={() =>
            isChecked && isChecked !== 'error' ? this.onDeleteInteraction() : this.onCreateInteraction()
          }
        />
      </div>
    )
  }
}

export default BranchCheckbox
