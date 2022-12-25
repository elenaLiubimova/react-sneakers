import Card from "../components/Card";

function Home({ cards, searchItem, onChangeSearchInput, setSearchItem, handleAddToFavorites, handleAddToBasket }) {
  return (
    <main>
      <section className="sneakers">
        <div className="sneakers__title-and-search">
          <h1 className="sneakers__title">
            {searchItem ? `Поиск по запросу: "${searchItem}"` : "Все кроссовки"}
          </h1>
          <div className="sneakers__search-block">
            <img
              className="sneakers__search-image"
              src="/images/search.svg"
              alt="Поле поиска"
            />
            <input
              className="sneakers__search-input"
              placeholder="Поиск..."
              onChange={onChangeSearchInput}
              value={searchItem}
            />
            {searchItem && (
              <button
                className="basket-item__delete-button"
                type="button"
                onClick={() => setSearchItem("")}
              ></button>
            )}
          </div>
        </div>
        <ul className="sneakers__cards">
          {cards
            .filter((card) =>
              card.description.toLowerCase().includes(searchItem.toLowerCase())
            )
            .map((card, i) => (
              <Card
                image={card.image}
                description={card.description}
                price={card.price}
                key={i}
                onFavorite={(card) => handleAddToFavorites(card)}
                onAddButton={(card) => handleAddToBasket(card)}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Home;