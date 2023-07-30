import "./NewProduct.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import InfoModal from "../../Components/Modal/InfoModal/InfoModal";

const NewProduct = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [showFailModal, setFailModal] = useState(false);
    const [message, setMessage] = useState('');

    const create = () => {

        let data = {
            "id": id,
            "name": name,
            "categoryId": categoryId,
            "price": price,
            "count": count,
            "description": description,
            "image": image,
        };
        axios({
            method: 'post',
            url: "https://localhost:7153/Items",
            headers: {},
            data: data
        }).then(() => {
            setMessage("Product created successfully.")
            setFailModal(true);
        }).catch((error) => {
            console.log(error);
            setMessage("Can't create product, please, check if data is correct.");
            setFailModal(true);
        });
    }

    return (
        <div className="new">
            <SideBar/>
            <div className="newContainer">
                <NavBar/>
                <div className="top">
                    <h1>New Product</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <form>
                            <div className="formInput">
                                <label>Id</label>
                                <input value={id} onChange={(e) => setId(e.target.value)} type="text"
                                       placeholder="101"/>
                            </div>
                            <div className="formInput">
                                <label>Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text"
                                       placeholder="Rose"/>
                            </div>
                            <div className="formInput">
                                <label>Category id</label>
                                <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} type="text"
                                       placeholder="21"/>
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
                                <label>Count</label>
                                <input value={count} onChange={(e) => setCount(e.target.value)} type="text"
                                       placeholder="100"/>
                            </div>
                            <div className="formInput">
                                <label>Description</label>
                                <input value={description} onChange={(e) => setDescription(e.target.value)} type="text"
                                       placeholder=""/>
                            </div>
                            <div className="formInput">
                                <label>Image</label>
                                <input value={image} onChange={(e) => setImage(e.target.value)} type="text"
                                       placeholder="link"/>
                            </div>
                        </form>
                    </div>
                </div>
                <Link to="/products">
                    <button>Cancel</button>
                </Link>
                <button onClick={create}>Create a new product</button>
                <InfoModal
                    open={showFailModal}
                    onClose={() => setFailModal(false)}
                    text={message}
                />
            </div>
        </div>
    )
}

export default NewProduct