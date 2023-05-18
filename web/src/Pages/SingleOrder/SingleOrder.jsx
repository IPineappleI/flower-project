import "./SingleOrder.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Axios from "axios";

function SingleOrder() {

    const params = useParams();

    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }
        let url = "https://localhost:7153/Orders/byId?id=" + params.orderId;

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
                            <span className="itemKey">Date and time:</span>
                            <span className="itemValue">{data.dateAndTime}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Client id:</span>
                            <span className="itemValue">{data.clientId}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Order price:</span>
                            <span className="itemValue">{data.price}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Status:</span>
                            <span className="itemValue">{data.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder