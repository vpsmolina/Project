export interface UserAuth {
  login: string;
  password: string;
}
export interface User {
  _id?: string;
  id?: number;
  login: string;
  password: string;
  position: string;
  surname: string;
  birthday: Date;
  token?: string;
}

