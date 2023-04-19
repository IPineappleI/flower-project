import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {createRoot} from "react-dom/client";
import Home from "./Pages/Home/Home";
import {LoginPage} from "./Pages/Login/LoginPage";
import {OrdersList} from "./Pages/OrdersList/OrdersList"
import {UsersList} from "./Pages/UsersList/UsersList";
import {ProductsList} from "./Pages/ProductsList/ProductsList";
import SingleUser from "./Pages/SingleUser/SingleUser";
import NewUser from "./Pages/NewUser/NewUser";
import React from "react";
import {CategoriesList} from "./Pages/CategoriesList/CategoriesList";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/orders" element={<OrdersList/>}/>
                    <Route path="/users" element={<UsersList/>}/>
                    <Route path="/users/userId" element={<SingleUser/>}/>
                    <Route path="/users/new" element={<NewUser/>}/>
                    <Route path="/products" element={<ProductsList/>}/>
                    <Route path="/categories" element={<CategoriesList/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;