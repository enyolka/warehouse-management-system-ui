import { ProductTemplateFormModel } from "../../components/productTable/types";

export type ProductTemplateSetStore = {
  loading: boolean;
  data: ProductTemplateFormModel[];
  error: string;
}
