/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import PropTypes from 'prop-types'

import LoadingSpinner from 'components/LoadingSpinner'

const style = { marginRight: '30px' }

const Subscribers = props => {
  Subscribers.propTypes = {
    subscriberCounts: PropTypes.object,
    subscribersState: PropTypes.object,
    isPersonalAccountLoading: PropTypes.bool,
    changeAbonentsModalVisibility: PropTypes.func
  }
  const {
    subscriberCounts,
    subscribersState: {
      subscriberListError,
      isSubscriberListLoading
    },
    isPersonalAccountLoading,
    changeAbonentsModalVisibility
  } = props

  return (
    <div style={style}>
      <Spin
        spinning={isPersonalAccountLoading || isSubscriberListLoading}
        indicator={<LoadingSpinner spin />}
      >
        {subscriberListError && <Wrapper>Ошибка загрузки абонентов</Wrapper>}
        {!subscriberListError && !isPersonalAccountLoading && !isSubscriberListLoading && (
          <Wrapper>
            <Title onClick={() => changeAbonentsModalVisibility()}>
              Абоненты {subscriberCounts.SubscriberTotalCount}
            </Title>
            <Box color='green'>{subscriberCounts.SubscriberActiveCount} активно</Box>
            <Box color='grey'>{subscriberCounts.SubscriberPreparedCount} подготовлено</Box>
            <Box color='red'>{subscriberCounts.SubscriberBlockedCount} заблокировано</Box>
            <Box color='red'>{subscriberCounts.SubscriberSuspendedCount} приостановлено</Box>
            <Box color='red'>{subscriberCounts.SubscriberClosedCount} закрыто</Box>
          </Wrapper>
        )}
      </Spin>
    </div>
  )
}

export default Subscribers

const Wrapper = styled.div`
  margin-bottom: 15px;
  background-color: white;
  font-family: T2_Rooftop_Regular;
  width: 100%;
  min-height: 46px;
  padding: 10px 20px 15px 21px;
  display: flex;
  box-shadow: 0 0px 10px rgba(32,33,36,0.05);
  border-radius: 10px;
`

const Title = styled.div`
  display: block;
  color: black;
  margin-right: 32px;
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px dashed rgb(127, 130, 133);
`

const Box = styled.div`
  background-color: ${props => {
    switch (props.color) {
      case 'green':
        return '#F6FFED'
      case 'grey':
        return '#F5F5F5'
      default:
        return '#FFF1F0'
    }
  }};
  margin-right: 22px;
  border: 1px solid;
  border-color: ${props => {
    switch (props.color) {
      case 'green':
        return '#B7EB8F'
      case 'grey':
        return '#D9D9D9'
      default:
        return '#FFA39E'
    }
  }};
  color: ${props => {
    switch (props.color) {
      case 'green':
        return '#52C41A'
      case 'grey':
        return '#595959'
      default:
        return '#F5222D'
    }
  }};
  border-radius: 4px;
  line-height: 17px;
  font-size: 12px;
  padding: 2px 4px 2px 4px;
`
