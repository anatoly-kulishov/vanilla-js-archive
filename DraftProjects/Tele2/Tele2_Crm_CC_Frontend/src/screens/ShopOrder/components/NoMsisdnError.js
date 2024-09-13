import React from 'react'
import { Alert } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const NoMsisdnError = () => {
  const location = useLocation()
  const search = location?.search

  const to = `/card/manual-search${search}`

  const description = (
    <>
      <StyledNavLink to={to}>Уточни контактный номер</StyledNavLink> и оформи заказ на нем
    </>
  )

  return <Alert type='error' message='Не задан контактный номер' description={description} showIcon />
}

export default NoMsisdnError

const StyledNavLink = styled(NavLink)`
  color: rgba(0, 0, 0, 0.85);
  text-decoration: underline;

  :hover {
    color: rgba(0, 0, 0, 1);
    text-decoration: underline;
  }
`
