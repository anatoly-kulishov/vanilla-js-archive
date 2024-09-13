/*
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component, Fragment } from 'react'
import loadable from '@loadable/component'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { message, Spin, notification, Button, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { set, get } from 'lodash'
import uuid from 'uuid'

import { checkRight, routeMatch } from 'utils/helpers'
import open from 'utils/helpers/windowOpener'
import { fetchMassProblemsForRegionParams } from 'constants/massProblems'

import LoadingSpinner from 'components/LoadingSpinner'
import PersonalInfoCard from './components/PersonalInfoCard'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import OfferBlock from './components/OfferBlock'
import SettingIcon from './assets/setting-icon.svg'
import ErrorBoundary from 'components/ErrorBoundary'
import RatingMenu from 'containers/RatingMenu'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import { clientCategories, statusSim } from 'constants/personalAccountStrings'
import HtmlRender from 'components/HtmlRender'
import { cardModes } from '../../constants/cardModes'
import SubscriberStatus from 'containers/SubscriberStatus'
import PersonBlock from './components/PersonBlock'
import { wsStatus } from 'constants/wsStatus'
import fromEnv from 'config/fromEnv'
import ChangingTariffPlan from 'webseller/features/changingTariffPlan/components/ChangingTariffPlan'

const { rightBlockFeatureId } = ratingFeatureIds

const TariffModal = loadable(() => import(/* webpackChunkName: "TariffModal" */ 'screens/TariffModal'))
const RatePlanModal = loadable(() => import(/* webpackChunkName: "RatePlanModal" */ 'containers/RatePlanModal'))
const HistoryIccModal = loadable(() => import(/* webpackChunkName: "HistoryIccModal" */ './components/HistoryIccModal'))
const DuplicateSearchModal = loadable(() =>
  import(/* webpackChunkName: "DuplicateSearchModal" */ './components/DuplicateSearchModal')
)
const ReplacementSimCardModal = loadable(() =>
  import(/* webpackChunkName: "ReplacementSimCardModal" */ './components/ReplacementSimCardModal')
)

const PersonModal = loadable(() => import(/* webpackChunkName: "PersonModal" */ './components/PersonModal'))

class RightBlock extends Component {
  static propTypes = {
    msisdn: PropTypes.string,
    cardMode: PropTypes.number,
    fetchRegions: PropTypes.func,
    personalAccountState: PropTypes.object,
    changePersonalInfoFields: PropTypes.func,
    fetchProblemsForRegion: PropTypes.func,
    massProblemRegionState: PropTypes.array,
    form: PropTypes.object,
    toggleRap: PropTypes.func,
    user: PropTypes.object,
    changeModalVisibility: PropTypes.func,
    email: PropTypes.object,
    dialogNickname: PropTypes.string,
    changeAbonentsModalVisibility: PropTypes.func,
    handlingId: PropTypes.number,
    toggleOffers: PropTypes.func,
    offers: PropTypes.object,
    isVisible: PropTypes.bool,
    location: PropTypes.object,
    processingParametersState: PropTypes.object,
    changeProblemRegion: PropTypes.func,
    fetchTemplates: PropTypes.func,
    fetchWhoIsIt: PropTypes.func,
    whoIsIt: PropTypes.object,
    changePersonalBranchFields: PropTypes.func,
    handleVisibleModal: PropTypes.func,
    tariffModalState: PropTypes.object,
    trustCreditInfo: PropTypes.object,
    getReasonCategoryForEscalation: PropTypes.func,

    virtualNumbers: PropTypes.array,
    IsActiveVirtualNumber: PropTypes.bool,
    queryParams: PropTypes.object,
    replacementSimCard: PropTypes.object,
    handleVisibleReplacementSimCardModal: PropTypes.func,
    handleVisibleDuplicateSearchModal: PropTypes.func,
    handleVisibleHistoryIccModal: PropTypes.func,
    validateSimProfile: PropTypes.func,
    sendSmsReplacementSim: PropTypes.func,
    clearReplacementSimCardModal: PropTypes.func,
    changeSim: PropTypes.func,
    getHistoryChangeSim: PropTypes.func,
    subscriberListState: PropTypes.object,
    getReasonsChangeSim: PropTypes.func,
    getUnpaidChargeData: PropTypes.func,
    unpaidChargeData: PropTypes.object,

    fetchBlacklistInfo: PropTypes.func.isRequired,
    fetchWebimBlacklistInfo: PropTypes.func.isRequired,
    isBlacklistInfoLoading: PropTypes.bool,
    blacklistInfo: PropTypes.object,
    isWebimBlacklistInfoLoading: PropTypes.bool,
    webimBlacklistInfo: PropTypes.object,
    personalData: PropTypes.object,
    fetchPersonalData: PropTypes.func,
    allocatedInfo: PropTypes.string,
    isAllocatedShow: PropTypes.bool,

    fetchHandlingStatus: PropTypes.func,
    handlingStatus: PropTypes.bool,
    isHandlingStatusLoading: PropTypes.bool,
    mnpMarkers: PropTypes.object,
    vipSegmentation: PropTypes.object,
    fetchVipSegmentation: PropTypes.func,
    subscriberMarginMarker: PropTypes.object,
    fetchSubscriberMarginMarker: PropTypes.func,

    chargeCounter: PropTypes.object,
    isVisiblePersonModal: PropTypes.bool,
    handleVisiblePersonModal: PropTypes.func,
    customerSegmentsPreview: PropTypes.object,
    customerSegmentsPreviewWsStatus: PropTypes.number,
    personId: PropTypes.number,
    tariffInfoPreview: PropTypes.object
  }
  state = {
    msisdnValue: '',
    searchingMsisdn: '',
    emailValue: '',
    billingBranchId: '',
    contactNumberHiddenLabel: true,
    allowToRenderTickets: false,
    disableGetDerivedState: false,
    isSubscriberStatusToggled: false,
    isRatePlanToggled: false,
    isOpen: false,
    isSpecialTextHidden: false
  }

