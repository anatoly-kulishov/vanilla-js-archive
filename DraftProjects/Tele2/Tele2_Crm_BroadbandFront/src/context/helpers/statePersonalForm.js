import { DocumentFields } from '../constants/form'
import { documentInitialState } from '../constants/initialState'

const getValue = (val) => val
const startOfDay = (val) => val?.utc().startOf('day').toISOString()
const documentProcessors = {
  'DocumentTypeId': getValue,
  'Series': getValue,
  'Number': getValue,
  'IssueBy': getValue,
  'UnitCode': getValue,
  'IssueDate': startOfDay,
  'EndDate': startOfDay
}

export function processDocument (state, changedFields) {
  const prevDocument = state.orderState?.Document ?? documentInitialState
  const document = { ...prevDocument }
  for (const field of Object.keys(DocumentFields)) {
    if (field in changedFields) {
      const processor = documentProcessors[field]
      document[field] = processor(changedFields[field])
    }
  }
  return { Document: document }
}
