import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "containers/Home";
import Write from "containers/Write";
import Navigation from "container/Navigation";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Navigation />
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
