import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import ConfettiCanvas from 'react-confetti-canvas'
import { Tooltip } from 'antd'
import { CloseCircleTwoTone } from '@ant-design/icons'
import { isNil } from 'lodash'
import hashFromString from 'utils/helpers/hashFromString'

export default function BirthdayMessage (props) {
  const { text, accountId } = props

  const [isMessageVisible, setMessageVisible] = useState(false)

  const storageItemName = useMemo(() => {
    return isNil(accountId) ? null : `birthday-message-disable-${accountId}-${hashFromString(text)}`
  }, [accountId])

  useEffect(() => {
    if (!storageItemName) return
    const item = localStorage.getItem(storageItemName)
    if (item) {
      const isCardDisableExpired = moment().isAfter(moment(item))
      setMessageVisible(isCardDisableExpired)
    } else {
      setMessageVisible(true)
    }
  }, [storageItemName])

  const closeNotification = useCallback(() => {
    localStorage.setItem(storageItemName, moment().add(1, 'years').subtract(3, 'days').toISOString())
    setMessageVisible(false)
  }, [storageItemName])

  return (
    isMessageVisible ? <Wrapper>
      <Tooltip title={`Скрыть до ${moment().add(1, 'years').calendar()}`}>
        {storageItemName && <CloseIcon twoToneColor={'#BDBDBD'} onClick={closeNotification} />}
      </Tooltip>
      <Title>{text}</Title>
      <ConfettiCanvas duration={0.007} ribbonCount={0} paperCount={15} />
    </Wrapper> : <></>
  )
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
