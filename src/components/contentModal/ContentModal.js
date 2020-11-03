import { makeStyles, Modal, Fade, Backdrop } from "@material-ui/core";

export default function ContentModal({ testData, isModalOpen, onToggleModal }) {
  const classes = useStyles();

  // console.log(testData);
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={isModalOpen}
      onClose={onToggleModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={isModalOpen}>
        <div className={classes.paper}>
          <h2 id='transition-modal-title'>Transition modal</h2>
          <p id='transition-modal-description'>
            react-transition-group animates me.
          </p>
        </div>
      </Fade>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
