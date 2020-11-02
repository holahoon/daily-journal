import { Typography } from "@material-ui/core";

export default function CardDate({ classes, year, date, month, day }) {
  return (
    <Typography variant='h5' component='h2' className={classes.cardDate}>
      <span className={classes.date}>{date}</span> {month} {year},{" "}
      <span className={classes.day}>{day}</span>
    </Typography>
  );
}
