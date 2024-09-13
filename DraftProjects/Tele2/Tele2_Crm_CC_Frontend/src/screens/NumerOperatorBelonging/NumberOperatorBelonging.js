import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { notification, Spin } from 'antd'

import LoadingSpinner from 'components/LoadingSpinner'
import CardNew from 'components/Card'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import RatingMenu from 'containers/RatingMenu'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
const { numOperatorBelongingFeatureId } = ratingFeatureIds

class NumberOperatorBelonging extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    msisdn: PropTypes.string,
    fetchWhoIsIt: PropTypes.func,
    whoIsIt: PropTypes.object,
    whoIsItMessage: PropTypes.string,
    isWhoIsItLoading: PropTypes.bool
  }

  componentDidMount = () => {
    const { form, msisdn, fetchWhoIsIt, whoIsIt } = this.props
    form.setFieldsValue({
      msisdn: msisdn
    })
    !whoIsIt && fetchWhoIsIt({ msisdn })
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSearch()
    }
  }

  onSearch = () => {
    const { form, fetchWhoIsIt } = this.props
    const { msisdn } = form.getFieldsValue()
    if (msisdn.length === 11) {
      fetchWhoIsIt({ msisdn })
    } else {
      notification.open({
        message: 'Принадлежность номера оператору',
        description: 'Некорректный формат номера',
        type: 'error'
      })
    }
  }

  onPaste = (event) => {
    const { form } = this.props
    form.setFieldsValue({
      msisdn: event
    })
  }

  onClickRemove = () => {
    const { form } = this.props
    form.setFieldsValue({
      msisdn: ''
    })
  }

  additional = [
    shouldRate(numOperatorBelongingFeatureId) && { content: <RatingMenu currentFeatureId={numOperatorBelongingFeatureId} /> }
  ]

  render () {
    const { form, whoIsIt, whoIsItMessage, isWhoIsItLoading } = this.props

    return (
      <CardNew
        header={'Принадлежность номера оператору'}
        location={location}
        additional={this.additional}
        content={
          <Wrapper>
            {form.getFieldDecorator('msisdn')(
              <MsisdnMaskInput
                isActive
                placeholder='MSISDN'
                onKeyPress={this.onKeyDown}
                onPaste={this.onPaste}
                onClickRemove={this.onClickRemove}
              />
            )}
            <Spin spinning={isWhoIsItLoading} indicator={LoadIcon}>
              {
                whoIsIt
                  ? <LabelWrapper>
                    <Label>{`Оператор: ${whoIsIt.OperatorName}`}</Label>
                    <Label>{`Регион: ${whoIsIt.RegionName}`}</Label>
                  </LabelWrapper>
                  : <Label>{whoIsItMessage}</Label>
              }
            </Spin>
          </Wrapper>
        }
      />
    )
  }
}

export default Form.create()(NumberOperatorBelonging)

const LoadIcon = <LoadingSpinner spin />

const Wrapper = styled.div`
  padding: 17px 22px 17px 13px;
`
const Label = styled.label`
  display: grid;
  padding: 2px;
`
const LabelWrapper = styled.div`
  padding: 15px 0 0 0
`
const MsisdnMaskInput = styled(MsisdnMaskedInput)`
  height: 32px;
  flex: true;
  width: 165px;
  font-size: 14px;
  text-align: left;

  & input {
    border-radius: 4px;
    border-width: 1px;
    border-color: ${props => props.isActive ? 'rgb(217, 217, 217)' : '#F5222D'};
    border-style: solid;
    
    &:hover {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${props => props.isActive ? 'rgb(110, 219, 255)' : '#F5222D'};
      border-style: solid;
      outline-color: transparent;
    }
    
    &:focus {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${props => props.isActive ? 'rgb(110, 219, 255)' : '#F5222D'};
      outline-color: transparent;
      box-shadow: ${props => props.isActive ? 'none' : '0 0 0 2px rgba(245, 34, 45, 0.2)'};
      border-style: solid;
    }
  }
`
