import "./SideBar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import {Link} from "react-router-dom"

const SideBar = () => {

    const logout = () => {
        localStorage.clear();
    }

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/home" style={{textDecoration: "none"}}>
                    <span className="logo">Flowers</span>
                </Link>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/home" style={{textDecoration: "none"}}>
                        <li>
                            <DashboardIcon className="icon"/>
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{textDecoration: "none"}}>
                        <li>
                            <PersonOutlineOutlinedIcon className="icon"/>
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/orders" style={{textDecoration: "none"}}>
                        <li>
                            <CreditCardOutlinedIcon className="icon"/>
                            <span>Orders</span>
                        </li>
                    </Link>
                    <Link to="/products" style={{textDecoration: "none"}}>
                        <li>
                            <StorefrontOutlinedIcon className="icon"/>
                            <span>Products</span>
                        </li>
                    </Link>
                    <Link to="/categories" style={{textDecoration: "none"}}>
                        <li>
                            <CategoryIcon className="icon"/>
                            <span>Categories</span>
                        </li>
                    </Link>
                    <p className="title">USEFUL</p>
                    <li>
                        <AssessmentOutlinedIcon className="icon"/>
                        <span>Stats</span>
                    </li>
                    <p className="title">USER</p>
                    <Link to={"/users/view/" + localStorage.getItem("user")} style={{textDecoration: "none"}}>
                        <li>
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Profile</span>
                        </li>
                    </Link>
                    <Link to="/login" style={{textDecoration: "none"}} onClick={logout}>
                        <li>
                            <ExitToAppOutlinedIcon className="icon"/>
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;