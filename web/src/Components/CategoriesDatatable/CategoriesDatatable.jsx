import "./CategoriesDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useState, useEffect} from "react";
import Axios from "axios";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";

const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'name', headerName: 'Name', width: 200},
];

export function CategoriesDatatable() {

    const [url, setUrl] = useState("");

    const [categories, setCategories] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [showModal, setShowModal] = useState(false);

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
                            setUrl("https://localhost:7153/Categories?id=" + params.row.id)
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
                    rows={categories}
                    columns={columns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <div className="window">
                <ConfirmModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    text="Are you sure to delete category?"
                    url={url}
                    loaded={() => setLoaded(false)}
                />
            </div>
        </div>
    )
}