import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

import CalendarComponent from "components/calendar/CalendarComponent";
import ContentCard from "components/contentCard/ContentCard";
import ContentModal from "components/contentModal/ContentModal";
import firebaseDB from "utils/firebaseInstance";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import { getDate } from "utils/getDate";

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
          setJournalData(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [userData]);

  const onToggleModalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onEditHandler = () => {
    history.push("/write");
  };

  const onDeleteHandler = () => {
    console.log("deleting");
  };

  // const getCurrentTime = () => {
  //   const current_year = getDate("YEAR");
  //   const current_month = getDate("MONTH");
  //   const current_date = getDate("DATE");
  //   return `${current_year}-${current_month}-${current_date}`;
  // };

  const getDatesFromData = (data) => {
    const dateData = new Date(data.timestamp.seconds * 1000);
    return {
      year: getDate(dateData, "YEAR"),
      month: getDate(dateData, "MONTH"),
      date: getDate(dateData, "DATE"),
      day: getDate(dateData, "DAY"),
      hour: getDate(dateData, "HOUR"),
      minute: getDate(dateData, "MINUTE"),
      term: getDate(dateData, "TERM"),
    };
  };

  const { year, month, date, day, hour, minute, term } = getDatesFromData(
    journalData
  );

  console.log(userData);
  return (
    <div className={classes.home}>
      <CalendarComponent />
      <div className={classes.cardContainer}>
        <div className={classes.writeNew}>
          <Button variant='outlined'>
            <Link to='/write'>
              <AddCircle /> write new
            </Link>
          </Button>
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
      color: "#6d6d6d",
      textDecoration: "none",
    },
    "& .MuiSvgIcon-root": {
      color: "#98CDC6",
      marginRight: "10px",
    },
  },
});

export default Home;
