import React, { Component } from "react";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json)
            .then(json => {
                    this.setState({
                        isLoaded: true,
                        items: json,
                    })
                });
    }

    render() {
        var { isLoaded, items } = this.state;

        if(!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (
                <div className="Users">
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                Name: {item.name} | Email: {item.email}
                            </li>
                        ))};
                    </ul>
                </div>
            )
        }
    }
}

export default Users;