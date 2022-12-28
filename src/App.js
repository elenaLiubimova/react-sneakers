import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import BasketPopup from "./components/BasketPopup";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [cards, setCards] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isBasketPopupOpened, setIsBasketPopupOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cardsResponse = await axios.get(
        "https://63a8083e7989ad3286f8f72f.mockapi.io/cards"
      );
      const basketResponse = await axios.get(
        "https://63a8083e7989ad3286f8f72f.mockapi.io/basket"
      );
      const favoritesResponse = await axios.get(
        "https://63a8083e7989ad3286f8f72f.mockapi.io/favorites"
      );

      setIsLoading(false);

      setCards(cardsResponse.data);
      setBasketItems(basketResponse.data);
      setFavorites(favoritesResponse.data);
    }

    fetchData();
  }, []);

  const handleAddToBasket = (newItem) => {
    try {
      if (basketItems.find((item) => Number(item.id) === Number(newItem.id))) {
        axios.delete(
          `https://63a8083e7989ad3286f8f72f.mockapi.io/basket/${newItem.id}`
        );
        setBasketItems(
          (prev) => prev.filter((item) => Number(item.id)) != Number(newItem.id)
        );
      } else {
        axios.post(
          "https://63a8083e7989ad3286f8f72f.mockapi.io/basket",
          newItem
        );
        setBasketItems((prev) => [...prev, newItem]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromBasket = (id) => {
    axios.delete(`https://63a8083e7989ad3286f8f72f.mockapi.io/basket/${id}`);
    setBasketItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToFavorites = async (card) => {
    try {
      if (favorites.find((favCard) => Number(favCard.id) === Number(card.id))) {
        axios.delete(
          `https://63a8083e7989ad3286f8f72f.mockapi.io/favorites/${card.id}`
        );
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(card.id)));
      } else {
        const { data } = await axios.post(
          `https://63a8083e7989ad3286f8f72f.mockapi.io/favorites`,
          card
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSearchInput = (evt) => {
    setSearchItem(evt.target.value);
  };

  const isItemAdded = (id) => {
    return basketItems.some((item) => Number(item.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ basketItems, favorites, cards, isItemAdded, handleAddToFavorites, setIsBasketPopupOpened, setBasketItems }}>
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
                basketItems={basketItems}
                searchItem={searchItem}
                onChangeSearchInput={onChangeSearchInput}
                setSearchItem={setSearchItem}
                handleAddToFavorites={handleAddToFavorites}
                handleAddToBasket={handleAddToBasket}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites />
            }
          />
        </Routes>
      </>
    </AppContext.Provider>
  );
}

export default App;
