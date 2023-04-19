import React, {useState} from "react";
import "./LoginPage.css"

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container">
            <h1> Flowers </h1>
            <div className="auth-form-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email"> email </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email"
                           id="email" name="email"/>
                    <label htmlFor="password"> password </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                           placeholder="********" id="password" name="password"/>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    )
}