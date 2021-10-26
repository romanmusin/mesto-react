import React from 'react';

function Card ({ item }) {
    /*const handleCardClick = () => {
        onCardClick(item)
    }*/

    return (
        <article className="element">
            <div className="element__picture">
                <img src={item.link} alt={item.name} className="element__image" />
                <button type="reset" className="element__delete"></button>
            </div>
                    
            <div className="element__text-container">
                <h3 className="element__name">{item.name}</h3>
                <div className="element__like-container">
                    <button type="button" className="element__like"></button>
                    <p className="element__like-amount">0</p>
                </div>
            </div>
        </article>
    )
}

export default Card;