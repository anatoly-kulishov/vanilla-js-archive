/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Questionary from 'containers/Questionary'

import { Popover } from 'antd'
import { CloseCircleOutlined, AuditOutlined } from '@ant-design/icons'
import HeaderButton from '../../../components/HeaderButton'

export default function QuestionaryPopover ({ questionaryUseListError, fetchQuestionaryUseList }) {
  QuestionaryPopover.propTypes = {
    questionaryUseListError: PropTypes.string,
    fetchQuestionaryUseList: PropTypes.func.isRequired
  }

  const [isVisible, setVisible] = useState(false)

  const handleClick = visible => {
    visible && fetchQuestionaryUseList()
    setVisible(visible)
  }

  return (
    <Wrapper>
      <Popover
        trigger='click'
        visible={isVisible}
        title={questionaryUseListError ? undefined : 'Анкета'}
        content={
          questionaryUseListError ? (
            <span>
              <ErrorIcon />
              {questionaryUseListError}
            </span>
          ) : (
            <span onClick={() => setVisible(false)}>
              <Questionary />
            </span>
          )
        }
        onVisibleChange={handleClick}
      >
        <HeaderButton icon={<AuditOutlined />}>Анкета</HeaderButton>
      </Popover>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: white;
  font-size: 20px;
  cursor: pointer;
`

const ErrorIcon = styled(CloseCircleOutlined)`
  font-size: 20px;
  color: red;
  margin-right: 10px;
  display: inline-block;
`
