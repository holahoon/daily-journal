import { useState } from "react";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core";

import firebaseDB from "utils/firebaseInstance";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";

export default function Write() {
  const [messageInputValue, setMessageInputValue] = useState(
    "this is a sample"
  );
  const [{ userData }, dispatch] = useAuthStateValue();

  const classes = useStyles();

  const onChangeHandler = (e) => {
    setMessageInputValue(e.target.value);
  };

  const onSaveHandler = () => {
    console.log(userData);
    if (userData) {
      firebaseDB.collection("users").add({
        journal: messageInputValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // .doc(userData.uid)
      // .collection("journals")
      // .add({
      //   journal: messageInputValue,
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // });
    }
  };

  const onCancelHandler = () => {
    console.log("cancel");
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
