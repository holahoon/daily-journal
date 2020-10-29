import Authentication from "components/authentication/Authentication";
import { useAuthStateValue } from "hooks/context/AuthStateProvider";

function Navigation() {
  const [state, dispatch] = useAuthStateValue();

  console.log(state);
  return (
    <header>
      <nav>
        <div>logo</div>
        <Authentication />
      </nav>
    </header>
  );
}

export default Navigation;
