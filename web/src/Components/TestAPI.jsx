import React, { Component, useState } from "react";
import Axios from 'axios';

export default class TestAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }
     config = {
        url: "https://localhost:7153/Users/byId/1",
        method: "get",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true'
        }
    };
    componentDidMount() {
        // Axios.get("https://localhost:7153/Users/byId/1", this.config)
        //     .then(
        //         (json) => {
        //             console.log(json.data);
        //         // this.setState({
        //         //     items: json.data.drinks
        //         // });
        //     })
        let response = Axios.request(this.config);
        console.log(response);
    }

    render() {
        //const { items } = this.state;

        return (
            <p> TEST </p>
        )
    }

}


{/*<button onClick={getJoke}> Press to impress) </button>*/}
{/*{items.map(item => {*/}
{/*})}*/}