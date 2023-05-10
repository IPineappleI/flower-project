import "./EditUser.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import Modal from 'react-modal';
import Axios from "axios";


const NewUser = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showSuccessModal, setSuccessModal] = useState(false);
    const [showFailModal, setFailModal] = useState(false);

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

    const save = () => {
        let newData = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phoneNumber": phone,
            "password": password,
            "role": role,
        };

        console.log(newData)

        // const response = axios({
        //     method: 'post',
        //     url: "https://localhost:7153/Users",
        //     headers: {},
        //     data: data
        // }).then(() => {
        //     setSuccessModal(true);
        // }).catch((error) => {
        //     console.log(error);
        //     setFailModal(true);
        // });
    }

    return (
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
                                <label>First name</label>
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"
                                       placeholder="Ivan"/>
                            </div>
                            <div className="formInput">
                                <label>Last name</label>
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"
                                       placeholder="Ivanov"/>
                            </div>
                            <div className="formInput">
                                <label>Phone number</label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text"
                                       placeholder="+12345678901"/>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"
                                       placeholder={data.password}/>
                            </div>
                            <div className="formInput">
                                <label>Role</label>
                                <input value={role} onChange={(e) => setRole(e.target.value)} type="text"
                                       placeholder={data.role}/>
                            </div>
                            <div className="formInput">
                                <label>Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                                       placeholder={data.email}/>
                            </div>
                        </form>
                    </div>
                </div>
                <Link to="/users">
                    <button>Cancel</button>
                </Link>
                <button onClick={save}>Save changes</button>
            </div>
        </div>
    )
}

export default NewUser