export interface User {
  _id?: string;
  id?: number;
  login?: string;
  password?: string;
  position: string;
  assignee: string;
  birthday: Date;
}
