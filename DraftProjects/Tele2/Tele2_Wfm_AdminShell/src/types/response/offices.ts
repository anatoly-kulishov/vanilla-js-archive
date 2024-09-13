declare namespace OfficesResponse {
  interface Offices {
    saleOffices: OfficeByIdInfo[];
    total: number;
  }

  interface Address {
    city: string;
    cityType: string;
    house: string;
    street: string;
    streetType: string;
  }

  interface Product {
    productId: number;
    productType: string;
    productName: string;
  }

  interface OfficeByIdInfo {
    address: Address;
    area: number;
    dealerId: number;
    officeId: number;
    macroRegionId: string;
    managerEmployeeId: string;
    managerId: number;
    managerName: string;
    managerEmail: string;
    partnerId: number;
    name: string;
    regionId: string;
    status: string;
    statusId: number;
    type: string;
    workTimePatternId: number;
    format: string;
    branchId: number;
    branchName: string;
    timeZone: number;
    email: string;
    workTime: string;
    giPlan: number;
    traffic: number;
    products: Product[];
    officeCoordinateLongitude: number | null;
    officeCoordinateLatitude: number | null;
  }
}

export default OfficesResponse;
