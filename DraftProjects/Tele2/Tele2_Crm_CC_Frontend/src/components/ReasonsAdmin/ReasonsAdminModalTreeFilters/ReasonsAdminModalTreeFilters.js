import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Select, Input } from 'antd'

const Option = Select.Option

class ReasonsAdminModalTreeFilters extends Component {
  static propTypes = {
    setAdminModalReasonsFiltersFields: PropTypes.object,
    clientCategories: PropTypes.object,
    channels: PropTypes.object,
    isMinimized: PropTypes.bool,
    clientCategoryId: PropTypes.object,
    channelId: PropTypes.object,
    mnemoCode: PropTypes.object,
    reasonName: PropTypes.object
  }
  onFilter = (field, value) => {
    this.props.setAdminModalReasonsFiltersFields({ field: field, value: value })
  }

  onMnemoInputKeyEnter = (elem, field, value) => {
    if (elem.key === 'Enter') {
      this.props.setAdminModalReasonsFiltersFields({ field: field, value: value, isMnemoToFetch: true })
    }
  }

  createOptions = (item, index) => {
    return (
      <Option key={index} value={item.Id}>{item.Name}</Option>
    )
  }

  render () {
    const {
      clientCategories,
      channels,
      isMinimized,
      clientCategoryId,
      channelId,
      mnemoCode,
      reasonName
    } = this.props

    return (
      <Wrapper>
        <InputsGroup isMinimized={isMinimized}>
          <InputsColumn isMinimized={isMinimized}>
            <SelectWrapper>
              <SelectLabel>Категория клиента</SelectLabel>
              <SelectItem
                onChange={(idVal) => this.onFilter('clientCategoryId', idVal || null)}
                value={clientCategoryId || null}
                defaultValue='Все'
              >
                <Option key={1000} value={null}>Все</Option>
                {
                  clientCategories.map(this.createOptions)
                }
              </SelectItem>
            </SelectWrapper>
            <SelectWrapper>
              <SelectLabel width='132px'>Канал обслуживания</SelectLabel>
              <SelectItem
                onChange={(idVal) => this.onFilter('channelId', idVal || null)}
                value={channelId || null}
              >
                <Option key={1000} value={null}>Все</Option>
                {
                  channels.map(this.createOptions)
                }
              </SelectItem>
            </SelectWrapper>
          </InputsColumn>
          <InputsColumn isMinimized={isMinimized}>
            <InputWrapper>
              <InputLabel width='175px'>Причина</InputLabel>
              <InputItem
                onChange={(elem) => this.onFilter('reasonName', elem.target.value)}
                value={reasonName}
                placeholder='Причина'
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel width='44px'>Мнемо</InputLabel>
              <InputItem
                onChange={(elem) => this.onFilter('mnemoCode', elem.target.value)}
                onKeyPress={(elem) => this.onMnemoInputKeyEnter(elem, 'mnemoCode', elem.target.value)}
                value={mnemoCode}
                placeholder='Мнемо'
              />
            </InputWrapper>
          </InputsColumn>
        </InputsGroup>
      </Wrapper>
    )
  }
}

export default ReasonsAdminModalTreeFilters

const Wrapper = styled.div`
  border-bottom: 1px solid #d9d9d9;
  padding: 0 15px 10px;
  display: flex;
  flex-wrap: wrap;
`

const InputsGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  flex: 1;
  
  &:nth-child(2) {
    padding-top: 5px;
  }
`

const InputsColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SelectLabel = styled.label`
  font-weight: bold;
  width: 140px;
`

const SelectItem = styled(Select)`
  width: 150px;
`

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const InputLabel = styled.label`
  font-weight: bold;
  width: 140px;
`

const InputItem = styled(Input)`
  width: 150px;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`
