import { Link } from "react-router-dom";

import Authentication from "components/authentication/Authentication";

function Navigation() {
  return (
    <header>
      <nav>
        <Link to='/'>MyBook</Link>
        <Link to='/write'>write</Link>
        <Authentication />
      </nav>
    </header>
  );
}

export default Navigation;
