import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useAuthStateValue } from "hooks/context/AuthStateProvider";
import Auth from "containers/Auth";
import Home from "containers/Home";
import Write from "containers/Write";

function AppRouter() {
  const { user } = useAuthStateValue()[0];

  console.log("router: ", user);
  return (
    <Router>
      {user ? (
        <Auth />
      ) : (
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/write'>
            <Write />
          </Route>
        </Switch>
      )}
    </Router>
  );
}

export default AppRouter;
