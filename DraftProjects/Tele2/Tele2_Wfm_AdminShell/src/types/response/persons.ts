declare namespace ResponsePerson {
  type Person = {
    personId: number;
    isActive: boolean;
    login: string;
    name?: string;
    email?: string;
    mobilePhone?: string;
    userId?: number;
  };
}

export default ResponsePerson;
