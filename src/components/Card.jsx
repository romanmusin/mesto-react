import React from 'react';
import trashCan from '../images/delete.svg'

function Card ({ item, onCardClick, likes }) {
    
    const handleCardClick = () => {
        onCardClick(item)
    }

    return (
        <article className="element">
            <div className="element__picture">
                <img src={item.link} alt={item.name} className="element__image" onClick={handleCardClick} />
                <button type="reset" className="element__delete element__delete_active" style={{ backgroundImage: `url(${trashCan})` }}></button>
            </div>
                    
            <div className="element__text-container">
                <h3 className="element__name">{item.name}</h3>
                <div className="element__like-container">
                    <button type="button" className="element__like"></button>
                    <p className="element__like-amount">{item.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;