  componentDidMount () {
    const {
      fetchRegions,
      getUnpaidChargeData,
      personalAccountState: {
        personalAccount: { ClientCategory, SubscriberFullInfo, Msisdn, SubscriberId, BillingBranchId }
      },
      user,
      fetchWhoIsIt,
      fetchVipSegmentation,
      fetchSubscriberMarginMarker
    } = this.props
    const RatePlanId = get(SubscriberFullInfo, 'SubscriberInfo.RatePlanId', null)

    const isGetUnpaidChargeDataPermission = checkRight(user, 'CC:GetUnpaidChargeData')

    const isAnonymousCard = !ClientCategory || ClientCategory.toUpperCase() === clientCategories.anonimous
    const isB2C = !ClientCategory || ClientCategory.toUpperCase() === clientCategories.B2C
    const isB2B = !ClientCategory || ClientCategory.toUpperCase() === clientCategories.B2B

    if (isAnonymousCard) {
      fetchRegions()
      fetchWhoIsIt({ Msisdn })
    } else {
      fetchSubscriberMarginMarker({ Msisdn: Msisdn, RequestType: 'RightPane' })
      fetchVipSegmentation({ subsId: SubscriberId, branchId: BillingBranchId })
      if (isGetUnpaidChargeDataPermission && isB2C) {
        getUnpaidChargeData({ msisdn: Msisdn, RatePlanId })
      }
      if (isB2B || isB2C) {
        fetchWhoIsIt({ Msisdn })
      }
    }

    this.setState({ msisdnValue: Msisdn })
  }

  static getDerivedStateFromProps (props, state) {
    const {
      changeProblemRegion,
      changePersonalBranchFields,
      processingParametersState: { processingParameters },
      massProblemRegionState,
      whoIsIt,
      fetchTemplates,
      user
    } = props
    const { billingBranchId, disableGetDerivedState } = state

    if (processingParameters && !billingBranchId && !disableGetDerivedState) {
      const { HandlingBranchId } = processingParameters
      const WhoIsBranchId = get(whoIsIt, 'BillingBranchId', null)
      const billingBranch = massProblemRegionState.find(field => field.BranchId === HandlingBranchId)
      const billingBranchWhoIs = massProblemRegionState.find(field => field.BranchId === WhoIsBranchId)
      const billingBranchObject = billingBranch || billingBranchWhoIs

      if (billingBranchObject) {
        if (!user.isASSeller) {
          changeProblemRegion(billingBranchObject.BranchId)
        }
        changePersonalBranchFields({ BillingBranchId: billingBranchObject.BranchId })
        fetchTemplates()
        return { billingBranchId: String(billingBranchObject.BranchId) }
      } else {
        return null
      }
    }

    return null
  }

