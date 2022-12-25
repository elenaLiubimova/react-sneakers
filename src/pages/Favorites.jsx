import Card from "../components/Card";

function Favorites({ cards }) {
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
                image={card.image}
                description={card.description}
                price={card.price}
                key={i}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Favorites;
