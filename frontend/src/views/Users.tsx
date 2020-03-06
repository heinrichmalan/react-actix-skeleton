import React, { Component } from "react";

import "../App.css";

class UserListing extends Component<Object, { users: Array<any> }> {
    constructor(props: Readonly<Object>) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount = async () => {
        try {
            const url = "/api/users";
            const res = await fetch(url);
            const users: Array<any> = await res.json();

            this.setState({ users });
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return (
            <div
                className="App-header"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto"
                }}
            >
                {this.state.users.map(u => {
                    return (
                        <div style={{ width: "auto", margin: "0 auto" }}>
                            Name: {u.name}
                            <br />
                            Email: {u.email}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default UserListing;
