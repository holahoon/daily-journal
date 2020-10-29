import React, { useState } from "react";

import { authService } from "utils/firebaseInstance";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChangeEventHandler = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      let authData;
      if (newAccount) {
        // create account
        authData = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // login account
        authData = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
      console.log(authData);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const toggleAccountMethod = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChangeEventHandler}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChangeEventHandler}
        />
        <input type='submit' value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>

      <span onClick={toggleAccountMethod}>
        {newAccount ? "Log In" : "Create Account"}
      </span>
    </>
  );
}

export default AuthForm;
