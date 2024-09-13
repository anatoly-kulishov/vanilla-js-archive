import React from 'react'
import styled from 'styled-components'

import SubscriberStatus from 'containers/SubscriberStatus'
import { SCROLL_CSS } from 'webseller/helpers/styles'

export default function ChangingParams () {
  return (
    <Container>
      <SubscriberStatus isAdminChangeStatusSubsPermission />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 80%;
  ${SCROLL_CSS}
`
