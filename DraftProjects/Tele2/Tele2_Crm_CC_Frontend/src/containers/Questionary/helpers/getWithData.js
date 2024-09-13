import pickBy from 'lodash/pickBy'

const controlDataItems = ['IsMultiChoiceAllowed', 'Params', 'ControlTypeName']

export function getControlsWithData (controls, values) {
  return controls
    .map(control => {
      const controlData = JSON.stringify(
        ...[
          controlDataItems.map(item => ({
            [item]: control[item]
          }))
        ]
      )
      return {
        ...control,
        Data: values[control.QuestionName]?.toString(),
        controlData
      }
    })
    .map(control => pickBy(control, (_value, key) => !controlDataItems.includes(key)))
}

export function getAnsweredQuestionsWithData (controls, values) {
  return controls
    .map(control => ({
      QuestionId: control.QuestionId,
      Data: values[control.QuestionName]?.toString()
    }))
}
