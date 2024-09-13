import React, { Component } from 'react'
import loadable from '@loadable/component'
import styled from 'styled-components'
import moment from 'moment'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import Tabs from './components/Tabs'
import RatingMenu from 'containers/RatingMenu'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { RIGHT_MODAL } from 'constants/logModalNames'

const Sms = loadable(() =>
  import(/* webpackChunkName: "Sms" */ './components/SmsSendingPanel')
)
const Reasons = loadable(() =>
  import(/* webpackChunkName: "Reasons" */ './components/ReasonsRegisterPanel')
)

const {
  reasonCategoryFeatureId,
  smsSendingFeatureId
} = ratingFeatureIds

class RightModal extends Component {
  static propTypes = {
    user: PropTypes.object,
    changeTab: PropTypes.func,
    isToggled: PropTypes.bool,
    toggleRap: PropTypes.func,
    activeTab: PropTypes.string,
    fetchIrregularWords: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      isDataWithMsisdnFetched: false
    }
  }

  componentDidMount () {
    const { user } = this.props

    this.checkIrregularsInLocalStorage()

    if (user.Permissions && user.Permissions.length) {
      let msisdnEditRights = false
      let smsTextEditRights = false

      user.Permissions.map(permission => {
        if (permission === 'SMS:EditMsisdn') msisdnEditRights = true
        if (permission === 'SMS:EditText') smsTextEditRights = true
      })

      this.setState({
        msisdnEditRights,
        smsTextEditRights
      })
    }
  }

  componentDidUpdate = prevProps => {
    const { isToggled, activeTab } = this.props
    if (prevProps.isToggled === false && isToggled === true) {
      logIfEnabled({ type: MODAL_OPEN, log: `${RIGHT_MODAL}/${activeTab}` })
    } else if (prevProps.isToggled === true && isToggled === false) {
      logIfEnabled({ type: MODAL_CLOSE, log: `${RIGHT_MODAL}/${activeTab}` })
    }
  }

  checkIrregularsInLocalStorage = () => {
    const { fetchIrregularWords } = this.props
    const searchingIrregularsDictionary = JSON.parse(localStorage.getItem('searchingIrregularsDictionary'))
    const areIrregularsActual =
      searchingIrregularsDictionary && moment().diff(searchingIrregularsDictionary.date, 'hours') < 1
    if (!areIrregularsActual) {
      fetchIrregularWords()
    }
  }

  onChangeTab = tabName => {
    this.props.changeTab({ section: tabName })
  }

  render () {
    const { isToggled, toggleRap, activeTab } = this.props

    const { smsTextEditRights, msisdnEditRights } = this.state

    const modalProps = {
      visible: isToggled,
      mask: false,
      maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.10)' },
      footer: null,
      onCancel: () => toggleRap({ section: activeTab })
    }

    return (
      <ModalWrapper {...modalProps} isScroll={activeTab === 'sms'}>
        <Wrapper isToggled={isToggled} isReasonsTab={activeTab === 'reasons'}>
          <Tabs activeTab={activeTab} onChangeTab={this.onChangeTab} />
          <RatingWrapper>
            <RatingMenu currentFeatureId={activeTab === 'sms' ? smsSendingFeatureId : reasonCategoryFeatureId} />
          </RatingWrapper>
          {activeTab === 'sms' ? (
            <Sms
              isToggled={activeTab === 'sms'}
              smsTextEditRights={smsTextEditRights}
              msisdnEditRights={msisdnEditRights}
            />
          ) : (
            <Reasons isToggled={activeTab === 'reasons'} />
          )}
        </Wrapper>
      </ModalWrapper>
    )
  }
}

export default RightModal

const ModalWrapper = styled(Modal)`
  position: absolute;
  padding: 0;
  left: 13.5vw;
  width: 60vw !important;
  top: 110px;

  & .ant-modal-content {
    overflow: ${props => (props.isScroll ? 'auto' : 'hidden')};
  }

  & .ant-modal-body {
    padding: 0;
  }
`

const Wrapper = styled.div`
  height: calc(100vh - 110px);
  background-color: #fff;
  padding: ${props => (props.isReasonsTab ? '25px 0 0' : '25px 15px 0 25px')};
`

const RatingWrapper = styled.div`
  position: absolute;
  top: 17px;
  right: 62px;
  z-index: 2;
`
