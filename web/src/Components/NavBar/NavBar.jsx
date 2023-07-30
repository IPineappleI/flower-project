import "./NavBar.scss"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="search">
                </div>
                <div className="items">
                    <div className="item">
                        <DarkModeOutlinedIcon className="icon" />
                    </div>
                    <Link to={"/users/view/" + localStorage.getItem("user")} style={{textDecoration: "none"}}>
                        <div className="item">
                            <AccountCircleIcon className="icon"/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar