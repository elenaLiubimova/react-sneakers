function BasketPopup({ onClose, onRemove, items = [] }) {
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
              <button className="basket-popup__order-button" type="button">
                Оформить заказ
                <span className="basket-popup__order-button-arrow">&rarr;</span>
              </button>
            </div>
          </>
        ) : (
          <div className="basket-popup__empty-basket">
            <img
              className="basket-popup__empty-basket-image"
              src="/images/empty-basket.jpg"
              alt="Пустая корзина"
            />
            <h2 className="basket-popup__empty-basket-title">Корзина пустая</h2>
            <p className="basket-popup__empty-basket-description">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </p>
            <button className="basket-popup__order-button" type="button" onClick={onClose}>
              &larr; Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasketPopup;
