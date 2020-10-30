import { SET_USER, LOG_IN, LOG_OUT } from "hooks/actionType/actionType";

export const initialState = {
  userData: null,
};

const useAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userData: action.userData,
      };
    case LOG_IN:
      return {
        ...state,
        userData: action.userData,
      };
    case LOG_OUT:
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export default useAuthReducer;
