import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { notification, Spin } from 'antd'
import ManualInfo from './ManualInfo'

const ShopIframe = ({ iframeRef }) => {
  const [isLoading, setLoading] = useState(false)
  const shopOrder = useSelector(state => state.shopOrder.shopOrder)

  useEffect(() => {
    if (shopOrder) {
      setLoading(true)
      const delay = shopOrder?.iFrameDelay * 1000 || 5000
      setTimeout(() => {
        iframeRef.current.src = shopOrder.omsOrderUrl
      }, delay)
    }
  }, [shopOrder])

  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setLoading(false)
    notification.error({
      message: 'Ошибка загрузки интернет-магазина'
    })
  }, [])

  return (
    <Wrapper>
      {shopOrder ? (
        <Spin spinning={isLoading} size='large'>
          <StyledIframe ref={iframeRef} onLoad={handleLoad} onError={handleError} />
        </Spin>
      ) : (
        <ManualInfo />
      )}
    </Wrapper>
  )
}

export default ShopIframe

const Wrapper = styled.div`
  width: 100%;
  height: 576px;

  .ant-spin-nested-loading,
  .ant-spin-container {
    height: 100%;
  }
`

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
