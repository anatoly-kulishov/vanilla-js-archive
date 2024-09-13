import React, { useEffect } from 'react'
import { Form, Tooltip } from 'antd'
import { array, object, func } from 'prop-types'
import styled from 'styled-components'
import mnpQuestionaryConstants from '../constants/mnpQuestionaryConstants'
import { numSorter } from 'utils/helpers'

import { InfinityIcon } from 'assets'

const { Item } = Form

const MnpQuestionnaireForm = ({ form, dataSource, controlGroup, savedMnpQuestions, saveMnpQuestionary }) => {
  MnpQuestionnaireForm.propTypes = {
    form: object,
    dataSource: array,
    controlGroup: array,
    savedMnpQuestions: object,
    saveMnpQuestionary: func
  }

  const { setFieldsValue } = form

  const questionaryGroupRender = groupId => {
    return dataSource
      ?.filter(({ GroupId }) => GroupId === groupId)
      ?.sort((prev, next) => numSorter(prev.Position, next.Position))
      .map(
        ({
          ControlTypeName,
          Caption,
          QuestionName,
          QuestionId,
          IsRequired,
          Params,
          Data,
          GroupId,
          GroupVerticalPosition,
          GroupHorisontalPosition,
          Tooltip: TooltipText,
          ...rest
        }) => {
          const Control = mnpQuestionaryConstants.controls[ControlTypeName]

          const options =
            Params &&
            Params.map(({ Position, Value }) => ({
              value: Position,
              label: Value
            }))

          const createMessage = fieldName => 'Поле ' + fieldName + ' не должно быть пустым!'
          const itemLabel = QuestionName === 'FreeInput' ? '' : Caption
          const itemPlaceholder = Caption
          let labelCol = ControlTypeName === 'Checkbox' ? { span: 20 } : { span: 8 }
          let wrapperCol = ControlTypeName === 'Checkbox' ? { span: 4 } : { span: 16 }

          const rules = [
            {
              required: IsRequired,
              message: createMessage(Caption)
            }
          ]

          const getInitialValue = () => {
            if (Data) {
              if (ControlTypeName === 'Checkbox') {
                return Data === 'true' || Data === '1'
              }
              if (isNaN(+Data)) {
                return Data
              } else return +Data
            } else return null
          }

          const getValuePropName = () => {
            let valuePropName = 'value'
            if (ControlTypeName === 'Checkbox') {
              valuePropName = 'checked'
            }
            return valuePropName
          }

          const getControlStyle = () => {
            let style = { width: '100%' }
            if (ControlTypeName === 'Checkbox') {
              style = null
            }
            return style
          }

          const itemLabelRender = () => {
            return (
              <LabelWrapper>
                <div>{itemLabel}</div>
                {
                  (itemLabel === 'Минуты' || itemLabel === 'SMS' || itemLabel === 'Интернет') &&
                  <StyledInfinityIcon onClick={() => setFieldsValue({ [QuestionId]: -1 })} />
                }
              </LabelWrapper>
            )
          }

          const onChange = (value) => {
            if (value && value < 0) {
              setFieldsValue({ [QuestionId]: 0 })
            }
          }

          return (
            <Tooltip title={TooltipText} placement='topLeft'>
              <FormItem
                name={QuestionId}
                rules={rules}
                initialValue={getInitialValue()}
                label={itemLabelRender()}
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                labelAlign='left'
                valuePropName={getValuePropName()}
              >
                <Control
                  allowClear
                  style={getControlStyle()}
                  noAutoFocus
                  placeholder={itemPlaceholder}
                  {...rest}
                  options={options}
                  onChange={onChange}
                  onClickRemove={() => setFieldsValue({ [QuestionName]: '' })}
                />
              </FormItem>
            </Tooltip>
          )
        }
      )
  }

  const controlGroupCounter = Math.max.apply(
    null,
    controlGroup?.map(item => item?.GroupHorisontalPosition)
  )

  useEffect(() => {
    if (savedMnpQuestions) {
      form.setFieldsValue(savedMnpQuestions)
    }
  }, [])

  return (
    <StyledForm
      form={form}
      labelAlign='left'
      colon={false}
      onValuesChange={(__, allValues) => saveMnpQuestionary(allValues)}
    >
      <GridTable groupCount={controlGroupCounter}>
        {controlGroup?.map(group => {
          return (
            <ColumnWrapper
              key={group?.GroupId}
              gridColumn={group.GroupHorisontalPosition}
              gridRow={group.GroupVerticalPosition}
            >
              <SubHeader>{group?.GroupName}</SubHeader>
              {questionaryGroupRender(group?.GroupId)}
            </ColumnWrapper>
          )
        })}
      </GridTable>
    </StyledForm>
  )
}

export default MnpQuestionnaireForm

const GridTable = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ groupCount }) => (groupCount > 3 ? 3 : groupCount)}, 1fr);
  grid-column-gap: 40px;
`
const ColumnWrapper = styled.div`
  grid-column: ${({ gridColumn }) => `${gridColumn}`};
  grid-row: ${({ gridRow }) => `${gridRow}`};
`
const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding: 0;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
  .ant-form-item label {
    white-space: break-spaces;
  }
`
const SubHeader = styled.h4`
  padding: 6px 0px;
  font-size: 14px;
  font-weight: bold;
`
const FormItem = styled(Item)`
  label {
    width: 100%;
    height: auto;
  }
`

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const StyledInfinityIcon = styled(InfinityIcon)`
  width: 18px;
  :hover {
    cursor: pointer;
  }
`
