import { getDate } from "utils/getDate";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Delete } from "@material-ui/icons";

export default function ContentCard({ dateObject, contentArray }) {
  const current_year = getDate("YEAR");
  const current_month = getDate("MONTH");
  const current_date = getDate("DATE");
  const current_day = getDate("DAY");
  const current_hour = getDate("HOUR");
  const current_minute = getDate("MINUTE");
  const current_term = getDate("TERM");

  const classes = useStyles();

  console.log(contentArray);
  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        <Typography variant='h5' component='h2' className={classes.cardDate}>
          {current_date} {current_month} {current_year}, {current_day}
        </Typography>

        <ul>
          {contentArray.map(({ title, description }, i) => (
            <Typography component='li' key={i} className={classes.cardLi}>
              <div>
                <Typography
                  variant='h6'
                  component='h3'
                  className={classes.cardTitle}
                >
                  {title}
                  <Typography
                    variant='body2'
                    component='span'
                    className={classes.cardTime}
                  >
                    ({current_hour}:{current_minute} {current_term})
                  </Typography>
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  className={classes.cardDescription}
                >
                  {description}
                </Typography>
              </div>
              <div>
                <Button className={classes.cardButton}>
                  <Edit className={classes.cardEdit} />
                </Button>
                <Button className={classes.cardButton}>
                  <Delete className={classes.cardDelete} />
                </Button>
              </div>
            </Typography>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles({
  cardContainer: {
    width: "40vw",
    marginBottom: "10px",
  },
  cardLi: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  cardDate: {
    fontSize: "1.3rem",
  },
  cardTitle: {
    fontSize: "1.15rem",
  },
  cardTime: {
    marginLeft: "10px",
    color: "#A4A9A7",
  },
  cardDescription: {
    fontSize: "1rem",
  },
  cardButton: {
    minWidth: "20px",
  },
  cardEdit: {
    width: "1rem",
    height: "1rem",
    fill: "#AFEF8D",
  },
  cardDelete: {
    width: "1rem",
    height: "1rem",
    fill: "#EF6663",
  },
});
