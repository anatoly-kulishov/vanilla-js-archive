/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import get from 'lodash/get'

import { PersonalAccountStateProps } from 'constants/personalAccount'
import FormModal from './components/FormModal'

import { List } from 'antd'
import { getControlsWithData, getAnsweredQuestionsWithData } from './helpers/getWithData'
const { Item } = List

export default function Questionary ({
  questionaryUseList,
  isQuestionaryUseListLoading,

  questionsList,
  isQuestionsListLoading,
  fetchQuestionsList,

  writeNewQuestionary,
  saveQuestionary,
  answeredQuestions,
  personalAccount: { Msisdn }
}) {
  Questionary.propTypes = {
    questionaryUseList: PropTypes.array,
    isQuestionaryUseListLoading: PropTypes.bool,

    questionsList: PropTypes.object,
    isQuestionsListLoading: PropTypes.bool,
    fetchQuestionsList: PropTypes.func.isRequired,

    writeNewQuestionary: PropTypes.func.isRequired,

    saveQuestionary: PropTypes.func,
    answeredQuestions: PropTypes.arrayOf(
      PropTypes.shape({
        QuestionId: PropTypes.number,
        Data: PropTypes.string
      })
    ),
    personalAccount: PersonalAccountStateProps
  }

  const [isModalOpen, setModalOpen] = useState(false)

  const questionaryName = get(questionsList, 'QuestionaryName', null)
  const questionaryId = get(questionsList, 'QuestionaryId', null)
  const controls = get(questionsList, 'Controls', [])

  const handleQuestionaryClick = ({ QuestionaryId, ExistingQuestionaryHistoryId }) => {
    fetchQuestionsList({
      QuestionaryId,
      ExistingQuestionaryHistoryId
    })
    setModalOpen(true)
  }

  const handleQuestionarySubmit = values => {
    const controlsWithData = getControlsWithData(controls, values)
    writeNewQuestionary({
      questionaryId,
      questionaryName,
      controls: controlsWithData
    })
    setModalOpen(false)
  }

  const handleQuestionaryCancel = values => {
    const controlsWithData = getAnsweredQuestionsWithData(controls, values)
    saveQuestionary(controlsWithData.filter((item) => !!item.Data))
    setModalOpen(false)
  }

  return (
    <Fragment>
      <FormModal
        hasInitialValues
        isLoading={isQuestionsListLoading}
        onCancel={handleQuestionaryCancel}
        dataSource={controls}
        title={questionaryName}
        onOk={handleQuestionarySubmit}
        isVisible={isModalOpen}
        answeredQuestions={answeredQuestions}
        msisdnToSet={Msisdn}
      />
      <List
        size='small'
        dataSource={questionaryUseList}
        loading={isQuestionaryUseListLoading}
        renderItem={({ QuestionaryId, QuestionaryName, ExistingQuestionaryHistoryId }) => (
          <QuestionaryItem
            key={QuestionaryId}
            onClick={() => handleQuestionaryClick({ QuestionaryId, ExistingQuestionaryHistoryId })}
          >
            {QuestionaryName}
          </QuestionaryItem>
        )}
      />
    </Fragment>
  )
}

const QuestionaryItem = styled(Item)`
  cursor: pointer;
  transition: 0.1s ease-out;
  :hover {
    color: #40bfee;
  }
`
