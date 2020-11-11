/* Journal Action Creators */
import firebase from "firebase";
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

export const getJournalsAction = (userData) => {
  return (dispatch) => {
    dispatch(getJournalsStart());
    firebaseDB
      .collection("users")
      .doc(userData.uid)
      .collection("daily-journals")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        const fetchedJournals = [];
        snapshot.forEach((doc) => {
          fetchedJournals.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        dispatch(getJournalsSuccess(fetchedJournals));
      })
      .catch((error) => dispatch(getJournalsFail(error)));
    // .orderBy("timestamp", "desc")
    // .onSnapshot(
    //   (snapshot) => {
    //     const fetchedJournals = [];
    //     snapshot.docs.map((doc) => {
    //       return fetchedJournals.push({
    //         id: doc.id,
    //         data: doc.data(),
    //       });
    //     });
    //     dispatch(getJournalsSuccess(fetchedJournals));
    //   },
    //   (error) => dispatch(getJournalsFail(error))
    // );
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

export const writeJournalFail = (error) => {
  return {
    type: actionTypes.WRITE_JOURNAL_FAIL,
    error,
  };
};

export const writeJournalAction = (userData, messageInputValue) => {
  return (dispatch) => {
    dispatch(writeJournalStart());
    firebaseDB
      .collection("users")
      .doc(userData.uid)
      .collection("daily-journals")
      .add({
        journal: messageInputValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => dispatch(writeJournalSuccess()))
      .catch((error) => dispatch(writeJournalFail(error)));
  };
};

/* Edit Journal Actions */
export const editJournalStart = () => {
  return {
    type: actionTypes.EDIT_JOURNAL_START,
  };
};

export const editJournalSuccess = () => {
  return {
    type: actionTypes.EDIT_JOURNAL_SUCCESS,
  };
};

export const editJournalFail = (error) => {
  return {
    type: actionTypes.EDIT_JOURNAL_FAIL,
    error,
  };
};

export const editJournalAction = (userData, urlDocId, messageInputvalue) => {
  return (dispatch) => {
    dispatch(editJournalStart());
    firebaseDB
      .collection("users")
      .doc(userData.uid)
      .collection("daily-journals")
      .doc(urlDocId)
      .update({
        journal: messageInputvalue,
      })
      .then(() => dispatch(editJournalSuccess()))
      .catch((error) => dispatch(editJournalFail(error)));
  };
};
