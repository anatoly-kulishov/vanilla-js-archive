import React, { Fragment } from 'react'
import { Button, Form } from 'antd'
import styled from 'styled-components'
import { func, bool } from 'prop-types'
import debounce from 'lodash/debounce'
import Confirm from '../hocs/Confirm'

const formItemShouldUpdate = (prevValues, curValues) => (
  prevValues.sum !== curValues.sum ||
  prevValues.package !== curValues.package
)

const CompensationsPromoFooter = (props) => {
  const {
    onConfirm,
    isSubmitDisabled
  } = props

  const onConfirmPromoActivationHandle = debounce(() => {
    onConfirm()
  }, 1000, { leading: true, trailing: false })

  const onConfirmPromoSmsHandle = debounce(() => {
    onConfirm(true)
  }, 1000, { leading: true, trailing: false })

  return (
    <Form.Item noStyle shouldUpdate={formItemShouldUpdate}>
      {() => {
        return (
          <Wrapper>
            <Fragment>
              <StyledLinkButton
                title='Предоставление промокода без активации с отправкой абоненту инструкции по активации в SMS'
                onClick={onConfirmPromoSmsHandle}
                type='link'
                disabled={isSubmitDisabled}
              >
                Отправить промокод в SMS
              </StyledLinkButton>
              <Confirm
                isSubmitDisabled={isSubmitDisabled}
                title='Активировать промо-код?'
                onConfirmHandle={onConfirmPromoActivationHandle}
              >
                <StyledButton
                  title='Предоставление и активация промокода'
                  type='primary'
                  disabled={isSubmitDisabled}
                >
                  Активировать
                </StyledButton>
              </Confirm>
            </Fragment>
          </Wrapper>
        )
      }}
    </Form.Item>)
}

CompensationsPromoFooter.propTypes = {
  onConfirm: func.isRequired,
  isSubmitDisabled: bool
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
`
const StyledButton = styled(Button)`
  width: 120px;
`
const StyledLinkButton = styled(Button)`
  width: 120px;
  padding: 0;
  white-space: normal;
  span {
    text-decoration: underline;
    :hover {
      text-decoration: none;
    }
  }
`
export default CompensationsPromoFooter
