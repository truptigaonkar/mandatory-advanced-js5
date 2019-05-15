import React, { useState } from "react";
import { Button, Input } from 'reactstrap';
import UploadFile from './UploadFile';
import "./SideMenu.css";
import CreateFolder from './CreateFolder';

const asideStyle = {
  margin: "41px 6px 0 6px",
  width: "20%",
  minWidth: "50px"
}

const ulStyle = {
  listStyle: "none",
  padding: "0"
}

const liStyle = {
  marginTop: "15px",
  padding: "0",
  fontSize: "large"
}

const accountStyle = {
  position: "absolute",
  right: "10px",
  top: "10px"
}

const usernameStyle = {
  marginRight: "5px",
  verticalAlign: "baseline"
};

function SideMenu(props) {
  return (
    <aside style={asideStyle}>
      <ul style={ulStyle}>
        <li className="menu" style={liStyle}><UploadFile onUpload={props.onUpload} location={props.location} file={props.file} /></li>
        <li className="menu" style={liStyle}><CreateFolder onNewFolder={props.onNewFolder} location={props.location} /></li>
      </ul>
      <div style={accountStyle}>
        <span style={usernameStyle}>{props.user}</span>
        <Button color="success" onClick={props.logOut}>Log out</Button>
      </div>
    </aside>
  );
}

export default SideMenu;
