/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Input } from 'antd'
const TextAreaInput = Input.TextArea

export default function TextArea ({ defaultAutoSize, autoSize, ...rest }) {
  TextArea.propTypes = {
    defaultAutoSize: PropTypes.objectOf(
      PropTypes.shape({
        minRows: PropTypes.number,
        maxRows: PropTypes.number
      })
    ),
    autoSize: PropTypes.objectOf(
      PropTypes.shape({
        minRows: PropTypes.number,
        maxRows: PropTypes.number
      })
    )
  }

  const textArea = useRef(null)

  const [currentAutoSize, setCurrentAutoSize] = useState({
    minRows: 1,
    maxRows: 3
  })

  useLayoutEffect(() => {
    setCurrentAutoSize(autoSize)
  }, [])

  // =START==
  // This is a beautiful [hack]solution
  // to have antd textarea resized onBlur & onFocus
  // according to given requirements (props)
  const applyResize = () => {
    const { resizeOnNextFrame } = textArea.current.resizableTextArea
    resizeOnNextFrame()
  }
  // =END==
  const handleBlur = () => {
    applyResize()
    setCurrentAutoSize(defaultAutoSize)
  }

  const handleFocus = () => {
    applyResize()
    setCurrentAutoSize(autoSize)
  }

  return <Textarea ref={textArea} autoSize={currentAutoSize} onFocus={handleFocus} onBlur={handleBlur} {...rest} />
}

const Textarea = styled(TextAreaInput)`
  resize: ${({ resize }) => resize};
  border-color: ${({ required }) => required ? css`#f5222d` : css`d9d9d9`};
`
