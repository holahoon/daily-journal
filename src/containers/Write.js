import { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import firebaseDB from "utils/firebaseInstance";

export default withRouter(function Write({ match }) {
  const [messageInputValue, setMessageInputValue] = useState("");
  const { userData } = useAuthStateValue()[0];
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match.params.docId && userData) {
      GetJournal(userData.uid, match.params.docId);
    }
  }, [userData, match]);

  const onChangeHandler = (e) => {
    setMessageInputValue(e.target.value);
  };

  const onCancelHandler = () => {
    history.push("/");
  };

  const onSaveHandler = () => {
    // Create a database collection as the following = [users] -> [userId] -> [daily-journals] -> {data object}
    if (userData) {
      if (match.params.docId) {
        // Edit
        firebaseDB
          .collection("users")
          .doc(userData.uid)
          .collection("daily-journals")
          .doc(match.params.docId)
          .update({
            journal: messageInputValue,
          })
          .then(() => {
            history.push("/");
          })
          .catch((err) => console.log(err));
      } else {
        // Write new
        firebaseDB
          .collection("users")
          .doc(userData.uid)
          .collection("daily-journals")
          .add({
            journal: messageInputValue,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            history.push("/");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const GetJournal = (uid, docId) => {
    firebaseDB
      .collection("users")
      .doc(uid)
      .collection("daily-journals")
      .doc(docId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          setMessageInputValue(doc.data().journal);
        } else {
          console.log("No such document!");
        }
      });
  };

  return (
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
