import { useState } from "react";

function Card({ image, description, price, id, onAddButton }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleButtonClick = () => {
    onAddButton({ image, description, price, id });
    setIsAdded(!isAdded);
  };

  return (
    <li className="card" id={id}>
      <button className="card__like-button" type="button"></button>
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
