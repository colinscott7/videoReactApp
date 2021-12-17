import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import * as cpx from "./components";
import { PagesData } from "./Data";

import "./scss/index.scss";

// Data

export const App = () => {
  if (!PagesData) {
    return <cpx.Loading />;
  }
  const getRoutes = PagesData.map((page, index) => {
    return <Route path={page.url} exact component={page.content} key={`route___${index}`} />;
  });

  return (
    <>
      <Router>
        <div className="wrapper">
          <cpx.Navbar data={PagesData} theme="dark" />
          <div className="content">
            <Switch>{getRoutes}</Switch>
          </div>
        </div>
      </Router>
    </>
  );
};
