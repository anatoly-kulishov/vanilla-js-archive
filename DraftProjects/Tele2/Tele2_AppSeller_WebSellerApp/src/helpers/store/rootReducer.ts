import { combineReducers } from 'redux';

import reducerSalesOffice from 'features/salesOffice/reducer';
import reducerDocumentIdentity from 'common/documentIdentity/reducer';
import reducerSigning from 'common/signing/reducer';

const rootReducer = combineReducers({
  salesOffice: reducerSalesOffice,
  documentIdentity: reducerDocumentIdentity,
  signing: reducerSigning
});

export default rootReducer;
