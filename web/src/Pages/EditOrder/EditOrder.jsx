import "./EditOrder.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import InfoModal from "../../Components/Modal/InfoModal/InfoModal";


const EditOrder = () => {
    const params = useParams();

    const [infoModal, setInfoModal] = useState(false);

    const [order, setOrder] = useState({
        id: params.orderId,
        dateAndTime: "",
        clientId: -1,
        price: 0,
        status: "",
    });

    const {id, dateAndTime, clientId, price, status} = order;

    const [message, setMessage] = useState('')

    const onInputChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value});
    }

    const onSubmit = async () => {
        await axios.put(`https://localhost:7153/Orders?id=${params.orderId}`, order)
            .then(() => {
                setMessage("Order updated successfully.")
                setInfoModal(true);
            })
            .catch((e) => {
                console.log(e);
                setMessage("Something went wrong, please, check if data is correct.")
                setInfoModal(true);
            });
    }

    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async () => {
        const result = await axios.get(`https://localhost:7153/Orders/byId?id=${params.orderId}`);
        setOrder(result.data);
    };

    return (
        <div className="data">
            <div className="new">
                <SideBar/>
                <div className="newContainer">
                    <NavBar/>
                    <div className="top">
                        <h1>Edit Order</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <form>
                                <div className="formInput">
                                    <label>Id</label>
                                    <input value={id} onChange={(e) => onInputChange(e)} type="text"
                                           name="id"/>
                                </div>
                                <div className="formInput">
                                    <label>Price</label>
                                    <input value={price} onChange={(e) => onInputChange(e)} type="email"
                                           name="price"/>
                                </div>
                                <div className="formInput">
                                    <label>Client ID</label>
                                    <input value={clientId} onChange={(e) => onInputChange(e)} type="text"
                                           name="clientId"/>
                                </div>
                            </form>
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label>Status</label>
                                    <input value={status} onChange={(e) => onInputChange(e)} type="text"
                                           name="status"/>
                                </div>
                                <div className="formInput">
                                    <label>Date and Time</label>
                                    <input value={dateAndTime} onChange={(e) => onInputChange(e)} type="text"
                                           name="dateAndTime"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Link to="/orders">
                        <button>Cancel</button>
                    </Link>
                    <button onClick={onSubmit}>Save changes</button>
                </div>
            </div>
            <InfoModal
                open={infoModal}
                onClose={() => setInfoModal(false)}
                text={message}
            />
        </div>
    )
}

export default EditOrder