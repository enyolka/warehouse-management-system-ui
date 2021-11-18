import { ProductFormModel } from "../../components/productTable/types";

export type ProductSetStore = {
  loading: boolean;
  data: ProductFormModel[];
  error: string;
}
