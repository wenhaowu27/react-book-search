import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import saveBook from "./pages/saveBook";
import searchBook from "./pages/searchBook";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={searchBook} />
          <Route exact path="/saved" component={saveBook} />
          <Route exact path="/saved/:id" component={saveBook} />
          <Route component={NoMatch} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
