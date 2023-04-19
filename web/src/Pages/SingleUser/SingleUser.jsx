import "./SingleUser.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {OrdersDatatable} from "../../Components/OrdersDatatable/OrdersDatatable";

const SingleUser = () => {
    return (
        <div className="single">
            <SideBar/>
            <div className="singleContainer">
                <NavBar/>
                <div className="top">
                    <div className="left">
                        <h1 className="title">Information</h1>
                        <div className="detailItem">
                            <span className="itemKey">First name:</span>
                            <span className="itemValue">Ivan</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Last name:</span>
                            <span className="itemValue">Davydov</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Id:</span>
                            <span className="itemValue">1</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Role:</span>
                            <span className="itemValue">1</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Phone number:</span>
                            <span className="itemValue">88005553535</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Email:</span>
                            <span className="itemValue">client1@mail.com</span>
                        </div>
                    </div>
                    <div className="right">

                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last orders</h1>
                    <OrdersDatatable/>
                </div>
            </div>
        </div>
    )
}

export default SingleUser