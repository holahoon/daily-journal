import { Link } from "react-router-dom";

import Authentication from "components/authentication/Authentication";

function Navigation() {
  return (
    <header>
      <nav>
        <Link to='/'>logo</Link>
        <Authentication />
      </nav>
    </header>
  );
}

export default Navigation;
