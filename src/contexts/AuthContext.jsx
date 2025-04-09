import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("clienteJura");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  function login(email) {
    const usuarioLogado = { email };
    setUsuario(usuarioLogado);
    localStorage.setItem("clienteJura", JSON.stringify(usuarioLogado));
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("clienteJura");
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
