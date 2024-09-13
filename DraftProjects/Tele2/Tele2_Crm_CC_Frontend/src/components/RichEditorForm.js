/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Size = Quill.import('attributors/style/size')
const Block = Quill.import('blots/block')
Size.whitelist = ['12px']
Block.tagName = 'div'
Quill.register(Size, true)
Quill.register(Block, true)

export function RichEditorForm (props) {
  RichEditorForm.propTypes = {
    value: PropTypes.shape({
      formatted: PropTypes.string,
      plainText: PropTypes.string
    }),
    onChange: PropTypes.func
  }

  const { value, onChange, ...rest } = props

  const handleChange = (content, _delta, _source, editor) => {
    onChange({
      formatted: content,
      plainText: editor.getText()
    })
  }

  return <StyledEditor
    {...rest}
    className={'editor'}
    value={value?.formatted}
    onChange={handleChange}
    bounds={'.editor'}
    modules={{
      toolbar: [
        ['bold', 'underline'],
        ['link'],
        ['clean'],
        [{ 'list': 'ordered' }]
      ]
    }}
  />
}

const StyledEditor = styled(ReactQuill)`
  .ql-toolbar.ql-snow {
    border: 1px solid #d9d9d9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .ql-editor {
    height: 300px;
    color: black;
  }
  .ql-container.ql-snow {
    border: 1px solid #d9d9d9;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top: 0;
  }
  .ql-snow {
    .ql-tooltip[data-mode=link] {
      :before {
        content: 'Ссылка:'
      }
    }
    .ql-tooltip.ql-editing {
      .ql-action {
        :after {
          content: 'Сохранить'
        }
      }
    }
    .ql-tooltip {
      border-radius: 4px;
      :before {
        content: 'Перейти:'
      }
      .ql-action {
        :after {
          content: 'Редактировать'
        }
      }
      .ql-remove {
        :before {
          content: 'Удалить'
        }
      }
    } 
  }
`
