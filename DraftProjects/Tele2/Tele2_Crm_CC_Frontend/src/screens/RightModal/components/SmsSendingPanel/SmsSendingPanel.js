/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import SmsSendingCommentTemplates from './components/SmsSendingCommentTemplates/SmsSendingCommentTemplates'
import SmsSendingForm from './components/SmsSendingForm/SmsSendingForm'
import SuccessRequestPage from './components/SmsSendingRequestStatus'
import SmsSendingTemplatesTree from './components/SmsSendingTemplatesTree'
import MsisdnSubscribers from './components/MsisdnSubscribers'

import momentTZ from 'moment-timezone'
import PropTypes from 'prop-types'
import { get, isEqual } from 'lodash'
import SmsReasonCategory from './components/SmsReasonCategory'
import TopSmsTemplates from './components/TopSmsTemplates/TopSmsTemplates'
import { Spin } from 'antd'
import { cardModes } from 'constants/cardModes'

class SmsSendingPanel extends Component {
  static propTypes = {
    selectedTemplate: PropTypes.object,
    personalAccountState: PropTypes.object,
    lteNumber: PropTypes.object,
    selectedReason: PropTypes.object,
    selectedCategory: PropTypes.object,
    fetchReasons: PropTypes.func,
    fetchSenders: PropTypes.func,
    fetchPeriodOfSilence: PropTypes.func,
    fetchLteNumber: PropTypes.func,
    handlingState: PropTypes.object,
    mnpMarkers: PropTypes.object,
    sendSms: PropTypes.func,
    selectTemplate: PropTypes.func,
    selectReasonCategory: PropTypes.func,
    resetSms: PropTypes.func,
    filterTemplates: PropTypes.func,
    cancelSms: PropTypes.func,
    smsStatus: PropTypes.object,
    reasonCategoryCommentTemplates: PropTypes.object,
    senders: PropTypes.object,
    periodOfSilence: PropTypes.object,
    smsTextEditRights: PropTypes.func,
    msisdnEditRights: PropTypes.func,
    fetchTemplates: PropTypes.func,
    changeCommentTemplate: PropTypes.func,
    rightModal: PropTypes.object,
    filterReasons: PropTypes.func,
    topSmsTemplates: PropTypes.array,
    isTopSmsTemplatesLoading: PropTypes.bool,
    fetchTopSmsTemplates: PropTypes.func,
    initialReasons: PropTypes.array,
    whoIsIt: PropTypes.object
  }

  state = {
    isDataWithBranchIdFetched: false,
    isLteNumberSet: false,
    smsFormData: {},
    selectedReason: null,
    selectedTemplate: null,
    msisdnSubscriber: null,
    isSmsSendingTemplatesToggled: true
  }

  toggleSmsSendingTemplates = () => {
    const { isSmsSendingTemplatesToggled } = this.state
    this.setState({
      isSmsSendingTemplatesToggled: !isSmsSendingTemplatesToggled
    })
  }

  shouldComponentUpdate (nextProps) {
    const { activeTab: currentActiveTab } = this.props.rightModal
    const { activeTab: nextActiveTab } = nextProps.rightModal

    return currentActiveTab === 'sms' || nextActiveTab === 'sms'
    // Отмена обновлений если модалка смс не открыта
  }

