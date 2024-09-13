import React, { useCallback, useMemo } from 'react'
import { Checkbox, Tooltip } from 'antd'
import styled from 'styled-components'
import { string, func, bool, array, object } from 'prop-types'
import { formatOrderPrice } from '../helpers/broadband'
import { WarningTwoTone } from '@ant-design/icons'
import { getSelectedSpeedToTechnology } from 'helpers/speedToTechnology'

const { Group } = Checkbox

const getLabel = item =>
  item.TechnologyName + ' | ' + item.SpeedName + ' | ' + formatOrderPrice(item.ServicePrice) + ' руб.'

const propTypes = {
  value: string,
  onChange: func,
  disabled: bool,
  canBeDeselected: bool,
  speedToTechnology: array,
  orderEquipmentSpeed: object,
  isRelocation: bool,
  isRelocationInfoCompleated: bool,
  relocationInfoData: object
}

const SpeedToTechnologyBlock = props => {
  const {
    value,
    onChange,
    disabled = false,
    canBeDeselected = false,
    speedToTechnology,
    orderEquipmentSpeed,
    isRelocation,
    isRelocationInfoCompleated,
    relocationInfoData
  } = props

  const handleChange = useCallback(
    groupValue => {
      if (groupValue.length === 0 && !canBeDeselected) return

      let valueToSet

      const [currentValue, nextValue] = groupValue
      if (currentValue && !nextValue) {
        valueToSet = currentValue
      }
      if (currentValue && nextValue) {
        valueToSet = nextValue
      }

      onChange?.(valueToSet)
    },
    [canBeDeselected]
  )

  const renderActiveItem = useCallback(
    (value, label) => (
      <Checkbox value={value} key={value}>
        {label}
      </Checkbox>
    ),
    []
  )

  const renderArchiveItem = useCallback(
    (value, label) => (
      <ArchiveItemWrapper>
        <Checkbox value={value} key={value}>
          {label}
        </Checkbox>
        <Tooltip title='Архивная услуга'>
          <WarningIcon />
        </Tooltip>
      </ArchiveItemWrapper>
    ),
    []
  )

  const renderListItem = useCallback(
    item => {
      const value = item.ServiceId
      const label = getLabel(item)

      return item.IsArchiveService ? renderArchiveItem(value, label) : renderActiveItem(value, label)
    },
    [renderActiveItem, renderArchiveItem]
  )

  const renderList = useCallback(() => {
    let predicate
    let speedId

    if (isRelocation && isRelocationInfoCompleated) {
      speedId = relocationInfoData?.CurrentSpeed?.ServiceId
    } else {
      speedId = orderEquipmentSpeed?.Id
    }

    const { SpeedId, TechnologyId, IsArchiveService } =
      getSelectedSpeedToTechnology(speedToTechnology, speedId) ?? {}

    if (!orderEquipmentSpeed || !IsArchiveService) {
      predicate = speed => !speed.IsArchiveService
    } else {
      predicate = speed =>
        speed.ServiceId === orderEquipmentSpeed.Id ||
        (speed.SpeedId !== SpeedId && speed.SpeedToTechnologyId !== TechnologyId && !speed.IsArchiveService)
    }

    const filteredSpeedToTechnology = speedToTechnology?.filter(predicate)
    const list = filteredSpeedToTechnology?.map(renderListItem) ?? []

    return list
  }, [speedToTechnology, orderEquipmentSpeed, renderListItem, relocationInfoData, isRelocation, isRelocationInfoCompleated])

  const list = renderList()

  const [columnsCount, rowsCount] = useMemo(() => {
    const columnsCount = list?.length <= 3 ? 1 : 2
    const rowsCount = Math.ceil(list?.length / columnsCount)

    return [columnsCount, rowsCount]
  }, [list])

  const listValue = useMemo(() => [value], [value])

  return (
    <StyledRadioGroup
      data-tid='radio-group__broadband-form__technology'
      columnsCount={columnsCount}
      rowsCount={rowsCount}
      value={listValue}
      onChange={handleChange}
      disabled={disabled}
    >
      {list}
    </StyledRadioGroup>
  )
}

SpeedToTechnologyBlock.propTypes = propTypes

export default SpeedToTechnologyBlock

const StyledRadioGroup = styled(Group)`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(${props => props.rowsCount}, 1fr);
  grid-template-columns: repeat(${props => props.columnsCount}, 1fr);

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
`

const WarningIcon = styled(WarningTwoTone)`
  font-size: 16px;

  path:nth-child(1),
  path:nth-child(3) {
    fill: black;
  }
  path:nth-child(2) {
    fill: #eed202;
  }
`

const ArchiveItemWrapper = styled.div`
  display: flex;
  align-items: center;
`
