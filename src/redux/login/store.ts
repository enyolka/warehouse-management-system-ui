export type LoginDataStore = {
    id: number; 
    username: string;
    email: string;
  }
  
 export type LoginStore = {
    loading: boolean;
    error: string;
    data: LoginDataStore;
  }
  