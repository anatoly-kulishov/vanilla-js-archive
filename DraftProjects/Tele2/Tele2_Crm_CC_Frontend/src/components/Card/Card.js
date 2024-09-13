import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import { Spin } from 'antd'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import LoadingSpinner from '../LoadingSpinner'

const Card = props => {
  const {
    header,
    content,
    additional,
    isContentLoading = false,
    menu,
    onMenuItemClick,
    isHeaderLimited,
    isNotColored,
    defaultHidden,
    isWidgetsMargin,
    flex,
    isForbiddenMode = false
  } = props

  const location = useLocation()

  const [hiddenContent, setHiddenContent] = useState(isForbiddenMode)
  const [defaultHiddenState, setDefaultHiddenState] = useState(isForbiddenMode)

  useEffect(() => {
    if (isForbiddenMode) {
      setDefaultHiddenState(true)
      setHiddenContent(true)
      return
    }

    if (defaultHidden !== defaultHiddenState) {
      setDefaultHiddenState(defaultHidden)
      setHiddenContent(defaultHidden)
    }
  }, [isForbiddenMode, defaultHidden])

  const handleHideContent = useCallback(() => {
    setHiddenContent(prevValue => !prevValue)
  }, [])

  const handleItemClick = useCallback(index => () => onMenuItemClick ? onMenuItemClick(index) : null)

  const handleAdditionalClick = useCallback(item => () => item.onClick(item), [])

  const getToPath = useCallback(
    item => {
      return { pathname: item.path, search: location.search }
    },
    [menu, location]
  )

  return (
    <Wrapper isWidgetsMargin={isWidgetsMargin} flex={flex}>
      <Spin spinning={isContentLoading} indicator={<LoadingSpinner spin />}>
        <CardTop isHiddenContent={hiddenContent}>
          <div>
            <Header isHeaderLimited={isHeaderLimited} onClick={!isForbiddenMode ? handleHideContent : undefined}>
              <HeaderText isDisabled={isForbiddenMode}>{header}</HeaderText>
            </Header>
            {!isForbiddenMode &&
              menu?.map((item, index) => (
                <CardItem key={item.path} to={getToPath(item)} onClick={handleItemClick(index)}>
                  <CardItemText>{item.text}</CardItemText>
                </CardItem>
              ))}
          </div>
          {!isForbiddenMode &&
            additional?.map(
              (item, index) =>
                item && (
                  <AdditionalItem
                    centered={item.centered}
                    key={index}
                    onClick={item.onClick && !item?.disabled ? handleAdditionalClick(item) : null}
                  >
                    <AdditionalItemText
                      isText={item.content?.length}
                      isSearchBar={item.isSearchBar}
                      disabled={item?.disabled}
                    >
                      {item.content}
                    </AdditionalItemText>
                  </AdditionalItem>
                )
            )}
        </CardTop>
        <Content isNotColored={isNotColored} hidden={hiddenContent}>
          {content}
        </Content>
      </Spin>
    </Wrapper>
  )
}

export default Card

Card.propTypes = {
  menu: PropTypes.array,
  onMenuItemClick: PropTypes.func,
  header: PropTypes.string,
  content: PropTypes.object,
  additional: PropTypes.array,
  isContentLoading: PropTypes.bool,
  isHeaderLimited: PropTypes.bool,
  isNotColored: PropTypes.bool,
  defaultHidden: PropTypes.bool,
  isWidgetsMargin: PropTypes.bool
}

const Wrapper = styled.div`
  margin-right: ${({ isWidgetsMargin }) => (isWidgetsMargin ? '5px' : '30px')};
  margin-bottom: ${({ isWidgetsMargin }) => (isWidgetsMargin ? '0' : '20px')};
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.05);
  border-radius: 10px;
  flex: ${({ flex }) => flex ?? 1};
  background: ${({ isNotColored }) => (isNotColored ? 'unset' : 'white')};
`

const CardTop = styled.ul`
  padding: 0;
  font-family: T2_Rooftop_Regular;
  list-style-type: none;
  background-color: white;
  width: 100%;
  overflow: hidden;
  margin-bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  ${({ isHiddenContent }) => isHiddenContent && 'border-radius: 10px;'}
`

const Header = styled.li`
  float: left;
  margin: 0;
  padding-left: 21px;
  padding-right: 9px;
  text-align: center;
  min-height: 53px;
  display: flex;
  cursor: pointer;
  max-width: ${props => (props.isHeaderLimited ? '210px' : '')};
  text-align: ${props => (props.isHeaderLimited ? 'left' : 'center')};
`

const HeaderText = styled.label`
  display: block;
  color: ${({ isDisabled }) => !isDisabled ? 'black' : 'grey'};
  margin-top: 13px;
  margin-bottom: 15px;
  margin-right: 10px;
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
  cursor: ${({ isDisabled }) => !isDisabled ? 'pointer' : 'not-allowed'};
`
const AdditionalItem = styled.li`
  float: right;
  margin: 0;
  > * {
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  }
`

const AdditionalItemText = styled.label`
  display: block;
  color: black;
  text-align: center;
  margin: ${props => (props.isSearchBar ? '11px' : '16px 10px')};
  text-decoration: none;
  font-weight: normal;
  border-bottom: ${props => (props.isText ? '1px solid rgb(127, 130, 133);' : '0')};
  padding-bottom: 1px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 'default')};

  > * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'cursor')};
  }

  &:hover {
    color: black;
    border-bottom: ${props => (props.isText ? '1px solid  #40BFEE;' : '0')};
  }
`
const Content = styled.div`
  background-color: ${({ isNotColored }) => (isNotColored ? 'unset' : 'white')};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`
const CardItem = styled(NavLink)`
  float: left;
  background-color: white;
  color: black;

  &.active {
    color: white;
    background-color: #3fcbff;
  }

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
  :hover {
    cursor: pointer;
  }
`