  inputWarningShow = (elem, name) => {
    let value = null
    if (name === 'contactNumber') {
      value = elem.currentTarget ? elem.currentTarget.value : elem
      if (value.length < 11 && value.length > 0) {
        this.setState({ contactNumberHiddenLabel: false })
        if (value.length === 1) {
          this.setState({ contactNumberHiddenLabel: true })
        }
      } else {
        this.setState({ contactNumberHiddenLabel: true })
      }
    } else {
      this.setState({
        contactNumberHiddenLabel: true
      })
    }
  }

  onBlurHandle = (elem, name) => {
    if (elem && name === 'contactNumber') {
      const value = elem.currentTarget ? elem.currentTarget.value : elem
      if (value.length === 0) {
        this.setState({ contactNumberHiddenLabel: true })
      }
    }
  }

  onSearchHandle = isCopy => {
    const { searchingMsisdn } = this.state
    const {
      queryParams: { serviceChannelId, handlingTechId },
      personalAccountState: {
        personalAccount: { Msisdn }
      },
      processingParametersState: {
        processingParameters: { ServiceChannel }
      },
      handlingId
    } = this.props
    const isValidMsisdn = searchingMsisdn && searchingMsisdn.length === 11

    if (isValidMsisdn) {
      const targetUrl = `${fromEnv('REACT_APP_SEARCH')}/main/balance?msisdn=${searchingMsisdn}&serviceChannelId=${ServiceChannel.Id || serviceChannelId
      }`
      if (isCopy) {
        open(`${targetUrl}&handlingTechId=${handlingTechId}&linkedMsisdn=${Msisdn}`, '_blank')
      }
      if (searchingMsisdn === Msisdn) {
        this.setState({ isOpen: true })
      } else if (handlingId) {
        this.setState({ isOpen: false })
        open(
          `${targetUrl}&handlingTechId=${uuid.v4()}&linkedHandlingId=${handlingId}&linkedHandlingTechId=${handlingTechId}&linkedMsisdn=${Msisdn}`,
          '_blank'
        )
      } else {
        message.error('Обращение не создано! Воспользуйтесь ручным поиском')
      }
    } else {
      message.warning('Поисковые данные не могут быть пустыми')
    }
  }

  onKeyPressHandler = event => {
    if (event.key === 'Enter') {
      this.onSearchHandle()
    }
  }

  onChangeHandler = value => {
    this.setState({ searchingMsisdn: value })
  }

  onPasteHandler = (value, field) => {
    if (field === 'PersCard') {
      this.setState({ msisdnValue: value })
    } else {
      this.setState({ searchingMsisdn: value })
    }
  }

  onClickRemove = () => {
    this.setState({
      msisdnValue: ''
    })
  }

  onClickRemoveSearch = () => {
    this.setState({
      searchingMsisdn: ''
    })
  }

  isMissingPassword = () => {
    const password = get(
      this.props.personalAccountState,
      'personalAccount.SubscriberFullInfo.SubscriberInfo.Password',
      null
    )
    return password === '' || password === null
  }

  handleTogglingStatusModal = () => {
    const { isASSeller: isWebSeller } = this.props.user

    if (isWebSeller) {
      this.props.initChangingClientStatus()
    } else {
      const { isSubscriberStatusToggled } = this.state

      this.setState({ isSubscriberStatusToggled: !isSubscriberStatusToggled })
    }
  }
  handleToggleRatePlanModal = () => {
    const { isRatePlanToggled } = this.state

    this.setState({ isRatePlanToggled: !isRatePlanToggled })
  }

  handleToggleRatePlanModal = () => {
    const { isRatePlanToggled } = this.state
    this.setState({ isRatePlanToggled: !isRatePlanToggled })
  }

