import "./Widget.scss"
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

const Widget = ({ type }) => {
    let data;

    //temporary
    let amount;
    let diff;

    switch (type) {
        case "user":
            amount = 543
            diff = 15
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                icon: (
                    <PersonOutlineOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                        />
                ),
            };
            break;
        case "order":
            amount = 34
            diff = 20
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "See all orders",
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            color: "goldenrod",
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "earnings":
            amount = 5500
            diff = 8
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon"
                        style={{
                            color: "green",
                            backgroundColor: "rgba(0, 128, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "balance":
            amount = 9000
            diff = 10
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: (
                    <AccountBalanceOutlinedIcon
                        className="icon"
                        style={{
                            color: "purple",
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"} {amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <ExpandLessOutlinedIcon/>
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget