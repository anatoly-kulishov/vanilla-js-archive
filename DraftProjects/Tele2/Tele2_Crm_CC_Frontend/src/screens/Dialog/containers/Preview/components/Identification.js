import React from 'react'
import styled from 'styled-components'
import { identificationLevelIds } from 'constants/twinspot'

import conversationPropType from 'constants/conversationPropType'

import identifyConversationPropType from '../../../constants/identifyConversationPropType'

import { Account } from './Account'

const Clients = (props) => {
  const { currentConversation, identifyConversation: { indentifiers }, ...rest } = props

  const identity = {
    ClientId: currentConversation?.ClientId,
    ClientName: currentConversation?.ClientName,
    BranchId: currentConversation?.BranchId,
    PersonalAccount: currentConversation?.PersonalAccount
  }

  if (currentConversation?.IdentificationLevelId === identificationLevelIds.zero && indentifiers) {
    return indentifiers?.map((identity, index) => <Account
      key={index}
      identity={identity}
      {...rest}
    />)
  } else {
    return <Account
      identity={identity}
      isUpdateDisabled
      {...rest}
    />
  }
}

export default function Identification (props) {
  Identification.propTypes = {
    currentConversation: conversationPropType,
    identifyConversation: identifyConversationPropType
  }

  const { identifyConversation: { dsText } } = props

  return (
    <Wrapper>
      {dsText && <Disclaimer>{dsText}</Disclaimer>}
      <ClientsWrapper>
        <Clients {...props} />
      </ClientsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: white;
`
const Disclaimer = styled.div`
  font-weight: bold;
  margin: 4px;
`
const ClientsWrapper = styled.div`
  margin: 8px 0;
  display: flex;
  flex-direction: column;
`
