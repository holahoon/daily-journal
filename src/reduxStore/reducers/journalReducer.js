/* Journal Reducers */
import * as actionTypes from "shared/actionTypes/actionTypes";

const initialState = {
  journals: [],
  journalWritten: false,
  error: null,
  loading: false,
};

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const start = (state) => {
  return updateObject(state, { error: null, loading: true });
};

// const getStart = (state) => {
//   return updateObject(state, { error: null, loading: true });
// };

const getSuccess = (state, action) => {
  return updateObject(state, {
    journals: action.journalsData,
    journalWritten: false,
    error: null,
    loading: false,
  });
};

const writeSuccess = (state) => {
  return updateObject(state, {
    journalWritten: true,
    error: null,
    // loading: false,
  });
};

const successWithoutAction = (state) => {
  return updateObject(state, {
    journalWritten: false,
    error: null,
    // loading: false,
  });
};

const fail = (state, action) => {
  return updateObject(state, {
    journalWritten: false,
    error: action.error,
    loading: false,
  });
};

const emptyJournal = (state) => {
  return updateObject(state, {
    journals: [],
    journalWritten: false,
    error: null,
    loading: false,
    // redirectPath: "/",
  });
};

export const journalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_JOURNALS_START:
      return start(state);
    case actionTypes.GET_JOURNALS_SUCCESS:
      return getSuccess(state, action);
    case actionTypes.GET_JOURNALS_FAIL:
      return fail(state, action);
    case actionTypes.WRITE_JOURNAL_START:
      return start(state);
    case actionTypes.WRITE_JOURNAL_SUCCESS:
      return writeSuccess(state);
    case actionTypes.WRITE_JOURNAL_FAIL:
      return fail(state, action);
    case actionTypes.EDIT_JOURNAL_START:
      return start(state);
    case actionTypes.EDIT_JOURNAL_SUCCESS:
      return writeSuccess(state);
    case actionTypes.EDIT_JOURNAL_FAIL:
      return fail(state, action);
    case actionTypes.DELETE_JOURNAL_START:
      return start(state);
    case actionTypes.DELETE_JOURNAL_SUCCESS:
      return successWithoutAction(state);
    case actionTypes.DELETE_JOURNAL_FAIL:
      return fail(state, action);
    case actionTypes.EMPTY_JOURNALS_ON_LOGOUT:
      return emptyJournal(state);
    // case actionTypes.SET_REDIRECT_PATH:
    //   return redirectPath(state, action);
    default:
      return state;
  }
};
