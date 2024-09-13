import React, { useCallback } from 'react'
import { CopyOutlined } from '@ant-design/icons'
import { Button, Tooltip, message } from 'antd'

const CopyTimeSlotButton = props => {
  const { timeSlotOptions } = props

  const copyTimeSlots = useCallback(async () => {
    const timeSlotIntervals = timeSlotOptions?.map(timeSlot => timeSlot.label).join(', ')

    await navigator.clipboard.writeText(timeSlotIntervals)
    message.success('Временные интервалы скопированы')
  }, [timeSlotOptions])

  return (
    <Tooltip title='Копирование списка временных интервалов'>
      <Button>
        <CopyOutlined onClick={copyTimeSlots} />
      </Button>
    </Tooltip>
  )
}

export default CopyTimeSlotButton
