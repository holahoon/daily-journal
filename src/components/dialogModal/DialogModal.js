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
      <DialogTitle className={classes.title}>Wait!</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the journal created on
        </DialogContentText>
        <DialogContentText className={classes.dateText}>
          <span>{date}</span> {month} {year}, {day} @ {hour}:{minute} {term}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onDelete}
          variant='outlined'
          className={classes.buttonDelete}
        >
          Delete
        </Button>
        <Button
          onClick={onCloseModal}
          variant='outlined'
          className={classes.buttonCancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles({
  title: {
    color: "#EF6663",
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
    color: "#EF6663",
  },
  buttonCancel: {
    color: "#CFB491",
  },
});
