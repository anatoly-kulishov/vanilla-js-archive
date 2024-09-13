import pickBy from 'lodash/pickBy'

const controlDataItems = ['IsMultiChoiceAllowed', 'Params', 'ControlTypeName']

export function getControlsWithData (controls, values) {
  return controls?.map(control => {
    const questionControlData = JSON.stringify(
      ...[
        controlDataItems.map(item => ({
          [item]: control[item]
        }))
      ]
    )

    const questionData = values[control.QuestionId]
    const questionDataName = control?.Params?.find(param => param.Position === questionData)?.Value

    return {
      questionId: control.QuestionId,
      questionName: control.QuestionName,
      questionCaption: control.Caption,
      questionTooltip: control.Tooltip,
      questionIsRequired: control.IsRequired,
      questionPosition: control.Position,
      questionData: questionData?.toString(),
      questionDataName,
      questionControlData,
      questionGroupId: control.GroupId
    }
  }).map(control => pickBy(control, (_value, key) => !controlDataItems.includes(key)))
}
