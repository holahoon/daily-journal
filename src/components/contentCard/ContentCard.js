import { useEffect, memo } from "react";
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

import { getDate } from "utils/getDate";

export default function ContentCard({
  journalData,
  onToggleModal,
  onEdit,
  onDelete,
}) {
  const classes = useStyles();

  useEffect(() => {
    journalData && getDatesFromData(journalData);
  }, [journalData]);

  const getDatesFromData = (data) => {
    const dateData = new Date(data.data.timestamp?.seconds * 1000);
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

  console.log(journalData.id);
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
                onClick={onToggleModal}
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
                  {journalData.data.journal}
                </Typography>
              </CardActionArea>

              {/* Buttons */}
              <Button className={classes.cardButton} onClick={onEdit}>
                <Edit className={classes.cardEdit} />
              </Button>
              <Button
                className={classes.cardButton}
                onClick={() => onDelete(journalData.id)}
              >
                <Delete className={classes.cardDelete} />
              </Button>
            </CardMedia>
          </CardContent>
        </Card>
      )}
    </>
  );
}

const useStyles = makeStyles({
  cardContainer: {
    width: "40vw",
    marginBottom: "10px",
  },
  list: {
    paddingLeft: "0",
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
