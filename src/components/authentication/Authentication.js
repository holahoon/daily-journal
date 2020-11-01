import { Link } from "react-router-dom";

import { authService } from "utils/firebaseInstance";
import { LOG_OUT } from "hooks/actionType/actionType";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";

function Authentication() {
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
    <span>{userData.displayName}</span>
  ) : (
    <Link to='/auth'>log in</Link>
  );

  return (
    <div>
      {userName}
      {userData && <button onClick={onLogOutHandler}>log out</button>}
    </div>
  );
}

export default Authentication;
