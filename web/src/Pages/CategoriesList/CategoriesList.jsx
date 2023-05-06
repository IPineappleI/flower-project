import "./CategoriesList.scss"
import SideBar from "../../Components/SideBar/SideBar";
import "../../Components/SideBar/SideBar.scss"
import {CategoriesDatatable} from "../../Components/CategoriesDatatable/CategoriesDatatable";
import NavBar from "../../Components/NavBar/NavBar";

export const CategoriesList = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">
                <NavBar/>
                <div className="datatable">
                    <div className="listTitle">
                        <h1>Categories</h1>
                    </div>
                    <CategoriesDatatable/>
                </div>
            </div>
        </div>
    )
}