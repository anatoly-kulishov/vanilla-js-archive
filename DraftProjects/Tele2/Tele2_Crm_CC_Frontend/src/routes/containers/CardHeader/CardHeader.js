/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, PureComponent } from 'react'
import { set } from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Popover, Tooltip } from 'antd'
import {
  BookOutlined,
  BulbOutlined,
  HomeOutlined,
  LikeOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SnippetsOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'

import { CasperIcon } from 'assets'

import { checkRight, ckeckIsAdministrator } from 'utils/helpers'
import HeaderTabButton from 'routes/components/HeaderTabButton'
import ErrorBoundary from 'components/ErrorBoundary'
import KmsSearchLine from 'containers/KmsSearchLine'
import { urlParams } from 'utils/helpers/urlParams'
import { getTypeCard } from 'webseller/helpers'
import { cardModes } from 'constants/cardModes'
import fromEnv from 'config/fromEnv'

import QuestionaryPopover from './components/QuestionaryPopover'
import LinksDropdown from '../../components/LinksDropdown'
import HeaderButton from '../../components/HeaderButton'
import LastHandlings from './containers/LastHandlings'
import RegionModal from './components/RegionModal'
import { links } from '../../constants/links'

// const pathSuz = fromEnv('REACT_APP_SUZ')
const pathMagnit = fromEnv('REACT_APP_MAGNIT')
const pathCasperPilot = fromEnv('REACT_APP_CASPER')

export default class CardHeader extends PureComponent {
  static propTypes = {
    handlingId: PropTypes.number,
    cardMode: PropTypes.number,
    closeHandling: PropTypes.func,
    createHandling: PropTypes.func,
    userState: PropTypes.object,
    personalAccountState: PropTypes.object,
    queryParams: PropTypes.object,
    changeChooseRegionModalVisibility: PropTypes.func,
    isRegionModalVisible: PropTypes.bool,
    fetchLastHandlings: PropTypes.func,

    feedbackModalOpen: PropTypes.func,

    questionaryUseListError: PropTypes.array,
    fetchQuestionaryUseList: PropTypes.func,
    fetchSuzToken: PropTypes.func,
    onHandlingOpenPressed: PropTypes.func,
    deleteCurrentSession: PropTypes.func

    // suzToken: PropTypes.string,
    // suzTokenSign: PropTypes.string
  }
  state = {
    regionForKM: null
  }

  filterValuesToState = (event, name) => {
    let value = null

    if (event !== undefined) {
      value = event.currentTarget ? event.currentTarget.value : event

      const update = set({}, name, value)

      this.setState({ ...update })
    }
  }

  onHandlingClose = () => {
    const { handlingId, closeHandling, userState, personalAccountState } = this.props
    const isASSeller = userState.user.isASSeller

    if (!isASSeller && handlingId) {
      closeHandling({
        handlingId,
        isASSeller,
        msisdn: personalAccountState.personalAccount.Msisdn,
        isEmptinessCheckNeeded: true
      })
    }

    if (isASSeller) {
      this.props.deleteCurrentSession()
    }
  }

  onHandlingOpen = () => {
    this.props.createHandling({})
    urlParams().deleteParam('delayedHandling')
    this.props.onHandlingOpenPressed()
  }

  getSubTitle = cardMode => {
    const {
      personalAccountState: { personalAccount },
      queryParams,
      userState
    } = this.props
    const isASSeller = userState.user.isASSeller

    if (isASSeller) {
      const { isAnonymousCard } = getTypeCard(isASSeller)

      if (isAnonymousCard) {
        return queryParams?.msisdn || personalAccount?.Msisdn
      }
    }

    switch (cardMode) {
      case cardModes.client:
        return personalAccount?.ParentClientInfo?.ParentClientName || queryParams?.clientId
      case cardModes.subscriber:
        return (
          personalAccount?.SubscriberFullInfo?.SubscriberInfo?.SubscriberFullName ||
          personalAccount?.Msisdn ||
          personalAccount?.Email ||
          'Не определен'
        )
      case cardModes.anonymous:
        return 'Не определен'
      case cardModes.unknown:
        return queryParams?.msisdn || queryParams?.email || queryParams?.dialogNickname
      case cardModes.leon:
        return personalAccount?.Msisdn || 'Не определен'
      default:
        return 'Не определен'
    }
  }

  componentDidMount = () => {
    this.props.fetchSuzToken()
  }

  render () {
    const {
      userState: { user },
      cardMode,
      changeChooseRegionModalVisibility,
      isRegionModalVisible,
      handlingId,

      fetchLastHandlings,
      feedbackModalOpen,

      questionaryUseListError,
      fetchQuestionaryUseList,
      queryParams

      // suzToken,
      // suzTokenSign
    } = this.props

    const isCasperPilotPermission = checkRight(user, 'CC:CasperPilot')
    const isDeveloper = checkRight(user, 'CC:ShowInDevelopment')
    const isCasesDelayedHandling = checkRight(user, 'CC:CasesDelayedHandling')
    const isMagnitPermission = checkRight(user, 'CC:Magnit')
    const isCasperOperator = checkRight(user, 'CC:CasperOperator')
    const isCasperManager = checkRight(user, 'CC:CasperManager')
    const isSuzPermission = checkRight(user, 'CC:ShopOrderCreate')
    const isASSeller = checkRight(user, 'AS:Seller')

    // SUZ Link saved for better future
    // const encodedSuzUrl = `${pathSuz}/lk/map?token=${encodeURIComponent(suzToken)}&signature=${encodeURIComponent(
    //   suzTokenSign
    // )}`

    const search = window.location.search

    const {
      isNonSubscriberCard,
      isPersonalAccountCard,
      isLimitedCard,
      isSubscriberSecondLevelCard,
      isAnonymousCard
    } = getTypeCard(isASSeller)

    const handleSuzClick = e => {
      if (!handlingId) {
        e.preventDefault()
      }
    }

    return (
      <ErrorBoundary>
        <Fragment>
          <RegionModal isVisible={isRegionModalVisible} onClose={changeChooseRegionModalVisibility} />
          <TopNav>
            <Tabs>
              <HeaderTabButton title='Клиент' subtitle={this.getSubTitle(cardMode)} />
            </Tabs>
            <Tools>
              {(!isLimitedCard && !isNonSubscriberCard && !isPersonalAccountCard && !isSubscriberSecondLevelCard) && (
                <HeaderButton href='https://tele2.ru' target={'_blank'} icon={<HomeOutlined />}>
                  Tele2
                </HeaderButton>
              )}
              {(!isLimitedCard && !isNonSubscriberCard && !isPersonalAccountCard && !isSubscriberSecondLevelCard) && (
                <HeaderButton href='https://abc.tele2.ru' target={'_blank'} icon={<BulbOutlined />}>
                  ABC Tele2
                </HeaderButton>
              )}
              {(!isLimitedCard && !isNonSubscriberCard && !isPersonalAccountCard && !isSubscriberSecondLevelCard && !isAnonymousCard) && (isCasperPilotPermission || isCasperOperator || isCasperManager) && (
                <HeaderButton href={pathCasperPilot} target='_blank' icon={<CasperIcon />}>
                  Casper
                </HeaderButton>
              )}
              {!isASSeller && isMagnitPermission && (
                <HeaderButton href={pathMagnit} target={'_blank'} icon={<ShoppingCartOutlined />}>
                  EMS
                </HeaderButton>
              )}
              {!isASSeller && isSuzPermission && (
                <NavLink
                  activeClassName='current'
                  to={{ pathname: '/card/shop-order', search }}
                  onClick={handleSuzClick}
                >
                  <HeaderButton icon={<ShopOutlined />}>
                    {handlingId
                      ? 'Оформление заказа в интернет-магазине'
                      : 'Для создания заказа перейдите к обслуживанию'}
                  </HeaderButton>
                </NavLink>
              )}
              <KmsSearchLine>
                <HeaderButton icon={<BookOutlined />}>KMS</HeaderButton>
              </KmsSearchLine>
              {!isASSeller && (
                <HeaderButton icon={<LikeOutlined />} onClick={feedbackModalOpen}>
                  Обратная связь
                </HeaderButton>
              )}
              {!isASSeller && (
                <QuestionaryPopover
                  questionaryUseListError={questionaryUseListError}
                  fetchQuestionaryUseList={fetchQuestionaryUseList}
                />
              )}
              {!isASSeller && (
                <Popover
                  placement='bottom'
                  title='Открытые карточки за последние 24 часа'
                  content={<LastHandlings />}
                  overlayClassName='last-handling-popover'
                  trigger='click'
                >
                  <HeaderButton icon={<UnorderedListOutlined />} onClick={() => fetchLastHandlings()}>
                      Открытые карточки
                  </HeaderButton>
                </Popover>
              )}
              {!isASSeller && (
                <HeaderButton href={'https://helper.tele2.ru'} target={'_blank'} icon={<SnippetsOutlined />}>
                  Helper
                </HeaderButton>
              )}
              {!isASSeller && ckeckIsAdministrator(user) && (
                <HeaderButton href={fromEnv('REACT_APP_ADMIN')} target={'_blank'} icon={<SettingOutlined />}>
                  Управление
                </HeaderButton>
              )}
              {!isASSeller && <LinksDropdown links={links} />}
              {!isLimitedCard && !isNonSubscriberCard && !isPersonalAccountCard && !isSubscriberSecondLevelCard && (
                <Tooltip placement='bottom' title={user.DisplayName}>
                  <User>{isDeveloper ? <EmojiWrapper>👷</EmojiWrapper> : <UserOutlined />}</User>
                </Tooltip>
              )}
              {!isASSeller && (isCasesDelayedHandling || queryParams?.delayedHandling === 'true') && !handlingId && (
                <CloseButton onClick={this.onHandlingOpen}>Перейти к обслуживанию</CloseButton>
              )}
              {!isASSeller && handlingId && <CloseButton onClick={this.onHandlingClose}>Закрыть</CloseButton>}
              {isASSeller && <CloseButton onClick={this.onHandlingClose}>Закрыть</CloseButton>}
            </Tools>
          </TopNav>
        </Fragment>
      </ErrorBoundary>
    )
  }
}

const CloseButton = styled.div`
  position: relative;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  line-height: 1;
  padding: 8px 16px;
  margin-left: 10px;
  background-color: white;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  font-family: T2HalvarBreit_ExtraBold;
`
const TopNav = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  background-color: #24272d;
  width: 100%;
  height: 60px;
  padding: 0 16px;
  z-index: 1001;
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
  justify-content: flex-end;
`
const Tabs = styled.div`
  justify-content: flex-start;
  display: flex;
  font-weight: bold;
`
