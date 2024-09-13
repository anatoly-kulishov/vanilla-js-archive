import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Row, Col } from 'antd'
import get from 'lodash/get'

const Expand = ({ groupInfo, justify = 'start' }) => {
  const groupCreateDate = get(groupInfo, 'GroupCreateDate', null)
  const groupDeleteDate = get(groupInfo, 'GroupDeleteDate', null)
  const userCreateDate = get(groupInfo, 'UserCreateDate', null)
  const userDeleteDate = get(groupInfo, 'UserDeleteDate', null)
  const personalAccountId = get(groupInfo, 'PersonalAccountId', null)

  const formatData = 'DD.MM.YYYY HH:mm'

  return (
    <Row type='flex' justify={justify}>
      {groupCreateDate && (
        <StyledCol span={4}>
          <Row type='flex' justify={justify}>Дата создания</Row>
          <AdditionalInfo>
            <PersonalDataLabel type='flex' justify={justify}>
              {moment(groupCreateDate).format(formatData)}
            </PersonalDataLabel>
          </AdditionalInfo>
        </StyledCol>
      )}
      {userCreateDate && (
        <StyledCol span={4}>
          <Row type='flex' justify={justify}>Дата входа</Row>
          <AdditionalInfo>
            <PersonalDataLabel type='flex' justify={justify}>
              {moment(userCreateDate).format(formatData)}
            </PersonalDataLabel>
          </AdditionalInfo>
        </StyledCol>
      )}
      {groupDeleteDate && (
        <StyledCol span={4}>
          <Row type='flex' justify={justify}>Дата удаления</Row>
          <AdditionalInfo>
            <PersonalDataLabel type='flex' justify={justify}>
              {moment(groupDeleteDate).format(formatData)}
            </PersonalDataLabel>
          </AdditionalInfo>
        </StyledCol>
      )}
      {userDeleteDate && (
        <StyledCol span={4}>
          <Row type='flex' justify={justify}>Дата выхода</Row>
          <AdditionalInfo>
            <PersonalDataLabel type='flex' justify={justify}>
              {moment(userDeleteDate).format(formatData)}
            </PersonalDataLabel>
          </AdditionalInfo>
        </StyledCol>
      )}
      {personalAccountId && (
        <StyledCol span={4}>
          <Row type='flex' justify={justify}>Единый ЛС</Row>
          <AdditionalInfo>
            <PersonalDataLabel type='flex' justify={justify}>
              {personalAccountId}
            </PersonalDataLabel>
          </AdditionalInfo>
        </StyledCol>
      )}
    </Row>
  )
}

export default Expand

Expand.propTypes = {
  groupInfo: PropTypes.object,
  justify: PropTypes.string
}

const AdditionalInfo = styled.div`
  color: grey;
  font-size: 13px;
`
const PersonalDataLabel = styled(Row)`
  font-size: 13px;
  color: black;
`
const StyledCol = styled(Col)`
  max-width: 120px;
`
