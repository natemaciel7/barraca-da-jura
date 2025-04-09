import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

export default function Header() {
  const { usuario, logout } = useContext(AuthContext);
  const { carrinho } = useContext(CartContext);
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          Barraca da Jura
        </Link>
      </h1>

      <nav>
        <Link to="/cart" className="link">
          🧺 Carrinho {totalItens > 0 && `(${totalItens})`}
        </Link>

        {usuario ? (
          <>
            <span className="usuario">Olá, {usuario.email}</span>
            <button className="botao-sair" onClick={logout}>
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="link">
              Entrar
            </Link>
            <Link to="/cadastro" className="link">
              Cadastrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
