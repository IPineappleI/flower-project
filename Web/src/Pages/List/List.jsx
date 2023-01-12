import "./List.scss"
import SideBar from "../../Components/SideBar/SideBar";
import "../../Components/SideBar/SideBar.scss"

const List = () => {
    return (
        <div className="list">
            <SideBar/>
            <div className="listContainer">Database</div>
        </div>
    )
}

export default List