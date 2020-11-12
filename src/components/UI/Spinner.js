import { CircularProgress, makeStyles } from "@material-ui/core";

export default function Spinner() {
  const classes = useStyles();
  return (
    <div className={classes.spinnerContainer}>
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  spinnerContainer: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "1",
    backgroundColor: "#ffffff80",
    transition: "all 0.2s ease",
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#98CDC6",
      width: "50px !important",
      height: "50px !important",
    },
  },
});
