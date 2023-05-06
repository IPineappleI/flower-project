import "./UsersList.scss"
import SideBar from "../../Components/SideBar/SideBar";
import "../../Components/SideBar/SideBar.scss"
import NavBar from "../../Components/NavBar/NavBar";
import {UsersDatatable} from "../../Components/UsersDatatable/UsersDatatable";
import {Link} from 'react-router-dom';

export const UsersList = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="listTitle">
                        <h1>Users</h1>
                    </div>
                    <UsersDatatable/>
                    <Link to="/users/new">
                        <button className="mainButton">Add new user</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}