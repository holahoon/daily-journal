import { useState } from "react";
import { Redirect } from "react-router-dom";

import useAuthState from "hooks/useState/useAuthState";
import { authService } from "utils/firebaseInstance";

function Auth({ userDataObject }) {
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
      // - Sign up
      authService
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: userName,
          });
        })
        .catch((error) => setAuthError(error.message));
    } else {
      // - Log in
      authService
        .signInWithEmailAndPassword(email, password)
        .then()
        .catch((error) => setAuthError(error.message));
    }
  };

  const toggleAuthMethod = () => {
    setIsNewAccount((prev) => !prev);
  };

  return (
    <>
      {userDataObject ? (
        // Redirect the user to the main page if the user is already || has logged in || just signed up
        <Redirect to='/' />
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default Auth;
