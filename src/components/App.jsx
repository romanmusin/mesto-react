import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  function handleClickDeleteCard(item) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCardDelete(item);
  }

  function onCardClick(item) {
    setSelectedCard(item);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSelectedCardDelete(null);
    setIsDeleteCardPopupOpen(false);
  };

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardsInfo()])
      .then(([userInfo, loadCards]) => {
        setCurrentUser(userInfo);
        setCards(loadCards);
      })
      .catch((err) => console.log(err));
  }, []);

  //Удаление Карточки
  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((cardElements) => cardElements._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Лайк Карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (userLiked) => userLiked._id === currentUser._id
    );

    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((cardElements) =>
            cardElements._id === card._id ? newCard : cardElements
          )
        );
      })
      .catch((err) => console.log(err));
  }

  //Изменение данных профиля
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Добавление Карточки
  function handleAddPlaceSubmit(item) {
    api
      .addCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Изменение Аватара
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Закрытие попапов по оверлею
  React.useEffect(() => {
    const handleCloseByOverlay = (e) => {
      if (e.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
    document.addEventListener("mousedown", handleCloseByOverlay);
    return () =>
      document.removeEventListener("mousedown", handleCloseByOverlay);
  }, []);

  //Закрытие попапов по Esc
  React.useEffect(() => {
    const handleCloseByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keyup", handleCloseByEscape);
    return () => document.removeEventListener("keyup", handleCloseByEscape);
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={onCardClick}
          onCardLike={handleCardLike}
          onClickDeleteCard={handleClickDeleteCard}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup //Попап редактирования профиля
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>

        <DeleteCardPopup
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          isOpen={isDeleteCardPopupOpen}
          deleteCard={selectedCardDelete}
        ></DeleteCardPopup>

        <ImagePopup item={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
