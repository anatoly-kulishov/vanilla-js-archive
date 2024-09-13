/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { isEmpty } from 'lodash'
import { Button, notification } from 'antd'
import { useControlContext } from '../../ControlContext'

import Input from '../Input'

import { FINISH } from '../../constants/ManagerActionTypes'

export default function Control (props) {
  Control.propTypes = {
    height: PropTypes.number,
    configuration: PropTypes.object,
    handleAction: PropTypes.func,
    IsDiagnosticLoading: PropTypes.bool
  }
  const {
    height,
    handleAction,
    configuration: { controls, actions },
    IsDiagnosticLoading
  } = props

  const { state } = useControlContext()

  function handleActionClick (action) {
    const { controls } = state
    const fuckedUpControls = []
    for (const control in controls) {
      const isFieldRequired = controls[control].isRequired
      let isFiledValueEmpty
      switch (typeof controls[control].value) {
        case 'string':
          isFiledValueEmpty = isEmpty(controls[control].value)
          break
        case 'number':
          isFiledValueEmpty = controls[control].value < 0
          break
        default:
          isFiledValueEmpty = false
          break
      }

      if (isFieldRequired && isFiledValueEmpty) {
        fuckedUpControls.push(control)
      }
    }

    if (fuckedUpControls.length === 0) {
      handleAction(controls, action)
    } else {
      fuckedUpControls.forEach((fuckedUpControl) => {
        notification.error({
          message: 'Диагностика',
          description: `Ошибка ввода ${fuckedUpControl}`
        })
      })
    }
  }

  return (
    <Wrapper>
      <div>
        {Array.isArray(controls) && (
          <Controls>
            {controls.map((item, index) => (
              <Input key={index} item={item} height={height} />
            ))}
          </Controls>
        )}
      </div>
      <Actions>
        {Array.isArray(actions) &&
          actions.map((item, index) => (
            <Action
              onClick={() => handleActionClick(item)}
              key={index}
              type='link'
              disabled={IsDiagnosticLoading}
              isfinish={(item.Params === FINISH).toString()}
            >
              {item.Caption.toUpperCase()}
            </Action>
          ))}
      </Actions>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 4fr auto;
    padding: 5px 5px 5px 21px;
`
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
const Actions = styled.div`
  display: flex;

  justify-content: start;
  height: 100%;
  align-items: center;
`
const Action = styled(Button)`
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ isfinish }) =>
    isfinish === 'true' &&
    css`
      color: #ff4d4f;
      :hover {
        color: #ff7875;
      }
    `}
`
