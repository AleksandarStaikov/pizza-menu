import { createContext, useContext, useReducer } from "react";

const FakeAuthContext = createContext(null);
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "user/login":
      return { user: action.payload, isAuthenticated: true };
    case "user/logout":
      return { user: null, isAuthenticated: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "user/login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "user/logout" });
  }

  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useAuthContext() {
  var context = useContext(FakeAuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuthContext };
