import "./ProductsList.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {ProductsDatatable} from "../../Components/ProductsDatatable/ProductsDatatable";
import {Link} from "react-router-dom";

export const ProductsList = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="listTitle">
                        <h1>Products</h1>
                    </div>
                    <ProductsDatatable/>
                    <Link to="/products/new">
                        <button className="mainButton">Add new product</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}