import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import WebSellerHeader from '../WebSellerHeader'

export default function WebSellerLayout ({ children, user }) {
  useEffect(() => {
    document.title = `WebSeller`
  }, [])

  return (
    <Fragment>
      <HeaderWrapper>
        <WebSellerHeader />
      </HeaderWrapper>
      <StyledContent>{children}</StyledContent>
    </Fragment>
  )
}

WebSellerLayout.propTypes = {
  children: PropTypes.array,
  user: PropTypes.object
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
