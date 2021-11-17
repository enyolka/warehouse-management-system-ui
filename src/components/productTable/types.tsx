import { ClientFormModel } from "../clientTable/types";

export type ProductTemplateFormModel = {
  id: number;
  name: string;
  supplier: ClientFormModel;
  length?: number;
  width?: number;
  height?: number;
};
