import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "containers/Navigation";
import Home from "containers/Home";
import Write from "containers/Write";
import Auth from "containers/Auth";
import Invalid404 from "containers/Invalid404";

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
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='*' component={Invalid404} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
