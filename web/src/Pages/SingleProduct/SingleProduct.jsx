import "./SingleProduct.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Axios from "axios";

function SingleProduct() {

    const params = useParams();

    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }
        let url = "https://localhost:7153/Items/byId?id=" + params.productId;

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
                            <span className="itemKey">Name:</span>
                            <span className="itemValue">{data.name}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Category Id:</span>
                            <span className="itemValue">{data.categoryId}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Price:</span>
                            <span className="itemValue">{data.price}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Count:</span>
                            <span className="itemValue">{data.count}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Description:</span>
                            <span className="itemValue">{data.description}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Image:</span>
                            <span className="itemValue">{data.image}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct