export interface GroupedTransferFee {
  ourClient: number;
  partnerClient: number;
  anotherClientRu: number;
  anotherClientWorld: number;
  onBankAccount: number;
  byPhoneNumber: number;
  minFeeWorld: number | number[];
}

export interface GroupedWithdrawalCashFee {
  ourBank: number;
  partnersBank: number;
  anotherBankRu: number;
  anotherBankWorld: number;
  minCashFeeWorld: number | number[];
}

export interface GroupedCashback {
  interestPerMonth: number;
  interestForAll: number;
  interestForPartners: number;
  cashbackLimit: number | number[];
}
