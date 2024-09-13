import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MassProblemRegionProps } from 'constants/massProblems'
import { Row, Col, Select, Input, Button, Checkbox } from 'antd'

const propTypes = {
  isWebSeller: PropTypes.bool,
  isAnonymousCardWebSeller: PropTypes.bool,
  expandAllFlag: PropTypes.bool.isRequired,
  nameSearchFlag: PropTypes.bool.isRequired,
  defaultRegion: PropTypes.number.isRequired, // eslint-disable-line
  regions: PropTypes.arrayOf(MassProblemRegionProps),
  defaultServiceChannelInterface: PropTypes.string,
  serviceChannelInterfaces: PropTypes.array,
  onServiceChannelInterfaceChange: PropTypes.func.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onNameSearch: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onAdditionalInfoShow: PropTypes.func.isRequired,
  problemCount: PropTypes.number,
  plusCount: PropTypes.number,
  minusCount: PropTypes.number,
  displayedProblems: PropTypes.number,
  region: PropTypes.object,
  onKeyDown: PropTypes.func
}

const MassProblemsFilter = props => {
  const {
    isWebSeller,
    isAnonymousCardWebSeller,
    expandAllFlag,
    nameSearchFlag,
    regions,
    region,
    defaultServiceChannelInterface,
    serviceChannelInterfaces,
    onServiceChannelInterfaceChange,
    onRegionChange,
    onSearch,
    onNameSearch,
    onNumberChange,
    onTextChange,
    onKeyDown,
    problemCount,
    plusCount,
    minusCount,
    displayedProblems,
    onAdditionalInfoShow
  } = props

  const regionOptions = regions?.map(item => ({ label: item.BranchName, value: item.BranchId, key: item.BranchId }))
  const serviceChannelOptions = serviceChannelInterfaces?.map(item => ({
    label: item.Description,
    value: item.Id,
    key: item.Id
  }))

  const isShowRegionSearch = !isWebSeller || isAnonymousCardWebSeller
  const isClientCardWebSeller = isWebSeller && !isAnonymousCardWebSeller

  return (
    <FiltersWrapper>
      <Row>
        {isShowRegionSearch && (
          <Col span={8}>
            <Header>Регион</Header>
            <RegionSelect
              showSearch
              value={region}
              onChange={onRegionChange}
              optionFilterProp='label'
              options={regionOptions}
            />
            {!isWebSeller && (
              <ProblemCounter>
                <ProblemCount>{problemCount} проблем (</ProblemCount>
                <PlusCount>+{plusCount},</PlusCount>
                <MinusCount> -{minusCount}</MinusCount>)
              </ProblemCounter>
            )}
          </Col>
        )}
        <Col span={isClientCardWebSeller ? 12 : 8}>
          <Header>{isWebSeller ? 'Номер' : 'Каналы взаимодействия'}</Header>
          {isWebSeller ? (
            <InputProblemNumber type='number' onChange={onNumberChange} />
          ) : (
            <ServiceChannelSelect
              defaultValue={defaultServiceChannelInterface}
              onChange={onServiceChannelInterfaceChange}
              options={serviceChannelOptions}
              allowClear
            />
          )}
        </Col>
        <Col span={isClientCardWebSeller ? 12 : 8}>
          <Header>Поиск по тексту</Header>
          <Row>
            <InputWrapper span={20}>
              <Input onChange={onTextChange} onKeyDown={onKeyDown} />
            </InputWrapper>
            <Col span={4}>
              <SearchButton type='primary' onClick={onSearch}>
                Найти
              </SearchButton>
            </Col>
          </Row>
          <SearchCheckBox onChange={onNameSearch} checked={nameSearchFlag}>
            Искать только в названии
          </SearchCheckBox>
        </Col>
      </Row>
      <SearchCounterWrapper>
        <Counter>Найдено {displayedProblems} проблем</Counter>
        {!isWebSeller && (
          <SearchCheckBox onChange={onAdditionalInfoShow} checked={expandAllFlag}>
            Отображать с дополнительной информацией
          </SearchCheckBox>
        )}
      </SearchCounterWrapper>
    </FiltersWrapper>
  )
}

MassProblemsFilter.propTypes = propTypes

export default MassProblemsFilter

const FiltersWrapper = styled.div`
  padding: 5px 20px 20px 20px;
`
const Header = styled.div`
  font-weight: normal;
  color: black;
  padding-bottom: 5px;
`
const InputWrapper = styled(Col)`
  padding-right: 20px;
`
const SearchButton = styled(Button)`
  font-family: T2HalvarBreit_ExtraBold;
`
const SearchCheckBox = styled(Checkbox)`
  padding-top: 5px;
  font-weight: normal;
  font-size: 13px;
`
const ProblemCounter = styled.div`
  padding-top: 5px;
`
const SearchCounterWrapper = styled.div`
  padding-top: 26px;
  display: inline-grid;
`
const Counter = styled.label`
  font-weight: normal;
  color: black;
  font-size: 16px;
`
const ProblemCount = styled.label`
  font-weight: normal;
`
const MinusCount = styled.label`
  font-weight: normal;
  color: #52c41a;
`
const PlusCount = styled.label`
  font-weight: normal;
  color: #f5222d;
`
const RegionSelect = styled(Select)`
  width: 95%;
`
const ServiceChannelSelect = styled(Select)`
  width: 95%;
`

const InputProblemNumber = styled(Input)`
  width: 95%;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`
