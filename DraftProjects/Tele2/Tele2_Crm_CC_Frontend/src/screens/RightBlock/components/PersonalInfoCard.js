import React from 'react'
import AnonymousCard from './AnonymousCard'
import AbonentContent from './AbonentContent'
import ClientContent from './ClientContent'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { clientCategories } from 'constants/personalAccountStrings'
import { getTypeCard } from 'webseller/helpers'

const propTypes = {
  cardMode: PropTypes.number,
  personalAccountError: PropTypes.bool,
  personalAccount: PropTypes.object,
  isMissingPassword: PropTypes.bool,
  getFieldDecorator: PropTypes.func,
  filterValuesToState: PropTypes.func,
  contactNumberHiddenLabel: PropTypes.bool,
  onPaste: PropTypes.func,
  inputWarningShow: PropTypes.func,
  msisdnValue: PropTypes.string,
  email: PropTypes.object,
  dialogNickname: PropTypes.string,
  msisdn: PropTypes.string,
  billingBranchId: PropTypes.string,
  onClickRemove: PropTypes.func,
  changeAbonentsModalVisibility: PropTypes.func,
  whoIsIt: PropTypes.object,
  massProblemRegionState: PropTypes.array,
  handleVisibleTariffModal: PropTypes.func,
  trustCreditInfo: PropTypes.object,
  mnpMarkers: PropTypes.object,
  isTariffManagementPermission: PropTypes.string,
  isMnpSupportPermission: PropTypes.bool,

  virtualNumbers: PropTypes.array,
  IsActiveVirtualNumber: PropTypes.bool,
  handleTogglingStatusModal: PropTypes.func,
  handleVisibleReplacementSimCardModal: PropTypes.func,
  handleVisibleHistoryIccModal: PropTypes.func,
  isReplacementSimPermission: PropTypes.bool,
  unpaidChargeData: PropTypes.object,

  fetchBlacklistInfo: PropTypes.func.isRequired,
  fetchWebimBlacklistInfo: PropTypes.func.isRequired,
  isBlacklistInfoLoading: PropTypes.bool,
  isWebimBlacklistInfoLoading: PropTypes.bool,
  blacklistInfo: PropTypes.object,
  webimBlacklistInfo: PropTypes.object,
  personalData: PropTypes.object,
  fetchPersonalData: PropTypes.func,

  fetchHandlingStatus: PropTypes.func,
  handlingStatus: PropTypes.bool,
  isHandlingStatusLoading: PropTypes.bool,
  vipSegmentation: PropTypes.object,
  subscriberMarginMarker: PropTypes.object,
  chargeCounter: PropTypes.object,
  isPersonalDataPermission: PropTypes.bool,
  tariffInfoPreview: PropTypes.object,
  isReadTariffGuaranteedPrice: PropTypes.bool,
  isASSeller: PropTypes.bool
}

