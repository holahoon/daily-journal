import { createContext, useContext, useReducer } from "react";

export const AuthStateContext = createContext();

export const AuthStateProvider = ({ reducer, initialState, children }) => (
  <AuthStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AuthStateContext.Provider>
);

export const useAuthStateValue = () => useContext(AuthStateContext);
