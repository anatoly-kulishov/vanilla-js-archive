import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spin, notification } from 'antd'
import { SyncOutlined, FilterOutlined } from '@ant-design/icons'
import { isEqual } from 'lodash'

import CardNew from 'components/Card'
import LoadingSpinner from 'components/LoadingSpinner'
import {
  MassProblemRegionProps,
  MassProblemMsisdnStatusProps,
  fetchMassProblemsForRegionParams
} from 'constants/massProblems'
import { PersonalAccountStateProps } from 'constants/personalAccount'
import MassProblemsFilter from './components/MassProblemsFilters'
import MassProblemModal from 'components/MassProblems/MassProblemModal'
import MassProblemsTable from './containers/MassProblemTable'
import RatingMenu from 'containers/RatingMenu'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
const { massProblemsFeatureId } = ratingFeatureIds

class MassProblemsOperator extends PureComponent {
  static propTypes = {
    regions: PropTypes.arrayOf(MassProblemRegionProps).isRequired,
    fetchRegions: PropTypes.func.isRequired,
    isRegionsLoading: PropTypes.bool.isRequired,
    fetchProblemsForRegion: PropTypes.func.isRequired,
    personalAccountState: PersonalAccountStateProps.isRequired,
    changeProblemRegion: PropTypes.func,
    regionProblems: PropTypes.object,
    region: PropTypes.object,
    handlingId: PropTypes.number,
    interactions: PropTypes.object,
    isRegionProblemsLoading: PropTypes.bool,
    serviceChannelInterfaces: PropTypes.array,
    deleteInteraction: PropTypes.func,
    fetchInteractions: PropTypes.func,
    registerMtpNote: PropTypes.func,
    isNoteCreating: PropTypes.bool,
    location: PropTypes.object,
    isPersonalAccountLoading: PropTypes.bool,
    fetchSubscriberInfo: PropTypes.func.isRequired,
    msisdnStatusArray: PropTypes.arrayOf(MassProblemMsisdnStatusProps).isRequired,
    changeMsisdnStatusArray: PropTypes.func.isRequired,
    isLoadingInteractions: PropTypes.bool,
    processingParameters: PropTypes.object,
    getServiceChannelInterfaces: PropTypes.func.isRequired,
    isWebSeller: PropTypes.bool,
    isAnonymousCardWebSeller: PropTypes.bool
  }

  state = {
    showFilters: true,
    expandedRowKeys: [],
    expandAllFlag: false,
    number: null,
    text: null,
    nameSearch: false,
    openedMtp: null,
    modalVisible: false,
    isInteractionsFetched: false,
    personalAccount: null,
    selectedServiceChannelInterface: undefined,
    requestedServiceChannelInterface: undefined
  }

  static getDerivedStateFromProps (props, state) {
    const {
      handlingId,
      fetchInteractions,
      personalAccountState: { personalAccount },
      isWebSeller
    } = props

    const { isInteractionsFetched } = state

    const additional = {
      selectedServiceChannelInterface: isWebSeller ? 'wd' : undefined
    }

    if (handlingId && !isInteractionsFetched) {
      fetchInteractions()

      return {
        ...additional,
        isInteractionsFetched: true
      }
    }

    if (!isEqual(personalAccount, state.personalAccount)) {
      return {
        ...additional,
        personalAccount
      }
    }

    return additional
  }

  componentDidMount () {
    const {
      fetchProblemsForRegion,
      changeProblemRegion,
      fetchRegions,
      personalAccountState: { personalAccount },
      processingParameters: { processingParameters },
      getServiceChannelInterfaces
    } = this.props

    const billingBranchId = personalAccount.BillingBranchId

    const serviceChannelInterfaceParam = this.getDefaultServiceChannelParam()

    const params = {
      ...fetchMassProblemsForRegionParams,
      Regions: [billingBranchId],
      ServiceChannelId: processingParameters?.ServiceChannel?.Id,
      ServiceChannelInterface: [serviceChannelInterfaceParam]
    }

    fetchRegions()
    getServiceChannelInterfaces()
    fetchProblemsForRegion(params)
    changeProblemRegion(billingBranchId)

    this.setState({ requestedServiceChannelInterface: serviceChannelInterfaceParam })

    if (personalAccount && !personalAccount.BillingBranchId) {
      notification.open({
        message: 'Ошибка перехода в Тех.проблемы',
        description: 'Выберите регион для загрузки Тех.проблем',
        type: 'warning'
      })
    }
  }

