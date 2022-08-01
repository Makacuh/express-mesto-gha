export default function PopupWithForm({
  name,
  title,
  isOpen,
  children,
  onClose,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={isOpen ? "popup popup_open" : "popup"}>
      <div className="popup__container">
        <button type="button" className="popup__close" id="addClose"></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          id={`form-${name}`}
          name={name}
          autoComplete="on"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
