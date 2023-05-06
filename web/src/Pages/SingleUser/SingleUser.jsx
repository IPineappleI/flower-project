import "./SingleUser.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {OrdersDatatable} from "../../Components/OrdersDatatable/OrdersDatatable";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Axios from "axios";

function SingleUser() {

    const params = useParams();

    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }
        let url = "https://localhost:7153/Users/byId?id=" + params.userId;

        Axios.get(url)
            .then(
                (res) => {
                    setData(res?.data);
                });
        setLoaded(true);
    })

    return (
        <div className="single">
            <SideBar/>
            <div className="singleContainer">
                <NavBar/>
                <div className="top">
                    <div className="left">
                        <h1 className="title">Information</h1>
                        <div className="detailItem">
                            <span className="itemKey">Id:</span>
                            <span className="itemValue">{data.id}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">First name:</span>
                            <span className="itemValue">{data.firstName}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Last name:</span>
                            <span className="itemValue">{data.lastName}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Email:</span>
                            <span className="itemValue">{data.email}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Phone number:</span>
                            <span className="itemValue">{data.phoneNumber}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Role:</span>
                            <span className="itemValue">{data.role}</span>
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