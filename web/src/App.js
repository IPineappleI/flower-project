import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import {LoginPage} from "./Pages/Login/LoginPage";
import {OrdersList} from "./Pages/OrdersList/OrdersList"
import {UsersList} from "./Pages/UsersList/UsersList";
import {ProductsList} from "./Pages/ProductsList/ProductsList";
import SingleUser from "./Pages/SingleUser/SingleUser";
import NewUser from "./Pages/NewUser/NewUser";
import React from "react";
import {CategoriesList} from "./Pages/CategoriesList/CategoriesList";
import EditUser from "./Pages/EditUser/EditUser";
import {TokensList} from "./Pages/TokensList/TokensList";
import NewProduct from "./Pages/NewProduct/NewProduct";
import NewCategory from "./Pages/NewCategory/NewCategory";
import NewToken from "./Pages/NewToken/NewToken";
import NewOrder from "./Pages/NewOrder/NewOrder";
import SingleOrder from "./Pages/SingleOrder/SingleOrder";
import EditOrder from "./Pages/EditOrder/EditOrder";
import EditProduct from "./Pages/EditProduct/EditProduct";
import EditCategory from "./Pages/EditCategory/EditCategory";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/orders" element={<OrdersList/>}/>
                    <Route path="/orders/edit/:orderId" element={<EditOrder/>}/>
                    <Route path="/orders/new" element={<NewOrder/>}/>
                    <Route path="/orders/view/:orderId" element={<SingleOrder/>}/>
                    <Route path="/users" element={<UsersList/>}/>
                    <Route path="/users/view/:userId" element={<SingleUser/>}/>
                    <Route path="/users/edit/:userId" element={<EditUser/>}/>
                    <Route path="/users/new" element={<NewUser/>}/>
                    <Route path="/products" element={<ProductsList/>}/>
                    <Route path="/products/new" element={<NewProduct/>}/>
                    <Route path="/products/view/:productId" element={<SingleProduct/>}/>
                    <Route path="/products/edit/:productId" element={<EditProduct/>}/>
                    <Route path="/categories" element={<CategoriesList/>}/>
                    <Route path="/categories/new" element={<NewCategory/>}/>
                    <Route path="/categories/edit/:categoryId" element={<EditCategory/>}/>
                    <Route path="/tokens" element={<TokensList/>}/>
                    <Route path="/tokens/new" element={<NewToken/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
