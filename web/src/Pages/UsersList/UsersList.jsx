import "./UsersList.scss"
import SideBar from "../../Components/SideBar/SideBar";
import "../../Components/SideBar/SideBar.scss"
import NavBar from "../../Components/NavBar/NavBar";
import {UsersDatatable} from "../../Components/UsersDatatable/UsersDatatable";

export const UsersList = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="listTitle">Users</div>
                    <UsersDatatable/>
                </div>
            </div>
        </div>
    )
}