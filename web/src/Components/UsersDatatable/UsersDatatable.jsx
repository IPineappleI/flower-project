import "./UsersDatatable.scss"
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {field: 'firstName', headerName: 'First name', width: 100},
    {field: 'lastName', headerName: 'Last name', width: 100},
    { field: 'phoneNumber', headerName: 'Phone number', width: 115 },
    { field: 'email', headerName: "Client's Email", width: 150 },
    { field: 'role', headerName: "Role", width: 70 },
];

const rows = [
    {
        id: 1,
        firstName: 'Ivan',
        lastName: 'Davydov',
        phoneNumber: 88005553535,
        email: 'client1@mail.com',
        role: 1,
    },
    {
        id: 2,
        firstName: 'Mark',
        lastName: 'Bobrov',
        phoneNumber: 88005555535,
        email: 'client2@mail.com',
        role: 1,
    },
    {
        id: 3,
        firstName: 'Egor',
        lastName: 'Petrov',
        phoneNumber: 88005555555,
        email: 'client3@mail.com',
        role: 1,
    },
];

const UsersDatatable = () => {
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

export default UsersDatatable