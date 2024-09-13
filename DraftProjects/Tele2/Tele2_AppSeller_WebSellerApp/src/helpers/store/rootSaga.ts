import { all } from 'redux-saga/effects';

import sagaSalesOffice from 'features/salesOffice/sagas';
import sagaDocumentIdentity from 'common/documentIdentity/sagas';
import sagaSigning from 'common/signing/sagas';

export default function* () {
  yield all([sagaSalesOffice(), sagaDocumentIdentity(), sagaSigning()]);
}
