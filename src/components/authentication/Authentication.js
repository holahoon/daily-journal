import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";

import { authService } from "utils/firebaseInstance";
import { LOG_OUT } from "hooks/actionType/actionType";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";

export default function Authentication({ classes }) {
  const [{ userData }, dispatch] = useAuthStateValue();

  const onLogOutHandler = () => {
    // Sign out of firebase auth
    authService.signOut();
    // Dispatch log out event to update the global state
    dispatch({
      type: LOG_OUT,
    });
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
