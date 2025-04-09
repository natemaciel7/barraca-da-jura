import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarAoCarrinho(produto) {
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.id === produto.id);
      if (itemExistente) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  }

  function removerDoCarrinho(id) {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  }

  function alterarQuantidade(id, operacao) {
    setCarrinho((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const novaQtd =
            operacao === "incrementar"
              ? item.quantidade + 1
              : item.quantidade - 1;

          return { ...item, quantidade: Math.max(novaQtd, 1) };
        }
        return item;
      })
    );
  }

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
