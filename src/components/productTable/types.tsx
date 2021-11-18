import { ClientFormModel } from "../clientTable/types";

export type ProductTemplateFormModel = {
  id: number;
  name: string;
  supplier: ClientFormModel;
  length?: number;
  width?: number;
  height?: number;
};

export type ProductFormModel = {
  id: number;
  name: string;
  supplier: ClientFormModel;
  template: ProductTemplateFormModel;
  length?: number;
  width?: number;
  height?: number;
};
