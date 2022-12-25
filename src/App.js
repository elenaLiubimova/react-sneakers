import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import BasketPopup from "./components/BasketPopup";

function App() {
  const [cards, setCards] = useState([]);
  const [basketItems, setbasketItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isBasketPopupOpened, setIsBasketPopupOpened] = useState(false);

  useEffect(() => {
    fetch("https://63a8083e7989ad3286f8f72f.mockapi.io/cards")
      .then((cardsData) => {
        return cardsData.json();
      })
      .then((json) => {
        setCards(json);
      });
  }, []);

  const handleAddToBasket = (items) => {
    setbasketItems((prev) => [...prev, items]);
  };

  const onChangeSearchInput = (evt) => {
    setSearchItem(evt.target.value);
  };

  return (
    <>
      {isBasketPopupOpened && (
        <BasketPopup
          items={basketItems}
          onClose={() => setIsBasketPopupOpened(false)}
        />
      )}
      ;
      <Header onClickBasket={() => setIsBasketPopupOpened(true)} />
      <main>
        <section className="sneakers">
          <div className="sneakers__title-and-search">
            <h1 className="sneakers__title">
              {searchItem
                ? `Поиск по запросу: "${searchItem}"`
                : "Все кроссовки"}
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
              .filter((card) => card.description.toLowerCase().includes(searchItem.toLowerCase()))
              .map((card) => (
                <Card
                  image={card.image}
                  description={card.description}
                  price={card.price}
                  key={card.id}
                  onAddButton={(card) => handleAddToBasket(card)}
                />
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
