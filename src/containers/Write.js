import { useState } from "react";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import firebaseDB from "utils/firebaseInstance";
// import { getDate } from "utils/getDate";

export default function Write() {
  const [messageInputValue, setMessageInputValue] = useState(
    "this is a sample"
  );
  const { userData } = useAuthStateValue()[0];
  const history = useHistory();
  const classes = useStyles();

  const onChangeHandler = (e) => {
    setMessageInputValue(e.target.value);
  };

  const onCancelHandler = () => {
    history.push("/");
  };

  const onSaveHandler = () => {
    if (userData) {
      // Create a database collection as the following = [users] -> [userId] -> [daily-journals] -> {data object}
      firebaseDB
        .collection("users")
        .doc(userData.uid)
        .collection("daily-journals")
        .add({
          journal: messageInputValue,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => history.push("/"));
    }
  };

  return (
    <div>
      <div>
        <button onClick={onSaveHandler}>save</button>
        <button onClick={onCancelHandler}>cancel</button>
      </div>

      <form className={classes.form}>
        <textarea
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
}

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
