import { UsersList } from "../../data/users-list";
import { User } from "../../models/user";

export interface UserState {
  users: User[];
  selectedUser: User;
  count: number;
}
export const initialUserState: UserState = {
  users: UsersList,
  selectedUser: null,
  count: null,
};
