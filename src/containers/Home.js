import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

// import CalendarComponent from "components/calendar/CalendarComponent";
import JournalDisplay from "components/journalDisplay/JournalDisplay";
import ContentCard from "components/contentCard/ContentCard";
// import ContentModal from "components/contentModal/ContentModal";
import firebaseDB from "utils/firebaseInstance";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";

function Home() {
  const { userData } = useAuthStateValue()[0];
  const [journalData, setJournalData] = useState([]);
  const [selectedJournalIndex, setSelectedJournalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    // const journalDataArray = [...journalData];
    setSelectedJournalIndex(dataIndex);
  };

  // const onToggleModalHandler = (docId) => {
  //   setIsModalOpen((prev) => !prev);
  //   if (!isModalOpen) {
  //     console.log(docId);
  //     firebaseDB
  //       .collection("users")
  //       .doc(userData.uid)
  //       .collection("daily-journals")
  //       .doc(docId)
  //       .get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           console.log("data: ", doc.data());
  //         } else {
  //           console.log("No such document!");
  //         }
  //       });
  //   }
  // };

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
      {/* <CalendarComponent /> */}
      {/* Left side */}
      <div className={classes.cardContainer}>
        <div className={classes.writeNew}>
          <Link to='/write'>
            <Button variant='outlined'>
              <AddCircle /> write new
            </Button>
          </Link>
        </div>

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

      {/* <ContentModal
        journalData={journalData}
        isModalOpen={isModalOpen}
        onToggleModal={onToggleModalHandler}
      /> */}
    </div>
  );
}

const useStyles = makeStyles({
  home: {
    display: "flex",
    marginTop: "50px",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
    flexBasis: "100%",
    padding: "0 20px",
  },
  writeNew: {
    marginBottom: "20px",
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
  journal: {
    flexGrow: "1",
    flexBasis: "100%",
    padding: "0 20px",
  },
  date: {
    color: "#98CDC6",
    marginRight: "5px",
  },
  day: {
    color: "#CFB491",
  },
  cardDate: {
    padding: "0 5px",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#4f4f4f",
  },
  // cardTime: {
  //   fontSize: "0.8rem",
  //   color: "#CFB491",
  // },
  // cardDescription: {
  //   marginTop: "3px",
  //   fontSize: "1rem",
  //   fontWeight: "bold",
  //   color: "#CFB491",
  // },
});

export default Home;
