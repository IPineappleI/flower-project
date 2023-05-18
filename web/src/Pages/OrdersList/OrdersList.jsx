import "./OrdersList.scss"
import SideBar from "../../Components/SideBar/SideBar";
import "../../Components/SideBar/SideBar.scss"
import {OrdersDatatable} from "../../Components/OrdersDatatable/OrdersDatatable";
import NavBar from "../../Components/NavBar/NavBar";
import {Link} from "react-router-dom";

export const OrdersList = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="listTitle">
                        <h1>Orders</h1>
                    </div>
                    <OrdersDatatable/>
                    <Link to="/orders/new">
                        <button className="mainButton">Add new order</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}