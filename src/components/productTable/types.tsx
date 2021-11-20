import { Status } from "../../api/apiModel";
import { ClientFormModel } from "../clientTable/types";
import { UserFormModel } from "../userTable/types";

export type ProductTemplateFormModel = {
  id: number;
  name: string;
  supplier: ClientFormModel;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
};

export type ProductFormModel = {
  id: number;
  name: string;
  supplier: ClientFormModel;
  template: ProductTemplateFormModel;
  created_by: UserFormModel;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  status?: Status;
};
