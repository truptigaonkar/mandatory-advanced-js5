import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Inpu } from "reactstrap";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import { Redirect } from "react-router-dom";
import moment from "moment";
import Data from "./Data";
import Favorite from "./Favorite";
import SideMenu from "./SideMenu";
import Breadcrumbs from "./Breadcrumbs";

function Home(props) {
  const [token, updateTokenState] = useState(token$.value);
  const [data, updateData] = useState([]);
  const [search, updateSearch] = useState("");
  const [user, updateUser] = useState("");
  const [activeTab, updateActiveTab] = useState("1");
  let currentLocation = props.location.pathname.substring(5);

  // Using this instead of helmet because it was causing problem while search
  useEffect(() => {
    document.title = "TeaCup";
  });

  //Fetching files/folders in designated path
  useEffect(() => {
    const dropbox = new Dropbox({ accessToken: token, fetch });
    if (currentLocation === "/") {
      currentLocation = "";
    }
    dropbox.filesListFolder({ path: currentLocation })
      .then(function (response) {
        updateData(response.entries);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [currentLocation]);

  // Search
  useEffect(() => {
    const dropbox = new Dropbox({ accessToken: token, fetch });

    if (!search) {
      //Fetching files/folders
      dropbox.filesListFolder({ path: currentLocation })
        .then(function (response) {
          updateData(response.entries);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      // Search
      dropbox.filesSearch({ path: currentLocation, query: search })
        .then(function (response) {
          const files = response.matches.map(file => {
            return file.metadata
          });
          updateData(files);
        })
    }
  }, []);

  // Fetch user name
  useEffect(() => {
    const dropbox = new Dropbox({ accessToken: token });
    dropbox
      .usersGetCurrentAccount()
      .then(function (response) {
        updateUser(response.name.given_name);
      })
      .catch(function (error) {

        console.error(error);
      });
  }, [token]);

  if (!token) {
    return <Redirect to="/" />;
  }

  function onNewFolder(folder) {
    updateData(folder);
  }

  function filterFile(e) {
    updateSearch(e.target.value);
  }

  function logOut(e) {
    e.preventDefault();
    updateToken(null);
    updateTokenState(token$.value);
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === "1" ? "active" : ""}
              onClick={() => updateActiveTab("1")}
              style={{color: "#31572C"}}
            >
              <i class="material-icons" style={{ verticalAlign: "bottom" }}>
                folder
              </i>
              All
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "2" ? "active" : ""}
              onClick={() => updateActiveTab("2")}
              style={{color: "#31572C"}}
            >
              <i class="material-icons" style={{ verticalAlign: "bottom" }}>
                star
              </i>
              Favorite
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Breadcrumbs path={props.location.pathname} />
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Data data={data} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <h4>Favorite</h4>
              </Col>
              <Col sm="12">
                <Favorite />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <SideMenu
        search={search}
        filterFile={filterFile}
        logOut={logOut}
        user={user}
        onNewFolder={onNewFolder}
      />
    </div>
  );
}

export default Home;
