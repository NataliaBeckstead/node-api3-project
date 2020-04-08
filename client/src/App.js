import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Posts from "./components/posts";
import Users from "./components/users";
import Home from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/users">
        <Users />
      </Route>

      <Route path="/posts">
          <Posts />
      </Route>
    </div>
  );
}

export default App;
