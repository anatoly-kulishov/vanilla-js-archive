import React from 'react'
import styled from 'styled-components'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'

const MsisdnSubscribers = (props) => {
  MsisdnSubscribers.propTypes = {
    activeTab: PropTypes.object,
    subscribersReasons: PropTypes.object,
    subscribersSms: PropTypes.object,
    onChangeNumber: PropTypes.func,
    personalAccountState: PropTypes.object,
    msisdnEditRights: PropTypes.object
  }
  const {
    activeTab,
    subscribersReasons,
    subscribersSms,
    onChangeNumber,
    personalAccountState,
    msisdnEditRights
  } = props

  const { personalAccount: { Email, ClientId } } = personalAccountState

  const title = activeTab !== 'reasons' ? 'Абонент' : 'msisdn'

  return (
    <Wrapper isReasonsTab={activeTab === 'reasons'}>
      <MsisdnWrapper>
        <Label activeTab={activeTab}>{title}</Label>
        <InputGroup>
          {
            activeTab !== 'reasons'
              ? (
                <InputWrapper
                  value={subscribersSms[0]}
                  mask='+7 (999) 999-99-99' maskChar=' '
                  onChange={event => onChangeNumber(event, '0', 'subscribersSms')}
                  disabled={!msisdnEditRights}
                />
              )
              : (
                <InputGroup>
                  <InputWrapper
                    value={subscribersReasons[0]}
                    mask='+7 (999) 999-99-99' maskChar=' '
                    onChange={event => onChangeNumber(event, `0`, 'subscribersReasons')}
                    disabled
                  />
                  {
                    !ClientId && (
                      <InputWrapper
                        defaultValue={Email}
                        // onChange={event => onChangeNumber(event, "0")}
                        disabled
                      />
                    )
                  }
                </InputGroup>
              )
          }
        </InputGroup>
      </MsisdnWrapper>
    </Wrapper>
  )
}

export default MsisdnSubscribers

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
  padding-left: ${props => props.isReasonsTab ? '25px' : '0'};
`

const MsisdnWrapper = styled.div`
  margin-right: 10px;
  max-width: 660px;
`

const Label = styled.div`
  text-transform: ${props => props.activeTab !== 'reasons' ? 'unset' : 'uppercase'};
  font-size: 14px;
  color: #000;
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const InputWrapper = styled(InputMask)`
  margin-right: 10px;
  margin-top: 10px;
  max-width: 155px;
  padding: 4px 11px;
  height: 32px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s ease-out;

  &:focus {
    outline: none;
    border-color: #48bfec;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f5f5f5;
    border-color: #e6d8d8;
  }
`
