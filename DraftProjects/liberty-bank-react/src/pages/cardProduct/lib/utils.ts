import { CardProduct, GroupedCard } from '../model/types';

export const groupingDebitCardProduct = (cards: CardProduct[]) => {
  const groupedData = cards.reduce((acc: GroupedCard, curr: CardProduct) => {
    if (!acc.typeName) {
      acc.typeName = curr.typeName;
      acc.paymentSystem = [curr.paymentSystem];
      acc.transferFee = {
        ourClient: curr.transferFee.ourClient,
        partnerClient: curr.transferFee.partnerClient,
        anotherClientRu: curr.transferFee.anotherClientRu,
        anotherClientWorld: curr.transferFee.anotherClientWorld,
        onBankAccount: curr.transferFee.onBankAccount,
        byPhoneNumber: curr.transferFee.byPhoneNumber,
        minFeeWorld: [curr.transferFee.minFeeWorld],
      };
      acc.withdrawalCashFee = {
        ourBank: curr.withdrawalCashFee.ourBank,
        partnersBank: curr.withdrawalCashFee.partnersBank,
        anotherBankRu: curr.withdrawalCashFee.anotherBankRu,
        anotherBankWorld: curr.withdrawalCashFee.anotherBankWorld,
        minCashFeeWorld: [curr.withdrawalCashFee.minCashFeeWorld],
      };
      acc.costPerMonth = [curr.costPerMonth];
      acc.freeCostFrom = [curr.freeCostFrom];
      acc.servicePrice = [curr.servicePrice];
      acc.cardReissue = [curr.cardReissue];
      acc.addCardCost = [curr.addCardCost];
      acc.cashback = {
        interestPerMonth: curr.cashback.interestPerMonth,
        interestForAll: curr.cashback.interestForAll,
        interestForPartners: curr.cashback.interestForPartners,
        cashbackLimit: [curr.cashback.cashbackLimit],
      };
      acc.currency = [curr.currency];
      acc.validityTerm = curr.validityTerm;
    } else {
      if (!acc.paymentSystem.includes(curr.paymentSystem)) {
        acc.paymentSystem.push(curr.paymentSystem);
      }
      if (!acc.currency.includes(curr.currency)) {
        acc.currency.push(curr.currency);
        acc.transferFee.minFeeWorld.push(curr.transferFee.minFeeWorld);
        acc.withdrawalCashFee.minCashFeeWorld.push(curr.withdrawalCashFee.minCashFeeWorld);
        acc.costPerMonth.push(curr.costPerMonth);
        acc.freeCostFrom.push(curr.freeCostFrom);
        acc.servicePrice.push(curr.servicePrice);
        acc.cardReissue.push(curr.cardReissue);
        acc.addCardCost.push(curr.addCardCost);
        acc.cashback.cashbackLimit.push(curr.cashback.cashbackLimit);
      }
    }

    return acc;
  }, {} as GroupedCard);

  return groupedData;
};
