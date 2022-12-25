import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import BasketPopup from "./components/BasketPopup";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [cards, setCards] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isBasketPopupOpened, setIsBasketPopupOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("https://63a8083e7989ad3286f8f72f.mockapi.io/cards")
      .then((cardsData) => {
        setCards(cardsData.data);
      });
    axios
      .get("https://63a8083e7989ad3286f8f72f.mockapi.io/basket")
      .then((cardsData) => {
        setBasketItems(cardsData.data);
      });
    axios
      .get("https://63a8083e7989ad3286f8f72f.mockapi.io/favorites")
      .then((cardsData) => {
        setFavorites(cardsData.data);
      });
  }, []);

  const handleAddToBasket = (items) => {
    axios.post("https://63a8083e7989ad3286f8f72f.mockapi.io/basket", items);
    setBasketItems((prev) => [...prev, items]);
  };

  const handleRemoveFromBasket = (id) => {
    axios.delete(`https://63a8083e7989ad3286f8f72f.mockapi.io/basket/${id}`);
    setBasketItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToFavorites = (items) => {
    axios.post("https://63a8083e7989ad3286f8f72f.mockapi.io/favorites", items);
    setBasketItems((prev) => [...prev, items]);
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
          onRemove={handleRemoveFromBasket}
        />
      )}
      ;
      <Header onClickBasket={() => setIsBasketPopupOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cards={cards}
              searchItem={searchItem}
              onChangeSearchInput={onChangeSearchInput}
              setSearchItem={setSearchItem}
              handleAddToFavorites={handleAddToFavorites}
              handleAddToBasket={handleAddToBasket}
            />
          }
        />

        <Route path="/favorites" element={<Favorites cards={favorites} />} />
      </Routes>
    </>
  );
}

export default App;
