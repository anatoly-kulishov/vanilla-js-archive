import React, { Component } from 'react'
import styled from 'styled-components'
import { get, isNil } from 'lodash'
import PropTypes from 'prop-types'

import ReasonsRegisteringReasonsTree from './components/ReasonsRegisteringReasonsTree'
import Interactions from './components/ReasonsRegisteringInteractions/ReasonsRegisteringInteractions'

class Reasons extends Component {
  static propTypes = {
    fetchCompanyMarks: PropTypes.func,
    fetchCompanyMarksForHandling: PropTypes.func,
    clearChangedReasonsCategories: PropTypes.func,
    changeReasonCategory: PropTypes.func,
    personalAccountState: PropTypes.object,
    handling: PropTypes.object,
    createInteraction: PropTypes.func,
    fetchReasonCategoryCommentTemplates: PropTypes.func,
    changedReasonsCategories: PropTypes.func,
    cancelSms: PropTypes.func,
    isToggled: PropTypes.bool,
    reasons: PropTypes.object,
    interactions: PropTypes.object,
    deleteInteraction: PropTypes.func,
    fetchInteractionsCommentTemplates: PropTypes.func,
    clearInteractionsCommentTemplates: PropTypes.func,
    interactionsCommentTemplates: PropTypes.object,
    changeModalVisibility: PropTypes.func,
    selectReasonForTicket: PropTypes.func,
    selectCategoryForTicket: PropTypes.func,
    toggleRap: PropTypes.func,
    editInteractionComment: PropTypes.func,
    fetchInteractions: PropTypes.func,
    rightModal: PropTypes.object,
    getReasonCategoryForEscalation: PropTypes.func,
    rcSearchConnect: PropTypes.func,
    queryParams: PropTypes.shape({
      conversationId: PropTypes.string
    })
  }

  state = {
    isInteractionsFetched: false,
    isDataWithBranchIdFetched: false,
    isDataWithMsisdnFetched: false,
    isCategoriesChecked: false,
    isLteNumberSet: false,
    reasonsState: [],
    selecting: {},
    isReasonsSet: false
  }

  shouldComponentUpdate (nextProps) {
    const { isToggled, activeTab } = this.props.rightModal
    return (
      (isToggled && activeTab === 'reasons') ||
      (nextProps.rightModal.isToggled && nextProps.rightModal.activeTab === 'reasons')
    )
    // Отмена обновлений если модалка смс не открыта
  }

  componentDidMount () {
    const { fetchInteractions, fetchCompanyMarks, fetchCompanyMarksForHandling, rcSearchConnect } = this.props

    fetchInteractions()
    fetchCompanyMarks({ requestType: 0 })
    fetchCompanyMarksForHandling()
    rcSearchConnect()
  }

  componentWillUnmount () {
    this.props.clearChangedReasonsCategories()
  }

  onChangeReasonCategory = (reason, category, field, value) => {
    const {
      changeReasonCategory,
      personalAccountState,
      handling,
      createInteraction,
      fetchReasonCategoryCommentTemplates,
      changedReasonsCategories,
      selectReasonForTicket,
      selectCategoryForTicket,
      queryParams
    } = this.props

    const reasonId = reason.ReasonId
    const categoryId = category.CategoryId
    const changedCategory = get(changedReasonsCategories, [reasonId, categoryId], {})

    const commentTemplate =
      changedCategory.commentTemplates &&
      changedCategory.commentTemplates.find(template => template.TemplateName === changedCategory.tooltipSelectValue)

    if (field === 'createNote') {
      const {
        personalAccount: { SubscriberFullInfo, ClientId, BillingBranchId, Msisdn, Email, SubscriberId }
      } = personalAccountState
      const { SubscriberTypeId, SubscriberStatusId } = SubscriberFullInfo?.SubscriberInfo ?? {}

      const interactionData = {
        handlingId: handling.Id,
        clientId: ClientId,
        clientBranchId: BillingBranchId,
        msisdn: Msisdn,
        email: Email && encodeURIComponent(Email),
        subscriberId: SubscriberId,
        subscriberBranchId: BillingBranchId,
        subscriberTypeId: SubscriberTypeId,
        subscriberStatusId: SubscriberStatusId,
        registeringCaseId: 1,
        reasonId: reason.ReasonId,
        categoryId: categoryId,
        commentTemplateId: commentTemplate ? commentTemplate.TemplateId : '',
        commentTemplateName: commentTemplate ? commentTemplate.TemplateName : '',
        commentText: changedCategory.tooltipCommentValue ? encodeURIComponent(changedCategory.tooltipCommentValue) : '',
        isSystemComment: false
      }

      // Twinspot special params
      if (!isNil(queryParams.conversationId)) {
        interactionData.relationId = queryParams.conversationId
        interactionData.relationType = 'Twinspot'
      }

      createInteraction({ interactionData })
      changeReasonCategory({ reason, category, field: 'commentTemplates', value: undefined })

      if (category.IsEscalationAllowed) {
        selectReasonForTicket({ reason })
        selectCategoryForTicket({ category })
      } else {
        let ticketCategory = reason.Categories.find(item => item.IsEscalationAllowed && categoryId < item.CategoryId)

        if (ticketCategory) {
          selectReasonForTicket({ reason })
          selectCategoryForTicket({ category: ticketCategory })
        } else {
          ticketCategory = reason.Categories.find(item => item.IsEscalationAllowed)

          if (ticketCategory) {
            selectReasonForTicket({ reason })
            selectCategoryForTicket({ category: ticketCategory })
          }
        }
      }
    }

    if (field === 'fetchTemplates') {
      const params = { reasonId, categoryId }
      // Twinspot special params
      if (!isNil(queryParams.conversationId)) {
        params.systemid = 'd41087b7-b902-41c1-a56f-ae9141019c3b'
      }
      fetchReasonCategoryCommentTemplates(params)
    } else {
      changeReasonCategory({ reason, category, field, value })
    }
  }

