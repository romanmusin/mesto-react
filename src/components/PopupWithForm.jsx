import React from "react";

const PopupWithForm = (props) => {
  return (
    <div className={`popup ${props.isOpen ? `popup_visible` : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__header">{props.title}</h2>
        <form
          name={props.name}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className={`popup__save ${
              props.isDisabled && `popup__save_disabled`
            }`}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