  static getDerivedStateFromProps (props, state) {
    const {
      selectedTemplate,
      personalAccountState: { personalAccount },
      lteNumber,
      selectedReason,
      selectedCategory,
      mnpMarkers
    } = props

    const { isLteNumberSet } = state

    const isSelectedReasonChange = !isEqual(selectedReason, state.selectedReason) && selectedCategory
    const isSelectedTemplateChange = selectedTemplate && !isEqual(selectedTemplate, state.selectedTemplate)

    if (isSelectedReasonChange) {
      if (!selectedTemplate) {
        return {
          selectedReason,
          commentTemplate: {
            CommentTemplateId: null,
            CommentTemplateName: '',
            CommentText: ''
          }
        }
      } else {
        return {
          selectedReason
        }
      }
    }

    if (isSelectedTemplateChange) {
      // check comment template from selectedTemplate
      const { CommentId, CommentText, CommentName } = selectedTemplate

      const prevCommentTemplate = {
        CommentTemplateId: CommentId,
        CommentTemplateName: CommentName,
        CommentText: CommentText
      }

      if (!isEqual(state.commentTemplate, prevCommentTemplate)) {
        return {
          selectedTemplate,
          commentTemplate: prevCommentTemplate
        }
      }
    }

    if (mnpMarkers && personalAccount) {
      const { Lte450 } = mnpMarkers
      if (Lte450 && lteNumber && !isLteNumberSet) {
        return {
          isLteNumberSet: true,
          msisdnSubscriber: lteNumber
        }
      }
    }

    return null
  }

  componentDidMount () {
    const { isDataWithBranchIdFetched, isLteNumberSet } = this.state

    const {
      mnpMarkers,
      fetchReasons,
      fetchSenders,
      fetchPeriodOfSilence,
      personalAccountState,
      fetchLteNumber,
      whoIsIt
    } = this.props

    if (!isDataWithBranchIdFetched) {
      const branchId = get(personalAccountState, 'personalAccount.BillingBranchId', null)
      const clientCategory = get(personalAccountState, 'personalAccount.ClientCategory', 'b2c')
      const clientId = get(personalAccountState, 'personalAccount.ClientId', null)
      const msisdn = get(personalAccountState, 'personalAccount.Msisdn')
      const lte450 = get(mnpMarkers, 'Lte450')
      const factualRegion = get(whoIsIt, 'BillingBranchId')

      fetchSenders({ branchId: this.isLeonMode ? factualRegion : branchId })
      fetchPeriodOfSilence({ branchId, factualRegion })
      msisdn &&
        !isLteNumberSet &&
        this.setState({
          msisdnSubscriber: msisdn
        })

      if (branchId && lte450) {
        fetchLteNumber({ clientId, branchId, msisdn, clientCategory })

        this.setState({
          isDataWithBranchIdFetched: true
        })
      }
    }

    fetchReasons({})
  }

  toggleTree = () => {
    this.setState({
      isTreeReasonsToggled: !this.state.isTreeReasonsToggled
    })
  }

  onSendSms = formData => {
    const {
      periodOfSilence: { TimeShift },
      selectedTemplate,
      selectedReason,
      selectedCategory,
      personalAccountState,
      handlingState,
      sendSms,
      whoIsIt
    } = this.props

    const { commentTemplate, msisdnSubscriber } = this.state
    const {
      personalAccount: { SubscriberFullInfo, SubscriberId, BillingBranchId: branchId }
    } = personalAccountState
    const { BillingBranchId: factualBranchId } = whoIsIt ?? {}
    const { SubscriberTypeId } = SubscriberFullInfo?.SubscriberInfo ?? {}
    const categoryId = selectedCategory ? selectedCategory.CategoryId : selectedCategory

    if (formData && Object.keys(formData).length) {
      const { sender, message, date, IgnorePeriodOfSilence, IgnoreAdvertisingAgreement } = formData
      let utsMoscowTime = null

      const isCommentTextChanged = selectedTemplate ? selectedTemplate.Text !== message : true
      const Text = isCommentTextChanged ? message : undefined

      const dateString = date && date.format()
      const dateMoment = dateString && momentTZ.tz(dateString, 'Europe/Moscow')
      const utcTimeShift = 3 + TimeShift
      utsMoscowTime = dateMoment && dateMoment.subtract(utcTimeShift, 'hours') // msk utc

      const data = {
        Msisdn: msisdnSubscriber,
        PlannedDate: utsMoscowTime && utsMoscowTime.format('YYYY-MM-DDTHH:mm:ss'),
        TemplateId: selectedTemplate ? selectedTemplate.Id : '',
        BillingBranch: this.isLeonMode ? factualBranchId : branchId,
        SenderSms: sender,
        IgnoreAdvertisingAgreement: IgnoreAdvertisingAgreement,
        IgnorePeriodOfSilence: IgnorePeriodOfSilence,
        ScriptInforming: 100000004,
        Text,
        ApplyParams: {
          msisdn: msisdnSubscriber
        },
        CreateInteractionParams: {
          SubscriberId: SubscriberId,
          SubscriberTypeId: SubscriberTypeId,
          ReasonId: selectedReason.ReasonId || null,
          CategoryId: selectedCategory ? categoryId : null,
          HandlingId: handlingState && handlingState.Id,
          CommentTemplateId: commentTemplate.CommentTemplateId,
          CommentTemplateName: commentTemplate.CommentTemplateName,
          CommentText: commentTemplate.CommentText
        }
      }

      this.setState({ smsFormData: data })
      sendSms(data)
    } else {
      sendSms(this.state.smsFormData)
    }
  }

