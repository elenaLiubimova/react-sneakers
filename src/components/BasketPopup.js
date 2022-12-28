import { useState } from "react";
import { useContext } from "react";
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function BasketPopup({ onClose, onRemove, items = [] }) {
  const [orderId, setOrderId] = useState(null);
  const { basketItems, setBasketItems } = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://63a8083e7989ad3286f8f72f.mockapi.io/orders",
        {items: basketItems}
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setBasketItems([]);
      for (let i = 0; i < basketItems.length; i++) {
        const item = basketItems[i];
        await axios.delete(
          `https://63a8083e7989ad3286f8f72f.mockapi.io/basket/${item.id}`);
        await delay();
      }

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="basket-popup">
      <div className="basket-popup__container">
        <h2 className="basket-popup__title">
          Корзина
          <button
            className="basket-item__delete-button"
            type="button"
            onClick={onClose}
          ></button>
        </h2>
        {items.length ? (
          <>
            <ul className="basket-popup__items">
              {items.map((item) => (
                <li className="basket-item" key={item.id}>
                  <img
                    className="basket-item__image"
                    src={item.image}
                    alt="товар в корзине"
                  />
                  <p className="basket-item__description">{item.description}</p>
                  <p className="basket-item__price">{item.price} руб.</p>
                  <button
                    className="basket-item__delete-button"
                    type="button"
                    onClick={() => onRemove(item.id)}
                  ></button>
                </li>
              ))}
            </ul>
            <div className="basket-popup__result-and-order">
              <ul className="basket-popup__result-list">
                <li className="basket-popup__result-item">
                  Итого:
                  <span className="basket-popup__result-item-bold">
                    21 498 руб.
                  </span>
                </li>
                <li className="basket-popup__result-item">
                  Налог 5%:
                  <span className="basket-popup__result-item-bold">
                    1074 руб.
                  </span>
                </li>
              </ul>
              <button
                className="basket-popup__order-button"
                type="button"
                onClick={onClickOrder}
                disabled={isLoading}
              >
                Оформить заказ
                <span className="basket-popup__order-button-arrow">&rarr;</span>
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            }
            image={
              isOrderComplete ? "/images/order.jpg" : "/images/empty-basket.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default BasketPopup;
