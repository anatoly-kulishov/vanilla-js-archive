import { IDetails } from '../..';

export const transformationDetailsCard = (dataDetails: IDetails[]) => {
  return dataDetails.map(({ icon, details, header }) => {
    return {
      id: icon,
      title: header,
      description: details.join(' '),
      icon: icon,
    };
  });
};
