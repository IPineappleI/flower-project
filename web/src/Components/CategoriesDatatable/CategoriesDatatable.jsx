import "./CategoriesDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useState, useEffect} from "react";
import Axios from "axios";

const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Name', width: 200},
];

export function CategoriesDatatable() {

    const [categories, setCategories] = useState([]);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded)
            return;
        Axios.get("https://localhost:7153/Categories")
            .then(
                (res) => {
                    setCategories(res?.data);
                });
        setLoaded(true);
    })

    const handleDelete = (id) => {
        let url = "https://localhost:7153/Categories?id=" + id;
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
                        <div className="viewButton">View</div>
                        <div className="editButton">Edit</div>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="datatable">
            <DataGrid
                rows={categories}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    )
}