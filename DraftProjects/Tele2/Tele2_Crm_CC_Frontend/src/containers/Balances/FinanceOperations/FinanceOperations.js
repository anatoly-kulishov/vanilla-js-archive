import React, { useState, useLayoutEffect, useEffect, useMemo } from 'react'
import { func, object } from 'prop-types'
import styled from 'styled-components'

import { compensationsMethods } from 'constants/compensations'
import { checkRight } from 'utils/helpers'

import FinanceOperationsMenu from './FinanceOperationsMenu'
import Compensations from './Compensations'
import CompensationsMessages from './Compensations/CompensationsMessages'

const FinanceOperations = props => {
  const { validatePaydPostLimit, getCompensationForm, user, compensationsAvailability } = props
  const { isASSeller } = user

  const compensationRights = useMemo(
    () => ({
      isPackageCompensationAvailable: isASSeller ? true : checkRight(user, 'CC:PackageCompensationAvailable'),
      isMonetaryCompensationAvailable: isASSeller ? false : checkRight(user, 'CC:MonetaryCompensationAvailable'),
      isPromocodeCompensationAvailable: isASSeller ? true : checkRight(user, 'CC:PromocodeCompensationAvailable'),
      isAdjustmentPaymentAvailable: isASSeller ? false : checkRight(user, 'CC:AdjustmentPayment')
    }),
    [user]
  )

  const [currentCompensationMethod, setCurrentCompensationMethod] = useState(compensationsMethods.promocode)
  const isMessagesVisible = currentCompensationMethod !== compensationsMethods.adjustment

  useLayoutEffect(() => {
    validatePaydPostLimit()
    getCompensationForm()
  }, [])

  useEffect(() => {
    const menuItems = [
      {
        method: compensationsMethods.promocode,
        isAvailable: !compensationsAvailability.isPromocodesDisabled,
        isCheckPermission: compensationRights.isPromocodeCompensationAvailable
      },
      {
        method: compensationsMethods.package,
        isAvailable: !compensationsAvailability.isPackagesDisabled,
        isCheckPermission: compensationRights.isPackageCompensationAvailable
      },
      {
        method: compensationsMethods.enrollment,
        isAvailable: !compensationsAvailability.isEnrollmentDisabled,
        isCheckPermission: compensationRights.isMonetaryCompensationAvailable
      },
      {
        method: compensationsMethods.adjustment,
        isAvailable: true,
        isCheckPermission: compensationRights.isAdjustmentPaymentAvailable
      },
      {
        method: compensationsMethods.empty,
        isAvailable: true,
        isCheckPermission: true
      }
    ]

    const firstActiveItem = menuItems.find(item => item.isAvailable && item.isCheckPermission)
    setCurrentCompensationMethod(firstActiveItem.method)
  }, [
    compensationsAvailability.isPromocodesDisabled,
    compensationsAvailability.isPackagesDisabled,
    compensationsAvailability.isEnrollmentDisabled
  ])

  return (
    <FinanceOperationsWrapper isDivided={currentCompensationMethod !== compensationsMethods.adjustment}>
      <FinanceOperationsMenu
        compensationRights={compensationRights}
        setCurrentCompensationMethod={setCurrentCompensationMethod}
        currentCompensationMethod={currentCompensationMethod}
        compensationsAvailability={compensationsAvailability}
      />
      <Compensations
        compensationRights={compensationRights}
        setCurrentCompensationMethod={setCurrentCompensationMethod}
        currentCompensationMethod={currentCompensationMethod}
      />
      {isMessagesVisible && <CompensationsMessages currentCompensationMethod={currentCompensationMethod} />}
    </FinanceOperationsWrapper>
  )
}

FinanceOperations.propTypes = {
  user: object.isRequired,
  compensationsAvailability: object.isRequired,
  validatePaydPostLimit: func.isRequired,
  getCompensationForm: func.isRequired
}

const FinanceOperationsWrapper = styled.div`
  display: flex;
  padding-top: 15px;
  > :not(:first-child) {
    flex: 0 1 ${props => (props.isDivided ? '50%' : '100%')};
    padding: 0 26px;
  }
  > :first-child {
    max-width: 325px;
  }
`
export default FinanceOperations
