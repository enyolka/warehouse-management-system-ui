import { UserModel } from "../../api/apiModel";

export type UserSetStore = {
  loading: boolean;
  data: UserModel[];
  error: string | boolean;
}
