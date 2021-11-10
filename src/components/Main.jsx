import React from "react";
import pen from "../images/pen.svg";
import plus from "../images/plus-button.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  //const [userName, setUserName] = React.useState();
  //const [userDescription, setUserDescription] = React.useState();
  //const [userAvatar, setUserAvatar] = React.useState("");
  //const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  /*function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} */

  //Получение данных профиля
  /*React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //получение данных карточек
  React.useEffect(() => {
    api
      .getCardsInfo()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);*/

  return (
    <>
      <main>
        <section className="profile">
          <div
            onClick={props.onEditAvatar}
            className="profile__avatar-container"
          >
            <img
              src={currentUser.avatar}
              alt="аватар"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__button-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                onClick={props.onEditProfile}
                className="profile__edit-button"
              >
                <img src={pen} alt="измеить" />
              </button>
            </div>
            <p className="profile__text">{currentUser.about}</p>
          </div>
          <button
            type="button"
            onClick={props.onAddPlace}
            className="profile__plus"
          >
            <img src={plus} alt="Добавить" className="profile__plus-img" />
          </button>
        </section>

        <section className="elements">
          {props.cards.map((item) => {
            return (
              <Card
                key={item._id}
                item={item}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onClickDeleteCard={props.onClickDeleteCard}
              />
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Main;
