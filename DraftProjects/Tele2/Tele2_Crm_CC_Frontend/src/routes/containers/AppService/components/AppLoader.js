import React from 'react'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'

export default function AppLoader () {
  return (
    <ContentLoaderWrapper>
      <ContentLoader />
    </ContentLoaderWrapper>
  )
}

const ContentLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const ContentLoader = styled(LoadingOutlined)`
  font-size: 24px;
  color: #44caff;
`
