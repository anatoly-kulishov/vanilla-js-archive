import React, { useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Input } from 'antd'
import { Icon } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
const { Search } = Input

export default function SearchInput ({ label, placeholder, onSearch, icon = 'search', className, ...props }) {
  SearchInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string
  }

  const input = useRef(null)

  const handleSubmit = value => {
    onSearch(value)
  }

  return (
    <Wrapper className={className}>
      <Search
        addonBefore={label}
        placeholder={placeholder}
        onSearch={handleSubmit}
        enterButton={<SearchIcon type={icon} />}
        allowClear
        ref={input}
        {...props}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``

const SearchIcon = styled(Icon)`
  font-size: 16px;
`
