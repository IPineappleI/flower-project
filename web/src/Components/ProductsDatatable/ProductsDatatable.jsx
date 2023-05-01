import "./ProductsDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import Axios from "axios";

const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Name', width: 250},
    {field: 'categoryId', headerName: 'Category id', width: 100},
    {field: 'price', headerName: 'Price', width: 120},
    {field: 'count', headerName: "Count", width: 120},
    {field: 'description', headerName: "Description", width: 400},
    {field: 'image', headerName: "Image", width: 250},
];

export function ProductsDatatable() {

    const [products, setProducts] = useState([]);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded)
            return;
        Axios.get("https://localhost:7153/Items")
            .then(
                (res) => {
                    setProducts(res?.data);
                });
        setLoaded(true);
    })

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
                rows={products}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    )
}