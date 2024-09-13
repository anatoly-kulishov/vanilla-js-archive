import React, { Component } from 'react'
import styled from 'styled-components'

import { Select, Input, Checkbox, Button } from 'antd'
import PropTypes from 'prop-types'

const Option = Select.Option

class ReasonsAdminPanelTreeFilters extends Component {
  static propTypes = {
    setAdminPanelFilterFields: PropTypes.object,
    clientCategories: PropTypes.object,
    channels: PropTypes.object,
    isMinimized: PropTypes.bool,
    clientCategoryId: PropTypes.object,
    channelId: PropTypes.object,
    mnemoCode: PropTypes.object,
    reasonName: PropTypes.object,
    activeRecords: PropTypes.object,
    deletedRecords: PropTypes.object,
    reasons: PropTypes.object,
    adminFetchReasonsData: PropTypes.object
  }
  componentDidMount () {
    this.props.adminFetchReasonsData({ isFull: true })
  }

  onFilter = (field, value, isClear) => {
    if (isClear) {
      this.props.setAdminPanelFilterFields({ field: null, value: null, isClear: true })
    } else {
      this.props.setAdminPanelFilterFields({ field: field, value: value })
    }
  }

  onMnemoInputKeyEnter = (elem, field, value) => {
    if (elem.key === 'Enter') {
      this.props.setAdminPanelFilterFields({ field: field, value: value, isMnemoToFetch: true })
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
      activeRecords,
      deletedRecords,
      reasonName,
      reasons
    } = this.props

    const isSearchDisabled = !reasons && (
      clientCategoryId === undefined &&
      channelId === undefined &&
      mnemoCode === undefined &&
      reasonName === undefined &&
      activeRecords === 1 &&
      deletedRecords === 2
    )

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
                disabled={isSearchDisabled}
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
                disabled={isSearchDisabled}
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
              <Input
                onChange={(elem) => this.onFilter('reasonName', elem.target.value)}
                value={reasonName}
                placeholder='Причина'
                disabled={isSearchDisabled}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel width='44px'>Мнемо</InputLabel>
              <InputItem
                onChange={(elem) => this.onFilter('mnemoCode', elem.target.value)}
                onKeyPress={(elem) => this.onMnemoInputKeyEnter(elem, 'mnemoCode', elem.target.value)}
                placeholder='Мнемо'
                disabled={isSearchDisabled}
                value={mnemoCode}
              />
            </InputWrapper>
          </InputsColumn>
        </InputsGroup>
        {
          !isMinimized
            ? (
              <InputsGroup>
                <CheckboxWrapper>
                  <CheckboxLabel>Показывать неактивные</CheckboxLabel>
                  <Checkbox
                    onChange={(elem) => this.onFilter('activeRecords', elem.target.checked ? 0 : 1)}
                    checked={!activeRecords}
                    disabled={isSearchDisabled}
                  />
                </CheckboxWrapper>
                <CheckboxWrapper>
                  <CheckboxLabel>Показывать удаленные</CheckboxLabel>
                  <Checkbox
                    onChange={(elem) => this.onFilter('deletedRecords', elem.target.checked ? 0 : 2)}
                    checked={!deletedRecords}
                    disabled={isSearchDisabled}
                  />
                </CheckboxWrapper>
              </InputsGroup>
            ) : (
              null
            )
        }
        {
          !isMinimized
            ? (
              <ButtonGroup>
                <ButtonItem
                  onClick={() => this.onFilter(null, null, true)}
                  icon='close'
                  type='danger'
                >
                  Очистить
                </ButtonItem>
                <ButtonItem icon='search' onClick={() => this.onFilter('viewType', 1)}>
                  Искать
                </ButtonItem>
              </ButtonGroup>
            ) : (
              null
            )
        }
      </Wrapper>
    )
  }
}

export default ReasonsAdminPanelTreeFilters

const Wrapper = styled.div`
  border-bottom: 1px solid #d9d9d9;
  padding: 20px 15px 10px;
  display: flex;
  flex-wrap: wrap;
  
  position: fixed;
  background-color: #fff;
  z-index: 1;
  left: 0;
  top: 110px;
  width: calc(100% - 110px);
  margin: 0 30px ;
`

const InputsGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  flex: ${props => props.isMinimized ? '1' : 'unset'}
  
  &:nth-child(2) {
    padding-top: 5px;
  }
`

const InputsColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isMinimized ? 'space-between' : 'flex-start'}
`

const SelectLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
  width: ${props => props.width};
`

const SelectItem = styled(Select)`
  width: 150px;
`

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  margin-bottom: 15px;
`

const InputLabel = styled.label`
  font-weight: bold;
  margin-right: 15px;  
  width: ${props => props.width};
`

const InputItem = styled(Input)`
  width: 150px;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`

const CheckboxLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
`

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;

  &:first-child {
    margin-bottom: 25px;
  }
`

const ButtonGroup = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;
`

const ButtonItem = styled(Button)`
  margin-bottom: 10px;
  width: 150px;
`
