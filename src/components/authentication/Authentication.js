import { Link } from "react-router-dom";

import { authService } from "utils/firebaseInstance";
import { LOG_OUT } from "hooks/actionType/actionType";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";

function Authentication() {
  const dispatch = useAuthStateValue()[1];

  const onLogOutHandler = () => {
    authService.signOut();
    dispatch({
      type: LOG_OUT,
    });
  };

  return (
    <div>
      <Link to='/auth'>log in</Link>
      <button onClick={onLogOutHandler}>log out</button>
    </div>
  );
}

export default Authentication;
