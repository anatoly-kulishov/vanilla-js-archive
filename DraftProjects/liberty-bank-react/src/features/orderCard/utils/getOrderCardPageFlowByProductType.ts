import { orderCardPageFlows } from '../constants/orderCardPageFlows';

export const getOrderCardPageFlowByProductType = (productType: string) => {
  switch (productType) {
    case 'Liberty Card Virtual':
    case 'Liberty Card Secure':
      return orderCardPageFlows.VIRTUAL;
    default:
      return orderCardPageFlows.DEFAULT;
  }
};
