export type Status = "ACCEPTED" | "IN STOCK" | "SHIPPED";

export type User = {
  id: number;
  login: string;
  email: string;
}

export type ClientModel = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  city: string;
  street_name: string;
  street_number: string;
  zip_code: string;
}

export type ProductTemplateModel= {
  id: number;
  name: string;
  supplier:  number | ClientModel;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
};

export type ProductModel = {
  id: number;
  name: string;
  supplier: ClientModel | number;
  template: ProductTemplateModel | number;
  created_by: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  status?: Status;
  logistic_unit?: number;
};

