import { useState, useEffect, useRef } from "react";
import { Typography } from "@material-ui/core";
import { getDate } from "shared/getDate";

export default function JournalDisplay({
  classes,
  journalsData,
  selectedJournalIndex,
}) {
  const [scrolled, setScrolled] = useState(false);
  const journalRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", onHandleScrollHandler);
    return () => window.removeEventListener("scroll", onHandleScrollHandler);
  });

  const onHandleScrollHandler = () => {
    const offset = window.scrollY;
    if (offset > journalRef.current.offsetTop) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const journalContent = journalsData[selectedJournalIndex]?.data.journal;
  const timestamp = journalsData[selectedJournalIndex]?.data.timestamp;
  const { year, month, date, day, hour, minute, term } = getDate(timestamp);
  const customStyle = { position: scrolled ? "sticky" : "relative" };

  return (
    <>
      {journalsData && timestamp && (
        <div className={classes.journalContainer} ref={journalRef}>
          <div className={classes.journalContent} style={customStyle}>
            <Typography
              variant='h5'
              component='h2'
              className={classes.journalDate}
            >
              <span className={classes.date}>{date}</span> {month} {year},{" "}
              <span className={classes.day}>{day}</span>
              <span className={classes.time}>
                ({hour}:{minute} {term})
              </span>
            </Typography>

            <Typography
              variant='body2'
              component='p'
              className={classes.journalDescription}
            >
              {journalContent}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
}
