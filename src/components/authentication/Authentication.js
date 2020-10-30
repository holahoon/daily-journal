import { Link } from "react-router-dom";

import { authService } from "utils/firebaseInstance";

function Authentication() {
  const onLogOutHandler = () => {
    authService.signOut();
  };

  return (
    <div>
      <Link to='/auth'>log in</Link>
      <button onClick={onLogOutHandler}>log out</button>
    </div>
  );
}

export default Authentication;
