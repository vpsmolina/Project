// tslint:disable-next-line:file-name-casing
import { User } from "./user";

export interface RegisterResponse {
  success: boolean;
  msg: string;
  token: string;
  login: string;
  id: string;
  user?: User;
}
