import "./EditUser.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import InfoModal from "../../Components/Modal/InfoModal/InfoModal";


const EditUser = () => {
    const params = useParams();

    const [infoModal, setInfoModal] = useState(false);

    const [user, setUser] = useState({
        id: params.userId,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "",
    });

    const {id, firstName, lastName, phoneNumber, email, password, role} = user;

    const [message, setMessage] = useState('')

    const onInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async () => {
        await axios.put(`https://localhost:7153/Users?id=${params.userId}`, user)
            .then(() => {
                setMessage("User updated successfully.")
                setInfoModal(true);
            })
            .catch((e) => {
                console.log(e);
                setMessage("Something went wrong, please, check if data is correct.")
                setInfoModal(true);
            });
    }

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`https://localhost:7153/Users/byId?id=${params.userId}`);
        setUser(result.data);
    };

    return (
        <div className="data">
            <div className="new">
                <SideBar/>
                <div className="newContainer">
                    <NavBar/>
                    <div className="top">
                        <h1>Edit User</h1>
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
                                    <label>Email</label>
                                    <input value={email} onChange={(e) => onInputChange(e)} type="email"
                                           name="email"/>
                                </div>
                                <div className="formInput">
                                    <label>First name</label>
                                    <input value={firstName} onChange={(e) => onInputChange(e)} type="text"
                                           name="firstName"/>
                                </div>
                                <div className="formInput">
                                    <label>Last name</label>
                                    <input value={lastName} onChange={(e) => onInputChange(e)} type="text"
                                           name="lastName"/>
                                </div>
                            </form>
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label>Phone number</label>
                                    <input value={phoneNumber} onChange={(e) => onInputChange(e)} type="text"
                                           name="phoneNumber"/>
                                </div>
                                <div className="formInput">
                                    <label>Password</label>
                                    <input value={password} onChange={(e) => onInputChange(e)} type="text"
                                           name="password"/>
                                </div>
                                <div className="formInput">
                                    <label>Role</label>
                                    <input value={role} onChange={(e) => onInputChange(e)} type="text"
                                           name="role"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Link to="/users">
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

export default EditUser