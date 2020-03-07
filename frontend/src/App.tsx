import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Home from "./views/Home";
import UserListing from "./views/Users";
import HomeIcon from "./components/icons/Home";

const PaddedDiv = styled.div`
    padding: 0 5px;
    color: #FFFFFF;
`;

const StyledLink = styled(Link)`
    color: #FFFFFF;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:visited {
        text-decoration: none;
    }
`;

const Nav = () => {
    return (<nav
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%"
        }}
    >
        <div
        style={{
            display: "flex",
            flexDirection: "row",
            padding: "5px",
            backgroundColor: "#61DAFB"
        }}>
        <PaddedDiv>
            <StyledLink href="/" to="home">
                <HomeIcon width="20px" height="20px" /> <span style={{marginLeft: '5px'}}>Home</span>
            </StyledLink>
        </PaddedDiv>
        <PaddedDiv>
            <StyledLink href="/users" to="users">
                Users
            </StyledLink>
        </PaddedDiv>
        </div>
    </nav>)
}

export default function App() {
    return (
        <Router>
            <div>
                <Nav />
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
