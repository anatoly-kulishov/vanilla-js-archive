type DataTypes = {
  data: {
    city: string | null;
    region: string | null;
    street: string | null;
    fias_id: string;
  };
  value: string;
};

export const getAddressForType = (data: DataTypes[], type: string) => {
  switch (type) {
    case 'region':
      return data.map((el) => ({
        value: el.data.region as string,
        id: el.data.fias_id,
      }));
    case 'city':
      return data.map((el) => ({
        value: el.data.city as string,
        id: el.data.fias_id,
      }));
    case 'street':
      return data.map((el) => ({
        value: el.data.street as string,
        id: el.data.fias_id,
      }));
    default:
      return data.map((el) => ({
        value: el.value as string,
        id: el.data.fias_id,
      }));
  }
};
