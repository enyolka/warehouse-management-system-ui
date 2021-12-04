import { Status } from "../../api/apiModel";
import { ClientFormModel } from "../clientTable/types";
import { UserFormModel } from "../staffTable/types";

type Color =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | undefined;

export type StatusModel = {
  label: string;
  value: Status;
  color: Color;
};

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
  logistic_unit?: string;
  acceptance_at: string;
};
