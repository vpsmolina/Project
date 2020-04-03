import { EIncidentActions } from "../actions/incident.actions";
import { EUserActions, UserActions } from "../actions/user.actions";
import { initialUserState, UserState } from "../state/user.state";

export function userReducers(state: UserState = initialUserState,
                             action: UserActions): UserState {
  switch (action.type) {
    case EUserActions.GetUsersSuccess: {
      return {
        ...state,
        users: action.payload,
        count: action.payload.length
      };
    }
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        selectedUser: action.payload
      };
    }
    case EUserActions.CreateUserSuccess: {
      return {
        ...state,
        count: state.users.push(action.payload)
      };
    }
    case EUserActions.DeleteUserSuccess: {
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    }
    case EUserActions.UpdateUserSuccess: {
      state.users.forEach(user => {
        if (user._id === action.payload._id) {
          user = {
            ...action.payload.data
          };
        }
      });
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
