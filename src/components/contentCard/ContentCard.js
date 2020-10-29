import { getDate } from "utils/getDate";

function ContentCard({ dateObject, contentObject }) {
  const current_year = getDate("YEAR");
  const current_month = getDate("MONTH");
  const current_date = getDate("DATE");
  const current_day = getDate("DAY");
  const current_hour = getDate("HOUR");
  const current_minute = getDate("MINUTE");
  const current_term = getDate("TERM");

  console.log(getDate("HOUR"));
  return (
    <div>
      <h2>
        {current_date} {current_month} {current_year}, {current_day}
      </h2>
      <h3>{contentObject.title}</h3>
      <p>{contentObject.content}</p>

      <div>
        <span>
          {current_hour}:{current_minute} {current_term}
        </span>
        <div>
          <span>edit</span>
          <span>delete</span>
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
