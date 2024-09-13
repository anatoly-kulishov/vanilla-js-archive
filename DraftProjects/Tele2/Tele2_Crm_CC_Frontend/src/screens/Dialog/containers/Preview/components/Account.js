/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'

import identifyConversationPropType from '../../../constants/identifyConversationPropType'

export const Account = ({ isUpdateDisabled, isIdentificationLevelsLoading, key, identity, handleUpdatingIdentificationLevel }) => {
  Account.propTypes = {
    isUpdateDisabled: PropTypes.bool,
    isIdentificationLevelsLoading: PropTypes.bool,
    key: PropTypes.number,
    identity: identifyConversationPropType,
    handleUpdatingIdentificationLevel: PropTypes.func
  }
  return (
    <Client key={key}>
      <Label>Лицевой счет</Label>
      <div>{identity?.PersonalAccount}</div>
      <Label>Наименование</Label>
      <div>{identity?.ClientName}</div>
      <ConnectButton
        disabled={isUpdateDisabled}
        type='primary'
        loading={isIdentificationLevelsLoading}
        onClick={() => handleUpdatingIdentificationLevel(identity.IsDs, {
          clientId: identity.ClientId,
          clientName: identity.ClientName,
          branchId: identity.BranchId,
          personalAccount: identity.PersonalAccount
        })}>Привязать</ConnectButton>
    </Client>)
}

const Client = styled.div`
  flex: 1;
  padding: 12px;
  margin-top: 4px;
  border: 1px #e7e7f0 solid;
  border-radius: 6px;
  box-shadow: 0 0px 10px rgba(32,33,36,0.05);
  :hover {
    box-shadow: 0 0px 10px rgba(32,33,36,0.20);
  }
  transition: box-shadow 0.30s ease-in-out;
`
const ConnectButton = styled(Button)`
  margin-top: 4px;
  width: 100%;
`
const Label = styled.div`
  font-size: 11px;
  color: gray;
`
