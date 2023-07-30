import "./TokensDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import Axios from "axios";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";

const columns = [
    {field: 'email', headerName: 'User email', width: 200},
    {field: 'token', headerName: 'Token', width: 300},
];

export function TokensDatatable() {
    const [url, setUrl] = useState("");

    const [tokens, setTokens] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (loaded)
            return;
        Axios.get("https://localhost:7153/Tokens")
            .then(
                (res) => {
                    setTokens(res?.data);
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
                        <div className="editButton">Edit</div>
                        <div className="deleteButton" onClick={() => {
                            setShowModal(true);
                            setUrl("https://localhost:7153/Tokens?email=" + params.row.email.toString().replace('@', '%40'))
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
                    getRowId={(row) => row.email}
                    rows={tokens}
                    columns={columns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <ConfirmModal
                open={showModal}
                onClose={() => setShowModal(false)}
                text="Are you sure to delete token?"
                url={url}
                loaded={() => setLoaded(false)}
            />
        </div>
    )
}