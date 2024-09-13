import React, { Fragment, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import TicketInfoModal from 'containers/TicketInfoModal'
import B2bAbonentModal from 'containers/B2bAbonentModal'
import FeedbackModal from 'containers/FeedbackModal'
import EmptyHeader from '../EmptyHeader'
import NavigationMenu from '../../components/NavigationMenu'
import { layouts } from 'routes/constants/layouts'
import { cardModes } from 'constants/cardModes'

export default function EmptyLayout ({ children, isVisibleTicketInfoModal, isFeedbackModalVisible, user }) {
  useEffect(() => {
    document.title = `CRM: Поиск`
  }, [])

  const notifications = useMemo(() => ({ notifications: [], hidden: false }), [])

  return (
    <Fragment>
      {isVisibleTicketInfoModal && <TicketInfoModal />}
      {isFeedbackModalVisible && <FeedbackModal />}
      <B2bAbonentModal />
      <HeaderWrapper>
        <EmptyHeader />
        <NavigationMenu
          notifications={notifications}
          currentMode={cardModes.unknown}
          currentLayout={layouts.empty}
          user={user}
        />
      </HeaderWrapper>
      <StyledContent>{children}</StyledContent>
    </Fragment>
  )
}

EmptyLayout.propTypes = {
  children: PropTypes.array,
  isVisibleTicketInfoModal: PropTypes.bool,
  isFeedbackModalVisible: PropTypes.bool
}

const StyledContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
`
const HeaderWrapper = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1001;
  margin-bottom: 10px;
`
