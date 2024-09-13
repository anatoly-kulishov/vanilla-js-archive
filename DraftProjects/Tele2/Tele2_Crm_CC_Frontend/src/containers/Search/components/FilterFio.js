/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Input } from 'antd'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const FormItem = Form.Item

export default function FilterFio (props) {
  const {
    fio: { LastName, FirstName, MiddleName, DocumentSeries, DocumentNumber },
    isFieldChangeHandle,
    onFocusChangeHandle,
    validate,
    isFocused,
    isPermissionFioHandle,
    isWebSellerView = false,
    className
  } = props

  const getErrorMessageDocumentValidation = (isWebSellerView = false) =>
    isWebSellerView
      ? 'Введите номер документа, удостоверяющего личность'
      : 'Введите номер документа, удостоверяющего личность абонента B2C'

  return (
    <GridDoubleRowEnd>
      <ContainerHolder
        isWebSellerView={isWebSellerView}
        onClick={() => isPermissionFioHandle && onFocusChangeHandle('fio')}
        isFocused={isFocused}
      >
        {!isWebSellerView && (
          <ContainerGrid>
            ФИО Абонента B2C
            <ContainerItem marginRight='12px'>
              <FormItem validateStatus={validate('fio', 'LastName') && 'error'}>
                <Input
                  disabled={!isPermissionFioHandle}
                  id={'LastName'}
                  value={LastName}
                  onChange={elem => isFieldChangeHandle(elem, 'fio', 'LastName')}
                  allowClear
                />
              </FormItem>
              <FormItem>
                <Input
                  disabled={!isPermissionFioHandle}
                  id={'FirstName'}
                  value={FirstName}
                  onChange={elem => isFieldChangeHandle(elem, 'fio', 'FirstName')}
                  allowClear
                />
              </FormItem>
              <FormItem>
                <Input
                  disabled={!isPermissionFioHandle}
                  id={'MiddleName'}
                  value={MiddleName}
                  onChange={elem => isFieldChangeHandle(elem, 'fio', 'MiddleName')}
                  allowClear
                />
              </FormItem>
            </ContainerItem>
            {validate('fio', 'LastName') && (
              <MsisdnErrorLabel>Введите корректную фамилию абонента B2C</MsisdnErrorLabel>
            )}
          </ContainerGrid>
        )}
        {!isWebSellerView && <span>Документ подключения</span>}
        <ContainerItem marginRight='8px'>
          <FormItem validateStatus={validate('fio', 'DocumentSeries') && 'error'}>
            <Input
              disabled={!isPermissionFioHandle}
              id={'DocumentSeries'}
              value={DocumentSeries}
              onChange={elem => isFieldChangeHandle(elem, 'fio', 'DocumentSeries')}
              allowClear
              placeholder={isWebSellerView ? 'Номер документа абонента' : undefined}
              className={className}
            />
          </FormItem>
          {!isWebSellerView && (
            <FormItem validateStatus={validate('fio', 'DocumentNumber') && 'error'}>
              <Input
                disabled={!isPermissionFioHandle}
                id={'DocumentNumber'}
                value={DocumentNumber}
                onChange={elem => isFieldChangeHandle(elem, 'fio', 'DocumentNumber')}
                allowClear
                className={className}
              />
            </FormItem>
          )}
        </ContainerItem>
        {validate('fio', 'DocumentSeries') && (
          <MsisdnErrorLabel>{getErrorMessageDocumentValidation(isWebSellerView)}</MsisdnErrorLabel>
        )}
        {!validate('fio', 'DocumentSeries') && validate('fio', 'DocumentNumber') && (
          <MsisdnErrorLabel>{getErrorMessageDocumentValidation(isWebSellerView)}</MsisdnErrorLabel>
        )}
      </ContainerHolder>
    </GridDoubleRowEnd>
  )
}

FilterFio.propTypes = {
  fio: PropTypes.object,
  validate: PropTypes.func,
  isFieldChangeHandle: PropTypes.func,
  isFocused: PropTypes.bool,
  onFocusChangeHandle: PropTypes.func,
  isPermissionFioHandle: PropTypes.bool,
  isWebSellerView: PropTypes.bool
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

const MsisdnErrorLabel = styled.div`
  line-height: 14px;
  color: red;
  min-height: 22px;
`

const ContainerGrid = styled.div`
  min-height: 100px;
`
const GridDoubleRowEnd = styled.div`
  grid-row-end: span 2;
`

const ContainerItem = styled.div`
  display: flex;

  div {
    margin-bottom: 0px;
    flex-grow: 1;
    &:not(:last-child) {
      margin-right: ${props => props.marginRight};
    }
  }
`
