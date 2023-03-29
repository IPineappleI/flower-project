import "./CategoriesDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useState} from "react";
import Axios from "axios";

const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Name', width: 200},
];

const CategoriesDatatable = () => {

    const [categories, setCategories] = useState([]);

    Axios.get("https://localhost:7153/Categories")
        .then(
            (res) => {
                setCategories(res.data);
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
                rows={categories}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    )
}

export default CategoriesDatatable