import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    // <div className="primal_page">
    //     <img src={logo} alt="logo"></img>
    //     <h3 >Авторизация</h3><br />
    //     <LoginPage/>
    // </div>,
    document.getElementById('root')
);
