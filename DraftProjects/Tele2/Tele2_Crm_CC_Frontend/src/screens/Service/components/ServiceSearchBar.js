/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import styled from 'styled-components'

const style = { color: 'rgba(0,0,0,.25)', cursor: 'text' }

const ServiceSearchBar = props => {
  const {
    isAvailableServices,
    searchValue,
    onChangeSearch
  } = props

  return (
    <StyledInput
      prefix={<SearchOutlined style={style} />}
      placeholder={
        isAvailableServices ? 'Поиск по доступным услугам' : 'Поиск по подключенным услугам'
      }
      onChange={event => onChangeSearch(event.target.value, isAvailableServices)}
      value={searchValue}
      allowClear
    />
  )
}

export default ServiceSearchBar

ServiceSearchBar.propTypes = {
  isAvailableServices: PropTypes.bool,
  onChangeSearch: PropTypes.func,
  searchValue: PropTypes.string
}

const StyledInput = styled(Input)`
  width: 270px;
  @media (max-width: 1350px) {
    width: auto;
  }
`
