import { useContext } from "react";
import { CartContext } from "@/contexts/Cart";

function useCart() {
  const context = useContext(CartContext);

  if (typeof context === undefined)
    throw new Error("useCart must be used within CartProvider");
  return context;
}

export default useCart;
