import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "./Menu.css";

const produtos = [
  {
    id: 1,
    nome: "Geleia de Morango",
    preco: 18.0,
    imagem: <img src="public/imagens/morango.jpeg" alt="Geleia de Morango" />,
    descricao: "Doçura e acidez no ponto ideal. Feita com carinho da Jura!",
  },
  {
    id: 2,
    nome: "Geleia de Uva",
    preco: 16.0,
    imagem: <img src="public/imagens/uva.jpeg" />,
    descricao: "A tradicional que nunca falha. Uvas selecionadas da colônia.",
  },
  {
    id: 3,
    nome: "Doce de Figo",
    preco: 22.0,
    imagem: <img src="public/imagens/figo.jpeg" />,
    descricao: "Clássico e rústico, com aquele sabor de infância.",
  },
];

export default function Menu() {
  const { adicionarAoCarrinho } = useContext(CartContext);

  return (
    <div className="menu">
      <h2>Cardápio</h2>
      <div className="produtos">
        {produtos.map((produto) => (
          <div key={produto.id} className="produto">
            <img src={produto.imagem} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p className="descricao">{produto.descricao}</p>
            <p className="preco">R$ {produto.preco.toFixed(2)}</p>
            <button onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
