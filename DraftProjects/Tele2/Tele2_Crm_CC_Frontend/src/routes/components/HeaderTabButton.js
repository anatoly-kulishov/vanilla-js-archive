/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

function ButtonContent ({ title, subtitle }) {
  ButtonContent.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
  }

  return <TabButton>
    <Label>{title}</Label>
    {subtitle && <Name>{subtitle}</Name>}
  </TabButton>
}

export default function HeaderTabButton ({ title, subtitle, to, onClick, newTab }) {
  HeaderTabButton.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    to: PropTypes.object,
    onClick: PropTypes.func,
    newTab: PropTypes.bool
  }

  return to ? (
    <Wrapper>
      <NavLink to={to} style={{ height: '100%' }} target={newTab ? '_blank' : '_self'}>
        <ButtonContent title={title} subtitle={subtitle} />
      </NavLink>
    </Wrapper>
  ) : (
    <Wrapper onClick={onClick}>
      <TabButton>
        <Label>{title}</Label>
        {subtitle && <Name>{subtitle}</Name>}
      </TabButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
`

const TabButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  font-weigth: bold;
  white-space: nowrap;
  cursor: pointer;
  border-right: 2px #3a3e46 solid;
  border-left: 2px #3a3e46 solid;
`
const Label = styled.div`
  color: #b1b7c5;
`
const Name = styled.div`
  color: white;
  padding-left: 5px;
`
