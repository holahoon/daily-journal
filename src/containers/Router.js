import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "containers/Home";
import Write from "containers/Write";
import Navigation from "containers/Navigation";

function AppRouter() {
  return (
    <Router>
      <Navigation />

      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/write'>
          <Write />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