const PersonalInfoCard = props => {
  const {
    cardMode,
    personalAccountError,
    personalAccount,
    isMissingPassword,
    getFieldDecorator,
    filterValuesToState,
    contactNumberHiddenLabel,
    onPaste,
    inputWarningShow,
    msisdnValue,
    email,
    dialogNickname,
    msisdn,
    billingBranchId,
    onClickRemove,
    changeAbonentsModalVisibility,
    whoIsIt,
    isNotAnonimCard,
    massProblemRegionState,
    trustCreditInfo,
    handleVisibleTariffModal,
    isTariffManagementPermission,
    isMnpSupportPermission,
    handleTogglingStatusModal,
    handleToggleRatePlanModal,
    virtualNumbers,
    IsActiveVirtualNumber,
    handleVisibleReplacementSimCardModal,
    handleVisibleHistoryIccModal,
    isReplacementSimPermission,
    subscriberListState,
    unpaidChargeData,
    mnpMarkers,

    isBlacklistInfoLoading,
    isWebimBlacklistInfoLoading,
    fetchBlacklistInfo,
    fetchWebimBlacklistInfo,
    blacklistInfo,
    webimBlacklistInfo,
    fetchPersonalData,
    personalData,

    fetchHandlingStatus,
    handlingStatus,
    isHandlingStatusLoading,

    vipSegmentation,
    subscriberMarginMarker,
    chargeCounter,
    isPersonalDataPermission,
    tariffInfoPreview,
    isReadTariffGuaranteedPrice,
    isASSeller
  } = props

  const clientCategory = get(personalAccount, 'ClientCategory', null)
  const isB2b = clientCategory?.toUpperCase() === clientCategories.B2B

  const { isAnonymousCard } = getTypeCard(isASSeller)

  if (isNotAnonimCard) {
    return (
      <div>
        {(isB2b && !isAnonymousCard) && (
          <ClientContent
            personalAccountError={personalAccountError}
            personalAccount={personalAccount}
            isMissingPassword={isMissingPassword}
            tariffInfoPreview={tariffInfoPreview}
            isReadTariffGuaranteedPrice={isReadTariffGuaranteedPrice}
            isASSeller={isASSeller}
          />
        )}
        <AbonentContent
          subscriberMarginMarker={subscriberMarginMarker}
          cardMode={cardMode}
          mnpMarkers={mnpMarkers}
          trustCreditInfo={trustCreditInfo}
          subscriberListState={subscriberListState}
          fetchBlacklistInfo={fetchBlacklistInfo}
          isBlacklistInfoLoading={isBlacklistInfoLoading}
          isWebimBlacklistInfoLoading={isWebimBlacklistInfoLoading}
          blacklistInfo={blacklistInfo}
          webimBlacklistInfo={webimBlacklistInfo}
          fetchWebimBlacklistInfo={fetchWebimBlacklistInfo}
          personalAccountError={personalAccountError}
          personalAccount={personalAccount}
          isMissingPassword={isMissingPassword}
          changeAbonentsModalVisibility={changeAbonentsModalVisibility}
          handleVisibleTariffModal={handleVisibleTariffModal}
          isTariffManagementPermission={isTariffManagementPermission}
          isMnpSupportPermission={isMnpSupportPermission}
          handleTogglingStatusModal={handleTogglingStatusModal}
          handleToggleRatePlanModal={handleToggleRatePlanModal}
          unpaidChargeData={unpaidChargeData}
          virtualNumbers={virtualNumbers}
          IsActiveVirtualNumber={IsActiveVirtualNumber}
          handleVisibleReplacementSimCardModal={handleVisibleReplacementSimCardModal}
          handleVisibleHistoryIccModal={handleVisibleHistoryIccModal}
          isReplacementSimPermission={isReplacementSimPermission}
          fetchPersonalData={fetchPersonalData}
          personalData={personalData}
          fetchHandlingStatus={fetchHandlingStatus}
          handlingStatus={handlingStatus}
          isHandlingStatusLoading={isHandlingStatusLoading}
          vipSegmentation={vipSegmentation}
          chargeCounter={chargeCounter}
          whoIsIt={whoIsIt}
          isPersonalDataPermission={isPersonalDataPermission}
          tariffInfoPreview={tariffInfoPreview}
          isReadTariffGuaranteedPrice={isReadTariffGuaranteedPrice}
          isASSeller={isASSeller}
        />
      </div>
    )
  } else {
    return (
      <AnonymousCard
        email={email}
        msisdn={msisdn}
        dialogNickname={dialogNickname}
        msisdnValue={msisdnValue}
        billingBranchId={billingBranchId}
        personalAccount={personalAccount}
        contactNumberHiddenLabel={contactNumberHiddenLabel}
        getFieldDecorator={getFieldDecorator}
        inputWarningShow={inputWarningShow}
        filterValuesToState={filterValuesToState}
        onClickRemove={onClickRemove}
        onPaste={onPaste}
        massProblemRegionState={massProblemRegionState}
        whoIsIt={whoIsIt}
        isASSeller={isASSeller}
      />
    )
  }
}

PersonalInfoCard.propTypes = propTypes

export default PersonalInfoCard
