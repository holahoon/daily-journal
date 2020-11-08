import { getDate } from "utils/getDate";

export default function JournalDisplay({
  classes,
  journalData,
  selectedJournalIndex,
}) {
  const { year, month, date, day, hour, minute, term } = getDate(
    journalData[selectedJournalIndex]
  );
  console.log(selectedJournalIndex);

  return (
    <div className={classes.journal}>
      <h2>haha</h2>
      {/* <h4>{journalData.timestamp}</h4> */}
    </div>
  );
}
