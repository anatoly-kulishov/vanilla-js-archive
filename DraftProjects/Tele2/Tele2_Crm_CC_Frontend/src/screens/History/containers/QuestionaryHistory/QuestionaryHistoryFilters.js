/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Select as AntdSelect } from 'antd'
import RangePicker from 'components/RangePicker'

const { Option } = AntdSelect

export default function QuestionaryHistoryFilters ({
  filters: { questionaryId, datePeriodStart, datePeriodFinish },
  isLoading,
  questionaryUseListWithoutCheck,
  onFilterChange,
  fetchQuestionaryUseListWithoutCheck
}) {
  QuestionaryHistoryFilters.propTypes = {
    filters: PropTypes.shape({
      questionaryId: PropTypes.string,
      datePeriodStart: PropTypes.object,
      datePeriodFinish: PropTypes.object
    }),
    isLoading: PropTypes.bool,
    questionaryUseListWithoutCheck: PropTypes.array,
    onFilterChange: PropTypes.func.isRequired,
    fetchQuestionaryUseListWithoutCheck: PropTypes.func.isRequired
  }

  const questionaryUseListOptions = questionaryUseListWithoutCheck.map(({ QuestionaryId, QuestionaryName }) => (
    <Option key={QuestionaryId}>{QuestionaryName}</Option>
  ))

  return (
    <Wrapper>
      <Label htmlFor='questionary-name'>Название анкеты</Label>
      <Select
        loading={isLoading}
        onDropdownVisibleChange={open => open && fetchQuestionaryUseListWithoutCheck()}
        id='questionary-name'
        value={questionaryId}
        onChange={value => onFilterChange({ questionaryId: value })}
      >
        {questionaryUseListOptions}
      </Select>
      <RangePicker
        limitMonth={3}
        value={{ from: datePeriodStart, to: datePeriodFinish }}
        onChange={({ from, to }) => onFilterChange({ datePeriodStart: from, datePeriodFinish: to })}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px 20px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin: 0;
  line-height: 36px;
`
const Select = styled(AntdSelect)`
  width: 350px;
  margin-bottom: 20px;
`
