declare namespace Base {
  interface Address {
    addressTypeId: number;
    regionName: string;
    cityName: string;
    streetName: string;
    houseName: string;
    flatName: string;
    entrance: string;
    floor: string;
    intercom: string;
    fullAddress: string;
  }

  interface Contacts {
    typeId: number;
    positionId: number;
    data: string; // email/phone
    owner: string;
  }
}

export default Base;
