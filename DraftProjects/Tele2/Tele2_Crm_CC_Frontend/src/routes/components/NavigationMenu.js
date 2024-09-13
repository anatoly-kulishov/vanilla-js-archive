/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Dropdown, Menu as DropdownMenu, Row, Col } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { PropTypes } from 'prop-types'

import OperationsList from 'webseller/features/operationsList'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import MnpInfoWidget from 'containers/MnpInfoWidget'
import useWindowSize from 'hooks/useWindowSize'
import RatingMenu from 'containers/RatingMenu'
import { checkRights } from 'utils/helpers'
import featureConfig from 'webseller/featureConfig'

import { getRoutes } from '../constants/routes'
import { layouts } from '../constants/layouts'

const { redesignId } = ratingFeatureIds

export default function NavigationMenu (props) {
  const {
    isDisabled,
    currentLayout,
    currentMode,
    user,
    notifications: { notifications, hidden },
    changeVisibilityNotification,
    isWebSeller
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

  const routesPath = path => {
    if (currentLayout === layouts.twinspot) {
      return layouts.twinspot + path
    }
    return currentLayout + path
  }

  const { search, pathname } = useLocation()

  const { mainMenuItems, extraMenuItems } = useMemo(() => {
    const routes = getRoutes(isWebSeller)

    const menuItems = routes.reduce(
      (acc, route) => {
        const { menu, cardModes, permissions } = route
        const { isExtra, inMenu } = menu

        const isAllowedToShow =
          inMenu &&
          cardModes.includes(currentMode) &&
          checkRights(user, permissions) &&
          !route.conditionals.includes(false)

        if (isAllowedToShow && !isExtra) {
          acc.mainMenuItems.push(route)
        }
        if (isAllowedToShow && isExtra) {
          acc.extraMenuItems.push(route)
        }

        return acc
      },
      { mainMenuItems: [], extraMenuItems: [] }
    )

    if (isMenuCollapsed) {
      menuItems.extraMenuItems = [...menuItems.mainMenuItems.splice(5), ...menuItems.extraMenuItems]
    }

    return menuItems
  }, [user, currentMode, isMenuCollapsed])

  const checkIsActive = path => {
    const firstIndexOfSlash = pathname.indexOf('/', 1)
    const lastIndexOfSlash = pathname.lastIndexOf('/')
    let screenPath = pathname.substring(firstIndexOfSlash, lastIndexOfSlash)
    if (firstIndexOfSlash === lastIndexOfSlash) {
      screenPath = pathname.substring(firstIndexOfSlash)
    }
    return screenPath.includes(path)
  }

  return (
    <Menu>
      {featureConfig.isChangeCodeWord && <OperationsList isDisabled={isDisabled} user={user} />}
      <MainMenu span={18}>
        {mainMenuItems?.map((route, index) => {
          if (isDisabled) {
            return <MenuItemDisabled>{route.text}</MenuItemDisabled>
          }

          return (
            <MenuItem
              disabled={isDisabled}
              key={index}
              activeClassName='current'
              isActive={() => checkIsActive(route.path)}
              to={{ pathname: routesPath(route.path + route.menu.subheader + route.menu.clientSubheader), search }}
            >
              {route.text}
            </MenuItem>
          )
        })}
        {extraMenuItems.length !== 0 && (
          <Dropdown
            disabled={isDisabled}
            overlay={
              <DropdownMenu>
                {extraMenuItems.map((item, index) => (
                  <DropdownMenu.Item key={index}>
                    <NavLink
                      activeClassName='current'
                      to={{ pathname: routesPath(item.path + item.menu.subheader + item.menu.clientSubheader), search }}
                    >
                      {item.text}
                    </NavLink>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu>
            }
          >
            <Extra isDisabled={isDisabled}>Прочее</Extra>
          </Dropdown>
        )}
      </MainMenu>
      <AdditionalMenu span={6}>
        <RatingWrapper>
          <RatingMenu currentFeatureId={redesignId} />
        </RatingWrapper>
        {hidden && (
          <Button shape='circle' type='primary' hidden={!notifications.length} onClick={changeVisibilityNotification}>
            {notifications.length}
          </Button>
        )}
        {currentLayout === layouts.card && <MnpInfoWidget />}
      </AdditionalMenu>
    </Menu>
  )
}

NavigationMenu.propTypes = {
  isDisabled: PropTypes.bool,
  currentLayout: PropTypes.string.isRequered,
  currentMode: PropTypes.number.isRequered,
  user: PropTypes.object,
  notifications: PropTypes.object,
  changeVisibilityNotification: PropTypes.func,
  isWebSeller: PropTypes.bool
}

const Menu = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0px 16px;
  background-color: #fafafa;
`
const MainMenu = styled(Col)`
  width: fit-content;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const AdditionalMenu = styled(Col)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-top: 10px;
  gap: 10px;
`
// TODO: theme
const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 30px;
  margin: 10px 0;
  margin-right: 3px;
  padding: 0px 6px;
  color: black;
  border-radius: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  :hover {
    background-color: #e2e2e3;
    color: black;
  }
  &.current {
    background-color: #cacace;
  }

  transition: color 0.1s ease-out, background-color 0.1s ease-out;
`

const MenuItemDisabled = styled.span`
  display: flex;
  align-items: center;
  height: 30px;
  margin: 10px 0;
  margin-right: 3px;
  padding: 0px 6px;
  color: grey;
  border-radius: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: not-allowed;
  transition: color 0.1s ease-out, background-color 0.1s ease-out;
`

const Extra = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 6px;
  margin-right: 3px;
  color: ${({ isDisabled }) => (!isDisabled ? 'black' : 'grey')};
  cursor: ${({ isDisabled }) => (!isDisabled ? 'pointer' : 'not-allowed')};
`
const RatingWrapper = styled.div`
  border-radius: 10px;
  padding: 5px;
  background-color: #eeeeee;
`
