import React from "react";
import logo from "../../Logo/logo.png"
import "./LoginPage.scss"

function LoginPage() {
  return (
    <div className="LoginPage">
        <div className="main_authorization">
            <img src={logo} alt="logo"></img>
            <h3>Авторизация</h3><br/>
            <form>
                <label>Логин: </label>
                <input className="login" type="text" placeholder="введите ваш логин"></input><br />
                <br />
                <label>Пароль: </label>
                <input className="password" type="text" placeholder="введите пароль"></input><br />
                <br />
            </form>
        </div>
        <div className="main_buttons">
            <button className="Enter">Войти в систему</button>
        </div>
    </div>
  );
}

export default LoginPage;
