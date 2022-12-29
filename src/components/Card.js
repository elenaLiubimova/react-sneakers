import { useState } from "react";
import { useContext } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../context";

function Card({
  id,
  image,
  description,
  price,
  onAddButton,
  onFavorite,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const handleButtonClick = () => {
    onAddButton({ id, image, description, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, image, description, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <li className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="112" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <button
              className={
                isFavorite
                  ? `card__like-button card__like-button_active`
                  : `card__like-button`
              }
              type="button"
              onClick={onClickFavorite}
            ></button>
          )}
          <img className="card__image" src={image} />
          <p className="card__description">{description}</p>
          <div className="card__price-and-add">
            <p className="card__price">цена:</p>
            <p className="card__price-number">{price}</p>
            {onAddButton && (
              <button
                className={
                  isItemAdded(id)
                    ? `card__add-button card__add-button_active`
                    : `card__add-button`
                }
                type="button"
                onClick={handleButtonClick}
              ></button>
            )}
          </div>
        </>
      )}
    </li>
  );
}

export default Card;
