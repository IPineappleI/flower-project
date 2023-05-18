import "./NewToken.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import ConfirmModal from "../../Components/Modal/ConfirmModal/ConfirmModal"
import InfoModal from "../../Components/Modal/InfoModal/InfoModal";

const NewToken = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const [showFailModal, setFailModal] = useState(false);
    const [message, setMessage] = useState('');

    const create = () => {

        let data = {
            "email": email,
            "token": token,
        };
        axios({
            method: 'post',
            url: "https://localhost:7153/Tokens",
            headers: {},
            data: data
        }).then(() => {
            setMessage("Token created successfully.")
            setFailModal(true);
        }).catch((error) => {
            console.log(error);
            setMessage("Can't create token, please, check if data is correct.");
            setFailModal(true);
        });
    }

    return (
        <div className="new">
            <SideBar/>
            <div className="newContainer">
                <NavBar/>
                <div className="top">
                    <h1>New Token</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <form>
                            <div className="formInput">
                                <label>User's email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                                       placeholder="user@example.com"/>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Token</label>
                                <input value={token} onChange={(e) => setToken(e.target.value)} type="text"
                                       placeholder=""/>
                            </div>
                        </form>
                    </div>
                </div>
                <Link to="/tokens">
                    <button>Cancel</button>
                </Link>
                <button onClick={create}>Create a new token</button>
                <InfoModal
                    open={showFailModal}
                    onClose={() => setFailModal(false)}
                    text={message}
                />
            </div>
        </div>
    )
}

export default NewToken