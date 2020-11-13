import { memo } from "react";
import {
  Card,
  Button,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { getDate } from "shared/getDate";

export default memo(function ContentCard({
  journalData,
  dataIndex,
  getJournal,
  onEdit,
  onOpenModal,
}) {
  const classes = useStyles();

  const breakSentence = (sentence, count) => {
    if (sentence.length) {
      const sentenceArray = sentence.split(" ");
      return sentenceArray.length >= count
        ? sentenceArray.slice(0, count).join(" ").concat("...")
        : sentenceArray.join(" ");
    }
  };

  const { year, month, date, day, hour, minute, term } = getDate(
    journalData.data.timestamp
  );

  return (
    <>
      {journalData && (
        <Card className={classes.cardContainer}>
          <CardContent>
            {/* Card date */}
            <Typography
              variant='h5'
              component='h2'
              className={classes.cardDate}
            >
              <span className={classes.date}>{date}</span> {month} {year},{" "}
              <span className={classes.day}>{day}</span>
            </Typography>

            {/* Card content */}
            <CardMedia className={classes.cardContent}>
              <CardActionArea
                className={classes.cardContentButton}
                onClick={() => getJournal(dataIndex)}
              >
                <Typography
                  variant='h6'
                  component='h5'
                  className={classes.cardTime}
                >
                  {hour}:{minute} {term}
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  className={classes.cardDescription}
                >
                  {breakSentence(journalData.data.journal, 20)}
                </Typography>
              </CardActionArea>

              {/* Buttons */}
              <Button
                className={classes.cardButton}
                onClick={() => onEdit(journalData.id)}
              >
                <Edit className={classes.cardEdit} />
              </Button>
              <Button
                className={classes.cardButton}
                onClick={() => onOpenModal(journalData.id)}
              >
                <Delete className={classes.cardDelete} />
              </Button>
            </CardMedia>
          </CardContent>
        </Card>
      )}
    </>
  );
});

// Material ui styles hook
const useStyles = makeStyles({
  cardContainer: {
    // width: "40vw",
    width: "100%",
    marginBottom: "10px",
  },
  date: {
    color: "#98CDC6",
    marginRight: "5px",
  },
  day: {
    color: "#CFB491",
  },
  cardContent: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardContentButton: {
    padding: "10px",
  },
  cardDate: {
    padding: "0 5px",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#4f4f4f",
  },
  cardTime: {
    fontSize: "0.8rem",
    color: "#CFB491",
  },
  cardDescription: {
    marginTop: "3px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#CFB491",
  },
  cardButton: {
    minWidth: "20px",
  },
  cardEdit: {
    width: "1rem",
    height: "1rem",
    fill: "#98CDC6",
  },
  cardDelete: {
    width: "1rem",
    height: "1rem",
    fill: "#EF6663",
  },
});
