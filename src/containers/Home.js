import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

import CalendarComponent from "components/calendar/CalendarComponent";
import ContentCard from "components/contentCard/ContentCard";
import ContentModal from "components/contentModal/ContentModal";
import firebaseDB from "utils/firebaseInstance";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";

function Home() {
  const { userData } = useAuthStateValue()[0];
  const [journalData, setJournalData] = useState([]);
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

  const onToggleModalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onEditHandler = () => {
    history.push("/write");
  };

  const onDeleteHandler = (id) => {
    firebaseDB
      .collection("users")
      .doc(userData.uid)
      .collection("daily-journals")
      .doc(id)
      .delete();
  };

  console.log("home");
  return (
    <div className={classes.home}>
      <CalendarComponent />
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
            journalData={data}
            onToggleModal={onToggleModalHandler}
            onEdit={onEditHandler}
            onDelete={onDeleteHandler}
          />
        ))}
      </div>

      <ContentModal
        journalData={journalData}
        isModalOpen={isModalOpen}
        onToggleModal={onToggleModalHandler}
      />
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
    width: "100%",
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
});

export default Home;