  getDefaultServiceChannelParam = () => {
    const {
      processingParameters: { processingParameters },
      isWebSeller
    } = this.props

    if (isWebSeller) {
      return 'wd'
    }

    return processingParameters?.IsMvno ? 'mvno' : 'crm'
  }

  onAdditionalInfoShow = event => {
    const {
      regionProblems: { Problems }
    } = this.props
    const { expandAllFlag } = this.state
    let rows = []
    if (event.target.checked) {
      rows = Problems.map(record => record.ProblemId)
    }
    this.setState({
      expandedRowKeys: rows,
      expandAllFlag: !expandAllFlag
    })
  }

  onExpandedRowsChange = row => {
    let expandAllFlag = false
    const {
      regionProblems: { Problems }
    } = this.props
    if (row.length === Problems.length && row.length !== 0) {
      expandAllFlag = true
    }
    this.setState({
      expandedRowKeys: row,
      expandAllFlag: expandAllFlag
    })
  }

  onNameSearch = event => {
    this.setState({
      nameSearch: event.target.checked
    })
  }

  onRegionChange = value => {
    const { changeProblemRegion } = this.props
    changeProblemRegion(value)
  }

  onServiceChannelInterfaceChange = value => {
    this.setState({
      selectedServiceChannelInterface: value
    })
  }

  onNumberChange = event => {
    this.setState({
      number: event.target.value
    })
  }

  onTextChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  onSearch = () => {
    const {
      fetchProblemsForRegion,
      region,
      processingParameters: { processingParameters },
      isWebSeller
    } = this.props
    const { text, number, nameSearch, selectedServiceChannelInterface } = this.state
    let params = {
      ...fetchMassProblemsForRegionParams,
      ProblemId: isWebSeller && number ? Number(number) : undefined,
      Regions: [region],
      ServiceChannelId: processingParameters?.ServiceChannel?.Id,
      ServiceChannelInterface: selectedServiceChannelInterface ? [selectedServiceChannelInterface] : []
    }

    // Backend returns AttributesForInterfaces only for selected channel
    // So we can`t show channel values by selectedServiceChannelInterface value
    // And we need to get values from AttributesForInterfaces object by requested channel
    this.setState({ requestedServiceChannelInterface: selectedServiceChannelInterface })

    if (text) {
      params = nameSearch ? { ...params, problemName: text } : { ...params, generalText: text }
    }
    fetchProblemsForRegion(params)
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.onSearch()
    }
  }

  onCellClick = record => {
    const { modalVisible } = this.state

    this.setState({
      openedMtp: modalVisible ? null : record,
      modalVisible: !modalVisible
    })
  }

  onFilterHide = () => {
    const { showFilters } = this.state
    this.setState({ showFilters: !showFilters })
  }

  renderMassProblems = () => {
    const { showFilters, expandedRowKeys, expandAllFlag, nameSearch } = this.state
    const {
      regions,
      isRegionsLoading,
      serviceChannelInterfaces,
      regionProblems: { Problems, ProblemCount, PlusCount, MinusCount },
      isRegionProblemsLoading,
      personalAccountState: { personalAccount, isPersonalAccountLoading },
      region,
      isLoadingInteractions,
      isNoteCreating,
      isWebSeller,
      isAnonymousCardWebSeller
    } = this.props
    const { requestedServiceChannelInterface } = this.state
    const defaultServiceChannelInterface = this.getDefaultServiceChannelParam()
    return (
      <Fragment>
        {personalAccount && !isPersonalAccountLoading && !isRegionsLoading && (
          <Fragment>
            {showFilters && (
              <MassProblemsFilter
                isWebSeller={isWebSeller}
                isAnonymousCardWebSeller={isAnonymousCardWebSeller}
                expandAllFlag={expandAllFlag}
                nameSearchFlag={nameSearch}
                region={region}
                regions={regions}
                defaultServiceChannelInterface={defaultServiceChannelInterface}
                serviceChannelInterfaces={serviceChannelInterfaces}
                onServiceChannelInterfaceChange={this.onServiceChannelInterfaceChange}
                onRegionChange={this.onRegionChange}
                onSearch={this.onSearch}
                onNameSearch={this.onNameSearch}
                onNumberChange={this.onNumberChange}
                onTextChange={this.onTextChange}
                problemCount={ProblemCount}
                plusCount={PlusCount}
                minusCount={MinusCount}
                displayedProblems={Problems && Problems.length}
                onAdditionalInfoShow={this.onAdditionalInfoShow}
                onKeyDown={this.onKeyDown}
              />
            )}
            <Spin
              spinning={isRegionProblemsLoading || isLoadingInteractions || isNoteCreating}
              indicator={<LoadingSpinner />}
            >
              <MassProblemsTable
                isWebSeller={isWebSeller}
                requestedServiceChannelInterface={requestedServiceChannelInterface}
                expandedRowKeys={expandedRowKeys}
                onExpandedRowsChange={this.onExpandedRowsChange}
                onCellClick={this.onCellClick}
              />
            </Spin>
          </Fragment>
        )}
      </Fragment>
    )
  }

  serviceAddition = [
    shouldRate(massProblemsFeatureId) && { content: <RatingMenu currentFeatureId={massProblemsFeatureId} /> },
    { content: <SyncIcon />, onClick: this.onSearch },
    { content: <FilterIcon />, onClick: this.onFilterHide }
  ]

  render () {
    const {
      location,
      isPersonalAccountLoading,
      isRegionsLoading,
      interactions,
      handlingId,
      deleteInteraction,
      registerMtpNote,
      isNoteCreating,
      fetchSubscriberInfo,
      msisdnStatusArray,
      changeMsisdnStatusArray,
      regionProblems: { MaxInteractionIssuesMsisdn: maxInteractionIssuesMsisdn },
      isWebSeller
    } = this.props
    const { modalVisible, openedMtp, personalAccount, requestedServiceChannelInterface } = this.state

    return (
      <Fragment>
        {openedMtp && personalAccount && (
          <MassProblemModal
            isVisible={modalVisible}
            openedMtp={openedMtp}
            changeVisibility={this.onCellClick}
            allowNoteRegistration={handlingId}
            interactions={interactions}
            handlingId={handlingId}
            deleteInteraction={deleteInteraction}
            registerMtpNote={registerMtpNote}
            personalAccount={personalAccount}
            isNoteCreating={isNoteCreating}
            msisdnStatusArray={msisdnStatusArray}
            fetchSubscriberInfo={fetchSubscriberInfo}
            changeMsisdnStatusArray={changeMsisdnStatusArray}
            maxInteractionIssuesMsisdn={maxInteractionIssuesMsisdn}
            requestedServiceChannelInterface={requestedServiceChannelInterface}
            isWebSeller={isWebSeller}
          />
        )}
        <CardNew
          header={'Массовые проблемы'}
          additional={this.serviceAddition}
          isContentLoading={isPersonalAccountLoading || isRegionsLoading}
          content={this.renderMassProblems()}
          location={location}
        />
      </Fragment>
    )
  }
}

export default MassProblemsOperator

const FilterIcon = styled(FilterOutlined)`
  font-size: 17px;
`
const SyncIcon = styled(SyncOutlined)`
  font-size: 17px;
`
