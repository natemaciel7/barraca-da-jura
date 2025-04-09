import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import "./Login.css";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  async function handleCadastro(e) {
    e.preventDefault();

    if (senha !== confirmar) {
      setErro("As senhas não coincidem");
      return;
    }

    try {
      await api.post("/auth/cadastro", { email, password: senha });
      login(email);
      navigate("/");
    } catch (err) {
      setErro(err.response?.data || "Erro ao cadastrar");
    }
  }

  return (
    <div className="login-container">
      <h2>Crie sua conta</h2>
      <form onSubmit={handleCadastro}>
        <label>E-mail:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha:</label>
        <input
          type="password"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <label>Confirmar senha:</label>
        <input
          type="password"
          required
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
