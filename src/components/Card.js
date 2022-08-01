import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext} from "react";

export default function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
 
	const cardDeleteButtonClassName = (
		`element__btn-trash ${isOwn ? '' : 'element__btn-trash_hidden'}`
	);

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`element__like ${isLiked ? 'element__like_active' : ''}`
	);

  const handleDeleteClick = () => {
    onCardDelete(card)
  };

  const handleLikeClick = () => {
    onCardLike(card)
  };

  

  return (
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
        }}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button type="button"  onClick={handleLikeClick}
            className={cardLikeButtonClassName}></button>
          <span className="element__likes-counter">
            {card.likes.length}
          </span>
        </div>
        <button onClick={handleDeleteClick}
          className={cardDeleteButtonClassName}></button>
      </div>
    </li>
  );
}
