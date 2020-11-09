import { useState, useEffect } from "react";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import firebaseDB from "utils/firebaseInstance";

export default withRouter(function Write({ match }) {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [isDataSet, setIsDataSet] = useState(false);
  const { userData } = useAuthStateValue()[0];
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match.params.docId && userData) {
      getJournal(userData.uid, match.params.docId);
    }
    return () => getJournal;
  }, [userData, match]);

  useEffect(() => {
    return () => {
      setIsDataSet(false);
      setMessageInputValue("");
    };
  }, []);

  const editJournal = () => {
    firebaseDB
      .collection("users")
      .doc(userData.uid)
      .collection("daily-journals")
      .doc(match.params.docId)
      .update({
        journal: messageInputValue,
      })
      .then(() => {
        setIsDataSet(true);
      })
      .catch((err) => console.log(err));
  };

  const writeNewJournal = () => {
    firebaseDB
      .collection("users")
      .doc(userData.uid)
      .collection("daily-journals")
      .add({
        journal: messageInputValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setIsDataSet(true);
      })
      .catch((err) => console.log(err));
  };

  const getJournal = (uid, docId) => {
    firebaseDB
      .collection("users")
      .doc(uid)
      .collection("daily-journals")
      .doc(docId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMessageInputValue(doc.data().journal);
        } else {
          console.log("No such document!");
        }
      });
  };

  const onChangeHandler = (e) => {
    setMessageInputValue(e.target.value);
  };

  const onCancelHandler = () => {
    history.push("/");
  };

  const onSaveHandler = () => {
    // [users] -> [userId] -> [daily-journals] -> [docId] -> {data object}
    if (userData && messageInputValue) {
      if (match.params.docId) {
        // Edit
        editJournal();
      } else {
        // Write new
        writeNewJournal();
      }
    }
  };

  return (
    <>
      {isDataSet ? (
        <Redirect to='/' />
      ) : (
        <div>
          <div>
            <button onClick={onSaveHandler}>save</button>
            <button onClick={onCancelHandler}>cancel</button>
          </div>

          <form className={classes.form}>
            <textarea
              autoFocus
              className={classes.textArea}
              rows='1'
              placeholder='Write your thoughts here...'
              name='messageText'
              value={messageInputValue}
              onChange={onChangeHandler}
            />
          </form>
        </div>
      )}
    </>
  );
});

const useStyles = makeStyles({
  form: {
    marginTop: "50px",
  },
  textArea: {
    width: "100%",
    height: "700px",
    border: "none",
  },
});
