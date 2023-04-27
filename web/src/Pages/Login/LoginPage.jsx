import "./LoginPage.css"
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const Login = () => {
        let user = {
            "email": email,
            "password": password
        };
        let query = Object.keys(user)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(user[k]))
            .join('&');

        let url = "https://localhost:7153/Users/authorizeByEmail?" + query;

        try {
            const response = axios.get(url)

            response
                .then((res) => {
                    localStorage.setItem("user", JSON.stringify(res?.data))
                    navigate("/home");
                })
                .catch((error) => console.log(error.response))

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="all">
            <h1> Flowers </h1>
            <div className="container">
                <h2>Login</h2>
                <div className="login-user-form">
                    <label htmlFor="email"> email </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email"
                           id="email" name="email"/>
                    <label htmlFor="password"> password </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                           placeholder="********" id="password" name="password"/>
                    <button onClick={Login}>Log in</button>
                </div>
            </div>
        </div>
    )
}