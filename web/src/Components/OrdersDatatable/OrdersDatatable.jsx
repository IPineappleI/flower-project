import "./OrdersDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import Axios from "axios";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";

const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'dateAndTime', headerName: 'Date and time', width: 250},
    {field: 'clientId', headerName: 'Client id', width: 100},
    {field: 'shoppingCart', headerName: 'Shopping cart', width: 200},
    {field: 'price', headerName: 'Order price', width: 150},
    {field: 'status', headerName: 'Status', width: 200},
];

export function OrdersDatatable() {
    const [url, setUrl] = useState("");

    const [orders, setOrders] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (loaded)
            return;
        Axios.get("https://localhost:7153/Orders")
            .then(
                (res) => {
                    setOrders(res?.data);
                });
        setLoaded(true);
    })

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div className="viewButton">View</div>
                        <div className="editButton">Edit</div>
                        <div className="deleteButton" onClick={() => {
                            setShowModal(true);
                            setUrl("https://localhost:7153/Orders?id=" + params.row.id)
                        }}>Delete
                        </div>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="data">
            <div className="datatable">
                <DataGrid
                    rows={orders}
                    columns={columns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <ConfirmModal
                open={showModal}
                onClose={() => setShowModal(false)}
                text="Are you sure to delete order?"
                url={url}
                loaded={() => setLoaded(false)}
            />
        </div>
    )
}