import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { AuthStateProvider } from "hooks/context/AuthStateProvider";
import useAuthReducer, { initialState } from "hooks/reducer/useAuthReducer";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthStateProvider initialState={initialState} reducer={useAuthReducer}>
      <App />
    </AuthStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
