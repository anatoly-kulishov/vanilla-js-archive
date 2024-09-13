/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import PropTypes from 'prop-types'

import CardNew from 'components/Card'
import CommentsFilter from './components/CommentsFilter'
import CommentsTable from './components/CommentsTable'
import CommentsModal from '../CommentsModal/'
import LoadingSpinner from 'components/LoadingSpinner'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import RatingMenu from 'containers/RatingMenu'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
const { commentsFeatureId } = ratingFeatureIds

class Comments extends Component {
  static propTypes = {
    getComments: PropTypes.func,
    personalAccountState: PropTypes.object,
    commentsState: PropTypes.object,
    queryParamsState: PropTypes.object,
    changeCommentModalVisibility: PropTypes.func,
    location: PropTypes.object,
    handlingId: PropTypes.number,
    isCommentsPermission: PropTypes.bool,
    isWebSellerView: PropTypes.bool
  }

  state = {
    msisdn: null,
    tableValue: null,
    typeIds: [],
    hasPopup: false,
    target: 0,
    isPopup: false,
    typeId: 1,
    subject: '',
    text: ''
  }

  componentDidMount () {
    const {
      getComments,
      personalAccountState: {
        personalAccount: { Msisdn, ClientId, SubClientId, BillingBranchId }
      },
      isWebSellerView
    } = this.props

    if (isWebSellerView) {
      this.setState({ typeIds: [2] })
    }

    getComments({
      clientId: ClientId,
      subClientId: SubClientId,
      msisdn: Msisdn,
      branchId: BillingBranchId
    })
  }

  componentWillMount () {
    const {
      commentsState: { isCommentsLoading, comments }
    } = this.props
    if (!isCommentsLoading && comments) {
      this.setState({
        tableValue: comments
      })
    }
  }

  onFiltersChange = filters => {
    this.setState({ ...filters })
  }

  getFilteredComments = () => {
    const {
      commentsState: { isCommentsLoading, comments }
    } = this.props
    const { typeIds, hasPopup } = this.state
    if (!isCommentsLoading && comments) {
      return comments.filter(comment => {
        return (typeIds.length ? typeIds.includes(comment.AppointmentType) : true) && (hasPopup ? comment.Popup : true)
      })
    } else {
      return comments
    }
  }

  addComment = () => {
    const {
      queryParamsState: { queryParams },
      changeCommentModalVisibility
    } = this.props

    changeCommentModalVisibility()
    this.setState({
      msisdn: queryParams.msisdn
    })
  }

  renderComments = () => {
    const {
      commentsState: { isCommentsLoading },
      personalAccountState: { isPersonalAccountLoading },
      isWebSellerView
    } = this.props
    const { typeIds, hasPopup } = this.state

    const loadingIcon = <LoadingSpinner spin />

    return (
      <Spin spinning={isCommentsLoading || isPersonalAccountLoading} indicator={loadingIcon}>
        <CommentsFilter typeIds={typeIds} hasPopup={hasPopup} onFiltersChange={this.onFiltersChange} />
        <CommentsTable comments={this.getFilteredComments()} isWebSellerView={isWebSellerView} />
      </Spin>
    )
  }

  render () {
    const { location, handlingId, isCommentsPermission } = this.props

    const serviceAddition = [
      shouldRate(commentsFeatureId) && { content: <RatingMenu currentFeatureId={commentsFeatureId} /> },
      isCommentsPermission && { content: 'Добавить комментарий', onClick: this.addComment }
    ]

    return (
      <CommentsCard>
        <CardNew
          header={'Комментарии'}
          additional={handlingId && serviceAddition}
          content={this.renderComments()}
          location={location}
        />
        <CommentsModal />
      </CommentsCard>
    )
  }
}

export default Comments

const CommentsCard = styled.div`
  margin-bottom: 15px;
`
