/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Radio } from 'antd'

import ExpandableTable from 'components/ExpandableTable'

import { faultsTableAdditionalColumns } from './faultsTableData'

const { Group: RadioButtonGroup, Button: RadioButton } = Radio

export default function FaultsTable ({ dataSource, columns }) {
  FaultsTable.propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array
  }

  const hasOpenedFaults = useMemo(() => {
    return dataSource.some(item => !item.FactEndDateTime)
  }, [dataSource])

  const defaultFaultsType = hasOpenedFaults ? 'opened' : 'all'

  const [selectedFaultsType, setSelectedFaultsType] = useState(defaultFaultsType)

  const radioOptions = [
    { value: 'all', label: 'Все' },
    { value: 'opened', label: 'Открытые', disabled: !hasOpenedFaults }
  ]

  return (
    <StyledExpandableTable
      rowClassName={(record, index) => (record.FactEndDateTime ? 'finished' : '')}
      columns={columns}
      additionalColumns={faultsTableAdditionalColumns}
      dataSource={dataSource.filter(item => {
        if (selectedFaultsType === 'opened') {
          return !item.FactEndDateTime
        }
        return true
      })}
      title='Аварии'
      additionalActions={[
        <RadioButtonGroup onChange={({ name, value }) => setSelectedFaultsType(value)} defaultValue={defaultFaultsType}>
          {radioOptions.map(({ value, label, disabled }) => (
            <RadioButton key={value} value={value} disabled={disabled}>
              {label}
            </RadioButton>
          ))}
        </RadioButtonGroup>
      ]}
    />
  )
}

const StyledExpandableTable = styled(ExpandableTable)`
  .finished {
    opacity: 0.7;
  }
`
