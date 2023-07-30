import "./NewOrder.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import ConfirmModal from "../../Components/Modal/ConfirmModal/ConfirmModal"
import InfoModal from "../../Components/Modal/InfoModal/InfoModal";

const NewOrder = () => {
    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [clientId, setClientId] = useState('');
    const [shoppingCart, setShoppingCart] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');

    const [showSuccessModal, setSuccessModal] = useState(false);
    const [showFailModal, setFailModal] = useState(false);
    const [message, setMessage] = useState('');


    const create = () => {

        let data = {
            "id": id,
            "dateAndTime": date,
            "clientId": clientId,
            "shoppingCart": shoppingCart,
            "price": price,
            "status": status,
        };
        axios({
            method: 'post',
            url: "https://localhost:7153/Orders",
            headers: {},
            data: data
        }).then(() => {
            setMessage("Order created successfully.")
            setFailModal(true);
        }).catch((error) => {
            console.log(error);
            setMessage(error.response.data)
            setFailModal(true);
        });
    }

    return (
        <div className="new">
            <SideBar/>
            <div className="newContainer">
                <NavBar/>
                <div className="top">
                    <h1>New Order</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <form>
                            <div className="formInput">
                                <label>Id</label>
                                <input value={id} onChange={(e) => setId(e.target.value)} type="text"
                                       placeholder="100"/>
                            </div>
                            <div className="formInput">
                                <label>Date and time</label>
                                <input value={date} onChange={(e) => setDate(e.target.value)} type="text"
                                       placeholder=""/>
                            </div>
                            <div className="formInput">
                                <label>Shopping cart</label>
                                <input value={shoppingCart} onChange={(e) => setShoppingCart(e.target.value)} type="text"
                                       placeholder=""/>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Price</label>
                                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text"
                                       placeholder="100"/>
                            </div>
                            <div className="formInput">
                                <label>Status</label>
                                <input value={status} onChange={(e) => setStatus(e.target.value)} type="text"
                                       placeholder="delivered"/>
                            </div>
                            <div className="formInput">
                                <label>Client id</label>
                                <input value={clientId} onChange={(e) => setClientId(e.target.value)} type="text"
                                       placeholder="1"/>
                            </div>
                        </form>
                    </div>
                </div>
                <Link to="/orders">
                    <button>Cancel</button>
                </Link>
                <button onClick={create}>Create a new order</button>
            </div>
        </div>
    )
}

export default NewOrder