import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Dropdown, Popconfirm, Popover, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearShopOrder, getShopOrderActions, getShopOrderRegions } from 'reducers/shopOrderReducer'
import ActionsMenu from './ActionsMenu'
import { get } from 'lodash'
import { InfoCircleOutlined } from '@ant-design/icons'

const SimCardOptions = [
  { label: 'sim', value: 'sim' },
  { label: 'eSim', value: 'eSim' }
]

const ShopOrderParams = ({ createShopOrder, iframeRef, onShowManual }) => {
  const dispatch = useDispatch()
  const shopRegions = useSelector(state => state.shopOrder.regions)
  const isRegionsLoading = useSelector(state => state.shopOrder.isRegionsLoading)
  const shopOrder = useSelector(state => state.shopOrder.shopOrder)
  const actions = useSelector(state => state.shopOrder.actions)
  const isShopOrderLoading = useSelector(state => state.shopOrder.isShopOrderLoading)
  const branchId = useSelector(state => state.personalInfo.personalAccountState.personalAccount?.BillingBranchId)
  const [selectedSimType, setSelectedSimType] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const regionsOptions = useMemo(() => {
    const added = new Set()
    const result = []
    shopRegions.forEach(item => {
      if (!added.has(item.branchId)) {
        result.push({ label: item.name, value: item.branchId })
        added.add(item.branchId)
      }
    })
    return result
  }, [shopRegions])

  useEffect(() => {
    dispatch(getShopOrderActions())
  }, [])

  useEffect(() => {
    if (!selectedRegion && shopRegions.length > 0) {
      const region = shopRegions.find(item => item.branchId === branchId?.toString())
      region && setSelectedRegion(region.branchId)
    }
  }, [shopRegions])

  const handleSimChange = useCallback(value => {
    dispatch(getShopOrderRegions({ simType: value }))
    setSelectedSimType(value)
  }, [])

  const handleRegionChange = useCallback(
    value => {
      setSelectedRegion(value)
    },
    [shopRegions]
  )

  const handleContinueClick = useCallback(() => {
    const region = shopRegions.find(region => region.branchId === selectedRegion)
    const actionTypeId = get(actions, '[0].actionTypeId', undefined)
    createShopOrder(region.siteId, actionTypeId, selectedSimType)
  }, [selectedRegion, createShopOrder, shopRegions, actions, selectedSimType])

  const handleActionClick = useCallback(
    actionTypeId => {
      const region = shopRegions.find(region => region.branchId === selectedRegion)
      createShopOrder(region.siteId, actionTypeId, selectedSimType)
    },
    [selectedRegion, createShopOrder, shopRegions, selectedSimType]
  )

  const handleCreateNewOrder = useCallback(() => {
    setSelectedSimType(null)
    setSelectedRegion(null)
    dispatch(clearShopOrder())
  }, [])

  const handleReload = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = shopOrder.omsOrderUrl
    }
  }, [iframeRef, shopOrder])

  const isSimCardDisabled = shopOrder
  const isRegionsDisabled = !selectedSimType || shopOrder || regionsOptions.length < 1

  const renderContinueButton = () => {
    if (actions?.length > 1) {
      return (
        <Dropdown
          trigger={['click']}
          disabled={!selectedRegion}
          overlay={<ActionsMenu actions={actions} onActionClick={handleActionClick} />}
        >
          <Button type='primary' disabled={!selectedRegion} loading={isShopOrderLoading}>
            Продолжить
          </Button>
        </Dropdown>
      )
    } else {
      return (
        <Button type='primary' disabled={!selectedRegion} loading={isShopOrderLoading} onClick={handleContinueClick}>
          Продолжить
        </Button>
      )
    }
  }

  const showManualIcon = Boolean(shopOrder)

  return (
    <Container>
      <StyledSelect
        value={selectedSimType}
        disabled={isSimCardDisabled}
        width='150px'
        placeholder='Тип симкарты'
        options={SimCardOptions}
        onChange={handleSimChange}
      />
      <StyledSelect
        value={selectedRegion}
        disabled={isRegionsDisabled}
        width='200px'
        placeholder={isRegionsLoading ? 'Загрузка регионов...' : 'Регион'}
        options={regionsOptions}
        onChange={handleRegionChange}
      />
      {!shopOrder && renderContinueButton()}
      {shopOrder && (
        <Popconfirm
          title='Вы уверены, что завершили оформление прошлого заказа?'
          okText='Да'
          cancelText='Отмена'
          onConfirm={handleCreateNewOrder}
        >
          <Button type='primary'>Создать еще заказ</Button>
        </Popconfirm>
      )}
      <Button disabled={!shopOrder} onClick={handleReload}>
        Обновить
      </Button>
      {showManualIcon && (
        <Popover placement='bottom' content='Информация по оформлению заказа'>
          <StyledInfoIcon onClick={onShowManual} />
        </Popover>
      )}
    </Container>
  )
}

export default ShopOrderParams

const Container = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledSelect = styled(Select)`
  width: ${props => props.width};
`

const StyledInfoIcon = styled(InfoCircleOutlined)`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.65);
`
