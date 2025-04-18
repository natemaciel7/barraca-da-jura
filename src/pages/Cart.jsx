import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cart.css";

export default function Cart() {
  const { carrinho, removerDoCarrinho, alterarQuantidade, setCarrinho } =
    useContext(CartContext);

  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  function gerarMensagemWhatsApp(pedido) {
    let mensagem = `Olá, sou o cliente ${pedido.cliente}! Quero fazer um pedido:\n\n`;

    pedido.itens.forEach((item) => {
      const subtotal = (item.preco * item.quantidade).toFixed(2);
      mensagem += `- ${item.nome} (${item.quantidade}x) - R$${subtotal}\n`;
    });

    mensagem += `\nTotal: R$${pedido.total.toFixed(2)}\n`;

    return encodeURIComponent(mensagem);
  }

  async function finalizarPedido() {
    if (!usuario) {
      alert("Você precisa estar logado para finalizar o pedido.");
      return;
    }

    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const token = localStorage.getItem("tokenJura");
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    const pedido = {
      cliente: usuario.email.split("@")[0],
      email: usuario.email,
      itens: carrinho,
      total: parseFloat(total.toFixed(2)),
    };

    try {
      await api.post("/pedidos", pedido, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const mensagem = gerarMensagemWhatsApp(pedido);
      const numero = "5549991337443";
      const linkWpp = `https://wa.me/${numero}?text=${mensagem}`;

      setCarrinho([]);
      window.location.href = linkWpp;
    } catch (err) {
      console.error("Erro ao enviar pedido:", err);

      const mensagem =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Erro desconhecido ao enviar pedido.";

      alert("Erro ao enviar pedido: " + mensagem);
    }
  }

  return (
    <div className="carrinho">
      <h2>Seu Carrinho</h2>

      {carrinho.length === 0 ? (
        <p>O carrinho está vazio 😔</p>
      ) : (
        <>
          <ul>
            {carrinho.map((item) => (
              <li key={item.id} className="item-carrinho">
                <img src={item.imagem} alt={item.nome} />
                <div className="info">
                  <h3>{item.nome}</h3>
                  <div className="quantidade">
                    <button
                      onClick={() => alterarQuantidade(item.id, "decrementar")}
                    >
                      −
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() => alterarQuantidade(item.id, "incrementar")}
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                  <button
                    className="remover"
                    onClick={() => removerDoCarrinho(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="total">
            <p>
              Total: <strong>R$ {total.toFixed(2)}</strong>
            </p>
            <button className="fechar-pedido" onClick={finalizarPedido}>
              Fechar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}
