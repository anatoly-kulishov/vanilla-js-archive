/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState } from 'react'
import { Button, Checkbox } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { checkRight } from 'utils/helpers'
import FilterInput from './components/FilterInput'
import { DoubleRightOutlined } from '@ant-design/icons'
import FilterFIO from './components/FilterFio'
import WebSellerSearch from 'webseller/features/webSellerSearch/WebSellerSearch'
import featureConfig from 'webseller/featureConfig'

export default function SearchFilters (props) {
  const {
    isButtonFindClickHandle,
    isFieldChangeHandle,
    isButtonCleanClickHandle,
    onFocusChangeHandle,
    searchFormerOwners,
    MSISDN,
    LocalPhoneNumber,
    handlingChannel,
    focusedInput,
    errorInput,
    IccId,
    Inn,
    InnErrorMessage,
    TTNumber,
    Email,
    fio,
    user,
    PersonalAccountName,
    channels,
    handleKeyPress,
    isUpdateIdentity,
    isWebSellerView,
    isCreateOrder
  } = props

  const [isAdditionalFiltersOpen, setIsAdditionalFilterOpen] = useState(false)

  const validate = (focusName, nestedName) => {
    return nestedName
      ? errorInput[nestedName] && focusedInput === focusName
      : errorInput[focusName] && focusedInput === focusName
  }

  const isPermissionFioHandle = checkRight(user, 'CC:ManualSearchPassport')
  const isSubscriberCardRead = checkRight(user, 'AS:SubscriberCardRead')
  const isAsB2BSearch = checkRight(user, 'AS.B2BSearch:R')

  const isDisabledButtonFind = () => {
    const mainCondition =
      focusedInput === 'fio'
        ? errorInput.LastName || errorInput.DocumentSeries || errorInput.DocumentNumber
        : errorInput[focusedInput]

    if (isWebSellerView) {
      return errorInput.MSISDN || errorInput.DocumentSeries
    }

    return handlingChannel === '' || mainCondition
  }

  const handlingChannelDefault = isUpdateIdentity
    ? channels?.filter(channel => channel.Name === 'Email')?.[0]?.Id
    : null

  return (
    <Fragment>
      {isWebSellerView ? (
        <>
          {featureConfig.isNewManualSearch
            ? (
              <WebSellerSearch
                isCreateOrder={isCreateOrder}
                isAsB2BSearch={isAsB2BSearch}
                disabled={!isSubscriberCardRead}
              />
            )
            : (
              <>
                <FilterInput
                  name='MSISDN'
                  type='MSISDN'
                  onFocusChangeHandle={onFocusChangeHandle}
                  isFocused={focusedInput === 'MSISDN'}
                  placeholder='Номер абонента'
                  value={MSISDN}
                  isFieldChangeHandle={isFieldChangeHandle}
                  validate={validate('MSISDN')}
                  errorMessage='Введите корректный номер'
                  isWebSellerView
                />
                <FilterFIO
                  fio={fio}
                  validate={validate}
                  isFieldChangeHandle={isFieldChangeHandle}
                  isFocused={focusedInput === 'fio'}
                  onFocusChangeHandle={onFocusChangeHandle}
                  isPermissionFioHandle={isPermissionFioHandle}
                  isWebSellerView
                />
                <WebSellerButtonContainer>
                  <Button type='primary' disabled={isDisabledButtonFind()} onClick={isButtonFindClickHandle}>
                    Найти
                  </Button>
                </WebSellerButtonContainer>
              </>
            )}
        </>
      ) : (
        <>
          <MainTable>
            <FilterInput
              name='handlingChannel'
              type='TicketSelect'
              title='Канал обращения'
              initialValue={handlingChannelDefault}
              value={handlingChannel}
              isFieldChangeHandle={isFieldChangeHandle}
              handleKeyPress={handleKeyPress}
              dataSource={channels}
              validate={handlingChannel === ''}
              errorMessage='Канал обращения обязателен'
            />
            <FilterInput
              name='MSISDN'
              type='MSISDN'
              onFocusChangeHandle={onFocusChangeHandle}
              isFocused={focusedInput === 'MSISDN'}
              title='MSISDN'
              value={MSISDN}
              isFieldChangeHandle={isFieldChangeHandle}
              validate={validate('MSISDN')}
              errorMessage='Введите корректный номер'
            />
            <FilterInput
              name='PersonalAccountName'
              type='Input'
              onFocusChangeHandle={onFocusChangeHandle}
              isFocused={focusedInput === 'PersonalAccountName'}
              title='Номер лицевого счёта'
              value={PersonalAccountName}
              isFieldChangeHandle={isFieldChangeHandle}
              validate={validate('PersonalAccountName')}
              errorMessage='Допустимы только цифры'
            />
            <FilterInput
              name='TTNumber'
              type='Input'
              onFocusChangeHandle={onFocusChangeHandle}
              isFocused={focusedInput === 'TTNumber'}
              title='Номер ТТ'
              value={TTNumber}
              isFieldChangeHandle={isFieldChangeHandle}
              validate={validate('TTNumber')}
              errorMessage='Допустимы латинские буквы и цифры'
            />
            <FilterInput
              name='Inn'
              type='Input'
              onFocusChangeHandle={onFocusChangeHandle}
              isFocused={focusedInput === 'Inn'}
              title='ИНН'
              value={Inn}
              isFieldChangeHandle={isFieldChangeHandle}
              validate={validate('Inn')}
              errorMessage={InnErrorMessage}
            />
            <MoreWrapper
              isOpen={isAdditionalFiltersOpen}
              onClick={() => setIsAdditionalFilterOpen(!isAdditionalFiltersOpen)}
            >
              <span>{isAdditionalFiltersOpen ? 'Скрыть' : 'Показать'} дополнительные фильтры</span>
              <DoubleRightOutlined />
            </MoreWrapper>
            {isAdditionalFiltersOpen && (
              <Fragment>
                <FilterFIO
                  fio={fio}
                  validate={validate}
                  isFieldChangeHandle={isFieldChangeHandle}
                  isFocused={focusedInput === 'fio'}
                  onFocusChangeHandle={onFocusChangeHandle}
                  isPermissionFioHandle={isPermissionFioHandle}
                />
                <FilterInput
                  name='IccId'
                  type='Input'
                  onFocusChangeHandle={onFocusChangeHandle}
                  isFocused={focusedInput === 'IccId'}
                  title='ICCID'
                  value={IccId}
                  maxLength={20}
                  isFieldChangeHandle={isFieldChangeHandle}
                  validate={validate('IccId')}
                  errorMessage='Длина данного поля 20 символов (Допустимы только цифры)'
                />
                <FilterInput
                  name='LocalPhoneNumber'
                  type='LocalPhoneNumber'
                  onFocusChangeHandle={onFocusChangeHandle}
                  isFocused={focusedInput === 'LocalPhoneNumber'}
                  title='Городской номер'
                  value={LocalPhoneNumber}
                  isFieldChangeHandle={isFieldChangeHandle}
                  validate={validate('LocalPhoneNumber')}
                  errorMessage='Введите корректный номер'
                />
                <FilterInput
                  name='Email'
                  type='Input'
                  onFocusChangeHandle={onFocusChangeHandle}
                  isFocused={focusedInput === 'Email'}
                  title='Email'
                  value={Email}
                  isFieldChangeHandle={isFieldChangeHandle}
                  validate={validate('Email')}
                  errorMessage='Введите корректный e-mail'
                />
              </Fragment>
            )}
          </MainTable>
          <ButtonGroupContainer>
            <CheckboxLabel>Искать среди бывших владельцев</CheckboxLabel>
            <Checkbox onChange={searchFormerOwners} />
            <StyledButton type='primary' disabled={isDisabledButtonFind()} onClick={isButtonFindClickHandle}>
              Найти
            </StyledButton>
            <StyledButton onClick={isButtonCleanClickHandle}>Очистить</StyledButton>
          </ButtonGroupContainer>
        </>
      )}
    </Fragment>
  )
}

