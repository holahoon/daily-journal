import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

import JournalDisplay from "components/journalDisplay/JournalDisplay";
import ContentCard from "components/contentCard/ContentCard";
import firebaseDB from "utils/firebaseInstance";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";

function Home() {
  const { userData } = useAuthStateValue()[0];
  const [journalData, setJournalData] = useState([]);
  const [selectedJournalIndex, setSelectedJournalIndex] = useState(0);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      firebaseDB
        .collection("users")
        .doc(userData.uid)
        .collection("daily-journals")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setJournalData(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            })
          )
        );
    }
  }, [userData]);

  const getJournal = (dataIndex) => {
    setSelectedJournalIndex(dataIndex);
  };

  const onEditHandler = (docId) => {
    history.push(`/write/${docId}`);
  };

  const onDeleteHandler = (docId) => {
    firebaseDB
      .collection("users")
      .doc(userData.uid)
      .collection("daily-journals")
      .doc(docId)
      .delete();
  };

  return (
    <div className={classes.home}>
      <div className={classes.writeNew}>
        <Link to='/write'>
          <Button variant='outlined'>
            <AddCircle /> write new
          </Button>
        </Link>
      </div>

      <div className={classes.container}>
        {/* Left side */}
        <div className={classes.cardContainer}>
          {journalData.map((data, i) => (
            <ContentCard
              key={i}
              dataIndex={i}
              journalData={data}
              getJournal={getJournal}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
            />
          ))}
        </div>

        {/* Right side */}
        <JournalDisplay
          classes={classes}
          journalData={journalData}
          selectedJournalIndex={selectedJournalIndex}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  home: {
    marginTop: "75px",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
    flexBasis: "100%",
    padding: "0 20px 50px",
  },
  writeNew: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "35px",
    "& a": {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    },
    "& MuiButton-label": {
      color: "#6d6d6d",
    },
    "& .MuiSvgIcon-root": {
      color: "#98CDC6",
      marginRight: "10px",
    },
  },
  container: {
    display: "flex",
  },
  journalContainer: {
    flexGrow: "1",
    flexBasis: "100%",
    padding: "0 20px 50px",
  },
  journalContent: {
    paddingBottom: "16px",
    top: "0",
  },
  journalDate: {
    padding: "10px 5px 15px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#4f4f4f",
    borderBottom: "1px solid #eeeeee",
  },
  journalDescription: {
    marginTop: "20px",
    padding: "0 5px",
    fontSize: "1.05rem",
    fontWeight: "500",
    color: "#555555",
    whiteSpace: "pre-wrap",
  },
  date: {
    color: "#98CDC6",
    marginRight: "5px",
  },
  day: {
    color: "#CFB491",
  },
  time: {
    marginLeft: "20px",
    fontSize: "0.85rem",
    color: "#4f4f4f",
  },
});

export default Home;
