import "./EditCategory.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import InfoModal from "../../Components/Modal/InfoModal/InfoModal";


const EditCategory = () => {
    const params = useParams();

    const [infoModal, setInfoModal] = useState(false);

    const [category, setCategory] = useState({
        id: params.userId,
        name: "",
        image: "",
    });

    const {id, name, image} = category;

    const [message, setMessage] = useState('')

    const onInputChange = (e) => {
        setCategory({...category, [e.target.name]: e.target.value});
    }

    const onSubmit = async () => {
        await axios.put(`https://localhost:7153/Categories?id=${params.categoryId}`, category)
            .then(() => {
                setMessage("Category updated successfully.")
                setInfoModal(true);
            })
            .catch((e) => {
                console.log(e);
                setMessage("Something went wrong, please, check if data is correct.")
                setInfoModal(true);
            });
    }

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        const result = await axios.get(`https://localhost:7153/Categories/byId?id=${params.categoryId}`);
        setCategory(result.data);
    };

    return (
        <div className="data">
            <div className="new">
                <SideBar/>
                <div className="newContainer">
                    <NavBar/>
                    <div className="top">
                        <h1>Edit Category</h1>
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
                                    <label>Name</label>
                                    <input value={name} onChange={(e) => onInputChange(e)} type="email"
                                           name="name"/>
                                </div>
                            </form>
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label>Image</label>
                                    <input value={image} onChange={(e) => onInputChange(e)} type="text"
                                           name="image"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Link to="/categories">
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

export default EditCategory