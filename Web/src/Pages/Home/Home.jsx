import "./home.scss"
import SideBar from "../../Components/SideBar/SideBar";

const Home = () => {
    return (
        <div className="home">
            <SideBar/>
            <div className="homeContainer">container</div>
        </div>
    )
}

export default Home;