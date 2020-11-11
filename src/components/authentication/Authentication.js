import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";

import { authService } from "shared/firebaseInstance";
import { LOG_OUT } from "shared/actionTypes/actionTypes";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import { deleteAllJournalsAction } from "reduxStore/actions/journalActions";

export default function Authentication({ classes }) {
  const [{ userData }, dispatch] = useAuthStateValue();

  const reduxDispatch = useDispatch();

  const onLogOutHandler = () => {
    // Sign out of firebase auth
    authService.signOut();
    // Dispatch log out event to update the global state
    dispatch({
      type: LOG_OUT,
    });
    reduxDispatch(deleteAllJournalsAction());
  };

  const userName = userData ? (
    <Typography variant='h6' className={classes.userName}>
      {userData.displayName}
    </Typography>
  ) : (
    <Link to='/auth' className={classes.logIn}>
      <Button>log in</Button>
    </Link>
  );

  return (
    <div className={classes.container}>
      {userName}
      {userData && (
        <Button className={classes.logOut} onClick={onLogOutHandler}>
          log out
        </Button>
      )}
    </div>
  );
}
