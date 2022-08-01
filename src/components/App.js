import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopap";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import successIcon from '../image/success-icon.svg';
import unsuccessIcon from '../image/unsuccess-icon.svg';

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState({ opened: false, success: false });

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    handleTokenCheck();
    if(loggedIn) {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .getInitialCards()

      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }


  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen({ opened: false, success: false})
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked ? "DELETE" : "PUT")
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteClick(card) {
    api
      .deleteElement(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => card._id !== c._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlePathChange = (newPath) => {
    setCurrentPath(newPath);
  };

  useEffect(() => {
    auth
      .tokenCheck(localStorage.getItem("jwt"))
      .then((result) => {
        if (result) {
          setUserEmail(result.data.email);
          setLoggedIn(true);
          navigate("/");
          setCurrentPath("/");
        } else {
          throw new Error(
            "Ошибка текущего сеанса. Необходимо заново авторизироваться"
          );
        }
      })
      .catch((err) => {
        console.log(`Ошибка входа по токену ${err}`);
        navigate("/sign-in");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLoggedIn(false);
    navigate("/sign-in");
    setCurrentPath("/sign-in");
  };

  const handleSignupSubmit = (email, password) => {
    auth.register (email, password)
    .then(result => {
      if (result) {
        setUserEmail(result.data.email);
        setInfoTooltipOpen({ opened: true, success: true })
        setLoggedIn(true);
        navigate('/sign-in');
        setCurrentPath('/sign-in');
      }
      else {
        throw new Error('Не удалось пройти регистрацию');
      }
    })
    .catch( err => {
    console.log(`Ошибка регистрации ${err}`);
    setInfoTooltipOpen({ opened: true, success: false })
  })
}

const handleTokenCheck = () => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return;
  }
  auth
    .tokenCheck(jwt)
    .then((data) => {
      setUserEmail(data.data.email);
      setLoggedIn(true);
      navigate('/');
    })
    .catch((err) => console.log(err));
};

  const handleSigninSubmit = (email, password) => {
    auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate("/");
          setCurrentPath("/");
        } else {
          throw new Error("Не удалось получить токен от сервера");
        }
      })
      .catch((err) => {
        setInfoTooltipOpen({ opened: true, success: false });
        console.log(
 `Ошибка авторизации ${err}. Проверьте корректность данных`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        userEmail={userEmail}
        onLogout={handleLogout}
        path={currentPath}
      />

      <Routes>
        <Route
          path="/sign-in"
          element={
            <Login
              onSignin={handleSigninSubmit}
              onPathChange={handlePathChange}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<Register onRegister={handleSignupSubmit} />}
        />

        <Route path="/"
          element={
            <ProtectedRoute
            
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
            />
          }
        />
      </Routes>

      <Footer />

      <InfoTooltip
        isOpen={isInfoTooltipOpen.opened}
        onClose={closeAllPopups}
        statusImage={isInfoTooltipOpen.success ? successIcon : unsuccessIcon}
        title={isInfoTooltipOpen.success ? 'Вы успешно зарегистрировались!':'Что-то пошло не так! Попробуйте ещё раз'} 
      />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
        onSubmit={handleAddPlaceSubmit}
      ></AddPlacePopup>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}
