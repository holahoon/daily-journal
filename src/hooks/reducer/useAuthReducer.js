import { SET_USER, SET_USER_FAIL, LOG_OUT } from "hooks/actionType/actionType";

// - Initial user state (expect to receive an object when the user is authenticated)
export const initialState = {
  userData: null,
  userDataError: false,
};

const useAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userData: {
          displayName: action.userData.displayName,
          uid: action.userData.uid,
        },
        userDataError: false,
      };
    case SET_USER_FAIL:
      return { ...state, userData: null, userDataError: true };
    case LOG_OUT:
      return { ...state, userData: null, userDataError: false };
    default:
      return state;
  }
};

export default useAuthReducer;
