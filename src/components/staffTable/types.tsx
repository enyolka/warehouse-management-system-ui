export type UserFormModel = {
  id: number;
  username: string;
  email: string;
  is_staff: string;
};

export type UserCreateModel = {
  id: number;
  username: string;
  email: string;
  password: string;
};
