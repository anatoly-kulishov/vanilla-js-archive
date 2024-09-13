import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Modal, Row, Col } from 'antd'

const formatIsoDate = value =>
  value
    ? moment
      .utc(value)
      .local()
      .format('DD.MM.YYYY[\n]HH:mm')
    : ''

export default function OffersCbmModal ({ isToggled, record, closeModal }) {
  OffersCbmModal.propTypes = {
    isToggled: PropTypes.bool,
    record: PropTypes.objectOf(PropTypes.string),
    closeModal: PropTypes.func
  }

  let title = ''
  let bodyData = []

  if (record) {
    title = `Предложение CBM`
    bodyData = [
      {
        name: 'Дата отправки нотификации',
        value: formatIsoDate(record.DeliveryTime)
      },
      { name: 'Предложение', value: record.OfferName },
      { name: 'Статус нотификации', value: record.Delivery },
      { name: 'Отклик', value: record.Result },
      { name: 'Дата отклика', value: formatIsoDate(record.ResultTime) },
      { name: 'Канал', value: record.Channel },
      { name: 'Признак выполнения предложения абонентом', value: record.Take },
      {
        name: 'Дата выполнения предложения абонентом',
        value: formatIsoDate(record.TakeTime)
      },
      { name: 'Текст сообщения', value: record.SmsText }
    ]
  }

  return (
    <StyledModal
      title={title}
      visible={isToggled}
      onCancel={closeModal}
    >
      <Fragment>
        {bodyData &&
          bodyData.map(
            item =>
              item && (
                <StyledRow>
                  <NameCol span={6}>{item.name}</NameCol>
                  <ValueCol span={18}>{item.value}</ValueCol>
                </StyledRow>
              )
          )}
      </Fragment>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 14px 24px 10px 24px;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-footer {
    padding: 0;
  }
`
const StyledRow = styled(Row)`
  padding: 5px 20px;
  border-bottom: 1px solid #e8e8e8;
`
const NameCol = styled(Col)`
  padding: 4px 0px;
`
const ValueCol = styled(Col)`
  padding: 4px 11px;
`
