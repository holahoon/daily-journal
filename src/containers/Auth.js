import { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@material-ui/core";
import { Face, Fingerprint, PersonAdd } from "@material-ui/icons";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import useAuthState from "hooks/useState/useAuthState";
import { authService } from "utils/firebaseInstance";

export default function Auth() {
  const { userData } = useAuthStateValue()[0];
  const [form, onChangeHandler] = useAuthState({
    userName: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [authError, setAuthError] = useState("");
  const classes = useStyles();

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

  const signUpHandler = async (email, password, userName) => {
    await authService
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Update displayName when signing up
        return authUser.user.updateProfile({ displayName: userName });
      })
      .catch((error) => setAuthError(error.message));
  };

  const logInHander = async (email, password) => {
    await authService
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch((error) => setAuthError(error.message));
  };

  const toggleAuthMethod = () => {
    setIsNewAccount((prev) => !prev);
  };

  return (
    <>
      {userData ? (
        // Redirect the user to the main page if the user is already || has logged in || just signed up
        <Redirect to='/' />
      ) : (
        <Paper elevation={2} className={classes.paper}>
          <FormControl autoComplete='off' fullWidth className={classes.form}>
            {isNewAccount && (
              <Box
                display='flex'
                alignItems='center'
                className={classes.userNameBox}
              >
                <PersonAdd />
                <TextField
                  label='User Name'
                  variant='outlined'
                  type='text'
                  name='userName'
                  value={form.userName}
                  onChange={onChangeHandler}
                />
              </Box>
            )}
            <Box
              display='flex'
              alignItems='center'
              className={classes.emailBox}
            >
              <Face />
              <TextField
                label='Email'
                variant='outlined'
                type='text'
                name='email'
                value={form.email}
                onChange={onChangeHandler}
              />
            </Box>
            <Box
              display='flex'
              alignItems='center'
              className={classes.passwordBox}
            >
              <Fingerprint />
              <TextField
                label='Password'
                variant='outlined'
                type='password'
                name='password'
                value={form.password}
                onChange={onChangeHandler}
              />
            </Box>
            <Button
              variant='outlined'
              className={classes.toggleButton1}
              onClick={onSubmitHandler}
            >
              {isNewAccount ? "sign up" : "login"}
            </Button>
          </FormControl>
          <Typography variant='body1' className={classes.errorMessage}>
            {authError}
          </Typography>

          <Box display='flex' alignItems='center' className={classes.toggleBox}>
            <Typography variant='h6' className={classes.toggleMessage}>
              {!isNewAccount ? "First time here?" : "Have we met before?"}
            </Typography>
            <Button
              variant='outlined'
              className={classes.toggleButton2}
              onClick={toggleAuthMethod}
            >
              {!isNewAccount ? "Sign Up" : "Log In"}
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
}

const useStyles = makeStyles({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "60px",
    padding: "60px 0 90px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "600px",
    margin: "40px auto 15px",
    "& svg": {
      color: "#98CDC6",
    },
  },
  userNameBox: {
    width: "100%",
    marginBottom: "20px",
    "& .MuiTextField-root": {
      width: "100%",
      marginLeft: "10px",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CFB491",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CFB491",
    },
    "& .MuiInputLabel-outlined": {
      color: "#98CDC6",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#CFB491",
    },
    "& .MuiOutlinedInput-input": {
      color: "#5d5d5d",
    },
  },
  emailBox: {
    width: "100%",
    marginBottom: "20px",
    "& .MuiTextField-root": {
      width: "100%",
      marginLeft: "10px",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CFB491",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CFB491",
    },
    "& .MuiInputLabel-outlined": {
      color: "#98CDC6",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#CFB491",
    },
    "& .MuiOutlinedInput-input": {
      color: "#5d5d5d",
    },
  },
  passwordBox: {
    width: "100%",
    marginBottom: "20px",
    "& .MuiTextField-root": {
      width: "100%",
      marginLeft: "10px",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CFB491",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CFB491",
    },
    "& .MuiInputLabel-outlined": {
      color: "#98CDC6",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#CFB491",
    },
    "& .MuiOutlinedInput-input": {
      color: "#5d5d5d",
    },
  },
  errorMessage: {
    color: "#EF6663",
    fontSize: "0.9rem",
  },
  toggleButton1: {
    color: "#98CDC6",
    fontSize: "1.05rem",
  },
  toggleButton2: {
    color: "#CFB491",
    fontSize: "0.8rem",
  },
  toggleBox: { marginTop: "55px" },
  toggleMessage: {
    marginRight: "15px",
    fontSize: "1rem",
    color: "#CFB491",
  },
});
