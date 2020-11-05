import { Card, List, ListItem, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getDate } from "utils/getDate";
import CardDate from "components/contentCard/cardDate/CardDate";
import CardListContent from "components/contentCard/cardListContent/CardListContent";
import CardButton from "components/contentCard/cardButton/CardButton";

export default function ContentCard({
  journalData,
  onToggleModal,
  onEdit,
  onDelete,
}) {
  const current_year = getDate("YEAR");
  const current_month = getDate("MONTH");
  const current_date = getDate("DATE");
  const current_day = getDate("DAY");
  const current_hour = getDate("HOUR");
  const current_minute = getDate("MINUTE");
  const current_term = getDate("TERM");

  const classes = useStyles();

  console.log(journalData);
  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        <CardDate
          classes={classes}
          year={current_year}
          month={current_month}
          date={current_date}
          day={current_day}
        />
        {/* 
        <List className={classes.list}>
          {contentArray.map(({ editedTime, description }, i) => (
            <ListItem key={i} className={classes.cardListItem}>
              <CardListContent
                classes={classes}
                editedTime={editedTime}
                description={description}
                hour={current_hour}
                minute={current_minute}
                term={current_term}
                onToggleModal={onToggleModal}
              />

              <CardButton
                classes={classes}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </ListItem>
          ))}
        </List> */}
      </CardContent>
    </Card>
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
  cardListItem: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "0",
  },
  cardContent: {
    width: "100%",
  },
  cardContentButton: {
    padding: "10px",
  },
  cardDate: {
    padding: "0 5px",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#3d3d3d",
  },
  cardTime: {
    fontSize: "0.95rem",
    fontWeight: "bold",
    color: "#CFB491",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#555555",
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
