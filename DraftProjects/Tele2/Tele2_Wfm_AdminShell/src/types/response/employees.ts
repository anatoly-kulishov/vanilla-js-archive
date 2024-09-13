declare namespace EmployeesResponse {
  interface Employee {
    employeeId: number;
    personnelNumber: string;
    name: string;
    mobilePhone: string;
    email: string;
    personId: number;
    partnerId: number;
    departmentId: number;
    department: string;
    staffUnitId: number;
    staffUnit: string;
    positionId: number;
    position: string;
    busynessTypeId: number;
    busynessType: string;
    percentage: number;
    isIntern: boolean;
    isActive: boolean;
    offices: number[];
  }
}

export default EmployeesResponse;
