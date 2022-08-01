import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${avatar})` }}
        >
          <button
            type="button"
            onClick={onEditAvatar}
            className="profile__avatar-button"
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{name}</h1>
            <button
              type="button"
              onClick={onEditProfile}
              className="profile__edit-button"
              aria-label="Редактировать"
            ></button>
          </div>
          <p className="profile__subtitle">{about}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"
          aria-label="Добавить"
        ></button>
      </section>

      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
