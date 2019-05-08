import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, InputGroup, Input } from 'reactstrap';
import './App.css';
import Start from './Start.js';
import Auth from './Auth.js';
import Home from './Home';
import Favorite from './Favorite';
import logoImage from './logo.png';
// import Dropbox from 'dropbox/dropbox'; <-- According to https://dropbox.github.io/dropbox-sdk-js/tutorial-Getting%20started.html
//                                        this should be used with Babel, but this creates an error because 'Dropbox' has already been declared.
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { token$, updateToken } from './Store.js';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';

const navStyle = {
  width: "100%",
  marginLeft: "10px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-end"
}

const logoStyle = {
  width: "50px",
  position: "absolute",
  left: "10px",
  top: "8px"
}

const headerStyle = {
  margin: 0,
  position: "relative",
  left: "60px",
  top: "20px"
}

const logOutStyle = {
  position: "absolute",
  right: "10px",
  top: "10px"
}

function App() {
  const [activeTab, updateActiveTab] = useState("1");
  const [token, updateToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(updateToken);
    return () => subscription.unsubscribe();
  }, []);

  // function logOut() {
  //   updateToken(null);
  // }

  return (
    <div className="App">
      <Router>
        <nav style={navStyle}>
          <Link to="/"><img src={logoImage} style={logoStyle} /></Link>
          <h1 style={headerStyle}>TeaCup</h1>
          {/* <Button style={logOutStyle} onClick={logOut}>Log out</Button> */}
        </nav><br /><br />

        <Route path="/auth" component={Auth} />
        {/* <Route path="/home" component={Home} /> */}
        <Route path="/start" component={Start} />

        <div style={{ display: "flex", width: "100%" }}>

          <div style={{ flexGrow: 1 }}>
            <Nav tabs>
              <NavItem>
                <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => updateActiveTab("1")}>All</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => updateActiveTab("2")}>Favorite</NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Breadcrumbs</h4>
                  </Col>
                  <Col sm="12">
                    <Route exact path="/" component={Home} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <h4>Favorite</h4>
                  </Col>
                  <Col sm="12">
                    <Route path="/favorite" component={Favorite} />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
          <aside style={{ margin: "41px 6px 0 6px",  width: "20%", minWidth: "50px" }}>
            <Input type="text" placeholder="Search" />
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li><a href="">Upload File</a></li>
              <li><a href="">New Folder</a></li>
            </ul>
          </aside>
        </div>

      </Router>
    </div >
  );
}

export default App;
