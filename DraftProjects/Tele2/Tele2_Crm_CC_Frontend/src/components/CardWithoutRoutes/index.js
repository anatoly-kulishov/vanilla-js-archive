/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import PropTypes from 'prop-types'

import LoadingSpinner from 'components/LoadingSpinner'

class CardWithoutRoutes extends Component {
  static propTypes = {
    menuItems: PropTypes.object,
    openTab: PropTypes.func,
    redirect: PropTypes.func,
    cardHeader: PropTypes.object,
    contentLoader: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {
      clickedItem: 0
    }
  }

  renderContent () {
    const { menuItems, openTab } = this.props
    return menuItems && menuItems[openTab] && menuItems[openTab].component
  }

  renderMenuItems () {
    const { menuItems, openTab, redirect } = this.props

    return (
      menuItems &&
      menuItems.map((item, index) => {
        return (
          <CardItem
            key={index}
            isActive={openTab === index}
            onClick={() => {
              redirect(index)
            }}
          >
            <CardItemText>{item.text}</CardItemText>
          </CardItem>
        )
      })
    )
  }

  render () {
    const { cardHeader, contentLoader } = this.props

    return (
      <Wrapper>
        <CardTop>
          <Header>
            <HeaderText>{cardHeader}</HeaderText>
          </Header>
          {this.renderMenuItems()}
        </CardTop>
        <Spin spinning={contentLoader} indicator={<LoadingSpinner spin />}>
          <Content>{this.renderContent()}</Content>
        </Spin>
      </Wrapper>
    )
  }
}

export default CardWithoutRoutes

const Wrapper = styled.div`
  margin-right: 30px;
`

const CardTop = styled.ul`
  padding: 0;
  font-family: T2_Rooftop_Regular;
  list-style-type: none;
  background-color: white;
  width: 100%;
  overflow: hidden;
  margin-bottom: 0;
`

const Header = styled.li`
  float: left;
  margin: 0;
  padding-left: 21px;
  padding-right: 9px;
  text-align: center;
  height: 46px;
`

const HeaderText = styled.label`
  display: block;
  color: black;
  text-align: center;
  margin-top: 13px;
  margin-bottom: 15px;
  margin-right: 10px;
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
`

const Content = styled.div`
  background-color: white;
`

const CardItem = styled.div`
  float: left;
  background-color: ${props => (props.isActive === true ? '#3fcbff' : 'white')};
  color: ${props => (props.isActive === true ? 'white' : 'black')};

  @media (max-width: 650px) {
    display: none;
  }

  &:hover {
    color: #40bfee;
  }
`

const CardItemText = styled.label`
  display: block;
  text-align: center;
  padding: 16px 10px;
  text-decoration: none;
  font-weight: normal;
  margin: 0;
`
