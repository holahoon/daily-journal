import { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";

function Invalid404({ location, history }) {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    // When timer is 0, set the timer as null(falsy) so the below code can run
    timer === 0 && setTimer(null);
    // Exit when timer is falsy
    if (!timer) {
      history.push("/");
      return;
    }

    // Timer to run run every second in decrement of 1
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, history]);

  return (
    <div>
      <h2>404 Error</h2>
      <p>no page found of the following path</p>
      <p>{location.pathname}</p>
      <span>Redirect to main page in {timer}</span>
    </div>
  );
}

export default Invalid404;
