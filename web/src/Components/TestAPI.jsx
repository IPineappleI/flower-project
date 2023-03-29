import React, {useState} from "react";
import Axios from 'axios';

function TestAPI() {

    const [UserName, setUserName] = useState("-")

    const fetchData = () => {
        Axios.get("https://localhost:7153/Users/byId?id=1")
            .then(
                (res) => {
                    setUserName(res.data.firstName);
                    console.log(res.data);
                });
    };

    return (
        <div className="TestApi">
            <button onClick={fetchData}> Get user 1 name</button>
            {UserName}
        </div>
    );
}

export default TestAPI;