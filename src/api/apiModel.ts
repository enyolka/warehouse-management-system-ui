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

export type ProductTemplateModel = {
  id: number;
  name: string;
  supplier: ClientModel
  length?: number;
  width?: number;
  height?: number;
};

export type ProductTemplatePostModel = {
  id: number;
  name: string;
  supplier: number;
  length?: number;
  width?: number;
  height?: number;
};

export type ProductModel = {
  id: number;
  name: string;
  supplier: ClientModel;
  template: ProductTemplateModel;
  length?: number;
  width?: number;
  height?: number;
};

export type ProductPostModel = {
  id: number;
  name: string;
  supplier: number;
  template: number;
  length?: number;
  width?: number;
  height?: number;
};
