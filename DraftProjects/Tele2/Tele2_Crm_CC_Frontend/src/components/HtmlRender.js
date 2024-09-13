import React from 'react'
import DOMPurify from 'dompurify'
import styled from 'styled-components'
import { object, string } from 'prop-types'

const propTypes = { className: string, value: string, options: object }

/** Add rel attribute if target attribute allowed in config */
DOMPurify.addHook('afterSanitizeAttributes', (node, __, config) => {
  if ('target' in node && config?.ADD_ATTR?.includes('target')) {
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export default function HtmlRender (props) {
  const { className, value, options } = props

  return <StyledDiv className={className} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value, options) }} />
}

HtmlRender.propTypes = propTypes

const StyledDiv = styled.div`
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
