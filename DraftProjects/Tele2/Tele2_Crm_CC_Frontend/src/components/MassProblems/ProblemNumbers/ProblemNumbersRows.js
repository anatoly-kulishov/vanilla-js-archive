/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip, Row, Col } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { isNil, isEqual } from 'lodash'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import { MassProblemMsisdnStatusProps } from 'constants/massProblems'

export default class ProblemNumbersRows extends Component {
  static propTypes = {
    form: PropTypes.object,
    isIssuesMsisdnOn: PropTypes.bool,
    keys: PropTypes.array,
    msisdn: PropTypes.number,
    fetchSubscriberInfo: PropTypes.func.isRequired,
    modifyMsisdnStatus: PropTypes.func.isRequired,
    msisdnStatusArray: PropTypes.arrayOf(MassProblemMsisdnStatusProps).isRequired
  }

  componentDidUpdate (prevProps) {
    const { msisdnStatusArray, form: { validateFields } } = this.props

    if (!isEqual(msisdnStatusArray, prevProps.msisdnStatusArray)) {
      validateFields({ force: true })
    }
  }
  checkMsisdnLength = msisdn => msisdn.length === 11

  pasteMsisdn = (value, key) => {
    const {
      form: {
        setFieldsValue,
        validateFields
      },
      fetchSubscriberInfo
    } = this.props

    setFieldsValue({ [`MSISDN[${key}]`]: value })

    const isMsisdn = this.checkMsisdnLength(value)

    if (isMsisdn) {
      fetchSubscriberInfo({ key, msisdn: value })
    }

    validateFields({ force: true })
  }

  copyMsisdn = key => {
    const {
      msisdn,
      form: {
        setFieldsValue,
        validateFields
      },
      fetchSubscriberInfo
    } = this.props

    setFieldsValue({ [`MSISDN[${key}]`]: msisdn })

    const isMsisdn = this.checkMsisdnLength(msisdn)

    if (isMsisdn) {
      fetchSubscriberInfo({ key, msisdn })
    }
    validateFields({ force: true })
  }

  validateAnonimAbonent = (key, rule, value, callback) => {
    const { form: { validateFields }, msisdnStatusArray } = this.props

    const msisdnStatusObject = msisdnStatusArray[key]
    const isMsisdn = this.checkMsisdnLength(value)

    if (isMsisdn && !isNil(msisdnStatusObject) && value === msisdnStatusObject.msisdn) {
      if (msisdnStatusObject && msisdnStatusArray.find((item, index) => {
        return index !== key && item.msisdn === value
      })) {
        callback('Ввод одинаковых номеров недопустим')
        validateFields([rule.field])
      }
      if (msisdnStatusObject.isAnonymous) {
        callback('Номер не принадлежит Tele2')
        validateFields([rule.field])
      }
    }

    callback()
    validateFields([rule.field])
  }

  onChangeProblemNumber = (msisdn, key) => {
    const { fetchSubscriberInfo } = this.props

    const isMsisdn = this.checkMsisdnLength(msisdn)

    if (isMsisdn) {
      fetchSubscriberInfo({ msisdn, key })
    }
  }

  onClickRemove = key => {
    const {
      form: {
        setFieldsValue,
        validateFields
      },
      modifyMsisdnStatus
    } = this.props

    setFieldsValue({ [`MSISDN[${key}]`]: '' })
    modifyMsisdnStatus(key)
    validateFields({ force: true })
  }

  render () {
    const {
      keys,
      form: { getFieldDecorator },
      isIssuesMsisdnOn
    } = this.props

    return (
      keys.map(key => {
        return (
          isIssuesMsisdnOn && (
            <StyledRow type='flex'>
              <Col span={22}>
                <Form.Item key={key}>
                  {getFieldDecorator(`MSISDN[${key}]`, {
                    validateTrigger: ['onChange'],
                    rules: [
                      { required: key === 0, message: 'Поле обязательно для заполнения!' },
                      { min: 11, message: 'Введите корректный номер' },
                      { validator: (rule, value, callback) => this.validateAnonimAbonent(key, rule, value, callback) }
                    ],
                    onChange: msisdn => this.onChangeProblemNumber(msisdn, key)
                  })(
                    <MsisdnMaskedInput
                      onClickRemove={() => this.onClickRemove(key)}
                      onPaste={value => this.pasteMsisdn(value, key)}
                      noAutoFocus={key !== 0}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item colon={false}>
                  <Tooltip placement='bottomRight' title='Вставить номер из активной карточки'>
                    <StyledCopyIcon onClick={() => this.copyMsisdn(key)} />
                  </Tooltip>
                </Form.Item>
              </Col>
            </StyledRow>
          )
        )
      })
    )
  }
}

const StyledRow = styled(Row)`
  height: 55px;
`
const StyledCopyIcon = styled(CopyOutlined)`
  font-size: 22px;
`
