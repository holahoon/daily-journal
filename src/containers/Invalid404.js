import { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";

function Invalid404({ location, history }) {
  const [timer, setTimer] = useState(5);

  const classes = useStyles();

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
    <div className={classes.container404}>
      <Typography variant='h3'>
        Oops, <span>404</span>.
      </Typography>
      <Typography variant='h2'>no page found of the following path</Typography>
      <Typography variant='h5'>- {location.pathname}</Typography>
      <Typography variant='h4'>
        Redirect to main page in.. <span>{timer}</span>
      </Typography>
    </div>
  );
}

export default Invalid404;

const useStyles = makeStyles({
  container404: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "& h2, h3, h4, h5": {
      color: "#3d3d3d",
      "& span": {
        color: "#EF6663",
        fontWeight: "bold",
      },
    },
    "& h2": {
      fontSize: "2rem",
      marginBottom: "5px",
    },
    "& h3": {
      fontSize: "2.8rem",
      marginBottom: "15px",
    },
    "& h4": {
      fontSize: "1.8rem",
    },
    "& h5": {
      fontSize: "1.2rem",
      marginBottom: "20px",
    },
  },
});
