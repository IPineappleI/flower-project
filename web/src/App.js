import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/Login/LoginPage";
import OrdersList from "./Pages/OrdersList/OrdersList"
import UsersList from "./Pages/UsersList/UsersList";
import ProductsList from "./Pages/ProductsList/ProductsList";
import SingleUser from "./Pages/SingleUser/SingleUser";
import NewUser from "./Pages/NewUser/NewUser";
import React, {useState} from "react";
import CategoriesList from "./Pages/CategoriesList/CategoriesList";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="orders" element={<OrdersList/>}/>
                        <Route path="users">
                            <Route index element={<UsersList/>}/>
                            <Route path=":userId" element={<SingleUser/>}/>
                            <Route path="new" element={<NewUser/>}></Route>
                        </Route>
                        <Route path="products" element={<ProductsList/>}/>
                        <Route path="categories" element={<CategoriesList/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;