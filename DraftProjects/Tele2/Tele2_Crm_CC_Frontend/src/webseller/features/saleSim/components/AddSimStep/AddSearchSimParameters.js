import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'antd'
import ReactInputMask from 'react-input-mask'
import styled from 'styled-components'
import { checkRight } from 'utils/helpers'
import {
  Button,
  Input
  // PhoneMask
} from 'webseller/components'
import {
  addSim,
  addESimFromStorage,
  setAddSimError
} from 'reducers/saleSim/saleSimReducer'

const normalize = value => value?.match(/\d+/g)?.join('') ?? ''

export default function AddSearchSimParameters ({
  user,
  sellAvailability,
  hasAllRequiredDataForSaleUntemplatedSim,
  addSimError,
  isAddSimProcessing
}) {
  const dispatch = useDispatch()
  const onAddESim = payload => dispatch(addESimFromStorage(payload))
  const onAddSim = paylaod => dispatch(addSim(paylaod))
  const onSetAddSimError = payload => dispatch(setAddSimError(payload))

  // const [msisdn, setMsisdn] = useState()
  const [icc, setIcc] = useState()
  const [isShowValidationError, setIsShowValidationError] = useState({
    msisdn: false,
    icc: false
  })

  const isAllowToSellUntemplatedESim =
    checkRight(user, 'AS:UntemplatedESIMSell') && Boolean(sellAvailability?.isEsimAvailable)

  // const onChangeMsisdn = e => {
  //   const newMsisdn = e.target.value
  //   setMsisdn(newMsisdn)
  //   setIsShowValidationError(prev => ({ ...prev, msisdn: false }))
  //   setAddSimError(null)
  // }

  const onChangeIcc = e => {
    const newIcc = e.target.value
    setIcc(newIcc)
    setIsShowValidationError(prev => ({ ...prev, icc: false }))
    onSetAddSimError(null)
  }

  const onSubmitForm = ({ msisdn, icc }) => {
    const normalizedMsisdn = normalize(msisdn)
    const normalizedIcc = normalize(icc)

    const isValidMsisdn = msisdn ? normalizedMsisdn.length === 11 : true
    const isValidIcc = icc ? normalizedIcc.length === 20 : false

    if (isValidMsisdn && isValidIcc) {
      const validPayload = {
        msisdn: normalizedMsisdn,
        icc: normalizedIcc
      }

      onAddSim(validPayload)
      return
    }

    setIsShowValidationError({
      msisdn: !isValidMsisdn,
      icc: !isValidIcc
    })
  }

  return (
    <>
      {addSimError && <ModalErrorWrapper>{addSimError}</ModalErrorWrapper>}
      <Form onFinish={onSubmitForm}>
        {/* <Form.Item
          name='msisdn'
          validateStatus={isShowValidationError.msisdn ? 'error' : 'success'}
          help={isShowValidationError.msisdn && 'Некорректно заполнен номер'}
        >
          <PhoneMask
            value={msisdn}
            onChange={onChangeMsisdn}
          >
            {inputProps => <Input {...inputProps} placeholder='Номер' />}
          </PhoneMask>
        </Form.Item> */}
        <Form.Item
          name='icc'
          validateStatus={isShowValidationError.icc ? 'error' : 'success'}
          help={isShowValidationError.icc && 'Некорректно заполнен ICC'}
        >
          <ReactInputMask mask='99999999999999999999' value={icc} onChange={onChangeIcc}>
            {inputProps => <Input {...inputProps} placeholder='ICC' />}
          </ReactInputMask>
        </Form.Item>
        <Footer>
          <Button
            type='primary'
            disabled={!hasAllRequiredDataForSaleUntemplatedSim || isAddSimProcessing || !isAllowToSellUntemplatedESim}
            onClick={onAddESim}
          >
            eSIM из хранилища
          </Button>
          <Button
            style={{ width: 110 }}
            type='primary'
            htmlType='submit'
            loading={isAddSimProcessing}
          >
            Добавить
          </Button>
        </Footer>
      </Form>
    </>
  )
}

const ModalErrorWrapper = styled.span`
  color: red;
`

const Footer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
`
