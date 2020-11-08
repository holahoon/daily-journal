import { Typography } from "@material-ui/core";
import { getDate } from "utils/getDate";

export default function JournalDisplay({
  classes,
  journalData,
  selectedJournalIndex,
}) {
  console.log(journalData[selectedJournalIndex]);

  const journalContent = journalData[selectedJournalIndex]?.data.journal;
  const timestamp = journalData[selectedJournalIndex]?.data.timestamp;
  const { year, month, date, day, hour, minute, term } = getDate(timestamp);
  return (
    <div className={classes.journalPage}>
      {journalData && (
        <div className={classes.journalContainer}>
          <Typography variant='h5' component='h2' className={classes.cardDate}>
            <span className={classes.date}>{date}</span> {month} {year},{" "}
            <span className={classes.day}>{day}</span>
          </Typography>
          <p>{journalContent}</p>
        </div>
      )}
    </div>
  );
}
