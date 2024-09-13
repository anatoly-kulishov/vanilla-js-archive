import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import React from 'react'
import styled from 'styled-components'
import { Editor } from 'react-draft-wysiwyg'

const StyledEditor = props => (
  <Wrapper>
    <Editor
      {...props}
    />
  </Wrapper>
)

export default StyledEditor

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .rdw-editor-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .rdw-editor-toolbar {
    flex-shrink: 0;
    border-radius: 0;
    border-bottom: 1px solid #F1F1F1;
    margin-bottom: 0;
  }

  .rdw-colorpicker-modal {
    width: 200px;
    height: 200px;
  }

  .rdw-colorpicker-modal-options {
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .rdw-link-modal {
    box-sizing: content-box;
  }

  .rdw-editor-main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 4px 11px;
  }

  .DraftEditor-root,
  .DraftEditor-editorContainer,
  .public-DraftEditor-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .public-DraftStyleDefault-block {
    margin: 0;
  }

  h1 {
    font-size: 2.8em;
  }

  h2 {
    font-size: 2.2em;
  }

  h3 {
    font-size: 1.6em;
  }
`
