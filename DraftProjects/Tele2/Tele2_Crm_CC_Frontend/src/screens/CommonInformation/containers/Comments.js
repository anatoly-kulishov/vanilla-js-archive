import React from 'react'
import { array } from 'prop-types'
import styled from 'styled-components'
import { Row } from 'antd'

export default function Comments ({ comments }) {
  Comments.propTypes = {
    comments: array
  }

  const comment = comments.find(comment => comment.Popup)
  return (
    <Wrapper>
      <CommentItem>
        <CommentSubject>{comment.Subject}</CommentSubject>
        <CommentText>{comment.Text}</CommentText>
      </CommentItem>
    </Wrapper>
  )
}

const Wrapper = styled(Row)`
  max-height: 300px;
  overflow-y: auto;
`

const CommentSubject = styled.span`
    color: #7F8285;
`

const CommentText = styled.span`
    margin-left: 8px;
`

const CommentItem = styled.div`
  padding: 10px 20px 20px;
`
