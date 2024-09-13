import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { isEmpty } from 'lodash'

import TextAreaWithCounter from 'components/TextAreaWithCounter'
import LoadingSpinner from 'components/LoadingSpinner'
import ProblemNumbers from './ProblemNumbers'
import { MassProblemMsisdnStatusProps } from 'constants/massProblems'

class MassProblemPopoverContent extends PureComponent {
  static propTypes = {
    value: PropTypes.object.isRequired,
    handlingId: PropTypes.number,
    registerMtpNote: PropTypes.func.isRequired,
    isNoteCreating: PropTypes.bool,
    clientId: PropTypes.number.isRequired,
    billingBranchId: PropTypes.number.isRequired,
    msisdn: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subscriberId: PropTypes.number.isRequired,
    subscriberStatus: PropTypes.string.isRequired,
    msisdnStatusArray: PropTypes.arrayOf(MassProblemMsisdnStatusProps).isRequired,
    fetchSubscriberInfo: PropTypes.func.isRequired,
    changeMsisdnStatusArray: PropTypes.func.isRequired,
    maxInteractionIssuesMsisdn: PropTypes.number
  }

  state = {
    text: '',
    error: false
  }

  onTextChange = elem => {
    const { value } = this.props

    this.setState({
      text: elem.target.value,
      error: elem.target.value.length <= 0 && value.IsCommentRequired
    })
  }

  onCheckboxChange = _elem => {
    const { checked } = this.state

    this.setState({ checked: !checked })
  }

  handleRegisterNoteMTP = () => {
    const { text, checked } = this.state
    const {
      value,
      registerMtpNote,
      handlingId,
      clientId,
      billingBranchId,
      msisdn,
      email,
      subscriberId,
      subscriberStatus,
      msisdnStatusArray
    } = this.props

    const msisdns = Array.isArray(msisdnStatusArray) && msisdnStatusArray.filter(item => !isEmpty(item)).map(item => item.msisdn)

    if (value.IsCommentRequired) {
      if (text.length <= 0) {
        this.setState({ error: true })
      } else {
        this.setState({ error: false })
        registerMtpNote({
          problemId: value.ProblemId,
          handlingId: handlingId,
          clientId: clientId,
          clientBranchId: billingBranchId,
          msisdn: msisdn,
          email: email,
          subscriberId: subscriberId,
          subscriberBranchId: billingBranchId,
          subscriberTypeId: '',
          subscriberStatus: subscriberStatus,
          clientInteraction: '',
          wishForSms: checked,
          commentForProblem: text,
          IssuesMsisdns: msisdns
        })
      }
    } else {
      registerMtpNote({
        problemId: value.ProblemId,
        handlingId: handlingId,
        clientId: clientId,
        clientBranchId: billingBranchId,
        msisdn: msisdn,
        email: email,
        subscriberId: subscriberId,
        subscriberBranchId: billingBranchId,
        subscriberTypeId: '',
        subscriberStatus: subscriberStatus,
        clientInteraction: '',
        wishForSms: checked,
        commentForProblem: text,
        IssuesMsisdns: msisdns
      })
    }
  }

  render () {
    const { text, error } = this.state
    const {
      value,
      isNoteCreating,
      msisdn,
      fetchSubscriberInfo,
      msisdnStatusArray,
      changeMsisdnStatusArray,
      value: { IsIssuesMsisdnOn: isIssuesMsisdnOn },
      maxInteractionIssuesMsisdn
    } = this.props

    return (
      <Fragment>
        <Spin
          spinning={isNoteCreating}
          indicator={<LoadingSpinner />}
          tip='Регистрируется причина обращения...'
        >
          {value && value.IsCommentRequired && (
            <Fragment>
              <div>{value.CommentDescription}</div>
              <TextAreaWithCounter
                error={error}
                errorText={'Комментарий обязателен!'}
                onChange={this.onTextChange}
                maxLength={120}
                rows={4}
                value={text}
              />
              <ProblemNumbers
                isIssuesMsisdnOn={isIssuesMsisdnOn}
                problem={value}
                msisdn={msisdn}
                handleRegisterNoteMTP={this.handleRegisterNoteMTP}
                fetchSubscriberInfo={fetchSubscriberInfo}
                msisdnStatusArray={msisdnStatusArray}
                changeMsisdnStatusArray={changeMsisdnStatusArray}
                maxInteractionIssuesMsisdn={maxInteractionIssuesMsisdn}
              />
            </Fragment>
          )}
        </Spin>
      </Fragment>
    )
  }
}

export default MassProblemPopoverContent
