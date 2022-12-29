import { useContext } from "react";
import AppContext from "../context";

export function useBasket () {
  const { basketItems, setBasketItems } = useContext(AppContext);
  const basketPrice = basketItems.reduce((sum, item) => item.price + sum, 0);

  return { basketItems, setBasketItems, basketPrice };
}