import Card from "../components/Card";

function Favorites({ cards, onAddToFavorite }) {
  return (
    <main>
      <section className="sneakers">
        <div className="sneakers__title-and-search">
          <h1 className="sneakers__title">Закладки</h1>
        </div>
        <div className="sneakers__cards">
          {cards
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
