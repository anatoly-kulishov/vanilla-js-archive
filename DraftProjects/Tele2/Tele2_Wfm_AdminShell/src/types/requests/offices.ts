declare namespace OfficesRequest {

  interface CreateOrModifyManagerEmployeeParams {
    employeeId: number;
    officeId: number;
    personId?: number;
    email?: string;
    name?: string;
  }
}

export default OfficesRequest;
