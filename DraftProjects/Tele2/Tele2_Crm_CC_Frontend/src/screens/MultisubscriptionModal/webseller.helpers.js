import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changeMultisubscriptionServiceWebSeller } from 'reducers/services/serviceReducer'
import { getUserState } from 'selectors/index'
import { checkRight } from 'utils/helpers'

import { selectIsWebSeller } from 'webseller/common/user/selectors'
import { Modal, Button, Title } from 'webseller/components'

export const useChangingMultisubscriptionWebSeller = (changingData) => {
  const isWebSeller = useSelector(selectIsWebSeller)
  const user = useSelector(getUserState)

  const [isShowSubmitModal, setIsShowSubmitModal] = useState(false)

  const isNeedToUse = isWebSeller && checkRight(user, 'AS.Services:U')

  const handleClick = () => {
    setIsShowSubmitModal(true)
  }

  const closeSubmitModal = () => {
    setIsShowSubmitModal(false)
  }

  const renderAdditional = () => {
    return isShowSubmitModal ? <SubmitModal changingData={changingData} onClose={closeSubmitModal} /> : null
  }

  return {
    isNeedToUse,
    handleClick,
    renderAdditional
  }
}

const SubmitModal = ({ changingData, onClose }) => {
  const dispatch = useDispatch()

  const changeNow = () => {
    dispatch(changeMultisubscriptionServiceWebSeller({ isOnDateChanging: false, changingData }))
    onClose()
  }
  const changeOnDate = () => {
    dispatch(changeMultisubscriptionServiceWebSeller({ isOnDateChanging: true, changingData }))
    onClose()
  }

  return (
    <Modal
      width={430}
      zIndex={1002}
      closable
      footer={
        <Fragment>
          <Button type='primary' onClick={changeNow}>Сейчас</Button>
          <Button type='primary' onClick={changeOnDate}>На дату АП</Button>
        </Fragment>
      }
      onCancel={onClose}
    >
      <Title>Отключить выбранные услуги?</Title>
    </Modal>
  )
}
