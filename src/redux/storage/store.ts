import { StorageModel } from "../../api/apiModel";

export type StorageSetStore = {
  loading: boolean;
  data: StorageModel;
  error: string;
}
