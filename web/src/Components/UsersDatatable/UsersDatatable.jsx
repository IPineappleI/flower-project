import "./UsersDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useState} from "react";
import Axios from "axios";

const columns = [
    {field: 'id', headerName: 'ID', width: 50},
    {field: 'firstName', headerName: 'First name', width: 100},
    {field: 'lastName', headerName: 'Last name', width: 100},
    {field: 'email', headerName: "Client's Email", width: 150},
    {field: 'phoneNumber', headerName: 'Phone number', width: 115},
    {field: 'role', headerName: "Role", width: 70},
    {field: 'shoppingCartId', headerName: "Shopping cart id", width: 50},
];

const UsersDatatable = () => {

    const [users, setUsers] = useState([]);

    Axios.get("https://localhost:7153/Users")
        .then(
            (res) => {
                setUsers(res.data);
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
                rows={users}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    )
}

export default UsersDatatable