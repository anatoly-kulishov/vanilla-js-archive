import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Popover, notification } from 'antd'

import { COMMON_LAYOUT_ID } from 'constants/kms'
import { handleQueryToKms, openKmsArticle, prepareImages } from 'utils/helpers/kms'
import useKeyPress from 'hocs/useKeyPress'
// TODO: Common component
import Info from '../../screens/Service/assets/info.svg'
import HtmlRender from 'components/HtmlRender'

export default function KmsSearchTooltip (props) {
  KmsSearchTooltip.propTypes = {
    kmsSearchingResults: PropTypes.object,
    personalAccount: PropTypes.object,
    searchInKmsAndRedirect: PropTypes.func,
    handlingId: PropTypes.number,
    record: PropTypes.object
  }

  const {
    kmsSearchingResults,
    searchInKmsAndRedirect,
    record,
    handlingId,
    personalAccount,
    personalAccount: {
      BillingBranchId,
      ClientTypeId
    }
  } = props

  const [isPopoverVisible, setPopoverVisible] = useState(false)

  const closePress = useKeyPress('Escape', isPopoverVisible)

  const hasKmsResultLink = kmsSearchingResults?.getAnswerLink?.itemId

  const hasKmsResultAnswer = kmsSearchingResults?.getAnswer &&
    Array.isArray(kmsSearchingResults?.getAnswer)

  const isReadyRedirectKMS = hasKmsResultLink && kmsSearchingResults.query === record.ServiceName
  const isResultsSearchKMS = hasKmsResultAnswer && kmsSearchingResults.query === record.ServiceName

  const findArticle = query => {
    searchInKmsAndRedirect({ searchParams: query, redirectParams: { handlingId, personalAccount } })
  }

  const redirectKMS = (isReadyRedirectKMS, record) => {
    if (!kmsSearchingResults?.getAnswerLink) {
      notification.error({
        message: 'Запрос к KMS',
        description: 'Не удалось получить данные от KMS'
      })
      return
    }
    const { getAnswerLink: { itemId } } = kmsSearchingResults

    isReadyRedirectKMS
      ? openKmsArticle(itemId)
      : handleQueryToKms(record.ServiceName, handlingId, personalAccount)
  }

  const handleRedirectKms = useCallback(record => redirectKMS(isReadyRedirectKMS, record), [isReadyRedirectKMS])
  const handleInfoClick = useCallback(() => {
    findArticle({
      query: record.ServiceName,
      layoutId: COMMON_LAYOUT_ID,
      externalFilter:
        `GF_REGION_dfs:${BillingBranchId}` + `&externalFilter=GF_CUSTOMER_TYPE_df:${ClientTypeId}`
    })
  }, [record, BillingBranchId, ClientTypeId])

  useEffect(() => {
    closePress && setPopoverVisible(false)
  }, [closePress])
  return (
    <Popover
      placement='left'
      trigger='click'
      color='#3a3e46'
      visible={isPopoverVisible && isReadyRedirectKMS}
      onVisibleChange={setPopoverVisible}
      title={(
        <PopoverTitle>
          <span>{`Описание услуги "${record.ServiceName}"`}</span>
          <GoToKmsButton onClick={handleRedirectKms}>Перейти в KMS</GoToKmsButton>
        </PopoverTitle>
      )}
      content={
        <ContentPopover>
          {isResultsSearchKMS
            ? (
              <div>
                {kmsSearchingResults.getAnswer.map(item => (
                  <SearchItem key={item.caption}>
                    {item.showCaption && <Caption>{item.caption}</Caption>}
                    {item.value && <HtmlRender value={prepareImages(item.value)} />}
                  </SearchItem>
                ))}
              </div>
            ) : (
              <div>{record.Description || 'Описание услуги недоступно'}</div>
            )}
        </ContentPopover>
      }
    >
      <InfoCell>
        <Info onClick={handleInfoClick} />
      </InfoCell>
    </Popover>
  )
}

const InfoCell = styled.div`
  cursor: pointer;
`

const PopoverTitle = styled.div`
  color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: baseline;
  justify-content: space-between;
`

const GoToKmsButton = styled.span`
  margin-bottom: 10px;
  text-decoration: underline;
  cursor: pointer;
  :hover {
    text-decoration: none;
  }
`

const ContentPopover = styled.div`
  color: white;
  max-width: 500px;
  max-height: 600px;
  overflow-y: auto;
`
const SearchItem = styled.div`
  color: white;
`

const Caption = styled.div`
  font-weight: bold;
`