  onCancelSms = () => {
    const { cancelSms, smsStatus, handlingState } = this.props
    const { msisdnSubscriber } = this.state
    const { MessageId, CrmMessageId } = smsStatus

    cancelSms({
      MessageId,
      CrmMessageId,
      Msisdn: msisdnSubscriber,
      HandlingId: handlingState?.Id
    })
    this.onRemoveSmsRequest()
  }

  onRemoveSmsRequest = () => {
    const { selectTemplate, selectReasonCategory, resetSms, filterTemplates, filterReasons } = this.props

    selectTemplate({ template: null })
    selectReasonCategory({ reason: null, category: null })
    filterTemplates({ field: 'templateName', value: '' })
    filterReasons({ field: 'reasonName', value: '' })
    resetSms()

    this.setState({
      commentTemplate: null,
      selectedReason: null
    })
  }

  onCommentTemplateChange = commentTemplateId => {
    const { reasonCategoryCommentTemplates, changeCommentTemplate } = this.props

    if (commentTemplateId) {
      const commentTemplate = reasonCategoryCommentTemplates.find(item => item.TemplateId === commentTemplateId)
      const { TemplateId, TemplateName, TemplateText } = commentTemplate

      changeCommentTemplate({
        CommentId: TemplateId,
        CommentName: TemplateName,
        CommentText: TemplateText
      })
      this.setState({
        commentTemplate: {
          CommentTemplateId: TemplateId,
          CommentTemplateName: TemplateName,
          CommentText: TemplateText
        }
      })
    } else {
      changeCommentTemplate({
        CommentId: null,
        CommentName: '',
        CommentText: ''
      })
      this.setState({
        commentTemplate: {
          CommentTemplateId: null,
          CommentTemplateName: '',
          CommentText: ''
        }
      })
    }
  }

  onCommentTemplateTextChange = commentTemplateText => {
    this.setState({
      commentTemplate: {
        ...this.state.commentTemplate,
        CommentText: commentTemplateText
      }
    })
  }

  onChangeHandler = value => {
    this.setState({ msisdnSubscriber: value })
  }

  onPasteHandler = value => {
    this.setState({ msisdnSubscriber: value })
  }

  onClickRemove = () => {
    this.setState({ msisdnSubscriber: '' })
  }

  style = { height: '100%' }

  isLeonMode = this.props.cardMode === cardModes.leon

