import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import qs from 'query-string'
import { useLocation } from 'react-router-dom'
import FeedbackModal from 'containers/FeedbackModal'

import TwinspotHeader from '../TwinspotHeader'

export default function TwinspotLayout ({ children, ...rest }) {
  const {
    queryParams: { clientId, branchId, conversationId },
    passQueryParams,
    isFeedbackModalVisible
  } = rest

  const { search, hash } = useLocation()

  useEffect(() => {
    document.title = `TWSP: ${conversationId}`
  }, [conversationId])

  useEffect(() => {
    const params = { ...qs.parse(search + hash) }
    if (!(clientId && branchId) || conversationId) {
      passQueryParams(params)
    }
  }, [clientId, branchId, conversationId])

  return (
    <Fragment>
      {isFeedbackModalVisible && <FeedbackModal />}
      <HeaderWrapper>
        <TwinspotHeader />
      </HeaderWrapper>
      {children}
    </Fragment>
  )
}

TwinspotLayout.propTypes = {
  children: PropTypes.object
}

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1001;
`
