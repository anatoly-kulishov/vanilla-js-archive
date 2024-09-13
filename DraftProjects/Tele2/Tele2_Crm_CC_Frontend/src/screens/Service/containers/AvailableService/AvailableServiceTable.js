import React, { PureComponent } from 'react'
import SortedServices from './SortedServices'
import PropTypes from 'prop-types'

class AvailableServiceTable extends PureComponent {
  static propTypes = {
    availableServices: PropTypes.object,
    personalAccount: PropTypes.object,
    handlingId: PropTypes.number,
    changeVisibility: PropTypes.func,
    showServiceHistory: PropTypes.func,
    getServiceHistory: PropTypes.func,
    changeServiceStatus: PropTypes.func,
    kmsSearchingResults: PropTypes.object,
    searchInKmsAndRedirect: PropTypes.func,
    resetKmsSearchingResults: PropTypes.func,
    getAvailableServices: PropTypes.func,
    isAvailableServicesLoading: PropTypes.bool,
    isLoadingInteractions: PropTypes.bool,
    isChangeServiceStatusLoading: PropTypes.bool,
    servicesState: PropTypes.object,
    openMultisubscriptionModal: PropTypes.object
  }
  state = {
    activeKey: [],
    prevActiveKeyProps: null
  }

  componentDidMount () {
    const {
      getAvailableServices,
      availableServices,
      personalAccount: { Msisdn: msisdn }
    } = this.props

    !availableServices && getAvailableServices({ msisdn })
  }

  handleShowHistoryModal = ({ billingServiceId, modalTitle }) => {
    const {
      personalAccount: { Msisdn: msisdn, BillingBranchId: branchId },
      changeVisibility,
      showServiceHistory,
      getServiceHistory
    } = this.props

    changeVisibility()
    showServiceHistory({ title: modalTitle, service: true })

    return (
      getServiceHistory({
        msisdn,
        branchId,
        serviceId: billingServiceId,
        message: 'История услуг'
      })
    )
  }

  handleChangingStatus = params => {
    const { changeServiceStatus } = this.props
    changeServiceStatus(params)
  }

  render () {
    const {
      availableServices,
      personalAccount,
      personalAccount: { Msisdn: msisdn },
      handlingId,
      searchInKmsAndRedirect,
      resetKmsSearchingResults,
      kmsSearchingResults,
      isAvailableServicesLoading,
      isLoadingInteractions,
      isChangeServiceStatusLoading,
      servicesState,
      openMultisubscriptionModal
    } = this.props
    return (
      <SortedServices
        servicesState={servicesState}
        services={availableServices}
        msisdn={msisdn}
        handlingId={handlingId}
        personalAccount={personalAccount}
        changeServiceStatus={this.handleChangingStatus}
        handleShowHistoryModal={this.handleShowHistoryModal}
        searchInKmsAndRedirect={searchInKmsAndRedirect}
        resetKmsSearchingResults={resetKmsSearchingResults}
        kmsSearchingResults={kmsSearchingResults}
        isAvailableServicesLoading={isAvailableServicesLoading}
        isLoadingInteractions={isLoadingInteractions}
        isChangeServiceStatusLoading={isChangeServiceStatusLoading}
        openMultisubscriptionModal={openMultisubscriptionModal}
      />
    )
  }
}

export default AvailableServiceTable
