import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";

const Register = ({ onRegister }) => {
  const { enteredValues, handleChange } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(enteredValues);
  };

  return (
    <>
      <div className="form">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="form__title">Регистрация</h1>
          <input
            className="form__item"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={enteredValues.email}
            onChange={handleChange}
            required
          />
          <input
            className="form__item"
            id="password"
            name="password"
            type="password"
            minLength="8"
            placeholder="Пароль"
            autoComplete="password"
            value={enteredValues.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="form__button">
            Зарегистрироваться
          </button>
        </form>
      </div>
      <p className="form__caption">
        Уже зарегистрированы?&nbsp;
        <Link className="form__link" to="/sign-in">
             Войти
        </Link>
      </p>
    </>
  );
};

export default Register;
