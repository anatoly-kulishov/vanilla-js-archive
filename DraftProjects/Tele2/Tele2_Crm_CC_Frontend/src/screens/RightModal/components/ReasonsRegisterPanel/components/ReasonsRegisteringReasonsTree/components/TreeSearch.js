/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import ReasonSearchLine from 'screens/RightModal/components/ReasonSearchLine'

const Option = Select.Option

const TreeSearch = props => {
  TreeSearch.propTypes = {
    onSearch: PropTypes.object,
    companyMarks: PropTypes.object,
    reasonSearchName: PropTypes.string,
    marksChange: PropTypes.object,
    selectedCompanyMarks: PropTypes.object,
    searchData: PropTypes.array
  }
  const {
    onSearch,
    companyMarks,
    reasonSearchName,
    marksChange,
    selectedCompanyMarks,
    searchData
  } = props

  const isCompanyMarks = companyMarks && !!companyMarks.length

  return (
    <Wrapper>
      <Label>Выберите причину и категорию обращения</Label>
      <FlexWrapper>
        <SearchWrapper>
          <ReasonSearchLine
            dictionary={searchData}
            value={reasonSearchName}
            onSearch={value => onSearch({ field: 'reasonName', value: value || '' })}
          />
        </SearchWrapper>
        {isCompanyMarks && (
          <SelectWrapper
            mode='multiple'
            placeholder='Выберите метку'
            onChange={marksId => marksChange({ marksId })}
            value={selectedCompanyMarks}
          >
            {companyMarks.map(item => (
              <Option key={item.id} value={item.Id}>
                {item.Name}
              </Option>
            ))}
          </SelectWrapper>
        )}
      </FlexWrapper>
    </Wrapper>
  )
}

export default TreeSearch

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 0 10px 0 25px;
  margin-bottom: 15px;
  background: #fff;
`

const FlexWrapper = styled.div`
  display: flex;
`

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`

const SelectWrapper = styled(Select)`
  margin-left: 15px;
  width: 200px;
`

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  color: black;
`
