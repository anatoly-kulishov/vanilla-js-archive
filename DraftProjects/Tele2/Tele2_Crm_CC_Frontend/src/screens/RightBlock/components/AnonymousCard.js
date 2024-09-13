/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { AutoComplete, Select } from 'antd'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import PropTypes from 'prop-types'
import { getTypeCard } from 'webseller/helpers'

const styleContainerMsisdn = { order: 6 }
const styleMsisdnInput = { height: 15, width: '100%' }
const styleEmailContainer = { order: 5 }

const AnonymousCard = props => {
  AnonymousCard.propTypes = {
    personalAccount: PropTypes.object,
    // massProblemRegionState: PropTypes.object,
    contactNumberHiddenLabel: PropTypes.object,
    getFieldDecorator: PropTypes.object,
    filterValuesToState: PropTypes.func,
    msisdnValue: PropTypes.object,
    billingBranchId: PropTypes.object,
    email: PropTypes.object,
    msisdn: PropTypes.object,
    dialogNickname: PropTypes.string,
    onClickRemove: PropTypes.func,
    onPaste: PropTypes.func,
    massProblemRegionState: PropTypes.array,
    whoIsIt: PropTypes.object,
    isASSeller: PropTypes.bool
  }
  const {
    personalAccount,
    contactNumberHiddenLabel,
    whoIsIt,
    massProblemRegionState,
    getFieldDecorator,
    filterValuesToState,
    msisdnValue,
    billingBranchId,
    email,
    msisdn,
    dialogNickname,
    onClickRemove,
    onPaste,
    isASSeller
  } = props

  const { isLimitedCard } = getTypeCard(isASSeller)

  return (
    <Wrapper>
      <ContainerHolder>
        {email && !msisdn && (
          <TitleHolder>
            <b>Анонимная карточка (Входящий email)</b>
          </TitleHolder>
        )}
      </ContainerHolder>
      <ContainerHolder>
        {msisdn && (
          <TitleHolder>
            <b>Анонимная карточка ({dialogNickname || 'Клиент не найден'})</b>
          </TitleHolder>
        )}
      </ContainerHolder>
      <ContainerHolder>
        {!msisdn && !email && (
          <TitleHolder>
            <b>Анонимная карточка (Номер не определен)</b>
          </TitleHolder>
        )}
      </ContainerHolder>
      <ContainerHolder>
        <TitleHolder>Регион</TitleHolder>
        <ControlHolder>
          <TicketSelect
            value={billingBranchId && +billingBranchId}
            onChange={elem => {
              filterValuesToState(elem, 'billingBranchId')
            }}
            showSearch
            optionFilterProp='children'
            allowClear
          >
            {massProblemRegionState.map(region => <Select.Option value={region.BranchId} disabled={isASSeller && isLimitedCard}>{region.BranchName}</Select.Option>)}
          </TicketSelect>
        </ControlHolder>
      </ContainerHolder>
      <ContainerHolder style={styleContainerMsisdn}>
        <TitleHolder>MSISDN</TitleHolder>
        <ControlHolder>
          <MsisdnMaskInput
            style={styleMsisdnInput}
            onChange={elem => {
              filterValuesToState(elem, 'msisdnValue')
            }}
            value={msisdnValue}
            onPaste={onPaste}
            onClickRemove={onClickRemove}
            noAutoFocus
            disabled={isASSeller && isLimitedCard}
          />
          <MsisdnErrorLabel hidden={contactNumberHiddenLabel}>
            Введите корректный номер (+79991234567, 8 (999) 123 -45-67, 123- 123 45 67 - допускаются пробелы, скобки и
            дефисы)
          </MsisdnErrorLabel>
        </ControlHolder>
        {whoIsIt && <Label>{`Оператор: ${whoIsIt.OperatorName}`}</Label>}
      </ContainerHolder>
      <ContainerHolder style={styleEmailContainer}>
        <TitleHolder>E-mail</TitleHolder>
        <ControlHolder>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ type: 'email', message: 'Укажите корректный e-mail' }],
              initialValue: personalAccount ? personalAccount.Email : null,
              onChange: elem => {
                filterValuesToState(elem, 'emailValue')
              }
            })(
              <TicketAutoComplete
                id={'Email'}
                defaultActiveFirstOption
                disabled={isASSeller && isLimitedCard}
                allowClear
                value={personalAccount ? personalAccount.Email : null}
                // onChange={(elem) => { personalAccount.Email = e }}
              />
            )}
          </FormItem>
        </ControlHolder>
      </ContainerHolder>
      {
        dialogNickname &&
        <ContainerHolder>
          <TitleHolder>Никнейм</TitleHolder>
          <ControlHolder>
            <TicketAutoComplete
              id={'DialogNickName'}
              defaultActiveFirstOption
              disabled={false}
              allowClear
              value={dialogNickname}
            />
          </ControlHolder>
        </ContainerHolder>
      }
    </Wrapper>
  )
}

export default AnonymousCard
const Wrapper = styled.div`
  padding: 15px 10px 10px 10px;
`
const ContainerHolder = styled.div`
  width: 100%;
`
const TitleHolder = styled.div`
  margin: 5px;
  color: black;
`
const ControlHolder = styled.div`
  margin: 5px;
`
const MsisdnMaskInput = styled(MsisdnMaskedInput)`
  height: 32px;
  flex: true;
  width: 100%;
  font-size: 14px;
  text-align: left;

  & input {
    border-radius: 4px;
    border-width: 1px;
    border-color: ${props => (props.isActive ? 'rgb(110, 219, 255)' : '#d9d9d9')};
    border-style: solid;

    &:hover {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${props => (props.isActive ? 'rgb(110, 219, 255)' : '#3fcbff')};
      border-style: solid;
      outline-color: transparent;
    }

    &:focus {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${props => (props.isActive ? 'rgb(110, 219, 255)' : '#3fcbff')};
      outline-color: transparent;

      border-style: solid;
    }
  }
`
const MsisdnErrorLabel = styled.div`
  margin-top: 2px;
  line-height: 100%;
  margin-left: 5px;
  margin-right: 5px;
  color: red;
`

const TicketAutoComplete = styled(AutoComplete)`
  width: 100%;
`
const TicketSelect = styled(Select)`
  width: 100%;
`

const Label = styled.label`
  display: grid;
  padding: 2px;
`
const FormItem = styled(Form.Item)`
  margin-bottom: -5px;
`
