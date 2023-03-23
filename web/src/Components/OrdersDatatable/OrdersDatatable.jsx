import "./OrdersDatatable.scss"
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Order number', width: 115 },
    { field: 'shoppingCart', headerName: 'Shopping cart', width: 115 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'status', headerName: 'Status', width: 110 },
    { field: 'email', headerName: "Client's Email", width: 150 },
    { field: 'price', headerName: 'Order price', width: 100 },
];

const rows = [
    {
        id: 2001,
        shoppingCart: 'product1',
        date: '12.12.2022',
        status: 'Ready',
        email: 'client1@mail.com',
        price: 200,
    },
    {
        id: 2002,
        shoppingCart: ['product1', 'product2'],
        date: '14.12.2022',
        status: 'In progress',
        email: 'client2@mail.com',
        price: 500,
    },
];

const OrdersDatatable = () => {
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

export default OrdersDatatable