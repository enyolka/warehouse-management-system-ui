import { UserFormModel } from "../../components/userTable/types"
 
export type UserSetStore = {
  loading: boolean;
  data: UserFormModel[];
  error: string | boolean;
}
