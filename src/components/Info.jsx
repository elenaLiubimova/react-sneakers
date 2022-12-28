import React from "react";
import { useContext } from "react";
import AppContext from "../context";

function Info({ image, title, description }) {
  const { setIsBasketPopupOpened } = useContext(AppContext);

  return (
    <div className="basket-popup__empty-basket">
      <img
        className="basket-popup__empty-basket-image"
        src={image}
        alt="Пустая корзина"
      />
      <h2 className="basket-popup__empty-basket-title">{title}</h2>
      <p className="basket-popup__empty-basket-description">
        {description}
      </p>
      <button
        className="basket-popup__order-button"
        type="button"
        onClick={() => setIsBasketPopupOpened(false)}
      >
        &larr; Вернуться назад
      </button>
    </div>
  );
}

export default Info;
