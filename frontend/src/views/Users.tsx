import React, { Component } from "react";
import Spinner from "../components/Spinner";
import "../App.css";

const waitNSecs = (seconds: number) => {
  let promise = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });

  return promise;
};

type UserInfo = { name: string; email: string };

const UserTable = ({ users }: { users: Array<UserInfo> }) => (
  <table>
    <tr>
      <th style={{ textAlign: "left" }}>Name</th>
      <th style={{ textAlign: "left", paddingLeft: "10px" }}>Email</th>
    </tr>
    {users.map((u: UserInfo) => {
      return (
        <tr>
          <td style={{ textAlign: "left" }}>{u.name}</td>
          <td style={{ textAlign: "left", paddingLeft: "10px" }}>{u.email}</td>
        </tr>
      );
    })}
  </table>
);

type UserListingState = {
  users: Array<any>;
  loading: boolean;
};

class UserListing extends Component<Object, UserListingState> {
  constructor(props: Readonly<Object>) {
    super(props);

    this.state = {
      users: [],
      loading: true
    };
  }

  componentDidMount = async () => {
    try {
      const p = waitNSecs(1.5);
      const url = "/api/users";
      const res = await fetch(url);
      const users: Array<any> = await res.json();
      await p;
      this.setState({ users, loading: false });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div
        className="App-header"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto"
        }}
      >
        {!loading ? <UserTable users={users} /> : <Spinner />}
      </div>
    );
  }
}

export default UserListing;
