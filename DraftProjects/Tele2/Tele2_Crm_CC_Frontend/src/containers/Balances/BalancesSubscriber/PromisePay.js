import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

const PromisePay = ({ promisePay }) => {
  let content
  if (promisePay && promisePay.result === 13) {
    const notification = (
      <Notification key={promisePay.resultMessage.length}>
        Если средства ОП будут использованы для оплаты АП по тарифу, предупреди о блокировке тарифа, если ОП не будет
        погашен в срок
      </Notification>
    )
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    content = [...promisePay.resultMessage.map((item, index) => <div key={index}>{item}</div>), notification]
  } else {
    content = promisePay && promisePay.response
  }

  return (
    <Wrapper>
      <Popover placement='bottom' title='Информация об обещанном платеже' content={content} trigger='click'>
        <InfoCircleIcon />
      </Popover>
    </Wrapper>
  )
}

export default PromisePay

PromisePay.propTypes = {
  promisePay: PropTypes.object
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

const Notification = styled.div`
  max-width: fit-content;

  margin: 10px -16px 0px;
  padding: 5px 16px 0px;

  border-top: 1px solid #f0f0f0;

  font-weight: bold;
`
