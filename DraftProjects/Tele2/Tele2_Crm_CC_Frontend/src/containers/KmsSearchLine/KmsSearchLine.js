import React, { useState, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Popover, Input, Button, Row, Col, Spin } from 'antd'
import { debounce } from 'lodash'
import openKms, { handleQueryToKms, openKmsArticle, prepareImages } from 'utils/helpers/kms'
import { COMMON_LAYOUT_ID } from 'constants/kms'
import useKeyPress from 'hocs/useKeyPress'
import HtmlRender from 'components/HtmlRender'

const KmsSearchLine = ({
  children,
  personalAccount,
  handlingId,
  isKmsSearchingLoading,
  kmsSearchingResults: results,
  searchInKms
}) => {
  KmsSearchLine.propTypes = {
    children: PropTypes.node,
    personalAccount: PropTypes.object,
    handlingId: PropTypes.number,
    isKmsSearchingLoading: PropTypes.func,
    kmsSearchingResults: PropTypes.object,
    searchInKms: PropTypes.func
  }
  const inputRef = useRef(null)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [query, setQuery] = useState('')

  const closePress = useKeyPress('Escape', isPopoverVisible)

  const togglePopover = useCallback(isVisible => {
    setIsPopoverVisible(isVisible)
    if (isVisible) {
      setQuery('')
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 300)
    }
  })

  const handleSearch = debounce(
    value => {
      if (value) {
        const BillingBranchId = personalAccount?.BillingBranchId
        let externalFilter = ''
        if (personalAccount) {
          externalFilter = `GF_REGION_dfs:${BillingBranchId}`
        }
        searchInKms({
          query,
          layoutId: COMMON_LAYOUT_ID,
          externalFilter
        })
      }
    },
    500,
    { leading: true, trailing: false }
  )

  const handleEnter = useCallback(() => {
    if (results.query !== query.toLowerCase()) {
      handleSearch(query)
    } else {
      goToKms()
    }
  })

  const goToKms = useCallback(() => {
    const hasResult = results && results.getAnswerQuestion === query.toLowerCase() && results.getAnswerLink.itemId

    if (!query) {
      openKms({ personalAccount, handlingId, isButtonClick: true })
    } else if (hasResult) {
      openKmsArticle(results.getAnswerLink.itemId)
    } else {
      handleQueryToKms(query, handlingId, personalAccount)
    }
  })

  const handleSetQuery = useCallback(elem => setQuery(elem.target.value))

  const hasAnswer = results?.getAnswer && Array.isArray(results.getAnswer) && results?.getAnswerLink.itemId && query === results.query

  useEffect(() => {
    closePress && togglePopover(false)
  }, [closePress])

  return (
    <Popover
      visible={isPopoverVisible}
      color='#3a3e46'
      overlayClassName='kms-popover'
      placement='bottom'
      trigger='click'
      onVisibleChange={togglePopover}
      content={
        <PopoverContent>
          <StyledRow align='middle'>
            <Col flex='auto'>
              <StyledInput
                ref={inputRef}
                value={query}
                placeholder='Искать в KMS'
                onChange={handleSetQuery}
                onPressEnter={handleEnter}
              />
            </Col>
            <Col flex='80px'>
              <StyledButton onClick={handleSearch}>Найти</StyledButton>
            </Col>
          </StyledRow>
          <Spin spinning={isKmsSearchingLoading}>
            <GoToKmsButton onClick={goToKms}>Перейти в KMS</GoToKmsButton>
          </Spin>
          <ScrollContent>
            {hasAnswer &&
              results.getAnswer.map(item => (
                <SearchItem key={item.caption}>
                  {item.showCaption && <Caption>{item.caption}</Caption>}
                  {item.value && <HtmlRender value={prepareImages(item.value)} />}
                </SearchItem>
              ))}
            {results && !results.getAnswerLink && query === results.query && (
              <SearchItem>
                <Caption>Прямой ответ не задан.</Caption>
                <Description>Нажми enter, чтобы перейти к поисковой выдаче в KMS.</Description>
              </SearchItem>
            )}
          </ScrollContent>
        </PopoverContent>
      }
    >
      {children}
    </Popover>
  )
}

export default KmsSearchLine

const PopoverContent = styled.div`
  color: white;
  max-width: 500px;
`
const ScrollContent = styled.div`
  overflow-y: auto;
  max-height: 500px;
`
const StyledRow = styled(Row)`
  margin-bottom: 10px;
  min-width: 300px;
`
const StyledButton = styled(Button)`
  margin-left: 10px;
  font-weight: bold;
`
const StyledInput = styled(Input)`
  background: #3a3e46;
  border-color: #5a5d63;
  color: white;
`
const GoToKmsButton = styled.div`
  margin-bottom: 10px;
  text-decoration: underline;
  :hover {
    text-decoration: none;
    cursor: pointer;
  }
`

const SearchItem = styled.div`
  position: relative;
`

const Caption = styled.div`
  font-weight: bold;
  text-align: left;
  padding-right: 40px;
`

const Description = styled.div`
  text-align: left;
  p {
    margin: 6px 0;
  }
`
