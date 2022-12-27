import Card from "../components/Card";
import { useContext } from "react";
import AppContext from "../context";

function Favorites({ onAddToFavorite }) {
  const {favorites} = useContext(AppContext);
  
  return (
    <main>
      <section className="sneakers">
        <div className="sneakers__title-and-search">
          <h1 className="sneakers__title">Закладки</h1>
        </div>
        <div className="sneakers__cards">
          {favorites
            .map((card, i) => (
              <Card
                key={i}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...card}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Favorites;
