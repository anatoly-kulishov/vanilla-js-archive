/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Popover, InputNumber, Button, Spin } from 'antd'
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons'

const TemporaryPay = (props) => {
  const {
    temporaryPayNew,
    getTemporaryPayNew,
    addPayment,
    isTemporaryPayNewLoading,
    isTemporaryPayNewError
  } = props

  const [tpNewAmount, setTpNewAmount] = useState(0)
  const [isTpNewVisible, setTpNewVisible] = useState(false)

  const onHandleVisible = () => {
    if (!isTpNewVisible) {
      getTemporaryPayNew()
    }
    setTpNewVisible(!isTpNewVisible)
  }

  const onAcceptNewTemporaryPay = value => {
    addPayment({
      PaySum: value
    })
  }

  return (
    <Popover
      placement='bottom'
      trigger='click'
      title='Подтвердите начисление временного платежа'
      visible={isTpNewVisible}
      onVisibleChange={() => onHandleVisible()}
      content={
        <Spin indicator={<AntIcon spin />} spinning={isTemporaryPayNewLoading}>
          <Wrapper>
            {temporaryPayNew
              ? <div>
                <Fragment>
                  {`Размер временного платежа: `}
                  <InputNumber
                    size='small'
                    min={0}
                    max={temporaryPayNew.PaySumMax}
                    onChange={value => setTpNewAmount(value)}
                  />
                </Fragment>
                <div>{`Максимальный лимит: ${temporaryPayNew.PaySumMax}`}</div>
                <div>{`Срок действия: ${temporaryPayNew.PayDay} дня`}</div>
                <ButtonWrapper>
                  <Button size='small' onClick={() => setTpNewVisible(!isTpNewVisible)}>
                    Отмена
                  </Button>
                  <PrimaryButton
                    disabled={!tpNewAmount || tpNewAmount > temporaryPayNew.PaySumMax}
                    type='primary'
                    size='small'
                    onClick={() => {
                      onAcceptNewTemporaryPay(tpNewAmount)
                      setTpNewVisible(!isTpNewVisible)
                    }}
                  >
                    Подтвердить
                  </PrimaryButton>
                </ButtonWrapper>
              </div>
              : isTemporaryPayNewError
            }
          </Wrapper>
        </Spin>
      }
    >
      <StyledIcon />
    </Popover>
  )
}

export default TemporaryPay

TemporaryPay.propTypes = {
  temporaryPayNew: PropTypes.object,
  getTemporaryPayNew: PropTypes.func,
  addPayment: PropTypes.func,
  isTemporaryPayNewLoading: PropTypes.bool,
  isTemporaryPayNewError: PropTypes.string
}

const StyledIcon = styled(PlusCircleOutlined)`
  cursor: pointer;

  & svg {
    width: 20px;
    height: 20px;
  }
`
const ButtonWrapper = styled.div`
  display: block;
  text-align: right;
  margin: 3px;
`
const PrimaryButton = styled(Button)`
  margin-left: 5px;
`

const AntIcon = styled(LoadingOutlined)`
  font-size: 24;
  text-align: center;
`

const Wrapper = styled.div`
  max-width: 400px;
`
