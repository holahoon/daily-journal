import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";

import { getDate } from "shared/getDate";

export default function DialogModal({
  journalId,
  onDelete,
  onCloseModal,
  isModalOpen,
}) {
  const journalsData = useSelector((state) => state.journalReducer.journals);

  const classes = useStyles();

  const journal = journalsData.filter((data) => data.id === journalId);
  const { year, month, date, day, hour, minute, term } = getDate(
    journal[0].data.timestamp
  );

  return (
    <Dialog open={isModalOpen}>
      <DialogTitle className={classes.title}>Delete Journal</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the journal created on
        </DialogContentText>
        <DialogContentText className={classes.dateText}>
          {date} {month} {year}, {day} <span>@</span> {hour}:{minute} {term}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCloseModal} className={classes.buttonCancel}>
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          variant='contained'
          className={classes.buttonDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles({
  title: {
    color: "#6d6d6d",
    paddingTop: "25px",
    paddingBottom: "5px",
  },
  dateText: {
    textAlign: "center",
    fontSize: "1.1rem",
    "& span": {
      color: "#98CDC6",
      fontWeight: "600",
    },
  },
  buttonDelete: {
    backgroundColor: "#EF6663",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#EF6663",
    },
  },
  buttonCancel: {
    color: "#CFB491",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
});
