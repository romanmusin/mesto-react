import React from "react";
//import { useState, useEffect } from 'react';
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/Api";

const App = () => {

  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [userName, setUserName] = React.useState({});
  const [userDescriprion, setUserDescription] = React.useState({});
  const [userAvatar, setUserAvatar] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const handleEditProfileClick = () => setisEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setisAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setisEditAvatarPopupOpen(true);

  //Получение данных профиля
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      
  }, []);
  console.log(userName, userDescriprion, userAvatar)


  //получение данных карточек
  React.useEffect(() => {
    api.getCardsInfo()
      .then((res) => {
        setCards(res);
      })
  }, []);

  const closeAllPopups = () => {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
  };

  //Закрытие попапов по оверлею
  React.useEffect(() => {
    const handleCloseByOverlay = (e) => {
      if (e.target.classList.contains('popup')) {
        closeAllPopups();
      }
    };
    document.addEventListener('mousedown', handleCloseByOverlay);
    return () => document.removeEventListener('mousedown', handleCloseByOverlay);
  });

  //Закрытие попапов по Esc
  React.useEffect(() => {
    const handleCloseByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keyup', handleCloseByEscape);
    return () => document.removeEventListener('keyup', handleCloseByEscape);
  }, []);

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        cards={cards}
      />
      <Footer />
      
      <PopupWithForm                     //Попап редактирования профиля
        name='edit_form'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        //onSubmit={handleSubmit}
        buttonText='Сохранить'
      >
        <input type="text" id="name" className="popup__input popup__input_type_name" name="name" minLength="2" maxLength="40" required placeholder="Имя" />
        <span className="input-error input-error_valid" id="name-error"></span>
        <input type="text" id="text" className="popup__input popup__input_type_text" name="job" minLength="2" maxLength="200" required placeholder="Вид деятельности" />
        <span className="input-error input-error_valid" id="text-error"></span>
      </PopupWithForm>

      <PopupWithForm                     //Попап добавления карточки
        name='add-card_form'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        //onSubmit={handleSubmit}
        buttonText='Создать'
      >
        <input type="text" id="card-name" className="popup__input popup__input_type_card" minLength="2" maxLength="30" required placeholder="Название" name="name" />
        <span className="input-error input-error_valid" id="card-name-error"></span>
        <input type="url" id="link" className="popup__input popup__input_type_link" minLength="2" required placeholder="Ссылка на картинку" name="link" />
        <span className="input-error input-error_valid" id="link-error"></span>
      </PopupWithForm>

      <PopupWithForm                     //Попап редактирования аватара
        name='edit-avatar_form'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        //onSubmit={handleSubmit}
        buttonText='Сохранить'
      >
        <input type="url" id="avatar-link" className="popup__input popup__input_type_link" minLength="2" required placeholder="Ссылка на картинку" name="link" />
        <span className="input-error input-error_valid" id="avatar-link-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default App;
