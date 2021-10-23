export type CustomerStore = {
  lastName: string;
  firstName: string;
  phone?: string;
  city: string;
  streetName: string;
  streetNumber: string;
  zipCode: string;
}

export type CustomersSetStore = {
  loading: boolean;
  data: CustomerStore[];
  error: string;
}
