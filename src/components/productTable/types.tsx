import { Status, Unit } from "../../api/apiModel";
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

export type UnitsModel = {
  label: string;
  value: Unit;
};

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
  weight: number;
  price?: number;
  unit: Unit;
};

export type ProductFormModel = {
  id: number;
  name: string;
  supplier: ClientFormModel;
  customer?: ClientFormModel;
  template: ProductTemplateFormModel;
  created_by: UserFormModel;
  length?: number;
  width?: number;
  height?: number;
  weight: number;
  price?: number;
  status?: Status;
  unit: Unit;
  logistic_unit?: number;
  acceptance_at: string;
  admission_file_url?: string;
  release_file_url?: string;
};