SearchFilters.propTypes = {
  isButtonFindClickHandle: PropTypes.func,
  isFieldChangeHandle: PropTypes.func,
  isButtonCleanClickHandle: PropTypes.func,
  searchFormerOwners: PropTypes.func,
  onFocusChangeHandle: PropTypes.func,
  handleKeyPress: PropTypes.func,
  MSISDN: PropTypes.string,
  LocalPhoneNumber: PropTypes.string,
  channels: PropTypes.array,
  handlingChannel: PropTypes.string,
  focusedInput: PropTypes.string,
  errorInput: PropTypes.object,
  IccId: PropTypes.string,
  PersonalAccountName: PropTypes.string,
  TTNumber: PropTypes.string,
  Inn: PropTypes.string,
  InnErrorMessage: PropTypes.string,
  Email: PropTypes.string,
  fio: PropTypes.object,
  user: PropTypes.object,
  isUpdateIdentity: PropTypes.bool
}

const MainTable = styled.div`
  padding: 15px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);

  & > div > div > .ant-form-item {
    margin-bottom: 0;
  }
`

const ButtonGroupContainer = styled.div`
  padding: 0 20px 10px 20px;
  text-align: right;
  border-bottom: 1px solid #d9d9d9;
`

const StyledButton = styled(Button)`
  margin-left: 30px;
`
const CheckboxLabel = styled.label`
  margin-right: 10px;
`

const MoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(64, 191, 238, 0.3);
  background-color: rgba(236, 249, 255, 0.3);
  margin: 26px 5px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    border: 1px solid #40bfee;
    background-color: #ecf9ff;
  }
  span {
    margin-right: 4px;
  }
  svg {
    transform: ${props => (props.isOpen ? 'rotate(-90deg)' : 'rotate(90deg)')};
  }
`

const WebSellerButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & button {
    margin: 20px 5px 0 0;
  }
`
