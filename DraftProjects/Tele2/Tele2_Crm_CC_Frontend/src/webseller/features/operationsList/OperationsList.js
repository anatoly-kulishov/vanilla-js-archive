import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Menu as DropdownMenu, notification } from 'antd'

import { selectMnpAvailableLoadingStatus, selectPersonalAccount } from 'webseller/features/mpnOrderStepper/selectors'
import { checkHasReplaceSimRights } from 'screens/CommonInformation/helpers/hasReplaceSimRights'
import { CLIENT_ENVIRONMENTS, IDENTIFICATION_LEVELS } from 'webseller/constants/clientCategory'
import { selectSearchParams } from 'webseller/features/webSellerSearch/reducer/selectors'
import { initChangeCodeWordProcess } from 'webseller/features/changeCodeWord/reducer'
import { getMnpAvailableStatus } from 'webseller/features/mpnOrderStepper/actions'
import { initReplaceSimProcess } from 'webseller/features/replaceSim/reducer'
import { clientCategories } from 'constants/personalAccountStrings'
import { SEARCH_PARAMS } from 'webseller/constants/searchParams'
import { checkRights } from 'utils/helpers'
import { getTypeCard } from 'webseller/helpers'
import { selectMnpHandlingData } from 'webseller/features/operationsList/selectors'
import { selectIsWebSeller } from 'webseller/common/user/selectors'
import { selectIsLoadingInitReplaceSim } from '../replaceSim/selectors'

export default function OperationsList ({ user, isDisabled }) {
  const dispatch = useDispatch()

  const isMnpAvailableStatusLoading = useSelector(selectMnpAvailableLoadingStatus)
  const isLoadingInitReplaceSim = useSelector(selectIsLoadingInitReplaceSim)
  const mnpHandlingData = useSelector(selectMnpHandlingData)
  const personalAccount = useSelector(selectPersonalAccount)
  const searchParams = useSelector(selectSearchParams)
  const isWebSeller = useSelector(selectIsWebSeller)

  const hasReplaceSimRights = checkHasReplaceSimRights(user)
  const {
    isAnonymousCard,
    isNonSubscriberCard,
    isLimitedCard,
    isUnionEnv,
    isSubscriberFirstLevelCard,
    isSubscriberSecondLevelCard
  } = getTypeCard(isWebSeller)

  const isDisabledMnpHandling = mnpHandlingData?.OrderId !== null
  const isB2B = searchParams?.[SEARCH_PARAMS.CLIENT_CATEGORY] === clientCategories.B2B

  const handleChangeCodeWordClick = () => {
    const isOneIndentficationLevel = searchParams?.[SEARCH_PARAMS.IDENTIFICATION_LEVEL] === IDENTIFICATION_LEVELS.ONE
    const isUnionEnviroment = searchParams?.[SEARCH_PARAMS.ENVIROMENT] !== CLIENT_ENVIRONMENTS.UNION
    const isB2B = searchParams?.[SEARCH_PARAMS.CLIENT_CATEGORY] === clientCategories.B2B

    if (isB2B && isOneIndentficationLevel && isUnionEnviroment) {
      notification.error({
        message: 'Изменение кодового слова',
        description: 'Кодовое слово на клиенте можно изменить только при входе в карточку по 2 уровню идентификации'
      })
    } else {
      dispatch(initChangeCodeWordProcess())
    }
  }

  const handleCreateMnpRequestClick = () => {
    dispatch(getMnpAvailableStatus({ Msisdn: personalAccount?.Msisdn }))
  }

  const handleReplaceSimClick = () => {
    dispatch(initReplaceSimProcess())
  }

  const operationList = [
    {
      text: 'Изменение кодового слова',
      permissions: ['AS:Seller', 'AS.Codeword:U'],
      conditions: [!(isB2B && isSubscriberFirstLevelCard), !isAnonymousCard, !isNonSubscriberCard, !isLimitedCard],
      onClick: handleChangeCodeWordClick
    },
    {
      text: 'Создать MNP заявку',
      permissions: ['AS:Seller', 'AS.Mnp:C'],
      conditions: [!(isB2B && isSubscriberFirstLevelCard), !isAnonymousCard],
      disabled: isDisabledMnpHandling || isMnpAvailableStatusLoading,
      onClick: handleCreateMnpRequestClick
    },
    {
      text: 'Замена SIM',
      permissions: ['AS:Seller'],
      conditions: [
        (isB2B && isSubscriberFirstLevelCard && isUnionEnv) || (isB2B && isSubscriberSecondLevelCard),
        !isAnonymousCard,
        !isNonSubscriberCard,
        !isLimitedCard
      ],
      disabled: !hasReplaceSimRights || isLoadingInitReplaceSim,
      onClick: handleReplaceSimClick
    }
  ]

  const operationItems = operationList.reduce((acc, operation) => {
    const { permissions, conditions = [] } = operation
    const isAllCorrectConditions = !conditions?.some(condition => !condition)
    const isAllowedToShow = checkRights(user, permissions) && isAllCorrectConditions
    if (isAllowedToShow) {
      acc.push(operation)
    }
    return acc
  }, [])

  return (
    <>
      <Dropdown
        disabled={isDisabled}
        overlay={
          <DropdownMenu>
            {operationItems?.map((item, index) => {
              return (
                <DropdownMenu.Item key={index} onClick={item?.onClick} disabled={item?.disabled}>
                  {item?.text}
                </DropdownMenu.Item>
              )
            })}
          </DropdownMenu>
        }
      >
        <Extra isDisabled={isDisabled}>Операции</Extra>
      </Dropdown>
    </>
  )
}

const Extra = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
  margin-right: 3px;
  color: ${({ isDisabled }) => (!isDisabled ? 'black' : 'grey')};
  cursor: ${({ isDisabled }) => (!isDisabled ? 'pointer' : 'not-allowed')};
`
