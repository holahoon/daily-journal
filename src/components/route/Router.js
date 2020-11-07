import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Navigation from "containers/Navigation";
import Home from "containers/Home";
import Write from "containers/Write";
import Auth from "containers/Auth";
import Invalid404 from "containers/Invalid404";

function AppRouter() {
  return (
    <Router>
      <Navigation />

      <Container>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/write/:docId' exact>
            <Write />
          </Route>
          <Route path='/write' exact>
            <Write />
          </Route>
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='*' component={Invalid404} />
        </Switch>
      </Container>
    </Router>
  );
}

export default AppRouter;
