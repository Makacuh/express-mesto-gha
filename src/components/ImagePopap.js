export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_overlay-dark ${card ? "popup_open" : ""}`}>
      <div className="popup__preview">
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={card?.link}
            alt={card?.name}
          />
          <figcaption className="popup__figcaption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
