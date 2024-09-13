/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'

const { Option } = AutoComplete

export default class SmartSearchLine extends Component {
  static propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func,
    tabIndex: PropTypes.number,
    autoFocus: PropTypes.bool,
    dictionary: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string
    }))
  }

  handleSelect = value => {
    const { onSearch } = this.props
    onSearch(value)
    this.setState({ isOptionsOpen: false })
  }

  handleChange = inputValue => {
    const { onSearch } = this.props
    onSearch(inputValue)
  }

  render () {
    const { value, tabIndex = 0, autoFocus = true, dictionary } = this.props

    return (
      <Search
        autoFocus={autoFocus}
        allowClear
        tabIndex={tabIndex}
        value={value}
        placeholder='Поиск'
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onDropdownVisibleChange={isOpen => this.setState({ isOptionsOpen: isOpen })}
      >
        {dictionary?.map(item => <Option key={item.id} value={item.value} />)}
      </Search>
    )
  }
}

const Search = styled(AutoComplete)`
  width: 100%;
  margin-right: 10px;
  margin-bottom: 0;
`
