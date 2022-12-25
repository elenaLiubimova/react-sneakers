import { useState } from "react";

function Card({ image, description, price, onAddButton, onFavorite }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleButtonClick = () => {
    onAddButton({ image, description, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ image, description, price });
    setIsFavorite(!isFavorite);
  }

  return (
    <li className="card">
      <button className={isFavorite ? `card__like-button card__like-button_active` : `card__like-button`} type="button" onClick={onClickFavorite}></button>
      <img className="card__image" src={image} />
      <p className="card__description">{description}</p>
      <div className="card__price-and-add">
        <p className="card__price">цена:</p>
        <p className="card__price-number">{price}</p>
        <button
          className={
            isAdded
              ? `card__add-button card__add-button_active`
              : `card__add-button`
          }
          type="button"
          onClick={handleButtonClick}
        ></button>
      </div>
    </li>
  );
}

export default Card;
