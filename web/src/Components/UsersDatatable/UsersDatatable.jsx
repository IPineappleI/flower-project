import "./UsersDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import Axios from "axios";
import SingleUser from "../../Pages/SingleUser/SingleUser";
import {Link} from "react-router-dom";

const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'firstName', headerName: 'First name', width: 150},
    {field: 'lastName', headerName: 'Last name', width: 150},
    {field: 'email', headerName: "Client's email", width: 200},
    {field: 'phoneNumber', headerName: 'Phone number', width: 150},
    {field: 'role', headerName: "Role", width: 100},
    {field: 'shoppingCartId', headerName: "Shopping cart id", width: 150},
];

export function UsersDatatable() {

    const [users, setUsers] = useState([]);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }
        Axios.get("https://localhost:7153/Users")
            .then(
                (res) => {
                    setUsers(res?.data);
                });
        setLoaded(true);
    })

    const handleDelete = (id) => {
        let url = "https://localhost:7153/Users?id=" + id;
        Axios.delete(url).then(() => setLoaded(false));
    }

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div className="editButton">Edit</div>
                        <Link to={"/users/" + params.row.id} style={{textDecoration: "none"}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
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