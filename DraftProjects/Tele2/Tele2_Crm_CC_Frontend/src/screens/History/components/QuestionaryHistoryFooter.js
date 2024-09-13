import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Descriptions } from 'antd'
const { Item } = Descriptions

export default function QuestionaryHistoryFooter ({ createdFio, createdOn }) {
  QuestionaryHistoryFooter.propTypes = {
    createdFio: PropTypes.string.isReqired,
    createdOn: PropTypes.string.isReqired
  }

  return (
    <Description size='small'>
      <Item label='Автор' span={2}>
        {createdFio}
      </Item>
      <Item label='Дата создания' span={1}>
        {createdOn}
      </Item>
    </Description>
  )
}

const Description = styled(Descriptions)`
  text-align: left;
  .ant-descriptions-item {
    vertical-align: top;
  }
`