  render () {
    const {
      senders,
      periodOfSilence,
      selectedTemplate,
      selectedReason,
      selectedCategory,
      smsStatus,
      personalAccountState,
      smsTextEditRights,
      reasonCategoryCommentTemplates,
      msisdnEditRights,
      filterReasons,
      fetchTemplates,

      topSmsTemplates,
      isTopSmsTemplatesLoading,
      fetchTopSmsTemplates,
      initialReasons
    } = this.props

    const { smsFormData, isTreeReasonsToggled, commentTemplate, msisdnSubscriber, isSmsSendingTemplatesToggled } =
      this.state

    const isSmsSuccess = smsStatus && smsStatus.IsSuccess
    const isAdvertisingAllowed = get(personalAccountState, 'personalAccount.AdvertisingAgreement')
    const isReasonCategoryCommentTemplates = !!(selectedReason && selectedCategory && selectedTemplate)

    const noTemplatedComments = !isReasonCategoryCommentTemplates && selectedCategory && !selectedCategory.IsCommentFree

    const isCommentsTemplates = reasonCategoryCommentTemplates.length
    const isCommentText = commentTemplate && commentTemplate.CommentText
    let isTemplateRequired =
      !noTemplatedComments && isCommentsTemplates && commentTemplate && !commentTemplate.CommentTemplateId
    const disableTemplate = !noTemplatedComments && isCommentsTemplates

    const isReasonCategorySelected = !!selectedReason && !!selectedCategory

    if (selectedCategory && selectedCategory.IsCommentFree) {
      isTemplateRequired = !isCommentText
    }

    return (
      <Wrapper id='sendingForm'>
        <SmsFormHeader>
          <MsisdnSubscribers
            onChange={this.onChangeHandler}
            onPaste={this.onPasteHandler}
            onClickRemove={this.onClickRemove}
            msisdn={msisdnSubscriber}
            msisdnEditRights={msisdnEditRights}
          />
          <Spin spinning={isTopSmsTemplatesLoading || !initialReasons.length}>
            <TopSmsTemplates
              toggleSmsSendingTemplates={this.toggleSmsSendingTemplates}
              isSmsSendingTemplatesToggled={isSmsSendingTemplatesToggled}
              fetchTemplates={fetchTemplates}
              topSmsTemplates={topSmsTemplates}
              fetchTopSmsTemplates={fetchTopSmsTemplates}
            />
          </Spin>
        </SmsFormHeader>
        {!isSmsSuccess && (
          <div style={this.style}>
            <SmsSendingTemplatesTree
              isTableToggled={isSmsSendingTemplatesToggled}
              toggleTable={this.toggleSmsSendingTemplates}
            />
            <SmsReasonCategory
              hidden={!isReasonCategorySelected}
              selectedReasonCategory={
                isReasonCategorySelected && `${selectedReason.ReasonName} - ${selectedCategory.CategoryName}`
              }
            />
            {isReasonCategoryCommentTemplates && (disableTemplate || selectedCategory.IsCommentFree) && (
              <SmsSendingCommentTemplates
                isTemplateRequired={isTemplateRequired}
                commentTemplate={commentTemplate}
                isCommentFree={selectedCategory.IsCommentFree}
                reasonCategoryCommentTemplates={reasonCategoryCommentTemplates}
                onCommentTemplateChange={this.onCommentTemplateChange}
                onCommentTemplateTextChange={this.onCommentTemplateTextChange}
                disableTemplate={disableTemplate}
              />
            )}
            {!isTreeReasonsToggled && (
              <SmsSendingForm
                senders={senders}
                periodOfSilence={periodOfSilence}
                onSendSms={this.onSendSms}
                onRemoveSmsRequest={this.onRemoveSmsRequest}
                isReasonCategoryCommentTemplates={reasonCategoryCommentTemplates.length !== 0}
                smsStatus={smsStatus}
                selectedTemplate={selectedTemplate}
                selectedCategory={selectedCategory}
                filterReasons={filterReasons}
                smsTextEditRights={smsTextEditRights}
                isAdvertisingAllowed={isAdvertisingAllowed}
                selectedReason={selectedReason}
                commentTemplate={commentTemplate}
              />
            )}
          </div>
        )}
        {isSmsSuccess && (
          <SuccessRequestPage
            onRemoveSmsRequest={this.onRemoveSmsRequest}
            isDateOfSend={!!smsFormData.PlannedDate}
            onCancelSms={this.onCancelSms}
            numbers={[msisdnSubscriber]}
          />
        )}
      </Wrapper>
    )
  }
}

export default SmsSendingPanel

const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
`

const SmsFormHeader = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  > :first-child {
    flex: 0 1 25%;
  }
  > :last-child {
    flex: 0 1 75%;
  }
`
