import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "../Routes/Home";
import TV from "../Routes/TV";
import Header from "./Header";
import Search from "../Routes/Search";
import Detail from "../Routes/Detail";
import Collection from "../Routes/Collection";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/tv/:id" component={Detail} />
        <Route path="/collection/:id" component={Collection} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