  filterValuesToState = (elem, name) => {
    const {
      personalAccountState,
      changePersonalInfoFields,
      fetchProblemsForRegion,
      changeProblemRegion,
      massProblemRegionState,
      fetchTemplates
    } = this.props
    const { personalAccount } = personalAccountState
    const { emailValue, msisdnValue, billingBranchId } = this.state

    let value = null
    if (elem) {
      value = elem.currentTarget ? elem.currentTarget.value : elem
      if (name === 'billingBranchId') {
        const labelValue = massProblemRegionState.find(field => {
          return field.BranchId === value
        })

        this.setState({
          billingBranchId: value
        })
        if (labelValue) {
          this.setState({
            disableGetDerivedState: true
          })
          changeProblemRegion(Number(value))
          fetchProblemsForRegion({
            ...fetchMassProblemsForRegionParams,
            Regions: [Number(value)]
          })

          changePersonalInfoFields({
            Msisdn: personalAccount.Msisdn,
            BillingBranchId: value,
            Email: personalAccount.Email
          })
          fetchTemplates()
        }
      }

      if (name === 'msisdnValue') {
        const billingBranchValue =
          personalAccount && personalAccount.BillingBranchId ? personalAccount.BillingBranchId : null
        const Email = get(personalAccount, 'Email', null)
        const mail = emailValue || Email

        this.setState({ msisdnValue: elem }, () => {
          msisdnValue &&
            changePersonalInfoFields({
              Msisdn: msisdnValue.length === 11 ? msisdnValue : null,
              BillingBranchId: billingBranchValue,
              Email: mail
            })
        })
      }
      if (name === 'emailValue') {
        const billingBranchValue =
          personalAccount && personalAccount.BillingBranchId ? personalAccount.BillingBranchId : billingBranchId
        this.setState({ emailValue: elem }, () => {
          changePersonalInfoFields({
            Msisdn: msisdnValue,
            BillingBranchId: billingBranchValue,
            Email: emailValue
          })
        })
      } else {
        const update = set({}, name, value)
        this.setState({ ...update })
      }
    } else {
      if (name === 'emailValue') {
        this.setState({ emailValue: '' })
        changePersonalInfoFields({
          Msisdn: personalAccount.Msisdn,
          BillingBranchId: personalAccount.BillingBranchId,
          Email: null
        })
      }
      if (name === 'billingBranchId') {
        this.setState({ billingBranchId: '', disableGetDerivedState: true })
        changePersonalInfoFields({ Msisdn: personalAccount.Msisdn, BillingBranchId: '', Email: personalAccount.Email })
      }
    }
  }

  onTicketOpen = () => {
    const { changeModalVisibility, getReasonCategoryForEscalation } = this.props
    changeModalVisibility()
    getReasonCategoryForEscalation()
  }

  toggleIsSpecialTextHidden = () => this.setState({ isSpecialTextHidden: !this.state.isSpecialTextHidden })
  handleOpenCopyClick = () => this.onSearchHandle(true)
  handlePastePersCard = value => this.onPasteHandler(value, 'PersCard')
  handleToggleReasonsRap = () => this.props.toggleRap({ section: 'reasons' })
  handleToggleReasonsRapError = () => {
    const { handlingId } = this.props
    const { billingBranchId } = this.state
    if (billingBranchId) {
      handlingId &&
        notification.open({
          message: 'Ошибка перехода в причины обращения',
          description: 'Укажите MSISDN для перехода в причины обращения',
          type: 'warning'
        })
    } else {
      handlingId &&
        notification.open({
          message: 'Ошибка перехода в причины обращения',
          description: 'Укажите регион для перехода в причины обращения',
          type: 'warning'
        })
    }
  }
  handleToggleSmsRap = () => this.props.toggleRap({ section: 'sms' })
  handleToggleSmsRapError = () => {
    const { handlingId } = this.props
    const { billingBranchId } = this.state
    if (billingBranchId) {
      handlingId &&
        notification.open({
          message: 'Ошибка перехода в SMS',
          description: 'Укажите MSISDN для перехода в SMS',
          type: 'warning'
        })
    } else {
      handlingId &&
        notification.open({
          message: 'Ошибка перехода в SMS',
          description: 'Укажите регион для перехода в SMS',
          type: 'warning'
        })
    }
  }
  handleTicketOpenError = () => {
    const { handlingId } = this.props
    handlingId &&
      notification.open({
        message: 'Ошибка перехода в заявки',
        description: 'Укажите регион для перехода в заявки',
        type: 'warning'
      })
  }

