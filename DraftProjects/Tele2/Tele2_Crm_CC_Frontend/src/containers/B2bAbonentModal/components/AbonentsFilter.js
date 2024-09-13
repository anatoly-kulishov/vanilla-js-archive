/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Row, Col, Select, Button } from 'antd'
import PropTypes from 'prop-types'

import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import { DEFAULT_STATUS_FILTER_VALUE } from '../constants'

const Option = Select.Option

const AbonentsFilter = (props) => {
  AbonentsFilter.propTypes = {
    numberPhone: PropTypes.object,
    isFieldChangeHandle: PropTypes.bool,
    isButtonCleanClickHandle: PropTypes.bool,
    status: PropTypes.object,
    substatus: PropTypes.object,
    subscriberListState: PropTypes.object,
    onPaste: PropTypes.func,
    onClickRemove: PropTypes.func,
    isActTabActive: PropTypes.bool
  }
  const {
    numberPhone,
    isFieldChangeHandle,
    isButtonCleanClickHandle,
    status,
    substatus,
    subscriberListState,
    onPaste,
    onClickRemove,
    isActTabActive
  } = props

  const { subscriberStatuses, subscriberList } = subscriberListState

  const renderStatuses = () => {
    if (!isActTabActive) {
      return subscriberStatuses.map((item, index) => (
        <Option value={item.Name} key={index}>{item.Name}</Option>
      ))
    } else {
      let statuses = []
      subscriberList.SubscriberInfo.filter(item => !!item.FZ533Profile.Status533).map((item, index) => {
        const { FZ533Profile: { Status533 } } = item
        if (!statuses.includes(Status533)) {
          statuses.push(Status533)
        }
      })
      return statuses.map((item, index) => <Option value={item} key={index}>{item}</Option>)
    }
  }

  const renderSubstatuses = () => {
    let substatuses = []
    subscriberList.SubscriberInfo.filter(item => !!item.FZ533Profile.SubStatus533).map(item => {
      const { FZ533Profile: { SubStatus533 } } = item
      if (!substatuses.includes(SubStatus533)) {
        substatuses.push(SubStatus533)
      }
    })

    return substatuses.map((item, index) => <Option value={item} key={index}>{item}</Option>)
  }

  return (
    <MainTable>
      <Row>
        <Col span={7}>
          <ControlHolder>
            <TitleHolder>Номер телефона</TitleHolder>
            <StyledMsisdnMaskedInput
              value={numberPhone}
              onChange={(elem) => isFieldChangeHandle(elem, 'numberPhone')}
              onPaste={onPaste}
              onClickRemove={onClickRemove}
            />
          </ControlHolder>
        </Col>

        <Col span={7}>
          <ControlHolder>
            <TitleHolder>Статус</TitleHolder>
            <TicketSelect
              defaultValue={DEFAULT_STATUS_FILTER_VALUE}
              value={status}
              onChange={(elem) => isFieldChangeHandle(elem, 'status')}
            >
              <Option value={DEFAULT_STATUS_FILTER_VALUE}>{DEFAULT_STATUS_FILTER_VALUE}</Option>
              { subscriberListState.subscriberStatuses && subscriberListState?.subscriberList?.SubscriberInfo && renderStatuses() }
            </TicketSelect>
          </ControlHolder>
        </Col>

        <Col span={7}>
          {isActTabActive && (
            <ControlHolder>
              <TitleHolder>Подстатус</TitleHolder>
              <TicketSelect
                defaultValue={DEFAULT_STATUS_FILTER_VALUE}
                value={substatus}
                onChange={(elem) => isFieldChangeHandle(elem, 'substatus')}
              >
                <Option value={DEFAULT_STATUS_FILTER_VALUE}>{DEFAULT_STATUS_FILTER_VALUE}</Option>
                { subscriberListState?.subscriberList?.SubscriberInfo && renderSubstatuses() }
              </TicketSelect>
            </ControlHolder>
          )}
        </Col>

        <Col span={3}>
          <ButtonGroupContainer>
            <ControlHolder >
              <FilterButton
                onClick={isButtonCleanClickHandle}
              >
                Очистить
              </FilterButton>
            </ControlHolder>
          </ButtonGroupContainer>
        </Col>
      </Row>
    </MainTable>
  )
}

export default AbonentsFilter

const MainTable = styled.div`
  padding: 0 16px 20px;
`

const TitleHolder = styled.label`
  margin: 5px;
  font-size: 14px;
  color: black;
  font-weight: normal;
  min-width: max-content;
`

const ControlHolder = styled.div`
  margin: 5px;
  display: flex;
`

const StyledMsisdnMaskedInput = styled(MsisdnMaskedInput)`
  width: 100%;
  text-align: left;
`

const TicketSelect = styled(Select)`
  width: 100%;
`

const ButtonGroupContainer = styled.div`
  text-align: right;
`

const FilterButton = styled(Button)`
  margin-left: auto;
`
