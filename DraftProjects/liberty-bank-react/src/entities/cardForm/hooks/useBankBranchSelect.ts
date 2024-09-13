import { useEffect, useState } from 'react';
import { OrderCardFormLSKeys, orderCardFormLSApi } from '../model';

export const useBankBranchSelect = () => {
  const [selectedOfficeID, setSelectedOfficeID] = useState<string | null>(null);

  useEffect(() => {
    const savedOfficeID = orderCardFormLSApi.getValue<string>(OrderCardFormLSKeys.BANK_BRANCH_ID);

    setSelectedOfficeID(savedOfficeID);
  }, []);

  const handleSelectBranch = (officeID: string) => {
    setSelectedOfficeID(officeID);
    orderCardFormLSApi.setValue(OrderCardFormLSKeys.BANK_BRANCH_ID, officeID);
  };

  const handleClearSelectedBranch = () => {
    setSelectedOfficeID(null);
    orderCardFormLSApi.clearValue(OrderCardFormLSKeys.BANK_BRANCH_ID);
  };

  return { selectedOfficeID, handleSelectBranch, handleClearSelectedBranch };
};
