import React from 'react'
import { Space } from 'antd'
import moment from 'moment'
import styled from 'styled-components'

const ShiftInfo = props => {
  const { data, errorMessage } = props

  return (
    <Space direction='vertical'>
      {data?.createdOn && <div>Дата начала {moment.utc(data.createdOn).local().format('DD.MM.YYYY HH:mm')}</div>}
      <Error>{errorMessage}</Error>
    </Space>
  )
}

const Error = styled.div`
  color: red;
`

export default ShiftInfo
