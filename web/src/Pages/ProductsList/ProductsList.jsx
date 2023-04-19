import "./ProductsList.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {ProductsDatatable} from "../../Components/ProductsDatatable/ProductsDatatable";

export const ProductsList = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="listTitle">Products</div>
                    <ProductsDatatable/>
                </div>
            </div>
        </div>
    )
}