  render () {
    const {
      form: { getFieldDecorator },
      personalAccountState: { personalAccount, isPersonalAccountLoading, personalAccountError },
      user,
      msisdn,
      email,
      cardMode,
      dialogNickname,

      changeAbonentsModalVisibility,
      handlingId,
      toggleOffers,
      offers,
      isVisible,
      location,
      whoIsIt,
      handleVisibleModal,
      tariffModalState,
      personalData,
      fetchPersonalData,

      virtualNumbers,
      IsActiveVirtualNumber,
      trustCreditInfo,
      replacementSimCard,
      handleVisibleReplacementSimCardModal,
      handleVisibleDuplicateSearchModal,
      handleVisibleHistoryIccModal,
      validateSimProfile,
      sendSmsReplacementSim,
      clearReplacementSimCardModal,
      changeSim,
      getHistoryChangeSim,
      subscriberListState,
      getReasonsChangeSim,
      unpaidChargeData,

      isBlacklistInfoLoading,
      fetchBlacklistInfo,
      fetchWebimBlacklistInfo,
      isWebimBlacklistInfoLoading,
      blacklistInfo,
      webimBlacklistInfo,
      massProblemRegionState,

      allocatedInfo: { allocatedInfo, isAllocatedShow },

      fetchHandlingStatus,
      handlingStatus,
      isHandlingStatusLoading,
      mnpMarkers,

      vipSegmentation,
      subscriberMarginMarker,

      chargeCounter,
      isVisiblePersonModal,
      handleVisiblePersonModal,
      customerSegmentsPreview,
      customerSegmentsPreviewWsStatus,
      personId,
      tariffInfoPreview,

      // WebSeller
      isShowChangingTariffPlanStatus
    } = this.props
    const { isASSeller } = user

    const {
      isSubscriberStatusToggled,
      isRatePlanToggled,
      isOpen,
      searchingMsisdn,
      msisdnValue,
      billingBranchId,
      billingBranchIdValue,
      contactNumberHiddenLabel,
      isSpecialTextHidden
    } = this.state

    const isBillingBranch = personalAccount && !!personalAccount.BillingBranchId
    const isMsisdn = personalAccount && !!personalAccount.Msisdn
    const isEmail = personalAccount && !!personalAccount.Email
    const isClientId = !!personalAccount?.ClientId

    const subscriberStatusId = personalAccount?.SubscriberFullInfo?.SubscriberInfo?.SubscriberStatusId
    const isSmsSubscriberId =
      subscriberStatusId !== statusSim.isPrepared &&
      subscriberStatusId !== statusSim.isBlocked &&
      subscriberStatusId !== statusSim.isPaused
    const messageOnSms =
      !isSmsSubscriberId &&
      'Внимание! SIM не активирована, отправка SMS невозможна, уточните активный номер для отправки SMS'
    const isSMS = isBillingBranch && isMsisdn && handlingId && isSmsSubscriberId

    const isReasonsCategoriesData =
      isBillingBranch && (isMsisdn || isEmail || isClientId || dialogNickname) && handlingId

    const isRightModalAllowedToRender = personalAccount && Object.keys(personalAccount).length > 0 && handlingId
    const isRightBlockAllow = !isRightModalAllowedToRender || !isBillingBranch

    const isNotAnonimCard =
      personalAccount.ClientCategory !== undefined && personalAccount.ClientCategory !== 'Анонимный'
    const isSmsAccess = checkRight(user, 'SMS:SmsAccess')
    const isAddOfferWithInteractionPermission = checkRight(user, 'CC:AddOfferWithInteractionPermission')
    const isAddOfferPermission = checkRight(user, 'CC:AddOfferPermission')
    const isTariffManagement = checkRight(user, 'CC:TariffManagement')
    const isReplacementSimPermission = checkRight(user, 'CC:ChangeSim')
    const isChangeStatusSubsPermission = checkRight(user, 'CC:ChangeStatusSubs')
    const isAdminChangeStatusSubsPermission = checkRight(user, 'CC:AdminChangeStatusSubs')
    const isGetUnpaidChargeDataPermission = checkRight(user, 'CC:GetUnpaidChargeData')
    const isMnpSupportPermission = checkRight(user, 'CC:MNPSupport')
    const isPersonalDataPermission = checkRight(user, 'CC:ReadPersonalData')
    const isTicketPermission = checkRight(user, 'CC:Ticket')
    const isReadCustomerSegment = checkRight(user, 'CC:ReadCustomerSegment')
    const isReadTariffGuaranteedPrice = checkRight(user, 'CC:ReadTariffGuaranteedPrice')

    const { isASSeller: isWebSellerView } = user

    const isLeonMode = cardMode === cardModes.leon
    const offerBlockPermission = isASSeller ? true : isAddOfferWithInteractionPermission || isAddOfferPermission
    const isVisibleOffersBlock =
      isNotAnonimCard && offerBlockPermission && (offers.availableOffers || offers.registeredOffers) && !isLeonMode
    const isChangeStatusPermissions = isChangeStatusSubsPermission || isAdminChangeStatusSubsPermission

    const { CustomerCount } = customerSegmentsPreview ?? {}

    const isLoading = customerSegmentsPreviewWsStatus === wsStatus.connecting || !customerSegmentsPreview

    return (
      <ErrorBoundary>
        {tariffModalState.isVisible && <TariffModal />}
        {isShowChangingTariffPlanStatus && <ChangingTariffPlan />}
        {isNotAnonimCard && (
          <Fragment>
            <ReplacementSimCardModal
              replacementSimCard={replacementSimCard}
              handleVisibleReplacementSimCardModal={handleVisibleReplacementSimCardModal}
              validateSimProfile={validateSimProfile}
              personalAccount={personalAccount}
              sendSmsReplacementSim={sendSmsReplacementSim}
              handlingId={handlingId}
              clearReplacementSimCardModal={clearReplacementSimCardModal}
              getReasonsChangeSim={getReasonsChangeSim}
            />
            <DuplicateSearchModal
              replacementSimCard={replacementSimCard}
              handleVisibleDuplicateSearchModal={handleVisibleDuplicateSearchModal}
              handleVisibleReplacementSimCardModal={handleVisibleReplacementSimCardModal}
              changeSim={changeSim}
            />
            <HistoryIccModal
              replacementSimCard={replacementSimCard}
              handleVisibleHistoryIccModal={handleVisibleHistoryIccModal}
              getHistoryChangeSim={getHistoryChangeSim}
              personalAccount={personalAccount}
            />
          </Fragment>
        )}
        {isSubscriberStatusToggled && isChangeStatusPermissions && (
          <SubscriberStatus
            isSubscriberStatusToggled={isSubscriberStatusToggled}
            handleTogglingStatusModal={this.handleTogglingStatusModal}
            isAdminChangeStatusSubsPermission={isAdminChangeStatusSubsPermission}
          />
        )}
        {isRatePlanToggled && isGetUnpaidChargeDataPermission && (
          <RatePlanModal
            isRatePlanToggled={isRatePlanToggled}
            handleToggleRatePlanModal={this.handleToggleRatePlanModal}
          />
        )}
        <Wrapper>
          {isAllocatedShow && (
            <SpecialService>
              <SpecialServiceTitle>
                <TitleText>Правила консультации</TitleText>
                <HideButton onClick={this.toggleIsSpecialTextHidden}>
                  {isSpecialTextHidden ? 'Показать' : 'Скрыть'}
                </HideButton>
              </SpecialServiceTitle>
              <SpecialServiceText hidden={isSpecialTextHidden}>
                <HtmlRender value={allocatedInfo} />
              </SpecialServiceText>
            </SpecialService>
          )}
          {!isWebSellerView && (
            <SearchWrapper>
              <SearchField
                value={searchingMsisdn}
                onChange={this.onChangeHandler}
                onPaste={this.onPasteHandler}
                onKeyPress={this.onKeyPressHandler}
                onClickRemove={this.onClickRemoveSearch}
                searchfield='true'
                focusOnUpdate
                anonimCard={personalAccount.ClientCategory === 'Анонимный'}
              />
              <SettingLink to={`${routeMatch(location.pathname, 'manual-search')}${location.search}`}>
                <SettingIcon />
              </SettingLink>
            </SearchWrapper>
          )}
          <SameNumberWrapper hidden={!isOpen}>
            <div>Поисковый и открытый номера совпадают</div>
            <CopyButton type='primary' onClick={this.handleOpenCopyClick}>
              Открыть копию
            </CopyButton>
          </SameNumberWrapper>
          <ActionWrapper isASSeller={isASSeller}>
            <PersonalAccountWrapper isLoad={isPersonalAccountLoading}>
              <RatingWrapper>
                <RatingMenu currentFeatureId={rightBlockFeatureId} />
              </RatingWrapper>
              <Spin spinning={isPersonalAccountLoading} indicator={LoadIcon} tip='Данные абонента загружаются...'>
                {!isPersonalAccountLoading && (
                  <PersonalInfoCard
                    subscriberMarginMarker={subscriberMarginMarker}
                    cardMode={cardMode}
                    subscriberListState={subscriberListState}
                    fetchBlacklistInfo={fetchBlacklistInfo}
                    fetchWebimBlacklistInfo={fetchWebimBlacklistInfo}
                    isWebimBlacklistInfoLoading={isWebimBlacklistInfoLoading}
                    blacklistInfo={blacklistInfo}
                    webimBlacklistInfo={webimBlacklistInfo}
                    isBlacklistInfoLoading={isBlacklistInfoLoading}
                    isVisible={isVisible}
                    changeAbonentsModalVisibility={changeAbonentsModalVisibility}
                    contactNumberHiddenLabel={contactNumberHiddenLabel}
                    getFieldDecorator={getFieldDecorator}
                    personalAccountError={personalAccountError}
                    personalAccount={personalAccount}
                    isMissingPassword={this.isMissingPassword()}
                    filterValuesToState={this.filterValuesToState}
                    msisdnValue={msisdnValue}
                    billingBranchId={billingBranchId}
                    email={email}
                    dialogNickname={dialogNickname}
                    msisdn={msisdn}
                    onChange={this.onChangeHandler}
                    onPaste={this.handlePastePersCard}
                    onKeyPress={this.onKeyPressHandler}
                    inputWarningShow={this.inputWarningShow}
                    onClickRemove={this.onClickRemove}
                    massProblemRegionState={massProblemRegionState}
                    billingBranchIdValue={billingBranchIdValue}
                    isNotAnonimCard={isNotAnonimCard}
                    whoIsIt={whoIsIt}
                    handleVisibleTariffModal={handleVisibleModal}
                    trustCreditInfo={trustCreditInfo}
                    isTariffManagementPermission={isTariffManagement}
                    handleTogglingStatusModal={this.handleTogglingStatusModal}
                    handleToggleRatePlanModal={this.handleToggleRatePlanModal}
                    unpaidChargeData={unpaidChargeData}
                    virtualNumbers={virtualNumbers}
                    IsActiveVirtualNumber={IsActiveVirtualNumber}
                    handleVisibleReplacementSimCardModal={handleVisibleReplacementSimCardModal}
                    handleVisibleHistoryIccModal={handleVisibleHistoryIccModal}
                    isReplacementSimPermission={isReplacementSimPermission}
                    isMnpSupportPermission={isMnpSupportPermission}
                    fetchPersonalData={fetchPersonalData}
                    personalData={personalData}
                    fetchHandlingStatus={fetchHandlingStatus}
                    handlingStatus={handlingStatus}
                    isHandlingStatusLoading={isHandlingStatusLoading}
                    mnpMarkers={mnpMarkers}
                    vipSegmentation={vipSegmentation}
                    chargeCounter={chargeCounter}
                    isPersonalDataPermission={isPersonalDataPermission}
                    tariffInfoPreview={tariffInfoPreview}
                    isReadTariffGuaranteedPrice={isReadTariffGuaranteedPrice}
                    isASSeller={isASSeller}
                  />
                )}
              </Spin>
            </PersonalAccountWrapper>
            {isReadCustomerSegment && personId && (
              <>
                <PersonModal
                  isVisible={isVisiblePersonModal}
                  handleVisiblePersonModal={handleVisiblePersonModal}
                  isLoading={isLoading}
                />
                {isWebSellerView && (
                  <PersonBlock
                    isVisiblePersonModal={isVisiblePersonModal}
                    handleVisiblePersonModal={handleVisiblePersonModal}
                    clickable
                    record={customerSegmentsPreview}
                    customersCount={CustomerCount}
                    isLoading={isLoading}
                  />
                )}
              </>
            )}
            {isSmsAccess && (
              <ButtonGroup>
                <FooterButton
                  borderBottomLeft={!isVisibleOffersBlock}
                  disabled={!isReasonsCategoriesData}
                  onClick={
                    !isRightBlockAllow && isReasonsCategoriesData
                      ? this.handleToggleReasonsRap
                      : this.handleToggleReasonsRapError
                  }
                >
                  Причины обращения
                </FooterButton>
                <Tooltip title={messageOnSms}>
                  <BorderedFooterButton
                    disabled={!isSMS}
                    borderBottomRight={!isVisibleOffersBlock && !isTicketPermission}
                    onClick={!isRightBlockAllow && isSMS ? this.handleToggleSmsRap : this.handleToggleSmsRapError}
                  >
                    SMS
                  </BorderedFooterButton>
                </Tooltip>
                {isTicketPermission && (
                  <BorderedFooterButton
                    disabled={isRightBlockAllow}
                    borderBottomRight={!isVisibleOffersBlock}
                    onClick={!isRightBlockAllow ? this.onTicketOpen : this.handleTicketOpenError}
                  >
                    Заявка
                  </BorderedFooterButton>
                )}
              </ButtonGroup>
            )}
            {isVisibleOffersBlock && (
              <OfferBlock
                offers={offers}
                toggleOffers={toggleOffers}
                Msisdn={this.state.msisdnValue}
                handlingId={handlingId}
              />
            )}
          </ActionWrapper>
        </Wrapper>
      </ErrorBoundary>
    )
  }
}

