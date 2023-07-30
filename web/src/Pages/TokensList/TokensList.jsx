import "./TokensList.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {TokensDatatable} from "../../Components/TokensDatatable/TokensDatatable";
import {Link} from "react-router-dom";

export const TokensList = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="listTitle">
                        <h1>Tokens</h1>
                    </div>
                    <TokensDatatable/>
                    <Link to="/tokens/new">
                        <button className="mainButton">Add new token</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}