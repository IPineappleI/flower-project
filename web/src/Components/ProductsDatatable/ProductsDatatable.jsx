import "./ProductsDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';

const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'category', headerName: 'Category id', width: 100},
    {field: 'title', headerName: 'Title', width: 80},
    {field: 'price', headerName: 'Price', width: 70},
    {field: 'stock', headerName: "In stock", width: 80},
];

const rows = [
    {
        id: 201,
        category: 3,
        title: 'Rose',
        price: 100,
        stock: 145,
    },
    {
        id: 202,
        category: 3,
        title: 'Lavender',
        price: 150,
        stock: 96,
    },
    {
        id: 205,
        category: 3,
        title: 'Peony',
        price: 250,
        stock: 54,
    },
];

const ProductsDatatable = () => {
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
                rows={rows}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    )
}

export default ProductsDatatable