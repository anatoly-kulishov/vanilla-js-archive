import React, { useMemo } from 'react'
import { Col, Popover, Row, Skeleton, Space } from 'antd'
import { array, bool, object } from 'prop-types'

import styled from 'styled-components'

import { HandShakeIcon } from 'assets/index'
import { copyElementTextToClipboard } from 'utils/helpers'
import moment from 'moment'
import SkeletonLoader from 'components/SkeletonLoader'

const { Avatar: SkeletonAvatar } = Skeleton

const renderCustomerScenarioHistoryItem = ({ scenarioName, createdOn }, index) => (
  <Row key={index} justify='space-between' gutter={5}>
    <Col>{scenarioName}</Col>
    <Col>{moment(createdOn).format('DD.MM.YYYY HH:mm')}</Col>
  </Row>
)

const renderCustomerScenarioHistory = (isLoading, popoverContent) => {
  let content = null

  if (isLoading) {
    content = <SkeletonAvatar size='small' active />
  } else if (popoverContent?.length) {
    content = (
      <Popover content={popoverContent}>
        <StyledIcon as={HandShakeIcon} />
      </Popover>
    )
  }

  return content
}

const handleCopyPhoneNumber = event => copyElementTextToClipboard(event.target, 'Номер скопирован')

const propTypes = { record: object, data: array, isHistoryLoading: bool }

const MsisdnColumn = props => {
  const { record, data, isHistoryLoading } = props
  const { Msisdn, isLoading } = record

  const groupedCustomerScenarioHistory = useMemo(
    () =>
      data?.reduce((acc, item) => {
        const { scenarioName, createdOn, clickMsisdn } = item
        const accItem = acc[scenarioName]

        if (clickMsisdn === Msisdn) {
          if (!accItem || (accItem.scenarioName === scenarioName && accItem.createdOn < createdOn)) {
            acc = { ...acc, [scenarioName]: item }
          }
        }

        return acc
      }, {}) ?? {},
    [data, Msisdn]
  )

  const popoverContent = useMemo(
    () => Object.values(groupedCustomerScenarioHistory)?.map(renderCustomerScenarioHistoryItem),
    [groupedCustomerScenarioHistory]
  )

  if (isLoading) {
    return (
      <Space>
        <SkeletonLoader width={100} component={<Skeleton.Button active size='small' />} />
        <Skeleton.Avatar active size='small' />
      </Space>
    )
  }

  return (
    <Row align='middle' gutter={5} wrap={false}>
      <StyledCol>
        <PhoneNumber onClick={handleCopyPhoneNumber}>{Msisdn}</PhoneNumber>
      </StyledCol>
      <StyledCol>{renderCustomerScenarioHistory(isHistoryLoading, popoverContent)}</StyledCol>
    </Row>
  )
}

MsisdnColumn.propTypes = propTypes

export default MsisdnColumn

const PhoneNumber = styled.div`
  min-width: 100px;
  font-family: T2HalvarBreit_ExtraBold;
  color: black;
  font-size: 16px;
  cursor: pointer;
`

const StyledIcon = styled.div`
  width: 25px;
  height: 25px;
  fill: ${props => props.color};
  svg {
    fill: ${props => props.color};
    width: 23px;
    height: 23px;
  }
`

const StyledCol = styled(Col)`
  display: flex;
`
