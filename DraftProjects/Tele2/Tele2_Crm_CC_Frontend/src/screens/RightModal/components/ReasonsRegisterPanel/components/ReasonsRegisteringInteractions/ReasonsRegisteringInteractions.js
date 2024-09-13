/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import Interaction from './components/Interaction'
import CommentModal from './components/CommentModal'
import { findReason } from 'utils/helpers'
import { notification } from 'antd'
import PropTypes from 'prop-types'

class ReasonsRegisteringInteractions extends Component {
  static propTypes = {
    onDeleteInteraction: PropTypes.func,
    fetchInteractionsCommentTemplates: PropTypes.func,
    interactions: PropTypes.object,
    reasons: PropTypes.object,
    editInteractionComment: PropTypes.func,
    handlingId: PropTypes.number,
    clearInteractionsCommentTemplates: PropTypes.func,
    onInteractionSmsParameterClick: PropTypes.func,
    interactionsCommentTemplates: PropTypes.object
  }
  state = {
    reason: null,
    category: null,
    interactionToEdit: null,
    isCommentModalToggled: false,
    isCommentEditClicked: false
  }

  static getDerivedStateFromProps (props, state) {
    const { isCommentModalToggled, reason, category, isCommentEditClicked } = state
    const { interactionsCommentTemplates } = props

    if (reason && category && isCommentEditClicked) {
      const reasonId = reason.ReasonId
      const categoryId = category.CategoryId === 0 ? 0 : category.CategoryId

      const interactionCommentTemplates = get(interactionsCommentTemplates, [reasonId, categoryId], {}).commentTemplates
      const areCommentTemplatesLengthMoreThanOne = interactionCommentTemplates && interactionCommentTemplates.length > 1

      const isCommentFree = category.IsCommentFree
      if ((areCommentTemplatesLengthMoreThanOne || isCommentFree) && !isCommentModalToggled) {
        return {
          isCommentModalToggled: true,
          isCommentEditClicked: false
        }
      }

      if (areCommentTemplatesLengthMoreThanOne !== undefined && !areCommentTemplatesLengthMoreThanOne && !isCommentFree && !isCommentModalToggled) {
        notification.open({
          message: 'Внимание',
          description: 'К данной причине/категории привязан только 1 шаблон',
          type: 'warning'
        })

        return {
          isCommentEditClicked: false
        }
      }
    }

    return null
  }

  onDeleteInteraction = (interactionId) => {
    this.props.onDeleteInteraction({ interactionId })
  }

  fetchInteractionsCommentTemplates = (reasonId, categoryId) => {
    const {
      fetchInteractionsCommentTemplates,
      interactions,
      reasons
    } = this.props

    fetchInteractionsCommentTemplates({ reasonId, categoryId })

    const reason = reasons && findReason(reasons, reasonId)
    const category = reason.Categories.find(category => category.CategoryId === categoryId)
    const interaction = interactions.find(item => item.ReasonId === reasonId && item.CategoryId === categoryId)

    this.setState({
      reason,
      category,
      interactionToEdit: interaction,
      isCommentEditClicked: true
    })
  }

  editInteractionComment = (comment, template) => {
    const { editInteractionComment, handlingId } = this.props
    const { interactionToEdit } = this.state

    editInteractionComment({
      interactionId: interactionToEdit.InteractionNoteId,
      handlingId: handlingId,
      commentTemplateId: template && template.TemplateId,
      commentTemplateName: template && template.TemplateName,
      commentText: comment
    })
  }

  toggleCommentModal = () => {
    if (this.state.isCommentModalToggled) {
      this.setState({
        isCommentModalToggled: false,
        reason: null,
        category: null,
        interactionToEdit: null
      })

      this.props.clearInteractionsCommentTemplates()
    } else {
      this.setState({
        isCommentModalToggled: true
      })
    }
  }

  render () {
    const {
      interactions,
      onInteractionSmsParameterClick,
      interactionsCommentTemplates
    } = this.props

    if (!interactions) return null

    const interactionFields = [
      'ReasonName',
      'Msisdn',
      'Email',
      'CategoryName',
      'CommentText',
      'RegisteringCaseName',
      'SmsTemplateId',
      'InteractionNoteId'
    ]

    const { isCommentModalToggled, reason, category, interactionToEdit } = this.state

    const reasonId = reason && reason.ReasonId
    const categoryId = category && category.CategoryId

    const modalCommentTemplates = get(interactionsCommentTemplates, [reasonId, categoryId], {}).commentTemplates
    const modalCommentTemplateId = interactionToEdit && interactionToEdit.CommentTemplateId?.toLowerCase()
    const modalCommentText = interactionToEdit && interactionToEdit.commentText

    return (
      <Table isToggled={interactions && interactions.length}>
        {
          isCommentModalToggled && (
            <CommentModal
              isModalToggled={isCommentModalToggled}
              onClose={() => this.toggleCommentModal()}
              isCommentFree={category.IsCommentFree}
              commentTemplateId={modalCommentTemplateId}
              commentText={modalCommentText}
              templates={modalCommentTemplates}
              editInteractionComment={this.editInteractionComment}
            />
          )
        }
        <TableHeadWrapper>
          <tr>
            <TableHeadCell>Причина</TableHeadCell>
            <TableHeadCell>Телефон</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Категория</TableHeadCell>
            <TableHeadCell>Комментарий</TableHeadCell>
            <TableHeadCell>Сценарий</TableHeadCell>
            <TableHeadCell>SMS</TableHeadCell>
            <TableHeadCell />
          </tr>
        </TableHeadWrapper>
        <tbody>
          {
            interactions && interactions.map((item, index) => {
              return (
                <Interaction
                  key={index}
                  interaction={item}
                  columns={interactionFields}
                  onDeleteInteraction={this.onDeleteInteraction}
                  onInteractionSmsParameterClick={onInteractionSmsParameterClick}
                  fetchInteractionsCommentTemplates={this.fetchInteractionsCommentTemplates}
                />
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}

export default ReasonsRegisteringInteractions

const Table = styled.table`
  width: 100%;
  height: 25%;
  max-height: 25%;
  will-change: transform, opacity;
  display: ${props => (props.isToggled ? 'block' : 'none')};
  overflow: hidden;
  transition: all 0.3s ease-out;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: auto;
`

const TableHeadWrapper = styled.thead`
  background-color: #ecfafe;
`

const TableHeadCell = styled.th`
  width: 1%;
  font-size: 12px;
  color: #999999;
  padding: 12px 0;
  text-align: center;

  &:first-child {
    padding-left: 25px;
    text-align: left;
    min-width: 130px
  }

  &:last-child {
    padding-right: 0;
  }
`