  onInteractionSmsParameterClick = interaction => {
    const { cancelSms } = this.props
    const { Msisdn, HandlingId, InteractionNoteId, RelationId } = interaction

    cancelSms({
      HandlingId,
      InteractionId: InteractionNoteId,
      Msisdn,
      CrmMessageId: RelationId,
      TechType: 'Interaction',
      TechID: InteractionNoteId
    })
  }

  handleEscalationReasonsAndCategories = (escalationReasonsAndCategories, interactionsToEscalation) => {
    const res = !escalationReasonsAndCategories.find(
      escalationReasonAndCategory =>
        escalationReasonAndCategory.reasonId === interactionsToEscalation.ReasonId &&
        escalationReasonAndCategory.categoryId === interactionsToEscalation.CategoryId
    )
    return res
  }

  render () {
    const {
      isToggled,
      reasons,
      interactions,
      deleteInteraction,
      handling,
      personalAccountState,
      fetchInteractionsCommentTemplates,
      clearInteractionsCommentTemplates,
      interactionsCommentTemplates,
      changeModalVisibility,
      getReasonCategoryForEscalation,
      toggleRap,
      editInteractionComment,
      selectReasonForTicket,
      selectCategoryForTicket
    } = this.props

    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    const rowActions = [
      {
        name: 'Создать заявку',
        handler: (interactions, reason) => {
          let category = []
          const escalationReasonsAndCategories = []
          const interactionsToEscalation =
            interactions &&
            interactions.filter(
              item => item.ReasonId === reason.ReasonId && item.IsEscalationAllowed && !item.RelationId
            )

          interactionsToEscalation.forEach((item, index) => {
            if (index === 0) {
              escalationReasonsAndCategories.push({
                reasonId: item.ReasonId,
                categoryId: item.CategoryId
              })
            } else {
              if (
                this.handleEscalationReasonsAndCategories(
                  escalationReasonsAndCategories,
                  interactionsToEscalation[index]
                )
              ) {
                escalationReasonsAndCategories.push({
                  reasonId: item.ReasonId,
                  categoryId: item.CategoryId
                })
              }
            }
          })
          if (escalationReasonsAndCategories && escalationReasonsAndCategories.length === 1) {
            category = reason.Categories.find(item => item.CategoryId === escalationReasonsAndCategories[0].categoryId)
          } else {
            reason = null
            category = null
          }

          changeModalVisibility()
          reason && selectReasonForTicket({ reason })
          category && selectCategoryForTicket({ category })
          getReasonCategoryForEscalation()
          toggleRap({ section: 'reasons' })
        }
      }
    ]

    // TODO  Прокидывать причину категорию на стадии выбора, а не на стадии создания заявки

    const scrollHeight = interactions && interactions.length ? '75%' : '100%'

    return (
      <Wrapper isToggled={isToggled}>
        <ReasonsRegisteringReasonsTree
          rowActions={rowActions}
          scrollHeight={scrollHeight}
          onChangeReasonCategory={this.onChangeReasonCategory}
        />
        <Interactions
          fetchInteractionsCommentTemplates={fetchInteractionsCommentTemplates}
          clearInteractionsCommentTemplates={clearInteractionsCommentTemplates}
          onInteractionSmsParameterClick={this.onInteractionSmsParameterClick}
          interactionsCommentTemplates={interactionsCommentTemplates}
          personalAccountState={personalAccountState}
          onDeleteInteraction={deleteInteraction}
          editInteractionComment={editInteractionComment}
          interactions={interactions}
          handlingId={handling.Id}
          reasons={reasons}
        />
      </Wrapper>
    )
  }
}

export default Reasons

const Wrapper = styled.div`
  height: calc(100% - 60px);
  background-color: #fff;
  display: ${props => (props.isLoading ? 'flex' : 'block')};
  justify-content: ${props => (props.isLoading ? 'center' : 'flex-start')};
  display: ${props => (props.isToggled ? 'block' : 'none')};
`
