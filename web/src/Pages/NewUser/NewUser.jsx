import "./NewUser.scss"
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";

const NewUser = () => {
    return (
        <div className="new">
            <SideBar/>
            <div className="newContainer">
                <NavBar/>
                <div className="top">
                    <h1>Add New User</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <form>
                            <div className="formInput">
                                <label>ID</label>
                                <input type="number" placeholder="1"/>
                            </div>
                            <div className="formInput">
                                <label>Role</label>
                                <input type="number" placeholder="1"/>
                            </div>
                            <div className="formInput">
                                <label>First name</label>
                                <input type="text" placeholder="Ivan"/>
                            </div>
                            <div className="formInput">
                                <label>Last name</label>
                                <input type="text" placeholder="Ivanov"/>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Phone number</label>
                                <input type="number" placeholder="88888888888"/>
                            </div>
                            <div className="formInput">
                                <label>Email</label>
                                <input type="email" placeholder="client@mail.com"/>
                            </div>
                            <div className="formInput">
                                <label>Password</label>
                                <input type="text"/>
                            </div>
                        </form>
                    </div>
                </div>
                <button>Create a new user</button>
            </div>
        </div>
    )
}

export default NewUser