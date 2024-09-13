/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Button } from 'antd'
import { CancelIcon } from 'components/assets'

class Interaction extends Component {
  static propTypes = {
    columns: PropTypes.object,
    interaction: PropTypes.object,
    onDeleteInteraction: PropTypes.func,
    onInteractionSmsParameterClick: PropTypes.func,
    fetchInteractionsCommentTemplates: PropTypes.func
  }
  render () {
    const {
      columns,
      interaction,
      onDeleteInteraction,
      onInteractionSmsParameterClick,
      fetchInteractionsCommentTemplates
    } = this.props

    const formattedInteraction = {}

    columns.map(field => {
      formattedInteraction[field] = interaction[field]

      return field
    })
    return (
      <TableBodyRow>
        {Object.keys(formattedInteraction).map((field, key) => {
          if (field === 'SmsTemplateId') {
            const isSmsParameterActive = interaction.SmsTemplateId
            const isSmsParameterHidden = !isSmsParameterActive || isSmsParameterActive === ''

            return (
              <TableBodyCell key={key}>
                {!isSmsParameterHidden && (
                  <Button onClick={() => onInteractionSmsParameterClick(interaction)}>
                    Отменить SMS
                  </Button>
                )}
              </TableBodyCell>
            )
          } else if (field === 'CommentText') {
            const reasonId = interaction.ReasonId
            const categoryId = interaction.CategoryId

            return (
              <TableBodyCommentCell
                key={key}
                className='commentCell'
                isActive={interaction[field] !== '' && interaction[field]}
                onClick={() => fetchInteractionsCommentTemplates(reasonId, categoryId)}
              >
                {interaction[field]}
              </TableBodyCommentCell>
            )
          } else if (field !== 'InteractionNoteId') {
            return <TableBodyCell key={key}>{interaction[field]}</TableBodyCell>
          }
          return null
        })}
        <TableBodyCell onClick={() => onDeleteInteraction(interaction.InteractionNoteId)}>
          <CancelIcon />
        </TableBodyCell>
      </TableBodyRow>
    )
  }
}

export default Interaction

const TableBodyCell = styled.td`
  font-size: 12px;
  padding: 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  &:first-child {
    padding-left: 25px;
    text-align: left;
  }

  &:last-child {
    padding-right: 20px;
    cursor: pointer;
  }
`

const TableBodyRow = styled.tr`
  transition: background 0.15s ease-in-out;
  &:hover {
    background-color: #48bfec80;
  }

  &.commentCell:hover {
    color: #fff;
  }
`

const TableBodyCommentCell = styled.td`
  font-size: 12px;
  padding: 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  cursor: ${props => (props.isActive ? css`pointer` : css`default`)};
  pointer-events: ${props => (props.isActive ? css`unset` : css`none`)};

  &:first-child {
    padding-left: 25px;
    text-align: left;
  }

  &:last-child {
    padding-right: 20px;
    cursor: pointer;
  }
`
