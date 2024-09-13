import { IResponseInvestClosingStatement } from '@/shared';

export const creationDataArray = (data: IResponseInvestClosingStatement) => {
  return [
    data.localdate,
    `${data.customerLastName} ${data.customerFirstName} ${data.customerMiddleName}`,
    `${data.passportSeries} ${data.passportNumber}`,
    data.passportIssuedBy,
    data.passportDepartmentCode,
    data.passportDateOfIssue,
    data.brokerAccountName,
    data.depoAccountRegNumber,
  ];
};
