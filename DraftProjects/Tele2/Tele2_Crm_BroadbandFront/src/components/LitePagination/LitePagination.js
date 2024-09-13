import React from 'react'
import { Button, Row, Select, Tooltip } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const pageSizeOptions = [
  { label: '10 / стр.', value: 10 },
  { label: '20 / стр.', value: 20 },
  { label: '50 / стр.', value: 50 },
  { label: '100 / стр.', value: 100 }
]

const LitePagination = props => {
  const { dataSource, pagination, onChangePagination, isLoading } = props
  const { pageSize, current } = pagination

  const handlePrevClick = () => onChangePagination('prevPage')
  const handleNextClick = () => onChangePagination('nextPage')
  const handleChangePageSize = pageSize => onChangePagination('pageSize', pageSize)

  const isNextDisabled = dataSource?.length < pageSize || isLoading
  const isPrevDisabled = current === 1 || isLoading
  const isPageSizeDisabled = isLoading

  return (
    <PaginationWrapper justify='end'>
      <Button disabled={isPrevDisabled} onClick={handlePrevClick} size='small'>
        <LeftOutlined />
      </Button>
      <Tooltip title='Номер текущей страницы'>
        <CurrentPage>{current}</CurrentPage>
      </Tooltip>
      <Button disabled={isNextDisabled} onClick={handleNextClick} size='small'>
        <RightOutlined />
      </Button>

      <Select
        disabled={isPageSizeDisabled}
        onChange={handleChangePageSize}
        options={pageSizeOptions}
        value={pageSize}
        size='small'
      />
    </PaginationWrapper>
  )
}

export default LitePagination

const PaginationWrapper = styled(Row)`
  flex-wrap: wrap;
  gap: 8px;

  padding: 16px 0;
  padding-right: 20px;
`

const CurrentPage = styled.div`
  height: 24px;
  padding: 0px 7px;

  border: 1px solid gray;
  border-radius: 4px;
  border-color: #d9d9d9;
  background: #fff;
`
