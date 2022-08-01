import React from 'react';
import PopupWithForm from './PopupWithForm';
import  CurrentUserContext  from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({name, about: description});
  } 
  
  return (
    <PopupWithForm
    name="profile"
    title="Редактировать профиль"
    buttonText="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input
      className="popup__input"
      id="popup__edit-element"
      name="popupInputName"
      type="text"
      required
      maxLength="40"
      minLength="2"
      placeholder="Введите ваше имя"
      value={name || ''} onChange={handleNameChange}
    />
    <span className="popup__error-message input-popup-title-error"></span>

    <input
      className="popup__input"
      id="input-popup-subtitle"
      name="popupInputInfo"
      type="text"
      required
      maxLength="200"
      minLength="2"
      placeholder="Расскажите о себе"
      value={description || ''} onChange={handleDescriptionChange}
    />
    <span className="popup__error-message input-popup-subtitle-error"></span>
  </PopupWithForm>
  );
}

export default EditProfilePopup;