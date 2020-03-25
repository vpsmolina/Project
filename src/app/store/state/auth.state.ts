import { User, UserAuth } from "../../models/user";

export interface AuthState {
  user: User;
  login?: string;
  token: string;
  isLogged: boolean;
}
export const initialAuthState: AuthState = {
  user: null,
  token: null,
  login: null,
  isLogged: false
};
