import { useState, useEffect } from "react";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Button } from "@material-ui/core";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import {
  editJournalAction,
  writeJournalAction,
} from "reduxStore/actions/journalActions";

export default withRouter(function Write({ match }) {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [isDataSet, setIsDataSet] = useState(false);

  const { userData } = useAuthStateValue()[0];

  const history = useHistory();

  const classes = useStyles();

  const journals = useSelector((state) => state.journalReducer.journals);

  const dispatch = useDispatch();

  useEffect(() => {
    if (match.params.docId && userData) {
      getJournal(journals, match.params.docId);
    }
    // return () => getJournal;
  }, [journals, userData, match]);

  useEffect(() => {
    return () => {
      setIsDataSet(false);
      setMessageInputValue("");
    };
  }, []);

  const editJournal = (userData, urlDocId, messageInputValue) => {
    dispatch(editJournalAction(userData, urlDocId, messageInputValue));
  };

  const writeNewJournal = (userData, messageInputValue) => {
    dispatch(writeJournalAction(userData, messageInputValue));
  };

  const getJournal = (journalsArray, urlDocId) => {
    journalsArray.filter(
      (each) => each.id === urlDocId && setMessageInputValue(each.data.journal)
    );
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
        editJournal(userData, match.params.docId, messageInputValue);
      } else {
        // Write new
        writeNewJournal(userData, messageInputValue);
      }
    }
  };

  return (
    <>
      {isDataSet || !userData ? (
        <Redirect to='/' />
      ) : (
        <div className={classes.write}>
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

          <div className={classes.buttonContainer}>
            <Button
              variant='outlined'
              className={classes.saveButton}
              onClick={onSaveHandler}
            >
              save
            </Button>
            <Button
              variant='outlined'
              className={classes.cancelButton}
              onClick={onCancelHandler}
            >
              cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
});

const useStyles = makeStyles({
  write: {
    marginTop: "80px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
  textArea: {
    width: "100%",
    maxWidth: "900px",
    height: "550px",
    border: "none",
    color: "#3d3d3d",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  saveButton: {
    marginRight: "10px",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#98CDC6",
    "&:hover": {
      border: "1px solid #98CDC6",
    },
  },
  cancelButton: {
    marginLeft: "10px",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#EF6663",
    "&:hover": {
      border: "1px solid #EF6663",
    },
  },
});
