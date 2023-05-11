import "./NewUser.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import ConfirmModal from "../../Components/Modal/ConfirmModal/ConfirmModal"

const NewUser = () => {
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showSuccessModal, setSuccessModal] = useState(false);
    const [showFailModal, setFailModal] = useState(false);

    const create = () => {

        if(window.confirm("Are you sure to delete user?")) {
            console.log("OK");
        }

        let data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phoneNumber": phone,
            "password": password,
            "role": role,
        };
        axios({
            method: 'post',
            url: "https://localhost:7153/Users",
            headers: {},
            data: data
        }).then(() => {
            setSuccessModal(true);
        }).catch((error) => {
            console.log(error);
            setFailModal(true);
        });
    }

    return (
        <div className="new">
            <SideBar/>
            <div className="newContainer">
                <NavBar/>
                <div className="top">
                    <h1>New User</h1>
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
                                       placeholder="88888888888"/>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                                       placeholder="*******"/>
                            </div>
                            <div className="formInput">
                                <label>Role</label>
                                <input value={role} onChange={(e) => setRole(e.target.value)} type="text"
                                       placeholder="client | manager | admin"/>
                            </div>
                            <div className="formInput">
                                <label>Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                                       placeholder="client@mail.com"/>
                            </div>
                        </form>
                    </div>
                </div>
                <Link to="/users">
                    <button>Cancel</button>
                </Link>
                <button onClick={() => setSuccessModal(true)}>Create a new user</button>
            </div>
            <ConfirmModal open={showSuccessModal} onClose={() => setSuccessModal(false)} text="Are you sure"/>
        </div>
    )
}

export default NewUser