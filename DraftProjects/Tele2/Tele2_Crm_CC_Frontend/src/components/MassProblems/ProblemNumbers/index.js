import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button } from 'antd'
import ProblemNumbersHeader from './ProblemNumbersHeader'
import ProblemNumbersRows from './ProblemNumbersRows'
import { MassProblemMsisdnStatusProps } from 'constants/massProblems'

let currentMsisdnRowIndex = 0
const defaultRowCount = 1 // по постановке 43666

class ProblemNumbers extends Component {
  static propTypes = {
    form: PropTypes.object,
    msisdnStatusArray: PropTypes.arrayOf(MassProblemMsisdnStatusProps).isRequired,
    changeMsisdnStatusArray: PropTypes.func,
    fetchSubscriberInfo: PropTypes.func,
    maxInteractionIssuesMsisdn: PropTypes.number,
    handleRegisterNoteMTP: PropTypes.func,
    isIssuesMsisdnOn: PropTypes.bool,
    msisdn: PropTypes.number
  }

  removeMsisdns = () => {
    const {
      form: {
        getFieldValue,
        setFieldsValue,
        validateFields
      },
      maxInteractionIssuesMsisdn
    } = this.props

    const keys = getFieldValue('keys')

    setFieldsValue({ keys: keys.filter(key => key === 0) })
    currentMsisdnRowIndex = 0

    this.modifyMsisdnStatus(maxInteractionIssuesMsisdn)
    validateFields({ force: true })
  }

  addMsisdns = () => {
    const {
      form: {
        getFieldValue,
        setFieldsValue
      },
      maxInteractionIssuesMsisdn
    } = this.props

    if (currentMsisdnRowIndex < maxInteractionIssuesMsisdn - defaultRowCount) { // чтобы не рендерилось больше, чем maxInteractionIssuesMsisdn строк при повторном нажатии на кнопку
      for (let index = 0; index < maxInteractionIssuesMsisdn - defaultRowCount; index++) {
        const keys = getFieldValue('keys')
        ++currentMsisdnRowIndex
        const nextKeys = keys.concat(currentMsisdnRowIndex)

        setFieldsValue({ keys: nextKeys })
      }
    }
  }

  // fieldsError.MSISDN - массив, каждый элемент которого - строка, содержащая текст ошибки, по дефолту undefined
  hasErrors = fieldsError => fieldsError.MSISDN && fieldsError.MSISDN.some(item => item)

  modifyMsisdnStatus = key => {
    const { maxInteractionIssuesMsisdn, msisdnStatusArray, changeMsisdnStatusArray } = this.props

    const modifiedMsisdnStatusArray = msisdnStatusArray

    key === maxInteractionIssuesMsisdn
      ? modifiedMsisdnStatusArray.splice(1, modifiedMsisdnStatusArray.length)
      : modifiedMsisdnStatusArray[key] = {}

    changeMsisdnStatusArray({ modifiedMsisdnStatusArray })
  }

  render () {
    const {
      isIssuesMsisdnOn,
      form,
      handleRegisterNoteMTP,
      msisdnStatusArray,
      msisdn,
      fetchSubscriberInfo
    } = this.props

    const { getFieldDecorator, getFieldValue, getFieldsError } = form

    getFieldDecorator('keys', { initialValue: [currentMsisdnRowIndex] })
    const keys = getFieldValue('keys')

    return (
      <Fragment>
        <ProblemNumbersHeader
          removeMsisdns={this.removeMsisdns}
          addMsisdns={this.addMsisdns}
          isIssuesMsisdnOn={isIssuesMsisdnOn}
        />

        <ProblemNumbersRows
          keys={keys}
          form={form}
          msisdn={msisdn}
          isIssuesMsisdnOn={isIssuesMsisdnOn}
          fetchSubscriberInfo={fetchSubscriberInfo}
          msisdnStatusArray={msisdnStatusArray}
          modifyMsisdnStatus={this.modifyMsisdnStatus}
        />

        <Wrapper>
          <Form.Item>
            <Button
              type='primary'
              onClick={handleRegisterNoteMTP}
              disabled={this.hasErrors(getFieldsError())}
            >
              Зарегистрировать
            </Button>
          </Form.Item>
        </Wrapper>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  height: 40px;
`

export default Form.create()(ProblemNumbers)
