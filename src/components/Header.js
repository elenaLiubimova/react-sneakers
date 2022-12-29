import logo from "../images/logo.jpg";
import { Link } from "react-router-dom";
import { useBasket } from "../hooks/useBasket";

function Header(props) {
  const { basketPrice } = useBasket();

  return (
    <header className="header">
      <div className="header__logo-and-name">
        <Link to="/">
          <img className="logo" src={logo} alt="Логотип" />
        </Link>
        <h3 className="header__name">React Sneakers</h3>
        <p className="header__slogan">Магазин лучших кроссовок</p>
      </div>
      <ul className="header__menu">
        <li className="header__menu-item">
          <button
            className="header__menu-basket-button"
            type="button"
            onClick={props.onClickBasket}
          />
          <span className="header__price">{basketPrice} руб.</span>
        </li>
        <li className="header__menu-item">
          <div className="header__menu-link">
            <Link to="/favorites">
              <img
                className="header__likes"
                src="/images/likes.svg"
                alt="Ссылка в закладки"
              />
            </Link>
          </div>
        </li>
        <li className="header__menu-item">
          <div className="header__menu-link" href="#">
            <Link to="/orders">
              <img
                className="header__profile"
                src="/images/profile.svg"
                alt="Ссылка в профиль"
              />
            </Link>
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
