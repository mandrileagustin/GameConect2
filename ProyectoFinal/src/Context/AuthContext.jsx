import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { createContext, useState } from "react";
import MY_AUTH_APP from "../Componentes/const/const";

const AuthContext = createContext({
  authorization: {
    email: "null",
    role: "null",
    id: "null",
    nickname: "null",
  },
  login: () => {},
  logout: () => {},
  errorMessage: null,
});

export default AuthContext;

export function AuthContextProvider({ children }) {
  const [authorization, setAuthorization] = useState(
    JSON.parse(window.localStorage.getItem(MY_AUTH_APP)) ?? {
      email: "null",
      role: "null",
      id: "null",
      nickname: "null",
    }
  );
  const [errorMessage, setErrorMessage] = useState(null);

  async function login(userData) {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (response.status === 200) {
      const token = await response.json();
      console.log(token);
      setAuthorization(jwtDecode(token.jwt));
      window.localStorage.setItem(
        MY_AUTH_APP,
        JSON.stringify(jwtDecode(token.jwt))
      );
    } else {
      setErrorMessage("Email o password incorrectos");
    }
  }

  function logout() {
    window.localStorage.removeItem(MY_AUTH_APP);
    setAuthorization({
      email: null,
      role: null,
      id: null,
      nickname: null,
    });
  }

  const value = {
    authorization,
    errorMessage,
    login,
    logout,
  };
  console.log(authorization);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
