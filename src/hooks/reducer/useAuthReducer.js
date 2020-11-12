import * as actionTypes from "shared/actionTypes/actionTypes";

// - Initial user state (expect to receive an object when the user is authenticated)
export const initialState = {
  userData: null,
  userDataError: false,
  loading: false,
};

const useAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_USER_SUCCESS:
      return {
        ...state,
        userData: {
          displayName: action.userData.displayName,
          uid: action.userData.uid,
        },
        userDataError: false,
        loading: false,
      };
    case actionTypes.SET_USER_FAIL:
      return { ...state, userData: null, userDataError: true, loading: false };
    case actionTypes.LOG_OUT:
      return { ...state, userData: null, userDataError: false, loading: false };
    default:
      return state;
  }
};

export default useAuthReducer;
