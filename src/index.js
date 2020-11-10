import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reportWebVitals from "./reportWebVitals";

import { AuthStateProvider } from "hooks/context/AuthStateProvider";
import useAuthReducer, { initialState } from "hooks/reducer/useAuthReducer";
import { rootReducer } from "reduxStore/reducers";
import App from "./App";

const reduxStore = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <AuthStateProvider initialState={initialState} reducer={useAuthReducer}>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </AuthStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
