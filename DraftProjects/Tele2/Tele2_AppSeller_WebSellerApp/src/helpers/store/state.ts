import { StateDocumentIdentity } from 'common/documentIdentity/state';
import { StateSigning } from 'common/signing/state';
import { StateSalesOffice } from 'features/salesOffice/state';

export type State = {
  webseller: {
    salesOffice: StateSalesOffice;
    documentIdentity: StateDocumentIdentity;
    signing: StateSigning;
  };
  // TODO state из crm
  [key: string]: any;
};
