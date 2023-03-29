import "./OrdersDatatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import React, {useState} from "react";
import Axios from "axios";

const columns = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'dateAndTime', headerName: 'Date and time', width: 250 },
    { field: 'clientId', headerName: 'Client id', width: 100 },
    { field: 'shoppingCart', headerName: 'Shopping cart', width: 400 },
    { field: 'price', headerName: 'Order price', width: 150 },
    { field: 'status', headerName: 'Status', width: 200 },
];

const OrdersDatatable = () => {

    const [orders, setOrders] = useState([]);

    Axios.get("https://localhost:7153/Orders")
        .then(
            (res) => {
                setOrders(res.data);
            });

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <div className="viewButton">View</div>
                        <div className="deleteButton">Delete</div>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="datatable">
            <DataGrid
                rows={orders}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    )
}

export default OrdersDatatable