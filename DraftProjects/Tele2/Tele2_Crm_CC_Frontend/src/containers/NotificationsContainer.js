/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, Fragment, useState } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes, { object } from 'prop-types'
import { Button } from 'antd'
import { CloseCircleTwoTone } from '@ant-design/icons'

import { changeVisibilityNotification } from 'reducers/internal/notifications'
import { fetchQuestionaryForRedirectedAbonent } from 'reducers/questionary/questionaryReducer'
import Notification from 'components/NotificationMarker'

const mapStateToProps = state => ({
  hidden: state.internal.notificationsState.hidden,
  notifications: state.internal.notificationsState.notifications,
  pathName: state.internal.notificationsState.pathName,
  personalAccount: state.personalInfo.personalAccountState.personalAccount,
  mnpHandlingData: state.mnp.mnpState.mnpHandlingData
})

const mapDispatchToProps = {
  changeVisibilityNotification,
  fetchQuestionaryForRedirectedAbonent
}

function NotificationsContainer ({
  hidden,
  notifications,
  changeVisibilityNotification,
  personalAccount,
  fetchQuestionaryForRedirectedAbonent,
  mnpHandlingData
}) {
  NotificationsContainer.propTypes = {
    changeVisibilityNotification: PropTypes.func,
    hidden: PropTypes.bool,
    notifications: PropTypes.array,
    personalAccount: PropTypes.shape({
      SubscriberFullInfo: PropTypes.shape({
        SubscriberInfo: PropTypes.shape({
          LoyalityCategoryId: PropTypes.number,
          Msisdn: PropTypes.string
        })
      }),
      Msisdn: PropTypes.string
    }),
    fetchQuestionaryForRedirectedAbonent: PropTypes.func,
    mnpHandlingData: object
  }

  const [isModalToggled, setModalToggled] = useState({})

  useEffect(() => {
    if (mnpHandlingData) {
      fetchQuestionaryForRedirectedAbonent({ documentId: mnpHandlingData?.DocumentId })
    }
  }, [mnpHandlingData])

  const notificationsList =
    notifications &&
    notifications.map(item => {
      const { message, type, ModalComponent, modalProps = {}, description } = item
      const { modalName } = modalProps

      const closeModal = () => {
        setModalToggled({
          ...isModalToggled,
          [modalName]: false
        })
      }

      return (
        <Fragment key={message ?? description}>
          {ModalComponent && (
            <ModalComponent {...modalProps} onCancel={closeModal} isVisible={isModalToggled[modalName]} />
          )}
          <Notification
            personalAccount={personalAccount}
            item={item}
            setModalToggled={setModalToggled}
            type={type}
            isModalToggled={isModalToggled}
          />
        </Fragment>
      )
    })

  return (
    <Fragment>
      {!hidden && notificationsList.length !== 0 && (
        <Wrapper>
          <NotificationWrapper hidden={!notifications.length}>{notificationsList}</NotificationWrapper>
          <CloseButton
            type='primary'
            icon={<CloseCircleTwoTone twoToneColor={'#BDBDBD'} />}
            onClick={changeVisibilityNotification}
          />
        </Wrapper>
      )}
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationsContainer))

const Wrapper = styled.div`
  position: relative;
  margin: 0px 30px 15px 0px;
  display: grid;
  grid-template-columns: auto 40px;
`
const NotificationWrapper = styled.div`
  display: flex;
  flex-direcion: row;
  .ant-alert-with-description .ant-alert-message {
    font-size: 14px;
    font-weight: bold;
    color: black;
  }
  .ant-alert-with-description .ant-alert-description {
    font-size: 14px;
  }
  i {
    top: 8px;
    right: 6px;
  }
`
const CloseButton = styled(Button)`
  height: 100%;
  border-radius: 10px;
  width: 40px;
  justify-self: end;
  background: #eeeeee;
  border-color: #eeeeee;
  :hover {
    background: #eeeeee;
    border-color: #eeeeee;
    box-shadow: 0 0px 10px rgba(32, 33, 36, 0.2);
  }
  transition: box-shadow 0.3s ease-in-out;
`
