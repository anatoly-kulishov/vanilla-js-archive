import React from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined, SettingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const MsisdnInput = props => {
  MsisdnInput.propTypes = {
    value: PropTypes.object,
    onSearchHandle: PropTypes.func,
    onInputChange: PropTypes.func,
    onPasteEvent: PropTypes.func,
    search: PropTypes.func
  }
  const { value, onSearchHandle, onInputChange, onPasteEvent, search } = props
  return (
    <SearchHeader>
      <ButtonContainer>
        <CustomButton ghost onClick={onSearchHandle}>
          <SearchOutlined />
        </CustomButton>
      </ButtonContainer>
      <CustomInput
        value={value}
        onChange={onInputChange}
        onPressEnter={onSearchHandle}
        onPaste={onPasteEvent}
        maxLength='11'
      />
      <ButtonContainer>
        <CustomLink to={`/card/manual-search${search}`}>
          <CustomIcon />
        </CustomLink>
      </ButtonContainer>
    </SearchHeader>
  )
}

export default MsisdnInput

const SearchHeader = styled.div`
  background-color: #40bfee;
  display: flex;
  width: 100%;
  height: 40px;
`
const ButtonContainer = styled.div`
  position: relative;
  color: white;
  height: 40px;
`
const CustomButton = styled(Button)`
  font-size: 20px;
  color: white;
  background-color: #40bfee;
  border: 0;
  height: 40px;
`
const CustomInput = styled(Input)`
  font-size: 18px;
  color: white;
  background-color: #40bfee;
  border: 0;
  height: 40px;
`
const CustomLink = styled(Link)`
  display: flex;
  width: 40px;
  height: 100%;
  text-decoration: none;
  align-items: center;
  justify-content: center;

  &:focus {
    text-decoration: none;
  }
`

const CustomIcon = styled(SettingOutlined)`
  color: #fff;
  font-size: 20px;
`
