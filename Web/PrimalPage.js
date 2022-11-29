import React from "react";

function PrimalPage() {
  return (
    <div className="PrimalPage">
        <div className="main_authorization">
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

export default PrimalPage;
