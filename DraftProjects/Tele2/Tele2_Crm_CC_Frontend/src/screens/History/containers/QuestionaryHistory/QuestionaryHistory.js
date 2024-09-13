/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import QuestionaryHistoryFilters from './QuestionaryHistoryFilters'
import QuestionaryHistoryTable from './QuestionaryHistoryTable'
import FormModal from 'containers/Questionary/components/FormModal'
import QuestionaryHistoryFooter from 'screens/History/components/QuestionaryHistoryFooter'

import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'
import { initialHistoryState, dayStartTime, dayEndTime } from '../../HistoryContext/constants'

export default function QuestionaryHistory ({
  questionaryHistory,
  isQuestionaryHistoryLoading,
  fetchQuestionaryHistory,

  questionaryUseListWithoutCheck,
  isQuestionaryUseListWithoutCheckLoading,
  fetchQuestionaryUseListWithoutCheck,

  questionsHistory,
  isQuestionsHistoryLoading,
  fetchQuestionsHistory
}) {
  QuestionaryHistory.propTypes = {
    questionaryHistory: PropTypes.array,
    isQuestionaryHistoryLoading: PropTypes.bool,
    fetchQuestionaryHistory: PropTypes.func.isRequired,

    questionaryUseListWithoutCheck: PropTypes.array,
    isQuestionaryUseListWithoutCheckLoading: PropTypes.bool,
    fetchQuestionaryUseListWithoutCheck: PropTypes.func,

    questionsHistory: PropTypes.array,
    isQuestionsHistoryLoading: PropTypes.bool,
    fetchQuestionsHistory: PropTypes.func
  }

  const [isModalOpen, setModalOpen] = useState(false)

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  useEffect(() => {
    updateQuestionaryHistory()
  }, [])

  const controls = questionsHistory?.Questions ?? []
  const questionaryName = questionsHistory?.QuestionaryName
  const createdFio = questionsHistory?.CreatedFIO
  const createdOn = questionsHistory?.CreatedOn

  const updateQuestionaryHistory = () => {
    const { questionaryId, datePeriodStart, datePeriodFinish } = filters
    fetchQuestionaryHistory({
      ...(questionaryId && { questionaryId: +questionaryId }),
      ...(datePeriodStart && { startDate: moment.utc(datePeriodStart).set(dayStartTime).format() }),
      ...(datePeriodFinish && { endDate: moment.utc(datePeriodFinish).set(dayEndTime).format() })
    })
  }

  const handleFiltersClear = () => {
    const { datePeriodStart, datePeriodFinish, questionaryName } = initialHistoryState.filters
    updateHistoryFilterValue({
      datePeriodStart,
      datePeriodFinish,
      questionaryName
    })
  }

  const handleTableItemClick = questionaryHistoryId => {
    fetchQuestionsHistory({ questionaryHistoryId })
    setModalOpen(true)
  }

  return (
    <Fragment>
      <FiltersWrapper>
        <QuestionaryHistoryFilters
          filters={filters}
          isLoading={isQuestionaryUseListWithoutCheckLoading}
          questionaryUseListWithoutCheck={questionaryUseListWithoutCheck}
          fetchQuestionaryUseListWithoutCheck={fetchQuestionaryUseListWithoutCheck}
          onFilterChange={updateHistoryFilterValue}
          onSubmit={updateQuestionaryHistory}
          onClear={handleFiltersClear}
        />
      </FiltersWrapper>
      <QuestionaryHistoryTable
        dataSource={questionaryHistory}
        isLoading={isQuestionaryHistoryLoading}
        onItemClick={handleTableItemClick}
      />
      <FormModal
        onCancel={() => setModalOpen(false)}
        dataSource={controls}
        title={questionaryName}
        hasInitialValues
        footer={<QuestionaryHistoryFooter createdFio={createdFio} createdOn={createdOn} />}
        isVisible={isModalOpen}
        isEditable={false}
        isLoading={isQuestionsHistoryLoading}
      />
    </Fragment>
  )
}
