import { Link } from "react-router-dom";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";

import Authentication from "components/authentication/Authentication";

export default function Navigation() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.header}>
      <nav className={classes.nav}>
        <Toolbar>
          <Typography variant='h6' className={classes.myBook}>
            <Link to='/'>MyBook</Link>
          </Typography>
          <Authentication classes={classes} />
        </Toolbar>
      </nav>
    </AppBar>
  );
}

const useStyles = makeStyles({
  header: {
    backgroundColor: "#98CDC6",
  },
  nav: {
    flexGrow: 1,
  },
  myBook: {
    flexGrow: 1,
    "& a": {
      color: "#ffffff",
      fontSize: "1.4rem",
      textDecoration: "none",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    marginRight: "30px",
    color: "#ffffff",
    fontSize: "1.3rem",
  },
  logIn: {
    textDecoration: "none",
    "& button": {
      fontSize: "1rem",
      color: "#ffffff",
      border: "1px solid #ffffff",
    },
  },
  logOut: {
    color: "#EF6663",
    fontSize: "0.8rem",
    border: "1px solid #EF6663",
  },
});
