const getCurrStepIdx = ({ steps, currStepType }) => {
  return steps.findIndex(step => step.key === currStepType)
}

export const getCurrStep = ({ steps, currStepType }) => {
  const currStepIdx = getCurrStepIdx({ steps, currStepType })

  return {
    idx: currStepIdx,
    render: steps[currStepIdx].render
  }
}

export const getNextStepType = ({ steps, currStepType }) => {
  const currStepIdx = getCurrStepIdx({ steps, currStepType })

  const nextStepIdx = currStepIdx + 1
  const nextStep = steps[nextStepIdx]

  return nextStep ? nextStep.key : currStepType
}

export const getPrevStepType = ({ steps, currStepType }) => {
  const currStepIdx = getCurrStepIdx({ steps, currStepType })

  const prevStepIdx = currStepIdx - 1
  const prevStep = steps[prevStepIdx]

  return prevStep ? prevStep.key : currStepType
}
