import { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import useAuthState from "hooks/useState/useAuthState";
import { authService } from "utils/firebaseInstance";

function Auth(props) {
  const { userData } = useAuthStateValue()[0];
  const [form, onChangeHandler] = useAuthState({
    userName: "",
    email: "",
    password: "",
  });
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [authError, setAuthError] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const { userName, email, password } = form;

    if (isNewAccount) {
      // - Handle sign up
      signUpHandler(email, password, userName);
    } else {
      // - Handle log in
      logInHander(email, password);
    }
  };

  const signUpHandler = (email, password, userName) => {
    authService
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Update displayName when signing up
        return authUser.user.updateProfile({ displayName: userName });
      })
      .catch((error) => setAuthError(error.message));
  };

  const logInHander = (email, password) => {
    authService
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch((error) => setAuthError(error.message));
  };

  const toggleAuthMethod = () => {
    setIsNewAccount((prev) => !prev);
  };

  const { classes } = props;

  return (
    <>
      {userData ? (
        // Redirect the user to the main page if the user is already || has logged in || just signed up
        <Redirect to='/' />
      ) : (
        <Paper>
          <form onSubmit={onSubmitHandler}>
            {isNewAccount && (
              <input
                type='text'
                name='userName'
                value={form.userName}
                placeholder='name'
                onChange={onChangeHandler}
              />
            )}
            <input
              type='text'
              name='email'
              value={form.email}
              placeholder='Email'
              onChange={onChangeHandler}
            />
            <input
              type='password'
              name='password'
              value={form.password}
              placeholder='Password'
              onChange={onChangeHandler}
            />
            <input type='submit' value={isNewAccount ? "sign up" : "login"} />
          </form>
          <span>{authError}</span>

          <div>
            <span>
              {!isNewAccount ? "First time here?" : "Good to see you back!"}
            </span>
            <button onClick={toggleAuthMethod}>
              {!isNewAccount ? "Sign Up" : "Log In"}
            </button>
          </div>
        </Paper>
      )}
    </>
  );
}

export default Auth;
