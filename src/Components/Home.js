import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Input } from "reactstrap";
import { Dropbox } from "dropbox";
import { token$, updateToken, removeAllFavorites } from "../store";
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
  const [activeTab, updateActiveTab] = useState(props.location.pathname === "/home/favorites" ? "2" : "1");
  let currentLocation = props.location.pathname.substring(5);

  // Using this instead of helmet because it was causing problem while search
  useEffect(() => {
    document.title = "TeaCup";
  });

  useEffect(() => {
    const subscription = token$.subscribe(updateTokenState);

    return () => subscription.unsubscribe();
  });

  //Fetching files/folders in designated path
  function renderData() {
    //If the favorite tab is active, do not make a new fetch
    if(currentLocation === "/favorites") {
      return;
    }

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
      })
  }
  useEffect(() => {
    renderData();
  }, [currentLocation]);

  // Search
  /*
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
*/
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
    renderData();
  }

  function onUpload() {
    renderData();
  }

  function onDelete() {
    renderData()
  }

  function logOut(e) {
    e.preventDefault();

    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.authTokenRevoke();
    updateToken(null);
    removeAllFavorites();
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <Nav tabs>
          <NavItem>
            <Link to="/home">
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
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/home/favorites">
            <NavLink
              className={activeTab === "2" ? "active" : ""}
              onClick={() => {
                updateActiveTab("2");
                //window.location = "/favorites";
          }}
              style={{color: "#31572C"}}
            >
              <i class="material-icons" style={{ verticalAlign: "bottom" }}>
                star
              </i>
              Favorites
            </NavLink>
            </Link>
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
                <Data
                  data={data}
                  updateData={updateData}
                  renderData={renderData}
                  onDelete={onDelete} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Route path="/home/favorites" render={(props) => (
                  <Favorite activeTab={activeTab} updateActiveTab={updateActiveTab} {...props} />
                )} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <SideMenu
        location={props.location}
        logOut={logOut}
        user={user}
        onNewFolder={onNewFolder}
        onUpload={onUpload}
      />
    </div>
  );
}

export default Home;
