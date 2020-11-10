/* Journal Action Creators */
import * as actionTypes from "shared/actionTypes/actionTypes";
import firebaseDB from "shared/firebaseInstance";

/* Get Journal Actions */
export const getJournalsStart = () => {
  return {
    type: actionTypes.GET_JOURNALS_START,
  };
};

export const getJournalsSuccess = (journalsData) => {
  return {
    type: actionTypes.GET_JOURNALS_SUCCESS,
    journalsData,
  };
};

export const getJournalsFail = (error) => {
  return {
    type: actionTypes.GET_JOURNALS_FAIL,
    error,
  };
};

export const getJournals = (userData) => {
  return (dispatch) => {
    dispatch(getJournalsStart());
    firebaseDB
      .collection("users")
      .doc(userData.uid)
      .collection("daily-journals")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) => {
          const fetchedJournals = [];
          snapshot.docs.map((doc) => {
            return fetchedJournals.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          dispatch(getJournalsSuccess(fetchedJournals));
        },
        (error) => {
          dispatch(getJournalsFail(error));
        }
      );
  };
};

/* Write Journal Actions */
export const writeJournalStart = () => {
  return {
    type: actionTypes.WRITE_JOURNAL_START,
  };
};

export const writeJournalSuccess = () => {
  return {
    type: actionTypes.WRITE_JOURNAL_SUCCESS,
  };
};

export const writeJournalFail = () => {
  return {
    type: actionTypes.WRITE_JOURNAL_FAIL,
  };
};
