export interface User {
  _id?: string;
  id?: number;
  login?: string;
  password?: string;
  position?: string;
  surname: string;
  birthday?: Date;
}
export interface UserAuth {
  login?: string;
  surname?: string;
  password?: string;
  token: string;
}
