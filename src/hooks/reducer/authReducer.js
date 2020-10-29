import { SET_USER } from "hooks/actionTypes/actionTypes";

// initial state of the user data
export const initialState = {
  user: null,
};

// user data reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default authReducer;
