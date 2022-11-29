import React from 'react';
import ReactDOM from 'react-dom';
import PrimalPage from './PrimalPage';
import logo from './Logo/logo.png'
import './Styles/PrimalPage.css'

ReactDOM.render(
    <div className="primal_page">
        <img src={logo} alt="logo"></img>
        <h3 >Авторизация</h3><br />
        <PrimalPage></PrimalPage>
    </div>,
    document.getElementById('root')
);
