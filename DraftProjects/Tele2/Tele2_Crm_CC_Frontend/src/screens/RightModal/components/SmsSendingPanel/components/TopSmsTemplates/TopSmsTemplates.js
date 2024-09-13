/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useLayoutEffect, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button, Tooltip } from 'antd'
const ButtonGroup = Button.Group

export default function TopSmsTemplates ({
  toggleSmsSendingTemplates,
  isSmsSendingTemplatesToggled,
  fetchTemplates,
  fetchTopSmsTemplates,
  topSmsTemplates
}) {
  TopSmsTemplates.propTypes = {
    fetchTemplates: PropTypes.func.isRequired,

    topSmsTemplates: PropTypes.array,
    fetchTopSmsTemplates: PropTypes.func.isRequired,
    toggleSmsSendingTemplates: PropTypes.func.isRequired,
    isSmsSendingTemplatesToggled: PropTypes.bool
  }

  useLayoutEffect(() => {
    fetchTopSmsTemplates()
  }, [])

  const handleClick = id => {
    fetchTemplates({
      id,
      isTopTemplateSearch: true
    })
    if (isSmsSendingTemplatesToggled) toggleSmsSendingTemplates()
  }

  const topSmsTemplatesList = [...topSmsTemplates]
    .sort((elem1, elem2) => elem1.TemplateName.length - elem2.TemplateName.length)
    .map(topSmsTemplate => {
      const { TemplateId, TemplateName } = topSmsTemplate
      return (
        <Tooltip title={TemplateName}>
          <Button value={TemplateId} onClick={() => handleClick(TemplateId)}>
            {TemplateName}
          </Button>
        </Tooltip>
      )
    })

  const hasTopSmsTemplates = !!topSmsTemplates.length

  return (
    <div>
      {hasTopSmsTemplates && (
        <Fragment>
          <Title>Топ SMS</Title>
          <Wrapper>{topSmsTemplatesList}</Wrapper>
        </Fragment>
      )}
    </div>
  )
}

const Wrapper = styled(ButtonGroup)`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  > button {
    flex: 1 0 250px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const Title = styled.h4`
  color: #000;
`
