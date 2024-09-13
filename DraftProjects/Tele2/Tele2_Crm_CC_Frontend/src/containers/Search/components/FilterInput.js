/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState } from 'react'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Input, Select } from 'antd'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'

const FormItem = Form.Item

export default function FilterInput (props) {
  const {
    isFocused,
    name,
    title,
    value,
    isFieldChangeHandle,
    onFocusChangeHandle,
    validate,
    errorMessage,
    disabled,
    type,
    placeholder,
    dataSource,
    maxLength,
    handleKeyPress,
    isWebSellerView = false,
    className
  } = props
  const [isSelectOpened, setSelectOpened] = useState(false)

  const handleKeyDown = elem => {
    if (elem.key === 'Enter') {
      setSelectOpened(false)
      handleKeyPress(elem)
    }
  }

  return (
    <Fragment>
      <ContainerHolder
        isWebSellerView={isWebSellerView}
        isFocused={isFocused}
        onClick={() => onFocusChangeHandle && onFocusChangeHandle(name)}
      >
        {title}
        <FormItem validateStatus={validate && 'error'} help={validate && errorMessage}>
          {type === 'Input' && (
            <Input
              id={name}
              value={value}
              onChange={elem => isFieldChangeHandle(elem, name)}
              allowClear
              disabled={disabled}
              maxLength={maxLength}
            />
          )}
          {type === 'TicketSelect' && (
            <div onKeyDown={elem => handleKeyDown(elem)}>
              <TicketSelect
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={elem => isFieldChangeHandle(elem, name)}
                showSearch
                showArrow={false}
                allowClear
                open={isSelectOpened}
                onDropdownVisibleChange={value => setSelectOpened(value)}
                filterOption={(input, option) => {
                  const {
                    props: { children }
                  } = option
                  return children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {dataSource.map(channel => {
                  const { Id, Name } = channel
                  return (
                    <Select.Option value={Id} key={Id}>
                      {Name}
                    </Select.Option>
                  )
                })}
              </TicketSelect>
            </div>
          )}
          {type === 'MSISDN' && (
            <MsisdnMaskedInput
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={elem => isFieldChangeHandle(elem, name)}
              onPaste={elem => isFieldChangeHandle(elem, name)}
              onClickRemove={() => isFieldChangeHandle('', name)}
              noAutoFocus={isWebSellerView}
              className={className}
            />
          )}
          {type === 'LocalPhoneNumber' && (
            <MsisdnMaskedInput
              id={name}
              value={value}
              placeholder={placeholder}
              onChange={elem => isFieldChangeHandle(elem, name)}
              onPaste={elem => isFieldChangeHandle(elem, name)}
              onClickRemove={() => isFieldChangeHandle('', name)}
              noAutoFocus
              className={className}
            />
          )}
        </FormItem>
      </ContainerHolder>
    </Fragment>
  )
}

FilterInput.propTypes = {
  isFocused: PropTypes.bool,
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  isFieldChangeHandle: PropTypes.func,
  onFocusChangeHandle: PropTypes.func,
  handleKeyPress: PropTypes.func,
  validate: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  dataSource: PropTypes.array,
  maxLength: PropTypes.number,
  isWebSellerView: PropTypes.bool,
  className: PropTypes.string
}

const ContainerHolder = styled.div`
  width: 100%;
  ${({ isWebSellerView, isFocused }) =>
    !isWebSellerView &&
    css`
      color: ${isFocused ? '#40bfee' : 'black'};
      background-color: ${isFocused ? '#ecf9ff' : 'white'};
      border: ${isFocused ? '1px solid #40bfee' : '0'};
    `}
  border-radius: 4px;
  padding: 0;

  .ant-form-explain {
    line-height: 14px;
  }
`

const TicketSelect = styled(Select)`
  width: 100%;
`
