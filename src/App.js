import { useEffect } from "react";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import { SET_USER, SET_USER_FAIL } from "hooks/actionType/actionType";
import { authService } from "utils/firebaseInstance";
import AppRouter from "components/route/Router";

function App() {
  const dispatch = useAuthStateValue()[1];

  useEffect(() => {
    // - Check if the user is logged in (user object will return an object if logged in)
    authService.onAuthStateChanged((user) => {
      // - Dispatch an action here instead in the Auth.js login/signup handlers because this method will re-run whenever the authentication state changes in firebase
      if (user) {
        // - If user is found (logged in)
        dispatch({
          type: SET_USER,
          userData: user,
        });
      } else {
        // - If no user is return (failed - not logged in)
        dispatch({
          type: SET_USER_FAIL,
        });
      }
    });
  }, [dispatch]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
