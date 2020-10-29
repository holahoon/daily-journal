import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import GuardedRoute from "utils/hoc/GuardedRoute";
import Navigation from "containers/Navigation";
import Home from "containers/Home";
import Write from "containers/Write";
import Auth from "containers/Auth";

function AppRouter({ userDataObject }) {
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
        {/* <GuardedRoute path='/auth' component={Auth} auth={true} /> */}
        <Route path='/auth'>
          <Auth userDataObject={userDataObject} />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
