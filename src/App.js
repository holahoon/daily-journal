import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import * as actionTypes from "shared/actionTypes/actionTypes";
import { authService } from "shared/firebaseInstance";
import AppRouter from "components/route/Router";
import { getJournalsAction } from "reduxStore/actions/journalActions";

import "./App.css";

function App() {
  const [{ userData }, dispatch] = useAuthStateValue();

  const reduxDispatch = useDispatch();

  /* Get all journals from redux store by dispatching an action */
  const onGetJournals = useCallback(
    (userData) => {
      reduxDispatch(getJournalsAction(userData));
    },
    [reduxDispatch]
  );

  /**
   * Check if the user is logged in (user object will return an object if logged in)
   * Dispatch an action here instead in the Auth.js login/signup handlers because this method will re-run whenever the authentication state changes in firebase
   */
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // - If user is found (logged in)
        dispatch({
          type: actionTypes.SET_USER_SUCCESS,
          userData: user,
        });
      } else {
        // - If no user is return (failed - not logged in)
        dispatch({
          type: actionTypes.SET_USER_FAIL,
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      onGetJournals(userData);
    }
  }, [onGetJournals, userData]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
