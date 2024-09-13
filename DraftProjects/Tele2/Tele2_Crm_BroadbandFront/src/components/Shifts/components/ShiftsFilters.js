import { Button, Form, Select, Tag } from 'antd'
import styled from 'styled-components'

import { useCallback, useMemo } from 'react'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { getStatusColor } from 'utils/helpers/broadbandTable'
import { StateStatus } from 'context/constants/initialState'

const { Item } = Form

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 }
}

const formItemRequired = [{ required: true }]

const tagRender = props => {
  const handleMouseDown = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <Tag color={getStatusColor(props.value)} onMouseDown={handleMouseDown} {...props}>
      {props.label}
    </Tag>
  )
}

const ShiftsFilters = ({ form, hasShifts, user, isEditable }) => {
  const {
    sessionTypeTasks,
    operatorShifts,
    createOperatorShifts,
    deleteOperatorShifts,
    changeContextState,
    autoActions
  } = useBroadbandContext()

  const { isLoading: createShiftLoading } = operatorShifts.create
  const { isLoading: finishShiftLoading } = operatorShifts.delete

  const sessionTypeTaskOptions = useMemo(
    () =>
      sessionTypeTasks?.map(item => ({
        value: item.taskTypeId,
        label: item.taskName,
        key: item.taskTypeId
      })),
    [sessionTypeTasks]
  )

  const handleCreateShift = useCallback(async () => {
    try {
      await form.validateFields().then(values => {
        createOperatorShifts(values)
        changeContextState({
          autoActions: {
            ...autoActions,
            afterCreateShifts: StateStatus.NeedAction
          }
        })
      })
    } catch {}
  }, [form])

  const handleFinishShift = useCallback(() => {
    deleteOperatorShifts({ user: user?.Login })
  }, [user])

  const renderButtons = useCallback(() => {
    if (hasShifts) {
      return (
        <>
          {isEditable && (
            <Button type='primary' onClick={handleCreateShift} loading={createShiftLoading}>
              Изменить
            </Button>
          )}

          <Button type='primary' onClick={handleFinishShift} loading={finishShiftLoading}>
            Завершить
          </Button>
        </>
      )
    }
    if (isEditable) {
      return (
        <Button type='ghost' onClick={handleCreateShift} loading={createShiftLoading}>
          Начать работу
        </Button>
      )
    }
  }, [hasShifts, isEditable])

  return (
    <Wrapper>
      <StyledForm {...formItemLayout} form={form}>
        <Grid>
          <Item name='typeId' label='Тип задания' rules={formItemRequired} requiredMark='optional'>
            <Select
              mode='multiple'
              tagRender={tagRender}
              options={sessionTypeTaskOptions}
              disabled={!isEditable}
              optionFilterProp='label'
            />
          </Item>
          <ButtonsWrapper>{renderButtons()}</ButtonsWrapper>
        </Grid>
      </StyledForm>
    </Wrapper>
  )
}

export default ShiftsFilters

const Wrapper = styled.div`
  margin-bottom: 5px;
`

const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding: 0;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 32px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;

  margin-bottom: 8px;
  padding-top: 32px;
`
