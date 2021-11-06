import { ClientFormModel } from "../../components/clientTable/types"

export type ClientSetStore = {
  loading: boolean;
  data: ClientFormModel[];
  error: string;
}
