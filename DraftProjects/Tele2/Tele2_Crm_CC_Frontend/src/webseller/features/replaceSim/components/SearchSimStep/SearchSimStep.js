import React, { Fragment, useEffect, useState } from 'react'
import { Checkbox, Form, notification } from 'antd'
import ReactInputMask from 'react-input-mask'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button, Input, Modal, Title } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

import { FORM_VALUES, ICC_MASK, INITIAL_VALUES, PUK_MASK } from './constants/form'
import { renderReplaceSimStatus } from '../../utils'

const normalize = value => value?.match(/\d+/g)?.join('') ?? ''

export default function SearchSimStep (props) {
  const {
    onSubmit,
    onNextStep,
    msisdn,
    branchId,
    handlingId,
    replaceAvailability,
    isAvailabilityLoading,
    getTransmittingPartyData,
    resetReplaceSimProcess,
    setDocumentData
  } = props

  const [form] = Form.useForm()

  const [isShowCheckModal, setIsShowCheckModal] = useState(false)

  const [isSimDefective, setIsSimDefective] = useState(true)
  const [isShowValidationError, setIsShowValidationError] = useState({
    [FORM_VALUES.ICC]: false,
    [FORM_VALUES.PUK]: false,
    [FORM_VALUES.IS_TECH_FAULTY]: false
  })

  useEffect(() => {
    if (replaceAvailability && replaceAvailability?.isAvailable) {
      setIsShowCheckModal(prevState => !prevState)
    }
    if (replaceAvailability && !replaceAvailability?.isAvailable) {
      notification.open({
        message: `Замена SIM`,
        description: replaceAvailability?.messageText || 'SIM-карта не найдена. Проверьте корректность указанных значений и попробуйте ещё раз.',
        type: 'error'
      })
    }
  }, [replaceAvailability])

  const formValues = form.getFieldsValue()

  const isFormLoading = isAvailabilityLoading
  const isBtnDisabled =
    !formValues[FORM_VALUES.ICC]?.length || isShowValidationError[FORM_VALUES.ICC] ||
    !formValues[FORM_VALUES.PUK]?.length || isShowValidationError[FORM_VALUES.PUK]

  const onChangeIcc = (e) => {
    const newIcc = normalize(e.target.value)
    form.setFieldsValue({ [FORM_VALUES.ICC]: newIcc })
    if (newIcc.length === ICC_MASK.length) {
      setIsShowValidationError(prev => ({ ...prev, [FORM_VALUES.ICC]: false }))
    } else {
      setIsShowValidationError(prev => ({ ...prev, [FORM_VALUES.ICC]: true }))
    }
  }

  const onChangePuk = (e) => {
    const newPuk = normalize(e.target.value)
    form.setFieldsValue({ [FORM_VALUES.PUK]: newPuk })
    if (newPuk.length === PUK_MASK.length) {
      setIsShowValidationError(prev => ({ ...prev, [FORM_VALUES.PUK]: false }))
    } else {
      setIsShowValidationError(prev => ({ ...prev, [FORM_VALUES.PUK]: true }))
    }
  }

  const onSubmitForm = (formData) => {
    onSubmit({
      branchId: branchId,
      icc: formData[FORM_VALUES.ICC],
      puk: formData[FORM_VALUES.PUK],
      msisdn: msisdn,
      isTechFaulty: formData[FORM_VALUES.IS_TECH_FAULTY],
      handlingId: String(handlingId)
    })
    setDocumentData({
      ...formData,
      msisdn: msisdn,
      branchId: branchId,
      handlingId: handlingId
    })
  }

  const handleCloseCheckModal = () => {
    setIsShowCheckModal(prevState => !prevState)
  }

  const handleGoNextStep = () => {
    handleCloseCheckModal()
    resetReplaceSimProcess()
    getTransmittingPartyData({ msisdn })
    setDocumentData(replaceAvailability)
    onNextStep()
  }

  return (
    <Container>
      {isShowCheckModal && (
        <Modal
          width={430}
          zIndex={1002}
          closable
          onCancel={handleCloseCheckModal}
          footer={
            <Fragment>
              <Button onClick={handleCloseCheckModal}>
                Назад
              </Button>
              <Button type='primary' onClick={handleGoNextStep}>
                Далее
              </Button>
            </Fragment>
          }
        >
          <Title marginBottom={15}>Стоимость замены SIM-карты = {' '}
            {replaceAvailability?.price} руб
          </Title>
          <Title bold>{renderReplaceSimStatus(replaceAvailability)}</Title>
        </Modal>
      )}
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Поиск и проверка SIM
      </Title>
      <Main>
        <Form form={form} initialValues={INITIAL_VALUES} onFinish={onSubmitForm} >
          <Form.Item
            name={[FORM_VALUES.ICC]}
            validateStatus={isShowValidationError[FORM_VALUES.ICC] ? 'error' : 'success'}
            help={isShowValidationError[FORM_VALUES.ICC] && 'Некорректно заполнен ICC'}
          >
            <ReactInputMask mask={ICC_MASK} onChange={onChangeIcc} required disabled={isFormLoading}>
              {inputProps => <Input {...inputProps} placeholder='ICC' disabled={isFormLoading} />}
            </ReactInputMask>
          </Form.Item>
          <Form.Item
            name={[FORM_VALUES.PUK]}
            validateStatus={isShowValidationError[FORM_VALUES.PUK] ? 'error' : 'success'}
            help={isShowValidationError[FORM_VALUES.PUK] && 'Некорректно заполнен PUK'}
          >
            <ReactInputMask mask={PUK_MASK} onChange={onChangePuk} required disabled={isFormLoading}>
              {inputProps => <Input {...inputProps} placeholder='PUK' disabled={isFormLoading} />}
            </ReactInputMask>
          </Form.Item>
          <Form.Item
            name={[FORM_VALUES.IS_TECH_FAULTY]}
            valuePropName='checked'
            validateStatus={isShowValidationError?.isSimDefective ? 'error' : 'success'}
          >
            <Checkbox checked={isSimDefective} onChange={() => setIsSimDefective(!isSimDefective)} disabled={isFormLoading}>
              SIM-карта абонента технически неисправна
            </Checkbox>
          </Form.Item>
          <Footer>
            <Button
              style={{ width: 110 }}
              type='primary'
              htmlType='submit'
              disabled={isBtnDisabled}
              loading={isFormLoading}
            >
              Найти
            </Button>
          </Footer>
        </Form>
      </Main>
    </Container>
  )
}

SearchSimStep.propTypes = {
  msisdn: PropTypes.string,
  branchId: PropTypes.number,
  handlingId: PropTypes.number,
  replacingProcessStep: PropTypes.string,
  onSubmit: PropTypes.func,
  onNextStep: PropTypes.func,
  setDocumentData: PropTypes.func,
  resetReplaceSimProcess: PropTypes.func,
  getTransmittingPartyData: PropTypes.func,
  replaceAvailability: PropTypes.object,
  isAvailabilityLoading: PropTypes.bool
}

const Container = styled.div`
    width: 60%;
    max-width: 600px;
`
const Main = styled.div`
    margin-top: 24px;
`
const Footer = styled.div`
    margin-top: 24px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    align-items: center;
`
