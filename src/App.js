import AppRouter from "components/route/Router";

import { AuthStateProvider } from "hooks/context/AuthStateProvider";
import authReducer, { initialState } from "hooks/reducer/authReducer";
import Navigation from "containers/Navigation";

function App() {
  return (
    <AuthStateProvider initialState={initialState} reducer={authReducer}>
      <Navigation />

      <AppRouter />
    </AuthStateProvider>
  );
}

export default App;