export default withRouter(Form.create()(RightBlock))

const LoadIcon = <LoadingSpinner spin />

const Wrapper = styled.div`
  border-radius: 10px;
  padding: 5px;
  background-color: #eeeeee;
`
const SameNumberWrapper = styled.div`
  position: relative;
  background-color: white;
  padding: 5px 5px 5px 16px;
  margin-top: 10px;
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.08);
  border-radius: 10px;
`
const CopyButton = styled(Button)`
  width: 95%;
  margin: 5px 0;
`
const PersonalAccountWrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 10px;
  padding: ${props => (props.isLoad ? '20px' : '0')};
  text-align: ${props => (props.isLoad ? 'center' : null)};
`
const ButtonGroup = styled.div`
  margin-top: 5px;
  background-color: #ffffff;
  display: flex;
  border-radius: 10px;
`
const FooterButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 8px 14px;
  width: 33%;
  font-size: 14px;
  font-family: T2HalvarBreit_ExtraBold;
  color: ${props => (props.disabled ? 'gray' : 'black')};
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
  background: ${props => (props.disabled ? 'lightgray' : 'white')};
  border-bottom-left-radius: ${props => (props.borderBottomLeft ? '10px' : '0')};

  &:hover {
    color: ${props => (props.disabled ? 'gray' : '#40BFEE')};
  }
`
const BorderedFooterButton = styled(FooterButton)`
  border-left: solid 1px #e4e4e9;
  border-radius: 0;
  border-bottom-right-radius: ${props => (props.borderBottomRight ? '10px' : '0')};
`
const SearchField = styled(MsisdnMaskedInput)`
  width: 100%;
  font-size: 14px;
  text-align: left;
  padding-left: 10px;
  border-radius: 2px;
  border-color: transparent;
  border-radius: 10px;
`
const SearchWrapper = styled.div`
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.4);
  background-color: #40bfee;
  display: flex;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
  .ant-input-affix-wrapper {
    background-color: #40bfee !important;
    .ant-input-prefix {
      position: absolute;
      z-index: 2;
    }
    .ant-input-suffix {
      position: absolute;
      right: 6px;
      z-index: 3;
    }
    input.ant-input {
      position: absolute;
      top: 0px;
      left: 0px;
      padding-left: 12px;
      line-height: 30px;
    }
  }
`
const SettingLink = styled(Link)`
  display: flex;
  width: 15%;
  height: 100%;
  text-decoration: none;
  align-items: center;
  justify-content: center;

  &:focus {
    text-decoration: none;
  }
`

const SpecialService = styled.div`
  bottom: 0px;
  margin-bottom: 5px;
  background-color: white;
  color: black;
  z-index: 10;
`
const SpecialServiceTitle = styled.div`
  display: flex;
  padding: 8px 14px;
  background-color: #fe4a4a;
`
const TitleText = styled.div`
  color: black;
  font-size: 14px;
  font-family: T2HalvarBreit_ExtraBold;
  width: 70%;
`
const HideButton = styled.div`
  text-align: right;
  width: 30%;
  cursor: pointer;
`
const SpecialServiceText = styled.div`
  padding: 3px;
  max-height: 25vh;
  overflow-y: scroll;
`

const RatingWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 10px;
  z-index: 2;
`

const ActionWrapper = styled.div`
  border-radius: 10px;
  margin-top: ${({ isASSeller = false }) => (isASSeller ? 0 : 10)}px;
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.2);
`
