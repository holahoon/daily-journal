import { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Button } from "@material-ui/core";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import {
  editJournalAction,
  writeJournalAction,
} from "reduxStore/actions/journalActions";
import Spinner from "components/UI/Spinner";

export default withRouter(function Write({ match }) {
  const [messageInputValue, setMessageInputValue] = useState("");

  const { userData } = useAuthStateValue()[0];

  const history = useHistory();

  const classes = useStyles();

  const journals = useSelector((state) => state.journalReducer.journals);
  const journalWritten = useSelector(
    (state) => state.journalReducer.journalWritten
  );
  const isLoading = useSelector((state) => state.journalReducer.loading);

  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (match.params.docId && userData) {
      getJournalOnLoad(journals, match.params.docId);
    }
  }, [journals, userData, match]);

  useEffect(() => {
    if (!userData || (journals && journalWritten)) {
      history.push("/");
    }
    return () => setMessageInputValue("");
  }, [journals, userData, journalWritten, history]);

  const editJournal = (userData, urlDocId, messageInputValue) => {
    reduxDispatch(editJournalAction(userData, urlDocId, messageInputValue));
  };

  const writeNewJournal = (userData, messageInputValue) => {
    reduxDispatch(writeJournalAction(userData, messageInputValue));
  };

  const getJournalOnLoad = (journalsArray, urlDocId) => {
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
    if (userData && messageInputValue) {
      if (match.params.docId) {
        editJournal(userData, match.params.docId, messageInputValue);
      } else {
        writeNewJournal(userData, messageInputValue);
      }
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
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
