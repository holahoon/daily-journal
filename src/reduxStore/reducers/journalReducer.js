/* Journal Reducers */
import * as actionTypes from "shared/actionTypes/actionTypes";

const initialState = {
  journals: [],
  error: null,
  loading: false,
};

export const journalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_JOURNALS_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.GET_JOURNALS_SUCCESS:
      return {
        ...state,
        journals: action.journalsData,
        error: null,
        loading: false,
      };
    case actionTypes.GET_JOURNALS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.WRITE_JOURNAL_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.WRITE_JOURNAL_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case actionTypes.WRITE_JOURNAL_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.EDIT_JOURNAL_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.EDIT_JOURNAL_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case actionTypes.EDIT_JOURNAL_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.DELETE_JOURNAL_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.DELETE_JOURNAL_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case actionTypes.DELETE_JOURNAL_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.EMPTY_JOURNALS_ON_LOGOUT:
      return {
        ...state,
        journals: [],
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};
