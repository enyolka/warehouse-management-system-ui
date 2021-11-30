export type LoginDataStore = {
    id: number; 
    username: string;
    email: string;
    admin: boolean;
  }
  
 export type LoginStore = {
    loading: boolean;
    error: string;
    data: LoginDataStore;
  }
  