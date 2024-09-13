/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import TextArea from 'components/TextArea'
import { Select } from 'antd'

const Option = Select.Option
const autoSize = { minRows: 1, maxRows: null }

const SmsSendingCommentTemplates = props => {
  const {
    commentTemplate,
    isCommentFree,
    reasonCategoryCommentTemplates,
    onCommentTemplateChange,
    onCommentTemplateTextChange,
    isTemplateRequired,
    disableTemplate
  } = props

  return (
    <Wrapper>
      <div>
        <Title>Шаблон комментария</Title>
        <SelectWrapper
          required={isTemplateRequired && disableTemplate}
          value={get(commentTemplate, 'CommentTemplateId', '')}
          onChange={commentTemplateId => onCommentTemplateChange(commentTemplateId)}
          disabled={!disableTemplate}
        >
          <Option key={-1} value={''} hidden>
            Выберите шаблон комментария
          </Option>
          {reasonCategoryCommentTemplates.map((item, index) => (
            <Option key={index} value={item.TemplateId}>
              {item.TemplateName}
            </Option>
          ))}
        </SelectWrapper>
      </div>
      <TextArea
        resize='none'
        autoSize={autoSize}
        required={!disableTemplate && isCommentFree && commentTemplate && !commentTemplate.CommentText}
        onChange={elem => onCommentTemplateTextChange(elem.target.value)}
        value={commentTemplate && commentTemplate.CommentText}
        placeholder='Текст комментария'
        disabled={!isCommentFree}
      />
    </Wrapper>
  )
}

export default SmsSendingCommentTemplates

SmsSendingCommentTemplates.propTypes = {
  commentTemplate: PropTypes.object,
  isCommentFree: PropTypes.bool,
  reasonCategoryCommentTemplates: PropTypes.object,
  onCommentTemplateChange: PropTypes.func,
  onCommentTemplateTextChange: PropTypes.func,
  isTemplateRequired: PropTypes.bool,
  disableTemplate: PropTypes.func
}

const Title = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  color: black;
`

const SelectWrapper = styled(Select)`
  width: 300px;
  margin-right: 10px;
  .ant-select-selection--single {
    border-color: ${({ required }) => (required ? css`#F5222D` : css`rgb(217, 217, 217)`)};
  }
`

const Wrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
`
