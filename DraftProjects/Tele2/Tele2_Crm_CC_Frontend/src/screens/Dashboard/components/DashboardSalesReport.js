import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Skeleton } from 'antd'
import styled from 'styled-components'
import * as moment from 'moment'
import { debounce } from 'lodash'
import { ChevronLeftIcon, ChevronRightIcon } from 'assets'

const TRANSPORT_DATE_FORMAT = 'YYYY-MM-DD'

export default function DashboardSalesReport ({ salesReport, isLoading, setLoading, getSalesReport }) {
  const [date, setDate] = useState(moment())

  const salesReportRenderList = useMemo(() => {
    if (!salesReport) {
      return null
    }
    const entries = Object.entries(salesReport).filter(([key]) => key !== 'rtcCount')
    return Object.fromEntries(entries)
  }, [salesReport])

  const decreaseDate = () => {
    const prevDate = moment(date).add(-1, 'month')
    setLoading(true)
    setDate(prevDate)
  }

  const increaseDate = () => {
    const nextDate = moment(date).add(1, 'month')
    setLoading(true)
    setDate(nextDate)
  }

  const getViewDateFormat = () => {
    const raw = moment(date).format('MMMM')
    const firstChar = raw.charAt(0).toUpperCase()
    const remainingChars = raw.slice(1)
    return `${firstChar}${remainingChars}`
  }

  const debouncedGetSalesReport = useCallback(
    debounce(date => {
      const dateFrom = moment(date).startOf('month').format(TRANSPORT_DATE_FORMAT)
      const dateTo = moment(date).endOf('month').format(TRANSPORT_DATE_FORMAT)

      getSalesReport({ dateFrom, dateTo })
    }, 500),
    []
  )

  useEffect(() => {
    debouncedGetSalesReport(date)
  }, [date])

  return (
    <Container>
      <DateWrapper>
        <button onClick={decreaseDate}>
          <ChevronLeftIcon />
        </button>
        <span>{getViewDateFormat()}</span>
        <button onClick={increaseDate}>
          <ChevronRightIcon />
        </button>
      </DateWrapper>
      {isLoading || !salesReport ? (
        <SkeletonContainer>
          {new Array(3).fill().map((_, idx) => (
            <li key={idx}>
              <Skeleton active avatar={false} title={{ width: '100%' }} paragraph={false} />
            </li>
          ))}
        </SkeletonContainer>
      ) : (
        <ul>
          {Object.values(salesReportRenderList).map(({ count, description }) => (
            <InfoRow key={description}>
              <span>{description}</span>
              <span>{count}</span>
            </InfoRow>
          ))}
        </ul>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: #f7f8fb;

  & > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  & .ant-skeleton-title {
    margin: 0 !important;
  }
`

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;

  button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`

const InfoRow = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
  }

  span:last-of-type {
    font-weight: 400;
  }
`

const SkeletonContainer = styled.ul`
  & > li {
    margin-bottom: 6px;
  }

  & > li::last-of-type {
    margin-bottom: 0px;
  }
`
