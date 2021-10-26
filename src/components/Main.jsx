import React from "react";
import pen from "../images/pen.svg";
import plus from "../images/plus-button.svg";
import api from "../utils/Api";
import Card from "./Card";

const Main = (props) => {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  //Получение данных профиля
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      
  }, []);

  //получение данных карточек
  React.useEffect(() => {
    api.getCardsInfo()
      .then((res) => {
        setCards(res);
      })
  }, []);

  return (
    <>
      <main>
        <section className="profile">
          <div
            onClick={props.onEditAvatar}
            className="profile__avatar-container"
          >
            <img src={userAvatar} alt="аватар" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__button-container">
              <h1 className="profile__name">{userName}</h1>
              <button
                type="button"
                onClick={props.onEditProfile}
                className="profile__edit-button"
              >
                <img src={pen} alt="измеить" />
              </button>
            </div>
            <p className="profile__text">{userDescription}</p>
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
            {cards.map(item => {
                return <Card key={item._id} item={item} onCardClick={props.onCardClick}/>
            })}
        </section>
      </main>
    </>
  );
};

export default Main;
