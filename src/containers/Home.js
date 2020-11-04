import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import CalendarComponent from "components/calendar/CalendarComponent";
import ContentCard from "components/contentCard/ContentCard";
import ContentModal from "components/contentModal/ContentModal";
import firebaseDB from "utils/firebaseInstance";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import { getDate } from "utils/getDate";

const testData = [
  {
    date: new Date(),
    contents: [
      { editedTime: "edited", description: "blah blah blah" },
      { editedTime: "editedTime 2", description: "blah blah blah" },
      {
        editedTime: "editedTime 3",
        description:
          "blah blah blah hahaha this is super fun blah blah blah hahaha this is super fun blah blah blah hahaha this is super fun blah blah blah hahaha this is super fun blah blah blah hahaha this is super fun",
      },
    ],
  },
  {
    date: new Date(),
    contents: [
      { editedTime: "editedTime 1", description: "blah blah blah" },
      { editedTime: "editedTime 2", description: "blah blah blah" },
    ],
  },
  {
    date: new Date(),
    contents: [
      { editedTime: "editedTime 1", description: "blah blah blah" },
      { editedTime: "editedTime 2", description: "blah blah blah" },
    ],
  },
];

function Home() {
  const { userData } = useAuthStateValue()[0];
  const [journalData, setJournaData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (userData) {
      const currentTime = getCurrentTime();
      firebaseDB
        .collection("users")
        .doc(userData.uid)
        .collection(currentTime)
        .orderBy("timestamp", "asc")
        .onSnapshot(
          (snapshot) =>
            snapshot.docs.map((doc) => {
              console.log(doc.data());
              return doc.data();
            })
          // setRoomMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  const onToggleModalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onEditHandler = () => {
    history.push("/write");
  };

  const onDeleteHandler = () => {
    console.log("deleting");
  };

  const getCurrentTime = () => {
    const current_year = getDate("YEAR");
    const current_month = getDate("MONTH");
    const current_date = getDate("DATE");
    return `${current_year}-${current_month}-${current_date}`;
  };

  return (
    <div className={classes.home}>
      <CalendarComponent />
      <div className={classes.cardContainer}>
        {testData.map((data, i) => (
          <ContentCard
            key={i}
            dateObject={data.date}
            contentArray={data.contents}
            onToggleModal={onToggleModalHandler}
            onEdit={onEditHandler}
            onDelete={onDeleteHandler}
          />
        ))}
      </div>

      <ContentModal
        testData={testData}
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
});

export default Home;
