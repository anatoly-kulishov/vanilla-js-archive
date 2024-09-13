/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import { Radio, Select } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'

import { MSISDN, RADIO, GEOPOSITION, DROPDOWN } from '../../constants/ManagerControlTypes'
import { HANDLE_CONTROL_UPDATE } from '../../constants/ControlContextActions'
import { useControlContext } from '../../ControlContext'

import { DiagnosticsProvider } from 'containers/SmartGisPanel/diagnosticsContext'
import Geoposition from '../Geoposition'

const { Group, Button } = Radio

export default function Input (props) {
  Input.propTypes = {
    item: PropTypes.object,
    height: PropTypes.number,
    technologiesGroups: PropTypes.arrayOf(PropTypes.object),
    fetchTechnologySubtechnologyLink: PropTypes.func
  }

  const {
    item,
    height,

    // TODO: Are next props really neccessary here?
    technologiesGroups,
    fetchTechnologySubtechnologyLink
  } = props

  const {
    state: { controls },
    dispatch: dispatchControlsAction
  } = useControlContext()

  useEffect(() => {
    const { Data: data, Name: name, IsRequired: isRequired } = item
    if (name.toUpperCase() !== GEOPOSITION) {
      dispatchControlsAction({ type: HANDLE_CONTROL_UPDATE, payload: { name, params: { value: data, isRequired } } })
    }
  }, [item])

  const handleControlChange = value => {
    const { Name: name, IsRequired: isRequired } = item
    dispatchControlsAction({ type: HANDLE_CONTROL_UPDATE, payload: { name, params: { value, isRequired } } })
  }

  const { Type: type, Name: name, Params: params } = item

  switch (type.toUpperCase()) {
    case RADIO:
      return (
        <RadioWrapper>
          <Group
            value={controls[name] && controls[name].value}
            onChange={event => handleControlChange(event.target.value)}
            buttonStyle='solid'
          >
            {params.map?.(param => (
              <Button key={param.Key} value={param.Key}>
                {param.Value}
              </Button>
            ))}
          </Group>
        </RadioWrapper>
      )
    case MSISDN:
      return (
        <MsisdnMaskInput
          value={controls[name] && controls[name].value}
          onChange={value => handleControlChange(value)}
          onPaste={value => handleControlChange(value)}
        />
      )
    case GEOPOSITION:
      return <DiagnosticsProvider>
        <Geoposition item={item} height={height} technologiesGroups={technologiesGroups} fetchTechnologySubtechnologyLink={fetchTechnologySubtechnologyLink} />
      </DiagnosticsProvider>
    case DROPDOWN:
      return (
        <StyledSelect onChange={value => handleControlChange(value)}>
          {params.map?.(param => <Select.Option value={param.Key}>{param.Value}</Select.Option>)}
        </StyledSelect>
      )
    default:
      return null
  }
}

const MsisdnMaskInput = styled(MsisdnMaskedInput)`
  width: 100%;
`

const RadioWrapper = styled.div`
  padding-top: 3px;
  .ant-radio-button-wrapper {
    padding: 7px 7px;
    height: unset;
  }
`
const StyledSelect = styled(Select)`
  display: flex;
  flex-direction: column;
`
