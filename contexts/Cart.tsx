import { useLocalStorage } from "react-use";
import React, { createContext } from "react";

import axiosConfig from "axios.config";

import { Fetcher } from "swr";

type CartProps = {
  cartKey: string | undefined;
  setCartKey: (s: string) => void;
  removerCartKey: () => void;
  fetcher: Fetcher<any, string>;

  isExported: any;
  setIsExported: any;
};

const defaultState = {
  cartKey: "",
  setCartKey: () => {},
  removerCartKey: () => {},
  fetcher: () => {},

  isExported: null,
  setIsExported: () => {},
};

export const CartContext = createContext<CartProps>(defaultState);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [isExported, setIsExported] = useLocalStorage("is_exported", null);
  const [cartKey, setCartKey, removerCartKey] = useLocalStorage("cart-key", "");

  const fetcher = (url: string) =>
    axiosConfig
      .get(url, {
        headers: {
          "X-Cart-Key": cartKey,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });

  const values = {
    fetcher,
    cartKey,
    setCartKey,
    removerCartKey,
    setIsExported,
    isExported,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export default CartProvider;
