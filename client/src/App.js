import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Voting from "./pages/Voting";
import Profile from "./pages/Profile";
import SavedArticles from "./pages/SavedArticles";
import "./App.css";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/details" component={Voting} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/savedarticles" component={SavedArticles} />
        <Route component={Home} />
      </Switch>
    </div>
  </Router>;

export default App;
