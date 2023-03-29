import "./ProductsDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useState} from "react";
import Axios from "axios";

const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Name', width: 120},
    {field: 'categoryId', headerName: 'Category id', width: 100},
    {field: 'price', headerName: 'Price', width: 100},
    {field: 'count', headerName: "Count", width: 100},
    {field: 'description', headerName: "Description", width: 120},
    {field: 'image', headerName: "Image", width: 100},
];

const ProductsDatatable = () => {

    const [products, setProducts] = useState([]);

    Axios.get("https://localhost:7153/Items")
        .then(
            (res) => {
                setProducts(res.data);
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
                rows={products}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    )
}

export default ProductsDatatable