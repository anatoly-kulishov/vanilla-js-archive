import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import { BookOutlined, UserOutlined, LikeOutlined, SettingOutlined } from '@ant-design/icons'

import ErrorBoundary from 'components/ErrorBoundary'
import { ckeckIsAdministrator, checkRight } from 'utils/helpers'

import HeaderButton from '../../components/HeaderButton'
import { CasperIcon } from 'assets'
import fromEnv from 'config/fromEnv'

const pathCasperPilot = fromEnv('REACT_APP_CASPER')

const onKmsHeaderButtonClick = () =>
  open(`${fromEnv('REACT_APP_KMS_SEARCH')}/search/external/?externalFilter=GF_REGION:''`)

export default function EmptyHeader ({ userState: { user }, feedbackModalOpen }) {
  const isDeveloper = checkRight(user, 'CC:ShowInDevelopment')
  const isCasperPilotPermission = checkRight(user, 'CC:CasperPilot')
  const isCasperOperator = checkRight(user, 'CC:CasperOperator')
  const isCasperManager = checkRight(user, 'CC:CasperManager')
  return (
    <ErrorBoundary>
      <TopNav>
        <Tools>
          {(isCasperPilotPermission || isCasperOperator || isCasperManager) && (
            <HeaderButton href={pathCasperPilot} target='_blank' icon={<StyledCasperIcon />}>
              Casper
            </HeaderButton>
          )}
          <HeaderButton icon={<BookOutlined />} onClick={onKmsHeaderButtonClick}>
            KMS
          </HeaderButton>
          {ckeckIsAdministrator(user) && (
            <HeaderButton href={fromEnv('REACT_APP_ADMIN')} target={'_blank'} icon={<SettingOutlined />}>
              Управление
            </HeaderButton>
          )}
          <HeaderButton icon={<LikeOutlined />} onClick={feedbackModalOpen}>
            Обратная связь
          </HeaderButton>
          <Tooltip placement='bottom' title={user.DisplayName}>
            <User>{isDeveloper ? <EmojiWrapper>👷</EmojiWrapper> : <UserOutlined />}</User>
          </Tooltip>
        </Tools>
      </TopNav>
    </ErrorBoundary>
  )
}

EmptyHeader.propTypes = {
  userState: PropTypes.object,
  feedbackModalOpen: PropTypes.func
}

const TopNav = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: #24272d;
  width: 100%;
  z-index: 1;
  height: 60px;
  padding: 0 16px;
`
const User = styled.li`
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
  font-weight: normal;
  font-size: 18px;
  margin: 0 5px;
  position: relative;
  top: -2px;
`
const EmojiWrapper = styled.div`
  font-size: 20px;
`
const Tools = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const StyledCasperIcon = styled(CasperIcon)`
  width: 18px;
  height: 22px;
`
