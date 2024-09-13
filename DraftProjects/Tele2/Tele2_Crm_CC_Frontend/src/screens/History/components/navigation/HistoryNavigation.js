import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom'
import { checkRight } from 'utils/helpers'
import { cardModes } from 'constants/cardModes'

const appealsTabKey = 'appeals'
const applicationsTabKey = 'applications'
const tariffTabKey = 'tariff'
const operatorTabKey = 'operator'
const offersTabKey = 'offers'
const offersCbmTabKey = 'offers-cbm'
const promoTabKey = 'promo'
const servicesTabKey = 'services'
const creditLimitTabKey = 'credit-limit'
const questionaryTabKey = 'questionary'
const mnpKey = 'mnp'
const wargamingKey = 'wargaming'

const commonTabsMap = {
  [appealsTabKey]: {
    id: 0,
    name: 'Причины обращения',
    path: '/appeals',
    cardModes: [cardModes.subscriber, cardModes.leon, cardModes.client, cardModes.anonymous]
  },
  [applicationsTabKey]: {
    id: 1,
    name: 'Заявки',
    path: '/applications',
    cardModes: [cardModes.subscriber, cardModes.leon, cardModes.anonymous]
  },
  [tariffTabKey]: {
    id: 2,
    name: 'Тариф',
    path: '/tariff',
    permission: 'CC:SubscriberTariffHistory',
    cardModes: [cardModes.subscriber]
  },
  [operatorTabKey]: {
    id: 3,
    name: 'SMS от оператора',
    path: '/operator',
    cardModes: [cardModes.subscriber, cardModes.leon, cardModes.anonymous]
  },
  [offersTabKey]: {
    id: 4,
    name: 'Предложения',
    path: '/offers',
    cardModes: [cardModes.subscriber]
  },
  [offersCbmTabKey]: {
    id: 5,
    name: 'Предложения CBM',
    path: '/offers-cbm',
    cardModes: [cardModes.subscriber]
  },
  [promoTabKey]: {
    id: 6,
    name: 'Промокоды',
    path: '/promo',
    permission: 'CC:ReadPromoCodeHistory',
    cardModes: [cardModes.subscriber, cardModes.leon]
  },
  [servicesTabKey]: {
    id: 6,
    name: 'Услуги',
    path: '/services',
    cardModes: [cardModes.subscriber]
  },
  [creditLimitTabKey]: {
    id: 7,
    name: 'Кредитный лимит',
    path: '/credit-limit',
    cardModes: [cardModes.subscriber]
  },
  [questionaryTabKey]: {
    id: 8,
    name: 'Анкеты',
    path: '/questionary',
    cardModes: [cardModes.subscriber, cardModes.leon, cardModes.anonymous]
  },
  [mnpKey]: {
    id: 9,
    name: 'MNP',
    path: '/mnp',
    permission: 'CC:ProtocolMNPHistoryRead',
    cardModes: [cardModes.subscriber, cardModes.leon]
  },
  [wargamingKey]: {
    id: 10,
    name: 'Wargaming',
    path: '/wargaming',
    permission: 'CC:WargamingHistory',
    cardModes: [cardModes.subscriber]
  }
}

const tabsKeysForASSeller = [
  appealsTabKey,
  applicationsTabKey,
  tariffTabKey,
  operatorTabKey,
  offersTabKey,
  offersCbmTabKey,
  servicesTabKey
]

function HistoryNavigation ({ cardMode, user }) {
  HistoryNavigation.propTypes = {
    cardMode: PropTypes.number.isRequired,
    user: PropTypes.object
  }

  const location = useLocation()
  const match = useRouteMatch()

  const { isASSeller } = user

  const tabsList = Object.entries(commonTabsMap)
    .filter(([, tab]) => {
      const { cardModes } = tab
      return cardModes.includes(cardMode)
    })
    .filter(([tabKey, tab]) => {
      if (isASSeller) {
        return tabsKeysForASSeller.includes(tabKey)
      }
      const { permission } = tab
      if (permission) {
        const hasPermission = checkRight(user, permission)
        return hasPermission
      } else {
        return true
      }
    })
    .map(([, tab]) => {
      const { id, name, path } = tab
      const { url } = match
      const { search } = location
      return (
        <TabButton activeClassName='current' id={id} to={url + path + search}>
          {name}
        </TabButton>
      )
    })

  return <Wrapper>{tabsList}</Wrapper>
}

export default HistoryNavigation

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`

const TabButton = styled(NavLink)`
  padding: 16px 10px;
  transition: color 0.1s ease-out, background-color 0.1s ease-out;
  color: black;
  :hover {
    color: #44caff;
  }
  background-color: transparent;
  &.current {
    color: white;
    :hover {
      color: black;
    }
    background-color: #3fcbff;
  }
`
