import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Home from "./views/Home";
import UserListing from "./views/Users";
import HomeIcon from "./components/icons/Home";

const PaddedDiv = styled.div`
    padding: 0 5px;
`;

export default function App() {
    return (
        <Router>
            <div>
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "5px"
                    }}
                >
                    <PaddedDiv>
                        <Link href="/" to="home">
                            <HomeIcon width="20px" height="20px" />
                        </Link>
                    </PaddedDiv>
                    <PaddedDiv>
                        <Link href="/users" to="users">
                            User
                        </Link>
                    </PaddedDiv>
                </nav>
                <Switch>
                    <Route path="/users" name="users">
                        <UserListing />
                    </Route>
                    <Route path="/" name="home">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
