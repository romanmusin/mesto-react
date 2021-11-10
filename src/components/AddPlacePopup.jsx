import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [link, setLink] = React.useState("");
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm //Попап добавления карточки
      name="add-card_form"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        type="text"
        id="card-name"
        className="popup__input popup__input_type_card"
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
        name="name"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span
        className="input-error input-error_valid"
        id="card-name-error"
      ></span>
      <input
        type="url"
        id="link"
        className="popup__input popup__input_type_link"
        minLength="2"
        required
        placeholder="Ссылка на картинку"
        name="link"
        value={link || ""}
        onChange={handleChangeLink}
      />
      <span className="input-error input-error_valid" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
