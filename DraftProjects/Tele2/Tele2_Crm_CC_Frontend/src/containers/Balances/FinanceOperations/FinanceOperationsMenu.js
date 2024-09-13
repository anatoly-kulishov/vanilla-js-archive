/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Menu } from 'antd'
import { object, string, func } from 'prop-types'
import { compensationsMethods } from 'constants/compensations'
import { ShoppingOutlined, CreditCardOutlined, GiftOutlined, SwapOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import useWindowSize from 'hooks/useWindowSize'

const { Item } = Menu

export default function FinanceOperationsMenu (props) {
  const {
    setCurrentCompensationMethod,
    currentCompensationMethod,
    compensationRights,
    compensationsAvailability
  } = props

  const { width } = useWindowSize()

  const [isMenuCollapsed, setMenuCollapsed] = useState(false)

  useEffect(() => {
    if (width <= 1366) {
      setMenuCollapsed(true)
    } else {
      setMenuCollapsed(false)
    }
  }, [width])

  const menuItems = useMemo(() => {
    const items = [
      {
        title: 'Компенсационные промокоды',
        description: 'Бонусы SMS/Mb/Минут',
        Icon: <GiftOutlined />,
        key: compensationsMethods.promocode,
        isDisabled: compensationsAvailability.isPromocodesDisabled,
        rights: compensationRights.isPromocodeCompensationAvailable
      },
      {
        title: 'Компенсационные пакеты',
        description: 'Бонусы SMS/Mb/Минут',
        Icon: <ShoppingOutlined />,
        key: compensationsMethods.package,
        isDisabled: compensationsAvailability.isPackagesDisabled,
        rights: compensationRights.isPackageCompensationAvailable
      },
      {
        title: 'Компенсационные платежи',
        description: 'На административный баланс клиента',
        Icon: <CreditCardOutlined />,
        key: compensationsMethods.enrollment,
        isDisabled: compensationsAvailability.isEnrollmentDisabled,
        rights: compensationRights.isMonetaryCompensationAvailable
      },
      {
        title: 'Корректировка платежей',
        description: 'Между абонентами',
        Icon: <SwapOutlined />,
        key: compensationsMethods.adjustment,
        isDisabled: false,
        rights: compensationRights.isAdjustmentPaymentAvailable
      }
    ]
    return items.filter(item => item.rights)
  }, [compensationRights, compensationsAvailability])

  const handleSelect = useCallback(
    ({ key }) => {
      setCurrentCompensationMethod(key)
    },
    [setCurrentCompensationMethod]
  )

  return (
    <Menu
      selectedKeys={[currentCompensationMethod]}
      mode='inline'
      inlineCollapsed={isMenuCollapsed}
      onSelect={handleSelect}
    >
      {menuItems.map(menuItem => {
        const { Icon, title, description, key, isDisabled } = menuItem
        return (
          <MenuItem key={key} title={title} icon={Icon} disabled={isDisabled}>
            <ItemTitle>{title}</ItemTitle>
            <ItemSubTitle>{description}</ItemSubTitle>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

FinanceOperationsMenu.propTypes = {
  setCurrentCompensationMethod: func.isRequired,
  currentCompensationMethod: string,
  compensationRights: object.isRequired,
  compensationsAvailability: object.isRequired
}

const MenuItem = styled(Item)`
  display: flex;
  align-items: center;
  [role='img'] {
    font-size: 22px !important;
  }
`

const ItemTitle = styled.h4`
  line-height: initial;
  margin-bottom: 0;
`

const ItemSubTitle = styled(ItemTitle)`
  color: rgba(0, 0, 0, 0.45);
`
