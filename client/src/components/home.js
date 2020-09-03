import React from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/posts">Posts</NavLink>
        </div>
    );
};

export default Home;