/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Popconfirm, AutoComplete, Button } from 'antd'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { isNil } from 'lodash'
import { maxCommentLength } from 'constants/compensations'
import { PaydCommentsProps } from 'constants/compensationsPropTypes'

const CommentEditing = ({
  form: {
    getFieldDecorator,
    getFieldsValue
  },
  paydComments,
  isEditControlsVisibled,
  setEditControlsVisible,
  handleModifyComment,
  fetchPaydComments
}) => {
  CommentEditing.propTypes = {
    setEditControlsVisible: PropTypes.func,
    handleModifyComment: PropTypes.func,
    isEditControlsVisibled: PropTypes.objectOf(
      PropTypes.shape({
        isEditPopconfirmVisible: PropTypes.bool,
        isEditPopoverVisible: PropTypes.bool
      })
    ),
    form: PropTypes.objectOf(),
    paydComments: PropTypes.arrayOf(PaydCommentsProps),
    fetchPaydComments: PropTypes.func
  }

  const choosedComment = getFieldsValue().comment
  const isDisabledOkButton = isNil(choosedComment)

  return (
    <EditCommentWrapper>
      <Form.Item>
        {getFieldDecorator('comment', {
          rules: [
            { max: maxCommentLength, message: `Комментарий не должен превышать ${maxCommentLength} символов!` }
          ]
        })(
          <StyledAutoComplete
            onFocus={() => fetchPaydComments({ isActive: true })}
            dataSource={paydComments}
            filterOption={(inputValue, option) => {
              const { props: { children } } = option
              return children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }}
            allowClear
          >
            {paydComments && paydComments.map(comment => (
              <AutoComplete.Option value={comment.PaydCommentDescription} key={comment.PaydCommentDescription}>
                {comment.PaydCommentDescription}
              </AutoComplete.Option>
            ))}
          </StyledAutoComplete>
        )}
      </Form.Item>
      <Popconfirm
        title='Изменить комментарий?'
        placement='bottom'
        onConfirm={() => handleModifyComment(choosedComment)}
        onCancel={() => setEditControlsVisible({ ...isEditControlsVisibled, isEditPopconfirmVisible: false })}
        visible={isEditControlsVisibled.isEditPopconfirmVisible}
      >
        <EditCommentButton
          type='primary'
          disabled={isDisabledOkButton}
          onClick={() => setEditControlsVisible({ ...isEditControlsVisibled, isEditPopconfirmVisible: true })}>
          ОК
        </EditCommentButton>
      </Popconfirm>
    </EditCommentWrapper>
  )
}

export default CommentEditing

const StyledAutoComplete = styled(AutoComplete)`
  width: 250px;
`
const EditCommentWrapper = styled.div`
  display: flex;
`
const EditCommentButton = styled(Button)`
  width: 100px;
  margin: 4px 0 0 15px;
`
