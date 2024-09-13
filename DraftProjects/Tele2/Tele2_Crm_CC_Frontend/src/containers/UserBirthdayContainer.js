/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import ConfettiCanvas from 'react-confetti-canvas'
import { Tooltip } from 'antd'
import { CloseCircleTwoTone } from '@ant-design/icons'

const mapStateToProps = state => ({
  userName: state.internal.userState.user.DisplayName
})

export const BirthdayContainer = ({ userName }) => {
  const [, forceUpdate] = useState(0)
  const thisYear = moment().format('YYYY')
  const lastYear = moment().subtract(1, 'years').format('YYYY')

  const name = userName.split(' ')[1]
  const isBirthdayCardShow = localStorage.getItem(thisYear)

  const closeNotification = () => {
    localStorage.setItem(thisYear, false)
    localStorage.getItem(lastYear) && localStorage.removeItem(lastYear)
    forceUpdate()
  }

  return (
    <Wrapper hidden={isBirthdayCardShow}>
      <Tooltip title={`Скрыть до ${moment().add(1, 'years').calendar()}`}>
        <CloseIcon twoToneColor={'#BDBDBD'} onClick={closeNotification} />
      </Tooltip>
      <Title>{`С днём рождения, ${name}!`}</Title>
      <ConfettiCanvas
        duration={0.007}
        ribbonCount={0}
        paperCount={15}
      />
    </Wrapper>)
}

export default connect(mapStateToProps)(BirthdayContainer)

BirthdayContainer.propTypes = {
  userName: PropTypes.string
}

const Wrapper = styled.div`
  height: 50px;
  margin-right: 30px;
  margin-bottom: 16px;
  background: white;
  box-shadow: 0 0px 10px rgba(32,33,36,0.05);
  border-radius: 10px;
`
const Title = styled.div`
  margin: 13px 15px 10px 21px;
  position: absolute;
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
  color: black;
`
const CloseIcon = styled(CloseCircleTwoTone)`
  position: absolute;
  z-index: 2;
  right: 40px;
  cursor: pointer;
  margin-top: 18px;
`
