import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

const ECommerce = ({ ecommerce }) => {
  if (ecommerce && ecommerce.balance) {
    return <div>{ecommerce.balance}</div>
  } else {
    return (
      <Wrapper>
        <Popover
          placement='bottom'
          title='Информация об E-Commerce'
          content={
            <ContentPopover>
              {ecommerce ? ecommerce.resonseText : 'Нет данных о E-Commerce'}
            </ContentPopover>
          }
          trigger='click'
        >
          <InfoCircleIcon />
        </Popover>
      </Wrapper>
    )
  }
}

export default ECommerce

ECommerce.propTypes = {
  ecommerce: PropTypes.object
}

const Wrapper = styled.div`
  height: 21px;
`
const InfoCircleIcon = styled(InfoCircleOutlined)`
  cursor: pointer;
  margin-right: 3px;

  & svg {
    width: 20px;
    height: 20px;
  }

  color: rgba(0, 0, 0, 0.65);
`
const ContentPopover = styled.div`
  max-width: 300px;
`
