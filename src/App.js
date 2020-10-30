import { useEffect } from "react";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import { SET_USER, SET_USER_FAIL } from "hooks/actionType/actionType";
import { authService } from "utils/firebaseInstance";
import AppRouter from "components/route/Router";

function App() {
  const [{ userData }, dispatch] = useAuthStateValue();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // - Check if the user is logged in (user object should not be null)
      if (user) {
        // - If user if found (logged in)
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

  console.log("[App.js] ", userData);
  return (
    <>
      <AppRouter userData={userData} />
    </>
  );
}

export default App;
