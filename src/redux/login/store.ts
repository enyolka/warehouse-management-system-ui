export type LoginDataStore = {
    username: string;
    email: string;
  }
  
 export type LoginStore = {
    loading: boolean;
    error: string;
    data: LoginDataStore;
  }
  