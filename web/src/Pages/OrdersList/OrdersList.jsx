import "./OrdersList.scss"
import SideBar from "../../Components/SideBar/SideBar";
import "../../Components/SideBar/SideBar.scss"
import {OrdersDatatable} from "../../Components/OrdersDatatable/OrdersDatatable";
import NavBar from "../../Components/NavBar/NavBar";

export const OrdersList = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="listTitle">Orders</div>
                    <OrdersDatatable/>
                </div>
            </div>
        </div>
    )
}