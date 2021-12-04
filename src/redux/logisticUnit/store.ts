import { LogisticUnitModel } from "../../api/apiModel";

export type LogisticUnitSetStore = {
  loading: boolean;
  data: LogisticUnitModel[];
  error: string;
}
