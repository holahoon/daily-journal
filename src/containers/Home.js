import CalendarComponent from "components/calcendar/CalendarComponent";
import ContentCard from "components/contentCard/ContentCard";
import { makeStyles } from "@material-ui/core/styles";

function Home() {
  const testData = [
    {
      date: new Date(),
      contents: [
        { title: "title 1", description: "blah blah blah" },
        { title: "title 2", description: "blah blah blah" },
        {
          title: "title 3",
          description: "blah blah blah hahaha this is super fun",
        },
      ],
    },
    {
      date: new Date(),
      contents: [
        { title: "title 1", description: "blah blah blah" },
        { title: "title 2", description: "blah blah blah" },
      ],
    },
    {
      date: new Date(),
      contents: [
        { title: "title 1", description: "blah blah blah" },
        { title: "title 2", description: "blah blah blah" },
      ],
    },
  ];

  const classes = useStyles();

  return (
    <div className={classes.home}>
      <CalendarComponent />
      <div className={classes.cardContainer}>
        {testData.map((data, i) => (
          <ContentCard
            key={i}
            dateObject={data.date}
            contentArray={data.contents}
          />
        ))}
      </div>
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
