import Card from "../components/Card";
import axios from "axios";
import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://63a8083e7989ad3286f8f72f.mockapi.io/orders"
        );
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <main>
      <section className="sneakers">
        <div className="sneakers__title-and-search">
          <h1 className="sneakers__title">Мои заказы</h1>
        </div>
        <div className="sneakers__cards">
          {(isLoading ? [...Array(8)] : orders).map((card, i) => (
            <Card
              key={i}
              loading={isLoading}
              {...card}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Orders;
