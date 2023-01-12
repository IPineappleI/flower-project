import "./SideBar.scss"

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">Flowers</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <li>
                        <span>Users</span>
                    </li>
                    <li>
                        <span>Orders</span>
                    </li>
                    <li>
                        <span>Delivery</span>
                    </li>
                    <li>
                        <span>Profile</span>
                    </li>
                    <li>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;