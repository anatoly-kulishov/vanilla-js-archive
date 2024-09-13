export interface Benefit {
  benefitType: string;
  title: string;
  description: string;
}

// TODO: после появления EP перенести этот тип в @/shared/api/cardsApi, как тип ответа от EP
export interface Benefits {
  cardProductBenefits: Benefit[];
}
